"use client";

import { Timer } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/shared/product-image";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { discountPercent, LOW_STOCK_THRESHOLD } from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AddToCartControl } from "./add-to-cart-control";

/** Small "⏱ 20 MINS" delivery-time tag. */
export function EtaPill({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-foreground/80 uppercase",
        className,
      )}
    >
      <Timer className="size-3" strokeWidth={2.5} />
      {t("product.mins", { minutes: siteConfig.delivery.etaMinutes })}
    </span>
  );
}

export function ProductCard({ product, priority, className }: { product: CatalogProduct; priority?: boolean; className?: string }) {
  const { t, productName, packSize, price } = useI18n();
  const discount = discountPercent(product);
  const name = productName(product);
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border/80 bg-card p-2.5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-card-hover",
        className,
      )}
    >
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden rounded-xl" tabIndex={-1} aria-hidden>
        <ProductImage
          product={product}
          priority={priority}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
          className={cn(!product.inStock && "opacity-50 grayscale")}
        />
        {product.onSale && (
          <span className="absolute start-2 top-0 rounded-b-lg bg-deal px-1.5 pt-1 pb-1.5 text-center text-[10px] leading-none font-extrabold text-deal-foreground shadow-sm">
            {t("product.off", { percent: discount }).toUpperCase()}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-2 mx-auto w-fit rounded-md bg-foreground/80 px-2 py-1 text-[11px] font-bold text-white">
            {t("product.outOfStock")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-2.5">
        <div className="flex flex-wrap items-center gap-1">
          <EtaPill />
          {product.origin === "local" && (
            <span className="rounded-md bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold text-primary">{t("product.localBadge")}</span>
          )}
        </div>
        <Link
          href={`/product/${product.id}`}
          className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-[13px] leading-5 font-semibold text-foreground after:absolute after:inset-0 after:content-[''] hover:text-primary sm:text-sm"
        >
          {name}
        </Link>
        <p className="truncate text-xs text-muted-foreground">{packSize(product.size)}</p>
        {lowStock && <p className="mt-0.5 text-[11px] font-semibold text-deal">{t("product.lowStock", { count: product.stock })}</p>}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1.5 pt-2.5">
          <div className="min-w-0 leading-tight">
            <p className="text-[13px] font-extrabold tabular-nums sm:text-sm">{price(product.finalPrice)}</p>
            {product.onSale && <p className="text-[11px] text-muted-foreground tabular-nums line-through">{price(product.price)}</p>}
          </div>
          <AddToCartControl product={product} className="relative z-10 shrink-0" />
        </div>
      </div>
    </article>
  );
}
