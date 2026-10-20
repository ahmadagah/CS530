"use client";

import Link from "next/link";
import { ProductImage } from "@/components/shared/product-image";
import { Price } from "@/components/shared/price";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";
import { discountPercent, LOW_STOCK_THRESHOLD } from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AddToCartControl } from "./add-to-cart-control";

export function ProductCard({ product, priority, className }: { product: CatalogProduct; priority?: boolean; className?: string }) {
  const { t, productName, packSize } = useI18n();
  const discount = discountPercent(product);
  const name = productName(product);
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card p-2 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-card-hover sm:p-2.5",
        className,
      )}
    >
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block overflow-hidden rounded-xl" tabIndex={-1} aria-hidden>
          <ProductImage
            product={product}
            priority={priority}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className={cn(!product.inStock && "opacity-60 grayscale-[35%]")}
          />
        </Link>

        <div className="pointer-events-none absolute start-2 top-2 flex flex-col items-start gap-1">
          {product.onSale && <Badge variant="deal">{t("product.off", { percent: discount })}</Badge>}
          {product.origin === "local" && !product.onSale && (
            <Badge variant="soft" className="bg-white/90 backdrop-blur">
              {t("product.localBadge")}
            </Badge>
          )}
        </div>

        {!product.inStock && (
          <div className="pointer-events-none absolute inset-x-2 bottom-2 flex justify-center">
            <Badge variant="muted" className="bg-white/95 px-3 py-1 text-foreground shadow-sm">
              {t("product.outOfStock")}
            </Badge>
          </div>
        )}

        <div className="absolute end-2 bottom-2 z-10">
          <AddToCartControl product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-2.5 pb-1">
        <Price product={product} />
        <Link
          href={`/product/${product.id}`}
          className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-5 font-medium text-foreground/90 after:absolute after:inset-0 after:content-[''] hover:text-primary"
        >
          {name}
        </Link>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted-foreground">{packSize(product.size)}</span>
          <Rating rating={product.rating} />
        </div>
        {lowStock && (
          <p className="mt-1.5 text-xs font-semibold text-deal">{t("product.lowStock", { count: product.stock })}</p>
        )}
      </div>
    </article>
  );
}
