"use client";

import { toast } from "sonner";
import { useI18n } from "@/i18n/provider";
import type { Order } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useCatalog } from "./use-catalog";

/** Adds every in-stock item from a past order back into the cart. */
export function useReorder() {
  const { t } = useI18n();
  const catalog = useCatalog();
  return (order: Order) => {
    const add = useCartStore.getState().add;
    for (const item of order.items) {
      const product = catalog.find((p) => p.id === item.productId);
      if (product?.inStock) add(product.id, item.quantity, product.stock);
    }
    useUIStore.getState().pulseCart();
    toast.success(t("order.reordered"), {
      action: { label: t("product.viewCart"), onClick: () => useUIStore.getState().setCartOpen(true) },
    });
  };
}
