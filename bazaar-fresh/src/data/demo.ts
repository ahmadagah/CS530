/**
 * The fake signed-in customer and their order history, used to show the
 * account page and "Order again" without a real login.
 */

import { siteConfig } from "@/config/site";
import type { Address, Order, OrderItem } from "@/lib/types";
import { products } from "./products";

export const demoUser = {
  name: "Farid Ahmadi",
  phone: "+93 70 123 4567",
  email: "farid.ahmadi@example.com",
  memberSince: "2025-03-14",
};

export const demoAddresses: Address[] = [
  {
    id: "addr-home",
    label: "Home",
    line: "House 27, Street 3, near Shahr-e-Naw Park",
    area: "Shahr-e-Naw",
    city: "Kabul",
  },
  {
    id: "addr-office",
    label: "Office",
    line: "2nd floor, Ansari Plaza, Ansari Square",
    area: "Shahr-e-Naw",
    city: "Kabul",
  },
];

function line(productId: string, quantity: number): OrderItem {
  const p = products.find((x) => x.id === productId);
  if (!p) throw new Error(`Unknown product in demo order: ${productId}`);
  return {
    productId: p.id,
    name: p.name,
    image: p.image,
    emoji: p.emoji,
    unit: p.unit,
    size: p.size,
    price: p.salePrice ?? p.price,
    quantity,
  };
}

function pastOrder(
  id: string,
  createdAt: string,
  items: OrderItem[],
  extra: Pick<Order, "slotId" | "paymentMethod" | "storeId">,
): Order {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal >= siteConfig.delivery.freeThreshold ? 0 : siteConfig.delivery.fee;
  const t = new Date(createdAt).getTime();
  const at = (minutes: number) => new Date(t + minutes * 60_000).toISOString();
  return {
    id,
    createdAt,
    customerName: demoUser.name,
    phone: demoUser.phone,
    address: demoAddresses[0],
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: "delivered",
    statusHistory: [
      { status: "received", at: at(0) },
      { status: "packing", at: at(12) },
      { status: "out_for_delivery", at: at(41) },
      { status: "delivered", at: at(95) },
    ],
    autoProgress: false,
    ...extra,
  };
}

export const demoOrders: Order[] = [
  pastOrder(
    "BF-418207",
    "2026-10-14T09:20:00.000Z",
    [
      line("basmati-rice-5kg", 1),
      line("sunflower-oil-5l", 1),
      line("alokozay-green-tea", 2),
      line("red-onions", 3),
      line("tomatoes", 2),
      line("afghan-naan", 6),
    ],
    { slotId: "today-14", paymentMethod: "cod", storeId: "kabul-shahr-e-naw" },
  ),
  pastOrder(
    "BF-406551",
    "2026-10-03T13:05:00.000Z",
    [
      line("whole-chicken", 2),
      line("mast-yogurt", 2),
      line("farm-eggs-30", 1),
      line("kandahar-pomegranates", 2),
      line("mineral-water-6", 1),
    ],
    { slotId: "today-16", paymentMethod: "hesabpay", storeId: "kabul-shahr-e-naw" },
  ),
  pastOrder(
    "BF-391374",
    "2026-09-21T16:40:00.000Z",
    [
      line("pampers-size-4", 1),
      line("huggies-wipes", 2),
      line("ariel-powder", 1),
      line("sooper-biscuits", 3),
      line("green-raisins", 1),
    ],
    { slotId: "tomorrow-09", paymentMethod: "cod", storeId: "kabul-karte-char" },
  ),
];
