import type { CouponCode, DeliverySlotId, PaymentMethod, StoreId } from "@/config/site";
import type { Product, Unit } from "@/data/products";

export const ORDER_STATUSES = ["received", "packing", "out_for_delivery", "delivered"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Delivery instructions the customer can tick in the cart (labels under `instructions`). */
export const DELIVERY_INSTRUCTIONS = ["noCall", "noBell", "leaveAtDoor", "leaveWithGuard"] as const;
export type DeliveryInstruction = (typeof DELIVERY_INSTRUCTIONS)[number];

export interface Address {
  id: string;
  label: string;
  line: string;
  area: string;
  city: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  emoji: string;
  unit: Unit;
  size: string;
  /** Price per unit at the time the order was placed. */
  price: number;
  quantity: number;
}

/** Everything the customer pays, as shown in "Bill details". */
export interface Bill {
  /** Sum of item prices the customer pays. */
  subtotal: number;
  /** Sum of regular (MRP) prices, before product discounts. */
  mrpTotal: number;
  deliveryFee: number;
  handlingFee: number;
  smallCartFee: number;
  couponDiscount: number;
  tip: number;
  total: number;
}

export interface Order extends Bill {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  /** Set when the order is a gift / for someone else. */
  receiver?: { name: string; phone: string };
  storeId: StoreId;
  address: Omit<Address, "id">;
  slotId: DeliverySlotId;
  paymentMethod: PaymentMethod;
  couponCode?: CouponCode;
  instructions: DeliveryInstruction[];
  notes?: string;
  items: OrderItem[];
  status: OrderStatus;
  statusHistory: { status: OrderStatus; at: string }[];
  /** Customer rating (1–5) left after delivery. */
  rating?: number;
  /** Demo only: when true the order moves through the statuses on its own. */
  autoProgress: boolean;
}

/** A seed product merged with any edits made in /admin. */
export interface CatalogProduct extends Product {
  inStock: boolean;
  /** The price the customer pays right now (sale price if on sale). */
  finalPrice: number;
  onSale: boolean;
}
