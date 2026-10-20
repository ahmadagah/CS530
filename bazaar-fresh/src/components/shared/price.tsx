"use client";

import { useI18n } from "@/i18n/provider";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { price: "text-[15px]", old: "text-xs", unit: "text-[11px]" },
  md: { price: "text-lg", old: "text-sm", unit: "text-xs" },
  lg: { price: "text-3xl", old: "text-lg", unit: "text-sm" },
};

export function Price({
  product,
  size = "sm",
  showUnit = true,
  className,
}: {
  product: Pick<CatalogProduct, "price" | "finalPrice" | "onSale" | "unit">;
  size?: keyof typeof sizes;
  showUnit?: boolean;
  className?: string;
}) {
  const { price, t } = useI18n();
  const s = sizes[size];
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5", className)}>
      <span className={cn("font-extrabold tracking-tight tabular-nums", s.price, product.onSale && "text-deal")}>
        {price(product.finalPrice)}
      </span>
      {product.onSale && (
        <span className={cn("text-muted-foreground tabular-nums line-through", s.old)}>{price(product.price)}</span>
      )}
      {showUnit && <span className={cn("text-muted-foreground", s.unit)}>{t(`product.per.${product.unit}`)}</span>}
    </div>
  );
}
