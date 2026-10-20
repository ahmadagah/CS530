import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  /** Increments on every add-to-cart; the header badge uses it to replay its bounce. */
  cartPulse: number;
  pulseCart: () => void;
  loginOpen: boolean;
  /** Page to open once the customer has logged in (e.g. /checkout). */
  loginRedirect?: string;
  openLogin: (redirect?: string) => void;
  closeLogin: () => void;
  locationOpen: boolean;
  setLocationOpen: (open: boolean) => void;
  /** Variant group whose "N options" picker is open. */
  variantGroup?: string;
  setVariantGroup: (group?: string) => void;
  /** True once the persisted stores have loaded from localStorage. */
  hydrated: boolean;
  setHydrated: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  cartPulse: 0,
  pulseCart: () => set((s) => ({ cartPulse: s.cartPulse + 1 })),
  loginOpen: false,
  loginRedirect: undefined,
  openLogin: (loginRedirect) => set({ loginOpen: true, loginRedirect, cartOpen: false }),
  closeLogin: () => set({ loginOpen: false, loginRedirect: undefined }),
  locationOpen: false,
  setLocationOpen: (locationOpen) => set({ locationOpen }),
  variantGroup: undefined,
  setVariantGroup: (variantGroup) => set({ variantGroup }),
  hydrated: false,
  setHydrated: () => set({ hydrated: true }),
}));

export const useHydrated = () => useUIStore((s) => s.hydrated);
