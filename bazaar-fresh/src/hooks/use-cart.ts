"use client";

import { useMemo } from "react";
import { calculateBill, type BillDetails } from "@/lib/pricing";
import type { CatalogProduct } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useCatalog } from "./use-catalog";

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
  lineTotal: number;
}

export interface CartSummary extends BillDetails {
  /** Items that can be ordered right now. */
  items: CartItem[];
  /** Items whose product has since gone out of stock. */
  unavailable: CartItem[];
  count: number;
}

export function useCart(): CartSummary {
  const lines = useCartStore((s) => s.lines);
  const couponCode = useCartStore((s) => s.couponCode);
  const tip = useCartStore((s) => s.tip);
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
    const mrpTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    return { items, unavailable, count, ...calculateBill(subtotal, mrpTotal, { couponCode, tip }) };
  }, [lines, catalog, couponCode, tip]);
}

/** Quantity of one product currently in the cart. */
export function useCartQuantity(productId: string): number {
  return useCartStore((s) => s.lines.find((l) => l.productId === productId)?.quantity ?? 0);
}
