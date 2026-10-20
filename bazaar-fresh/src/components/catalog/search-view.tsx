"use client";

import { Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryTile } from "@/components/home/category-tiles";
import { SearchBar } from "@/components/layout/search-bar";
import { ProductListing } from "@/components/product/product-listing";
import { EmptyState } from "@/components/shared/empty-state";
import { categories, type CategorySlug } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { searchProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

function BrowseCategories() {
  const { t } = useI18n();
  return (
    <section className="mt-4">
      <h2 className="mb-4 text-lg font-bold">{t("nav.allCategories")}</h2>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-5 lg:grid-cols-10">
        {categories.map((c) => (
          <CategoryTile key={c.slug} slug={c.slug} />
        ))}
      </div>
    </section>
  );
}

export function SearchView({ query }: { query: string }) {
  const { t, categoryName, num } = useI18n();
  const catalog = useCatalog();
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const results = useMemo(() => searchProducts(catalog, query), [catalog, query]);
  const resultCategories = useMemo(
    () => categories.filter((c) => results.some((p) => p.category === c.slug)),
    [results],
  );
  const filtered = category === "all" ? results : results.filter((p) => p.category === category);
  const popular = t("search.popularTerms").split("|");

  return (
    <div className="container-page py-5 sm:py-8">
      <div className="md:hidden">
        <SearchBar initialQuery={query} autoFocus={!query} size="lg" />
      </div>

      {!query ? (
        <>
          <EmptyState
            icon={Search}
            title={t("search.startTitle")}
            description={t("search.startHint")}
            action={
              <div className="flex max-w-md flex-wrap justify-center gap-2">
                {popular.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border bg-white px-3.5 py-1.5 text-sm font-medium transition hover:border-primary hover:bg-primary-soft hover:text-primary"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            }
          />
          <BrowseCategories />
        </>
      ) : results.length === 0 ? (
        <>
          <EmptyState
            icon={SearchX}
            title={t("search.emptyTitle")}
            description={`${t("search.noSuggestions", { query })} — ${t("search.emptyHint")}`}
          />
          <BrowseCategories />
        </>
      ) : (
        <>
          <div className="mt-5 md:mt-0">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("search.resultsFor", { query })}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("search.resultsCount", { count: results.length })}</p>
          </div>
          {resultCategories.length > 1 && (
            <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
              {[{ slug: "all" as const, label: t("search.all"), count: results.length, emoji: "" }, ...resultCategories.map((c) => ({
                slug: c.slug,
                label: categoryName(c),
                count: results.filter((p) => p.category === c.slug).length,
                emoji: c.emoji,
              }))].map((chip) => (
                <button
                  key={chip.slug}
                  type="button"
                  onClick={() => setCategory(chip.slug)}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition",
                    category === chip.slug
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-white hover:border-primary/40 hover:bg-primary-soft hover:text-primary",
                  )}
                >
                  {chip.emoji && <span aria-hidden>{chip.emoji}</span>}
                  {chip.label}
                  <span className={cn("text-xs", category === chip.slug ? "text-white/80" : "text-muted-foreground")}>
                    {num(chip.count)}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="mt-6">
            <ProductListing key={`${query}-${category}`} products={filtered} />
          </div>
        </>
      )}
    </div>
  );
}
