import { siteConfig, type Coupon, type CouponCode } from "@/config/site";
import type { Bill } from "./types";

export type CouponCheck =
  | { ok: true; discount: number; freeDelivery: boolean }
  | { ok: false; shortBy: number };

export function findCoupon(code: string | undefined): Coupon | undefined {
  return siteConfig.coupons.find((c) => c.code === code?.trim().toUpperCase());
}

/** Whether a coupon applies to this subtotal, and how much it takes off. */
export function checkCoupon(coupon: Coupon, subtotal: number): CouponCheck {
  if (subtotal < coupon.minOrder) return { ok: false, shortBy: coupon.minOrder - subtotal };
  switch (coupon.type) {
    case "flat":
      return { ok: true, discount: Math.min(coupon.value, subtotal), freeDelivery: false };
    case "percent":
      return {
        ok: true,
        discount: Math.min(Math.round((subtotal * coupon.value) / 100), coupon.maxDiscount),
        freeDelivery: false,
      };
    case "delivery":
      return { ok: true, discount: 0, freeDelivery: true };
  }
}

export interface BillDetails extends Bill {
  /** AFN saved on product discounts, coupons and waived fees. */
  savings: number;
  /** AFN still needed to reach free delivery (0 once reached). */
  freeDeliveryRemaining: number;
  /** 0–100, how close the cart is to free delivery. */
  freeDeliveryProgress: number;
  /** The coupon only when it currently applies. */
  appliedCoupon?: CouponCode;
}

export function calculateBill(
  subtotal: number,
  mrpTotal: number,
  options: { couponCode?: string; tip?: number } = {},
): BillDetails {
  const { freeThreshold, fee, handlingFee, smallCartThreshold, smallCartFee } = siteConfig.delivery;
  const empty = subtotal === 0;
  const coupon = findCoupon(options.couponCode);
  const check = coupon && !empty ? checkCoupon(coupon, subtotal) : undefined;
  const couponOk = check?.ok ? check : undefined;

  const reachedFree = subtotal >= freeThreshold;
  const deliveryFee = empty || reachedFree || couponOk?.freeDelivery ? 0 : fee;
  const handling = empty ? 0 : handlingFee;
  const smallCart = !empty && subtotal < smallCartThreshold ? smallCartFee : 0;
  const couponDiscount = couponOk?.discount ?? 0;
  const tip = empty ? 0 : (options.tip ?? 0);
  const waivedDelivery = !empty && !reachedFree && couponOk?.freeDelivery ? fee : 0;

  return {
    subtotal,
    mrpTotal,
    deliveryFee,
    handlingFee: handling,
    smallCartFee: smallCart,
    couponDiscount,
    tip,
    total: subtotal + deliveryFee + handling + smallCart - couponDiscount + tip,
    savings: mrpTotal - subtotal + couponDiscount + waivedDelivery,
    freeDeliveryRemaining: Math.max(0, freeThreshold - subtotal),
    freeDeliveryProgress: Math.min(100, Math.round((subtotal / freeThreshold) * 100)),
    appliedCoupon: couponOk && coupon ? coupon.code : undefined,
  };
}

/** The stored part of a bill (what gets saved on an order). */
export function toBill(details: BillDetails): Bill {
  const { subtotal, mrpTotal, deliveryFee, handlingFee, smallCartFee, couponDiscount, tip, total } = details;
  return { subtotal, mrpTotal, deliveryFee, handlingFee, smallCartFee, couponDiscount, tip, total };
}
