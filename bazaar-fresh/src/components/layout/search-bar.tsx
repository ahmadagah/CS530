"use client";

import { ArrowUpLeft, Search, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ProductImage } from "@/components/shared/product-image";
import { categories, type Category } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { normalizeText, searchProducts } from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

type Option = { kind: "category"; category: Category; href: string } | { kind: "product"; product: CatalogProduct; href: string };

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const index = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-primary-soft px-0.5 text-primary">{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  );
}

export function SearchBar({
  className,
  initialQuery = "",
  autoFocus,
  size = "default",
}: {
  className?: string;
  initialQuery?: string;
  autoFocus?: boolean;
  size?: "default" | "lg";
}) {
  const router = useRouter();
  const { t, productName, categoryName, price, packSize } = useI18n();
  const catalog = useCatalog();
  const listId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const options = useMemo<Option[]>(() => {
    const q = normalizeText(query);
    if (!q) return [];
    const cats: Option[] = categories
      .filter((c) => normalizeText(Object.values(c.name).join(" ")).includes(q))
      .slice(0, 2)
      .map((category) => ({ kind: "category", category, href: `/category/${category.slug}` }));
    const prods: Option[] = searchProducts(catalog, query)
      .slice(0, 6)
      .map((product) => ({ kind: "product", product, href: `/product/${product.id}` }));
    return [...cats, ...prods];
  }, [catalog, query]);

  const popular = t("search.popularTerms").split("|");

  const go = (href: string) => {
    setOpen(false);
    setActive(-1);
    input.current?.blur();
    router.push(href);
  };

  const submit = (value = query) => {
    const q = value.trim();
    if (!q) return;
    go(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (options.length ? (i + 1) % options.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (options.length ? (i - 1 + options.length) % options.length : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && options[active]) go(options[active].href);
      else submit();
    } else if (e.key === "Escape") {
      setOpen(false);
      input.current?.blur();
    }
  };

  const showPanel = open && (query.trim() ? true : popular.length > 0);

  return (
    <div ref={wrapper} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="relative">
          <Search
            className={cn(
              "pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground",
              size === "lg" ? "size-5" : "size-[18px]",
            )}
          />
          <input
            ref={input}
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t("header.searchPlaceholder")}
            aria-label={t("nav.search")}
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            className={cn(
              "w-full rounded-full border border-transparent bg-muted ps-11 pe-11 text-[15px] transition outline-none placeholder:text-muted-foreground/90 [&::-webkit-search-cancel-button]:hidden",
              "hover:bg-muted/80 focus:border-primary focus:bg-background focus:shadow-[0_0_0_4px] focus:shadow-primary/12",
              size === "lg" ? "h-13 text-base" : "h-11",
            )}
          />
          {query && (
            <button
              type="button"
              aria-label={t("search.clear")}
              onClick={() => {
                setQuery("");
                setActive(-1);
                input.current?.focus();
              }}
              className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border bg-popover shadow-2xl animate-in fade-in-0 slide-in-from-top-1 duration-150"
        >
          {!query.trim() ? (
            <div className="p-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <TrendingUp className="size-3.5" />
                {t("search.popularSearches")}
              </p>
              <div className="flex flex-wrap gap-2">
                {popular.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      submit(term);
                    }}
                    className="rounded-full border px-3 py-1.5 text-sm font-medium transition hover:border-primary hover:bg-primary-soft hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : options.length === 0 ? (
            <p className="p-5 text-center text-sm text-muted-foreground">{t("search.noSuggestions", { query })}</p>
          ) : (
            <ul className="max-h-[min(70vh,28rem)] overflow-y-auto p-1.5">
              {options.map((option, i) => (
                <li key={option.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <Link
                    href={option.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(option.href);
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors",
                      i === active && "bg-muted",
                    )}
                  >
                    {option.kind === "category" ? (
                      <>
                        <span
                          className="grid size-11 shrink-0 place-items-center rounded-xl text-2xl"
                          style={{ backgroundColor: option.category.tint }}
                        >
                          {option.category.emoji}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">
                            <Highlight text={categoryName(option.category)} query={query} />
                          </span>
                          <span className="text-xs text-muted-foreground">{t("search.categories")}</span>
                        </span>
                        <ArrowUpLeft className="size-4 shrink-0 text-muted-foreground ltr:-scale-x-100" />
                      </>
                    ) : (
                      <>
                        <span className="size-11 shrink-0 overflow-hidden rounded-xl">
                          <ProductImage product={option.product} sizes="48px" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            <Highlight text={productName(option.product)} query={query} />
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {packSize(option.product.size)} · {option.product.brand}
                          </span>
                        </span>
                        <span className="shrink-0 text-end">
                          <span
                            className={cn("block text-sm font-bold tabular-nums", option.product.onSale && "text-deal")}
                          >
                            {price(option.product.finalPrice)}
                          </span>
                          {!option.product.inStock && (
                            <span className="text-[11px] text-muted-foreground">{t("product.outOfStock")}</span>
                          )}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => submit()}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft"
                >
                  <Search className="size-4" />
                  {t("search.seeAll", { query: query.trim() })}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
