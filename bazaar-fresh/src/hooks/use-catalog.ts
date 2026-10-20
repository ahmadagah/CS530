"use client";

import { useMemo } from "react";
import { products } from "@/data/products";
import { applyOverride } from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/types";
import { useCatalogStore } from "@/store/catalog";

/** All products with admin edits (price, sale price, stock) applied. */
export function useCatalog(): CatalogProduct[] {
  const overrides = useCatalogStore((s) => s.overrides);
  return useMemo(() => products.map((p) => applyOverride(p, overrides[p.id])), [overrides]);
}

export function useProduct(id: string): CatalogProduct | undefined {
  const catalog = useCatalog();
  return useMemo(() => catalog.find((p) => p.id === id), [catalog, id]);
}
