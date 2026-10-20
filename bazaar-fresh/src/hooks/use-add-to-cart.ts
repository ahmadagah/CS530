"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/provider";
import type { CatalogProduct } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";

/** Adds a product to the cart with stock limits, badge animation and a toast on first add. */
export function useAddToCart() {
  const { t, productName } = useI18n();

  return useCallback(
    (product: CatalogProduct, quantity = 1) => {
      if (!product.inStock) return;
      const { lines, add } = useCartStore.getState();
      const current = lines.find((l) => l.productId === product.id)?.quantity ?? 0;
      if (current >= product.stock) {
        toast.warning(t("product.maxReached", { count: product.stock }), { id: `max-${product.id}` });
        return;
      }
      add(product.id, quantity, product.stock);
      const ui = useUIStore.getState();
      ui.pulseCart();
      if (current === 0) {
        toast.success(t("product.added"), {
          id: "add-to-cart",
          description: productName(product),
          action: { label: t("product.viewCart"), onClick: () => ui.setCartOpen(true) },
        });
      }
    },
    [t, productName],
  );
}
