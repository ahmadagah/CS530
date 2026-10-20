"use client";

import Link from "next/link";
import { toast } from "sonner";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { ProductImage } from "@/components/shared/product-image";
import type { CartItem } from "@/hooks/use-cart";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export function CartLineItem({
  item,
  unavailable,
  onNavigate,
  size = "sm",
}: {
  item: CartItem;
  unavailable?: boolean;
  onNavigate?: () => void;
  size?: "sm" | "lg";
}) {
  const { t, price, packSize, productName } = useI18n();
  const addToCart = useAddToCart();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const { product, quantity } = item;

  const remove = () => {
    const { lines, remove: removeLine, restore } = useCartStore.getState();
    const index = lines.findIndex((l) => l.productId === product.id);
    const line = lines[index];
    removeLine(product.id);
    if (!line) return;
    toast(t("cart.removed", { name: productName(product) }), {
      id: `removed-${product.id}`,
      action: { label: t("cart.undo"), onClick: () => restore(line, index) },
    });
  };

  return (
    <li className={cn("flex gap-3 py-3.5", unavailable && "opacity-60")}>
      <Link
        href={`/product/${product.id}`}
        onClick={onNavigate}
        className={cn("shrink-0 overflow-hidden rounded-xl border", size === "lg" ? "size-24" : "size-[72px]")}
      >
        <ProductImage product={product} sizes="96px" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.id}`}
              onClick={onNavigate}
              className={cn("line-clamp-2 leading-snug font-medium hover:text-primary", size === "lg" ? "text-base" : "text-sm")}
            >
              {productName(product)}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {packSize(product.size)} · {price(product.finalPrice)} {t(`product.per.${product.unit}`)}
            </p>
          </div>
          {!unavailable && (
            <div className="shrink-0 text-end">
              <p className="text-sm font-bold tabular-nums">{price(item.lineTotal)}</p>
              {product.onSale && (
                <p className="text-xs text-muted-foreground tabular-nums line-through">
                  {price(product.price * quantity)}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {unavailable ? (
            <span className="text-xs font-semibold text-destructive">{t("cart.unavailable")}</span>
          ) : (
            <QuantityStepper
              size="sm"
              quantity={quantity}
              max={product.stock}
              onIncrement={() => addToCart(product)}
              onDecrement={() => (quantity === 1 ? remove() : setQuantity(product.id, quantity - 1))}
              className="shadow-none animate-none"
            />
          )}
          <button
            type="button"
            onClick={remove}
            className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
          >
            {t("cart.remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
