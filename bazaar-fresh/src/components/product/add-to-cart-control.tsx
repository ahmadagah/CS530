"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useCartQuantity } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { QuantityStepper } from "./quantity-stepper";

/** "Add" button that turns into a quantity stepper once the product is in the cart. */
export function AddToCartControl({
  product,
  variant = "card",
  className,
}: {
  product: CatalogProduct;
  variant?: "card" | "page";
  className?: string;
}) {
  const { t } = useI18n();
  const quantity = useCartQuantity(product.id);
  const addToCart = useAddToCart();
  const setQuantity = useCartStore((s) => s.setQuantity);

  if (!product.inStock) {
    if (variant === "card") return null;
    return (
      <Button size="lg" disabled variant="outline" className={cn("w-full", className)}>
        {t("product.outOfStock")}
      </Button>
    );
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        quantity={quantity}
        max={product.stock}
        size={variant === "page" ? "lg" : "sm"}
        onIncrement={() => addToCart(product)}
        onDecrement={() => setQuantity(product.id, quantity - 1)}
        className={cn(variant === "page" && "w-full sm:w-44", className)}
      />
    );
  }

  if (variant === "page") {
    return (
      <Button size="lg" onClick={() => addToCart(product)} className={cn("w-full sm:w-auto sm:min-w-52", className)}>
        <Plus className="size-5" />
        {t("product.addToCart")}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => addToCart(product)}
      aria-label={`${t("product.addToCart")}: ${product.name}`}
      className={cn("h-9 gap-1 ps-2.5 pe-3.5 shadow-md", className)}
    >
      <Plus className="size-4" strokeWidth={2.75} />
      {t("product.add")}
    </Button>
  );
}
