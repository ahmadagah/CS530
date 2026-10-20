import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { siteConfig } from "@/config/site";
import { demoOrders } from "@/data/demo";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/lib/types";

export type NewOrder = Omit<Order, "id" | "createdAt" | "status" | "statusHistory" | "autoProgress">;

interface OrdersState {
  orders: Order[];
  placeOrder: (input: NewOrder) => Order;
  /** Sets a status from the admin panel. Manual changes stop the demo auto-progress. */
  setStatus: (id: string, status: OrderStatus) => void;
  /** Moves an order one step along the timeline. */
  advance: (id: string) => void;
  reset: () => void;
}

function nextOrderId(existing: Order[]): string {
  let id: string;
  do {
    id = `${siteConfig.orderPrefix}-${Math.floor(100000 + Math.random() * 900000)}`;
  } while (existing.some((o) => o.id === id));
  return id;
}

function withStatus(order: Order, status: OrderStatus): Order {
  const now = new Date().toISOString();
  const targetIndex = ORDER_STATUSES.indexOf(status);
  // Keep history for steps up to the new status, and fill in any skipped steps.
  const history = ORDER_STATUSES.slice(0, targetIndex + 1).map(
    (s) => order.statusHistory.find((h) => h.status === s) ?? { status: s, at: now },
  );
  return { ...order, status, statusHistory: history };
}

export const useOrderStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: demoOrders,
      placeOrder: (input) => {
        const now = new Date().toISOString();
        const order: Order = {
          ...input,
          id: nextOrderId(get().orders),
          createdAt: now,
          status: "received",
          statusHistory: [{ status: "received", at: now }],
          autoProgress: true,
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...withStatus(o, status), autoProgress: false } : o)),
        })),
      advance: (id) =>
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== id) return o;
            const next = ORDER_STATUSES[ORDER_STATUSES.indexOf(o.status) + 1];
            return next ? withStatus(o, next) : o;
          }),
        })),
      reset: () => set({ orders: demoOrders }),
    }),
    {
      name: "bf-orders",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
