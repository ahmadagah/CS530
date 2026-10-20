"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AddToCartControl } from "@/components/product/add-to-cart-control";
import { ProductImage } from "@/components/shared/product-image";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { collapseVariants } from "@/lib/catalog";
import { useCartStore } from "@/store/cart";

/** "Before you checkout" row of small add-on cards (popular items not yet in the cart). */
export function CartSuggestions({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const { t, price, productName, packSize } = useI18n();
  const catalog = useCatalog();
  const lines = useCartStore((s) => s.lines);
  const items = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.productId));
    return collapseVariants(catalog.filter((p) => p.popular && p.inStock && !inCart.has(p.id))).slice(0, 10);
  }, [catalog, lines]);

  if (items.length === 0) return null;
  return (
    <section className={className}>
      <h3 className="mb-3 text-sm font-bold">{t("cart.beforeCheckout")}</h3>
      <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {items.map((p) => (
          <li key={p.id} className="flex w-32 shrink-0 flex-col rounded-2xl border bg-card p-2">
            <Link href={`/product/${p.id}`} onClick={onNavigate} className="block overflow-hidden rounded-xl">
              <ProductImage product={p} sizes="128px" />
            </Link>
            <p className="mt-1.5 line-clamp-2 min-h-8 text-xs leading-4 font-semibold">{productName(p)}</p>
            <p className="text-[11px] text-muted-foreground">{packSize(p.size)}</p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-1 pt-1.5">
              <span className="text-xs font-extrabold tabular-nums">{price(p.finalPrice)}</span>
              <AddToCartControl product={p} compact />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
