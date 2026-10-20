import { categories, type Product } from "@/data/products";
import type { CatalogProduct } from "./types";

/** At or below this many units a product shows "Only N left". */
export const LOW_STOCK_THRESHOLD = 5;

/** Admin edits for one product. `salePrice: null` removes a seed sale price. */
export interface ProductOverride {
  price?: number;
  salePrice?: number | null;
  stock?: number;
}

export function applyOverride(product: Product, override?: ProductOverride): CatalogProduct {
  const price = override?.price ?? product.price;
  const rawSale = override && "salePrice" in override ? override.salePrice : product.salePrice;
  const salePrice = rawSale != null && rawSale > 0 && rawSale < price ? rawSale : undefined;
  const stock = Math.max(0, override?.stock ?? product.stock);
  return {
    ...product,
    price,
    salePrice,
    stock,
    inStock: stock > 0,
    onSale: salePrice !== undefined,
    finalPrice: salePrice ?? price,
  };
}

export function discountPercent(p: Pick<CatalogProduct, "price" | "finalPrice">): number {
  if (p.finalPrice >= p.price) return 0;
  return Math.round(((p.price - p.finalPrice) / p.price) * 100);
}

export type SortKey = "featured" | "priceAsc" | "priceDesc" | "name" | "discount" | "rating";
export const SORT_KEYS: SortKey[] = ["featured", "priceAsc", "priceDesc", "name", "discount", "rating"];

export function sortProducts(list: CatalogProduct[], sort: SortKey): CatalogProduct[] {
  const copy = [...list];
  switch (sort) {
    case "priceAsc":
      return copy.sort((a, b) => a.finalPrice - b.finalPrice);
    case "priceDesc":
      return copy.sort((a, b) => b.finalPrice - a.finalPrice);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "discount":
      return copy.sort((a, b) => discountPercent(b) - discountPercent(a));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    default:
      // In-stock first, then popular, then by number of reviews.
      return copy.sort(
        (a, b) =>
          Number(b.inStock) - Number(a.inStock) ||
          Number(Boolean(b.popular)) - Number(Boolean(a.popular)) ||
          b.reviews - a.reviews,
      );
  }
}

/** Lower-cases and unifies Arabic/Persian letter variants so searches match either spelling. */
export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ًͯ-ٰٟ]/g, "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/‌/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryText(product: Product): string {
  const c = categories.find((x) => x.slug === product.category);
  return c ? Object.values(c.name).join(" ") : "";
}

/**
 * Ranks products against a free-text query. Every word in the query must
 * appear somewhere in the product's names, brand or category.
 */
export function searchProducts(list: CatalogProduct[], query: string): CatalogProduct[] {
  const q = normalizeText(query);
  if (!q) return [];
  const terms = q.split(" ");

  const scored: { product: CatalogProduct; score: number }[] = [];
  for (const p of list) {
    const names = normalizeText([p.name, p.localName?.ps ?? "", p.localName?.fa ?? ""].join(" "));
    const brand = normalizeText(p.brand);
    const category = normalizeText(categoryText(p));
    const haystack = `${names} ${brand} ${category}`;
    if (!terms.every((term) => haystack.includes(term))) continue;

    let score = 0;
    if (names.startsWith(q)) score += 60;
    else if (names.split(" ").some((word) => word.startsWith(terms[0]))) score += 40;
    else if (names.includes(q)) score += 25;
    if (brand.startsWith(terms[0])) score += 15;
    if (category.includes(q)) score += 5;
    if (p.inStock) score += 4;
    if (p.popular) score += 2;
    scored.push({ product: p, score });
  }
  return scored.sort((a, b) => b.score - a.score || b.product.reviews - a.product.reviews).map((s) => s.product);
}

/**
 * Keeps one card per variant group (the cheapest size), so lists show a
 * single product with an "N options" picker, like rice 5 kg / 10 kg.
 */
export function collapseVariants(list: CatalogProduct[]): CatalogProduct[] {
  const seen = new Set<string>();
  const out: CatalogProduct[] = [];
  for (const p of list) {
    if (!p.variantGroup) {
      out.push(p);
      continue;
    }
    if (seen.has(p.variantGroup)) continue;
    seen.add(p.variantGroup);
    const group = list.filter((x) => x.variantGroup === p.variantGroup);
    const inStock = group.filter((x) => x.inStock);
    const pool = inStock.length > 0 ? inStock : group;
    out.push(pool.reduce((best, x) => (x.finalPrice < best.finalPrice ? x : best)));
  }
  return out;
}

/** All sizes of a product (just the product itself when it has no variants), cheapest first. */
export function variantsOf(product: CatalogProduct, catalog: CatalogProduct[]): CatalogProduct[] {
  if (!product.variantGroup) return [product];
  return catalog.filter((p) => p.variantGroup === product.variantGroup).sort((a, b) => a.finalPrice - b.finalPrice);
}
