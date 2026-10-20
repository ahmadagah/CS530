"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ProductListing } from "@/components/product/product-listing";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { categories, getCategory } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function CategoryView({ slug }: { slug: string }) {
  const { t, categoryName } = useI18n();
  const catalog = useCatalog();
  const category = getCategory(slug);
  const products = useMemo(() => catalog.filter((p) => p.category === slug), [catalog, slug]);
  if (!category) return null;

  return (
    <div className="container-page py-5 sm:py-8">
      <Breadcrumbs items={[{ href: "/", label: t("nav.home") }, { href: "/categories", label: t("nav.categories") }, { label: categoryName(category) }]} />

      <div className="mt-4 flex items-center gap-4">
        <span
          className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-card sm:size-16 sm:text-4xl"
          style={{ backgroundColor: category.tint }}
          aria-hidden
        >
          {category.emoji}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{categoryName(category)}</h1>
          <p className="text-sm text-muted-foreground">{t("category.productsCount", { count: products.length })}</p>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-5 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
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

      <ProductListing key={slug} products={products} />
    </div>
  );
}
