import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  /** Increments on every add-to-cart; the header badge uses it to replay its bounce. */
  cartPulse: number;
  pulseCart: () => void;
  /** True once the persisted stores have loaded from localStorage. */
  hydrated: boolean;
  setHydrated: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  cartPulse: 0,
  pulseCart: () => set((s) => ({ cartPulse: s.cartPulse + 1 })),
  hydrated: false,
  setHydrated: () => set({ hydrated: true }),
}));

export const useHydrated = () => useUIStore((s) => s.hydrated);
