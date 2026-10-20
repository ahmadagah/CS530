"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EmojiTile } from "@/components/shared/product-image";
import { categories } from "@/data/products";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function CategoryTile({ slug, className }: { slug: string; className?: string }) {
  const { categoryName } = useI18n();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn("group flex flex-col items-center gap-2 rounded-2xl p-1.5 text-center transition", className)}
    >
      <span
        className="@container relative block aspect-square w-full overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover"
        style={{ backgroundColor: category.tint }}
      >
        <ImageWithFallback
          src={category.image}
          alt=""
          sizes="(max-width: 640px) 30vw, 160px"
          fallback={<EmojiTile emoji={category.emoji} />}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="line-clamp-2 text-[13px] leading-tight font-semibold group-hover:text-primary sm:text-sm">
        {categoryName(category)}
      </span>
    </Link>
  );
}

export function CategoryTiles() {
  const { t } = useI18n();
  return (
    <section className="container-page">
      <h2 className="mb-4 text-xl font-extrabold tracking-tight sm:text-2xl">{t("home.shopByCategory")}</h2>
      <div className="no-scrollbar -mx-4 grid auto-cols-[28%] grid-flow-col grid-rows-2 gap-x-2 gap-y-3 overflow-x-auto px-4 sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-5 sm:grid-rows-none sm:overflow-visible sm:px-0 lg:grid-cols-10">
        {categories.map((c) => (
          <CategoryTile key={c.slug} slug={c.slug} />
        ))}
      </div>
    </section>
  );
}
