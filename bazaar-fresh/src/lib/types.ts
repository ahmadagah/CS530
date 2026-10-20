import type { DeliverySlotId, PaymentMethod, StoreId } from "@/config/site";
import type { Product, Unit } from "@/data/products";

export const ORDER_STATUSES = ["received", "packing", "out_for_delivery", "delivered"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

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
  image: string;
  emoji: string;
  unit: Unit;
  size: string;
  /** Price per unit at the time the order was placed. */
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  storeId: StoreId;
  address: Omit<Address, "id">;
  slotId: DeliverySlotId;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; at: string }[];
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
