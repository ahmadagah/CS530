import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DeliveryInstruction } from "@/lib/types";

export interface CartLine {
  productId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  /** Coupon code the customer applied (checked against the subtotal when the bill is built). */
  couponCode?: string;
  /** Tip for the delivery partner in AFN. */
  tip: number;
  instructions: DeliveryInstruction[];
  /** Adds `quantity` of a product, capped at `max` (the available stock). */
  add: (productId: string, quantity?: number, max?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  restore: (line: CartLine, index: number) => void;
  setCoupon: (code?: string) => void;
  setTip: (tip: number) => void;
  toggleInstruction: (instruction: DeliveryInstruction) => void;
  /** Empties the cart after an order; coupon, tip and instructions are cleared too. */
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      couponCode: undefined,
      tip: 0,
      instructions: [],
      add: (productId, quantity = 1, max = Infinity) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === productId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId ? { ...l, quantity: Math.min(max, l.quantity + quantity) } : l,
              ),
            };
          }
          return { lines: [...state.lines, { productId, quantity: Math.min(max, quantity) }] };
        }),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
        })),
      remove: (productId) => set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      restore: (line, index) =>
        set((state) => {
          if (state.lines.some((l) => l.productId === line.productId)) return state;
          const lines = [...state.lines];
          lines.splice(Math.min(index, lines.length), 0, line);
          return { lines };
        }),
      setCoupon: (couponCode) => set({ couponCode }),
      setTip: (tip) => set({ tip: Math.max(0, Math.round(tip)) }),
      toggleInstruction: (instruction) =>
        set((state) => ({
          instructions: state.instructions.includes(instruction)
            ? state.instructions.filter((i) => i !== instruction)
            : [...state.instructions, instruction],
        })),
      clear: () => set({ lines: [], couponCode: undefined, tip: 0, instructions: [] }),
    }),
    {
      name: "bf-cart",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      migrate: (persisted) => ({ tip: 0, instructions: [], ...(persisted as object) }) as unknown as CartState,
    },
  ),
);
