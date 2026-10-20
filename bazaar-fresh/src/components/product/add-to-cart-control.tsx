"use client";

import { Bell, BellRing, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { products as seedProducts } from "@/data/products";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useCartQuantity } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";
import { QuantityStepper } from "./quantity-stepper";

function variantCount(group?: string): number {
  return group ? seedProducts.filter((p) => p.variantGroup === group).length : 1;
}

/** "Notify me" toggle for sold-out products. */
export function NotifyButton({ product, size = "sm", className }: { product: CatalogProduct; size?: "sm" | "lg"; className?: string }) {
  const { t, productName } = useI18n();
  const on = useUserStore((s) => s.notifyMe.includes(product.id));
  return (
    <Button
      variant="outline"
      size={size === "lg" ? "lg" : "sm"}
      onClick={() => {
        const nowOn = useUserStore.getState().toggleNotify(product.id);
        toast(nowOn ? t("product.notifyOn", { name: productName(product) }) : t("product.notifyOff"), {
          id: `notify-${product.id}`,
        });
      }}
      className={cn(
        size === "sm" && "h-9 rounded-lg px-2.5 text-xs",
        on && "border-primary/40 bg-primary-soft text-primary hover:bg-primary-soft",
        className,
      )}
    >
      {on ? <BellRing /> : <Bell />}
      {on ? t("product.notifying") : t("product.notifyMe")}
    </Button>
  );
}

/**
 * Blinkit-style "ADD" button that turns into a quantity stepper. Products with
 * several sizes open the size picker instead (unless `single` is set).
 */
export function AddToCartControl({
  product,
  variant = "card",
  single,
  compact,
  className,
}: {
  product: CatalogProduct;
  variant?: "card" | "page";
  /** Smaller ADD button for tight spaces such as the cart's add-on row. */
  compact?: boolean;
  /** Add this exact product even if it has other sizes (used inside the size picker). */
  single?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  const quantity = useCartQuantity(product.id);
  const addToCart = useAddToCart();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const openVariants = useUIStore((s) => s.setVariantGroup);
  const options = single ? 1 : variantCount(product.variantGroup);

  if (!product.inStock) {
    return <NotifyButton product={product} size={variant === "page" ? "lg" : "sm"} className={cn(variant === "page" && "w-full sm:w-auto", className)} />;
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        quantity={quantity}
        max={product.stock}
        size={variant === "page" ? "lg" : "xs"}
        onIncrement={() => addToCart(product)}
        onDecrement={() => setQuantity(product.id, quantity - 1)}
        className={cn(variant === "page" ? "w-full sm:w-44" : compact ? "h-8 w-[72px]" : "w-[72px] sm:w-[80px]", className)}
      />
    );
  }

  const add = () => (options > 1 ? openVariants(product.variantGroup) : addToCart(product));

  if (variant === "page") {
    return (
      <Button size="lg" onClick={add} className={cn("w-full sm:w-auto sm:min-w-52", className)}>
        <Plus className="size-5" />
        {t("product.addToCart")}
      </Button>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={add}
        aria-label={`${t("product.addToCart")}: ${product.name}`}
        className={cn(
          "rounded-lg border border-primary bg-primary-soft/50 font-extrabold tracking-wide text-primary uppercase shadow-xs transition hover:bg-primary hover:text-primary-foreground active:scale-95",
          compact ? "h-8 w-16 text-xs" : "h-9 w-[72px] text-[13px] sm:w-[80px]",
        )}
      >
        {t("product.add")}
      </button>
      {options > 1 && (
        <span className="mt-0.5 text-[10px] font-semibold text-muted-foreground">{t("product.options", { count: options })}</span>
      )}
    </div>
  );
}
