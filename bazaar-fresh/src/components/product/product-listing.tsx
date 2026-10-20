"use client";

import { PackageSearch, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n/provider";
import { collapseVariants, SORT_KEYS, sortProducts, type SortKey } from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./product-grid";

interface Filters {
  price: [number, number];
  brands: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

function priceBounds(products: CatalogProduct[]): [number, number] {
  if (products.length === 0) return [0, 0];
  const prices = products.map((p) => p.finalPrice);
  return [Math.floor(Math.min(...prices) / 10) * 10, Math.ceil(Math.max(...prices) / 10) * 10];
}

function FilterPanel({
  products,
  bounds,
  filters,
  onChange,
  hideSaleFilter,
}: {
  products: CatalogProduct[];
  bounds: [number, number];
  filters: Filters;
  onChange: (next: Filters) => void;
  hideSaleFilter?: boolean;
}) {
  const { t, price, num } = useI18n();
  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [products]);

  const toggleBrand = (brand: string, checked: boolean) =>
    onChange({
      ...filters,
      brands: checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand),
    });

  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-4 text-sm font-bold">{t("category.priceRange")}</h3>
        <Slider
          min={bounds[0]}
          max={bounds[1]}
          step={10}
          minStepsBetweenThumbs={1}
          value={filters.price}
          onValueChange={(value) => onChange({ ...filters, price: [value[0], value[1]] })}
          disabled={bounds[0] === bounds[1]}
        />
        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-muted-foreground tabular-nums">
          <span className="rounded-lg bg-muted px-2 py-1">{price(filters.price[0])}</span>
          <span className="rounded-lg bg-muted px-2 py-1">{price(filters.price[1])}</span>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="mb-3 text-sm font-bold">{t("category.availability")}</h3>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
            {t("category.inStockOnly")}
            <Switch
              checked={filters.inStockOnly}
              onCheckedChange={(inStockOnly) => onChange({ ...filters, inStockOnly })}
            />
          </label>
          {!hideSaleFilter && (
            <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
              {t("category.onSaleOnly")}
              <Switch checked={filters.onSaleOnly} onCheckedChange={(onSaleOnly) => onChange({ ...filters, onSaleOnly })} />
            </label>
          )}
        </div>
      </section>

      {brands.length > 1 && (
        <>
          <Separator />
          <section>
            <h3 className="mb-3 text-sm font-bold">{t("category.brand")}</h3>
            <ul className="space-y-2.5">
              {brands.map(([brand, count]) => {
                const id = `brand-${brand.replace(/\W+/g, "-")}`;
                return (
                  <li key={brand} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => toggleBrand(brand, checked === true)}
                    />
                    <Label htmlFor={id} className="flex-1 cursor-pointer justify-between font-normal">
                      <span dir="ltr">{brand}</span>
                      <span className="text-xs text-muted-foreground">{num(count)}</span>
                    </Label>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

/**
 * Product grid with price / brand / stock filters and sorting. Pass `sidebar`
 * (e.g. the sub-category list) to show it on the left instead of the filters,
 * which then open from the "Filters" button.
 */
export function ProductListing({
  products,
  hideSaleFilter,
  emptyAction,
  sidebar,
}: {
  products: CatalogProduct[];
  hideSaleFilter?: boolean;
  emptyAction?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  const { t, price, dir } = useI18n();
  const bounds = useMemo(() => priceBounds(products), [products]);
  const initial: Filters = { price: bounds, brands: [], inStockOnly: false, onSaleOnly: false };
  const [filters, setFilters] = useState<Filters>(initial);
  const [sort, setSort] = useState<SortKey>("featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Keep the price range valid if the products change (e.g. an admin edit).
  const priceRange: [number, number] = [
    Math.max(bounds[0], Math.min(filters.price[0], bounds[1])),
    Math.min(bounds[1], Math.max(filters.price[1], bounds[0])),
  ];
  const [minPrice, maxPrice] = priceRange;
  const priceFiltered = minPrice > bounds[0] || maxPrice < bounds[1];

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        p.finalPrice >= minPrice &&
        p.finalPrice <= maxPrice &&
        (filters.brands.length === 0 || filters.brands.includes(p.brand)) &&
        (!filters.inStockOnly || p.inStock) &&
        (!filters.onSaleOnly || p.onSale),
    );
    return collapseVariants(sortProducts(list, sort));
  }, [products, minPrice, maxPrice, filters.brands, filters.inStockOnly, filters.onSaleOnly, sort]);

  const chips: { key: string; label: string; clear: () => void }[] = [
    ...(priceFiltered
      ? [
          {
            key: "price",
            label: `${price(priceRange[0])} – ${price(priceRange[1])}`,
            clear: () => setFilters({ ...filters, price: bounds }),
          },
        ]
      : []),
    ...(filters.inStockOnly
      ? [{ key: "stock", label: t("category.inStockOnly"), clear: () => setFilters({ ...filters, inStockOnly: false }) }]
      : []),
    ...(filters.onSaleOnly
      ? [{ key: "sale", label: t("category.onSaleOnly"), clear: () => setFilters({ ...filters, onSaleOnly: false }) }]
      : []),
    ...filters.brands.map((b) => ({
      key: `brand-${b}`,
      label: b,
      clear: () => setFilters({ ...filters, brands: filters.brands.filter((x) => x !== b) }),
    })),
  ];
  const clearAll = () => setFilters({ ...initial, price: bounds });
  const filterProps = { products, bounds, filters: { ...filters, price: priceRange }, onChange: setFilters, hideSaleFilter };

  return (
    <div
      className={cn(
        "grid",
        sidebar ? "grid-cols-[72px_1fr] gap-2.5 sm:grid-cols-[200px_1fr] sm:gap-6 lg:grid-cols-[230px_1fr]" : "gap-6 lg:grid-cols-[240px_1fr] lg:gap-8",
      )}
    >
      {sidebar}
      <aside className={cn("hidden", !sidebar && "lg:block")}>
        <div className="sticky top-36 rounded-2xl border bg-card p-5 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold">
              <SlidersHorizontal className="size-4 text-primary" />
              {t("category.filters")}
            </h2>
            {chips.length > 0 && (
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-primary hover:underline">
                {t("category.clearAll")}
              </button>
            )}
          </div>
          <FilterPanel {...filterProps} />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("category.productsCount", { count: visible.length })}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className={cn("h-9", !sidebar && "lg:hidden")} onClick={() => setSheetOpen(true)}>
              <SlidersHorizontal />
              {t("category.filters")}
              {chips.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">
                  {chips.length}
                </span>
              )}
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger size="sm" className="h-9 rounded-full" aria-label={t("category.sortBy")}>
                <span className="hidden text-muted-foreground sm:inline">{t("category.sortBy")}:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {SORT_KEYS.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`category.sort.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                className="inline-flex items-center gap-1 rounded-full bg-primary-soft py-1 ps-3 pe-2 text-xs font-semibold text-primary transition hover:bg-primary/15"
              >
                {chip.label}
                <X className="size-3.5" />
              </button>
            ))}
            <button type="button" onClick={clearAll} className="px-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
              {t("category.clearAll")}
            </button>
          </div>
        )}

        {visible.length > 0 ? (
          <ProductGrid products={visible} cols={sidebar ? 3 : 4} />
        ) : (
          <EmptyState
            icon={PackageSearch}
            title={t("category.emptyTitle")}
            description={t("category.emptyHint")}
            action={
              chips.length > 0 ? (
                <Button variant="outline" onClick={clearAll}>
                  {t("category.clearAll")}
                </Button>
              ) : (
                emptyAction
              )
            }
            className={cn("rounded-3xl border border-dashed")}
          />
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" closeLabel={t("common.close")} dir={dir}>
          <SheetHeader className="border-b">
            <SheetTitle>{t("category.filters")}</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto px-5 py-5">
            <FilterPanel {...filterProps} />
          </div>
          <SheetFooter className="flex-row border-t pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Button variant="outline" size="lg" className="flex-1" onClick={clearAll}>
              {t("category.clearAll")}
            </Button>
            <Button size="lg" className="flex-[2]" onClick={() => setSheetOpen(false)}>
              {t("category.showResults", { count: visible.length })}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
