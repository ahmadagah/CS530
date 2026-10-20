"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EmojiTile } from "@/components/shared/product-image";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";

export function CategoriesView() {
  const { t, categoryName } = useI18n();
  const catalog = useCatalog();

  return (
    <div className="container-page py-6 sm:py-10">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("category.allTitle")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("category.allHint", { minutes: siteConfig.delivery.etaMinutes })}</p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {categories.map((c) => {
          const count = catalog.filter((p) => p.category === c.slug).length;
          return (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="@container relative block aspect-[4/3] w-full overflow-hidden" style={{ backgroundColor: c.tint }}>
                  <ImageWithFallback
                    src={c.image}
                    alt=""
                    sizes="(max-width: 640px) 50vw, 240px"
                    fallback={<EmojiTile emoji={c.emoji} />}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 items-center justify-between gap-2 p-3.5">
                  <span className="min-w-0">
                    <span className="block text-sm leading-tight font-bold group-hover:text-primary sm:text-base">
                      {categoryName(c)}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {t("category.productsCount", { count })}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
