"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductListing } from "@/components/product/product-listing";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { categories, getCategory, type Category } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/** Blinkit-style left rail of sub-categories ("All", "Fresh Vegetables", …). */
function SubcategoryRail({
  category,
  active,
  onSelect,
  counts,
}: {
  category: Category;
  active: string;
  onSelect: (slug: string) => void;
  counts: Record<string, number>;
}) {
  const { t, categoryName } = useI18n();
  const items = [
    { slug: "all", label: t("category.all"), emoji: category.emoji },
    ...category.subcategories.map((s) => ({ slug: s.slug, label: categoryName(s), emoji: s.emoji })),
  ];
  return (
    <nav aria-label={categoryName(category)} className="min-w-0">
      <ul className="sticky top-36 space-y-1 sm:rounded-2xl sm:border sm:bg-card sm:p-2 sm:shadow-card">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => onSelect(item.slug)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 text-center text-[11px] leading-tight font-semibold transition sm:flex-row sm:gap-3 sm:px-2.5 sm:text-start sm:text-sm",
                  isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {isActive && <span className="absolute inset-y-2 end-0 w-1 rounded-full bg-primary sm:start-0 sm:end-auto" />}
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full text-xl sm:size-10"
                  style={{ backgroundColor: category.tint }}
                  aria-hidden
                >
                  {item.emoji}
                </span>
                <span className="line-clamp-2 min-w-0 sm:flex-1">{item.label}</span>
                <span className="hidden text-xs font-normal text-muted-foreground sm:inline">{counts[item.slug] ?? 0}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CategoryView({ slug, initialSub }: { slug: string; initialSub?: string }) {
  const { t, categoryName } = useI18n();
  const catalog = useCatalog();
  const category = getCategory(slug);
  const [sub, setSub] = useState(() =>
    initialSub && category?.subcategories.some((s) => s.slug === initialSub) ? initialSub : "all",
  );
  const inCategory = useMemo(() => catalog.filter((p) => p.category === slug), [catalog, slug]);
  const products = useMemo(() => (sub === "all" ? inCategory : inCategory.filter((p) => p.subcategory === sub)), [inCategory, sub]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: inCategory.length };
    for (const p of inCategory) c[p.subcategory] = (c[p.subcategory] ?? 0) + 1;
    return c;
  }, [inCategory]);
  if (!category) return null;
  const activeSub = category.subcategories.find((s) => s.slug === sub);

  return (
    <div className="container-page py-4 sm:py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: t("nav.home") },
          { href: "/categories", label: t("nav.categories") },
          { label: categoryName(category) },
        ]}
        className="hidden sm:block"
      />

      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:mt-4 sm:mb-6 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition",
              c.slug === slug
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-white hover:border-primary/40 hover:bg-primary-soft hover:text-primary",
            )}
          >
            <span aria-hidden>{c.emoji}</span>
            {categoryName(c)}
          </Link>
        ))}
      </div>

      <h1 className="mb-3 text-xl font-extrabold tracking-tight sm:text-3xl">
        {activeSub ? categoryName(activeSub) : categoryName(category)}
      </h1>

      <ProductListing
        key={`${slug}-${sub}`}
        products={products}
        sidebar={<SubcategoryRail category={category} active={sub} onSelect={setSub} counts={counts} />}
      />
    </div>
  );
}
