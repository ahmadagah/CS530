"use client";

import { useMemo } from "react";
import { calculateTotals, type Totals } from "@/lib/pricing";
import type { CatalogProduct } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useCatalog } from "./use-catalog";

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
  lineTotal: number;
}

export interface CartSummary extends Totals {
  /** Items that can be ordered right now. */
  items: CartItem[];
  /** Items whose product has since gone out of stock. */
  unavailable: CartItem[];
  count: number;
  savings: number;
}

export function useCart(): CartSummary {
  const lines = useCartStore((s) => s.lines);
  const catalog = useCatalog();

  return useMemo(() => {
    const items: CartItem[] = [];
    const unavailable: CartItem[] = [];
    for (const line of lines) {
      const product = catalog.find((p) => p.id === line.productId);
      if (!product) continue;
      if (!product.inStock) {
        unavailable.push({ product, quantity: line.quantity, lineTotal: 0 });
        continue;
      }
      // Stock may have dropped (e.g. edited in /admin) since the item was added.
      const quantity = Math.min(line.quantity, product.stock);
      items.push({ product, quantity, lineTotal: product.finalPrice * quantity });
    }
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const savings = items.reduce((sum, i) => sum + (i.product.price - i.product.finalPrice) * i.quantity, 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    return { items, unavailable, count, savings, ...calculateTotals(subtotal) };
  }, [lines, catalog]);
}

/** Quantity of one product currently in the cart. */
export function useCartQuantity(productId: string): number {
  return useCartStore((s) => s.lines.find((l) => l.productId === productId)?.quantity ?? 0);
}
