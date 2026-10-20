import { siteConfig } from "@/config/site";

export interface Totals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** AFN still needed to reach free delivery (0 once reached). */
  freeDeliveryRemaining: number;
  /** 0–100, how close the cart is to free delivery. */
  freeDeliveryProgress: number;
}

export function calculateTotals(subtotal: number): Totals {
  const { freeThreshold, fee } = siteConfig.delivery;
  const deliveryFee = subtotal === 0 || subtotal >= freeThreshold ? 0 : fee;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    freeDeliveryRemaining: Math.max(0, freeThreshold - subtotal),
    freeDeliveryProgress: Math.min(100, Math.round((subtotal / freeThreshold) * 100)),
  };
}
