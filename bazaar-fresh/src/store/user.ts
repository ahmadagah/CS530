import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { siteConfig, type StoreId } from "@/config/site";
import { demoAddresses, demoUser } from "@/data/demo";
import type { Address } from "@/lib/types";

interface Profile {
  name: string;
  phone: string;
  email: string;
}

export interface WalletEntry {
  id: string;
  /** Positive for money in, negative for payments. */
  amount: number;
  kind: "welcome" | "topup" | "payment" | "referral";
  at: string;
  orderId?: string;
}

interface UserState {
  /** Demo login: any phone number and any 4-digit code work. */
  loggedIn: boolean;
  profile: Profile;
  addresses: Address[];
  /** Address shown in the header and pre-selected at checkout. */
  deliveryAddressId?: string;
  storeId: StoreId;
  walletBalance: number;
  walletHistory: WalletEntry[];
  /** Out-of-stock products the customer asked to be notified about. */
  notifyMe: string[];
  recentSearches: string[];
  login: (phone: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  addAddress: (address: Omit<Address, "id">) => Address;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setStore: (id: StoreId) => void;
  topUpWallet: (amount: number) => void;
  /** Takes `amount` from the wallet; returns false if the balance is too low. */
  payFromWallet: (amount: number, orderId: string) => boolean;
  /** Returns true when the product is now on the notify list. */
  toggleNotify: (productId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  reset: () => void;
}

const initial = {
  loggedIn: false,
  profile: { name: demoUser.name, phone: demoUser.phone, email: demoUser.email },
  addresses: demoAddresses,
  deliveryAddressId: demoAddresses[0]?.id,
  storeId: siteConfig.stores[0].id as StoreId,
  walletBalance: siteConfig.wallet.startingBalance,
  walletHistory: [
    {
      id: "w-welcome",
      amount: siteConfig.wallet.startingBalance,
      kind: "welcome",
      at: "2026-10-01T08:00:00.000Z",
    },
  ] as WalletEntry[],
  notifyMe: [] as string[],
  recentSearches: [] as string[],
};

const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Picks the store that serves an address's city. */
function storeForCity(city: string): StoreId | undefined {
  return siteConfig.stores.find((s) => s.city.toLowerCase() === city.trim().toLowerCase())?.id;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initial,
      login: (phone) => set((state) => ({ loggedIn: true, profile: { ...state.profile, phone } })),
      logout: () => set({ loggedIn: false }),
      updateProfile: (patch) => set((state) => ({ profile: { ...state.profile, ...patch } })),
      addAddress: (address) => {
        const created = { ...address, id: newId("addr") };
        set((state) => ({ addresses: [...state.addresses, created] }));
        return created;
      },
      removeAddress: (id) =>
        set((state) => {
          const addresses = state.addresses.filter((a) => a.id !== id);
          const deliveryAddressId = state.deliveryAddressId === id ? addresses[0]?.id : state.deliveryAddressId;
          return { addresses, deliveryAddressId };
        }),
      selectAddress: (id) =>
        set((state) => {
          const address = state.addresses.find((a) => a.id === id);
          return { deliveryAddressId: id, storeId: (address && storeForCity(address.city)) ?? state.storeId };
        }),
      setStore: (storeId) => set({ storeId }),
      topUpWallet: (amount) =>
        set((state) => ({
          walletBalance: state.walletBalance + amount,
          walletHistory: [{ id: newId("w"), amount, kind: "topup", at: new Date().toISOString() }, ...state.walletHistory],
        })),
      payFromWallet: (amount, orderId) => {
        if (get().walletBalance < amount) return false;
        set((state) => ({
          walletBalance: state.walletBalance - amount,
          walletHistory: [
            { id: newId("w"), amount: -amount, kind: "payment", at: new Date().toISOString(), orderId },
            ...state.walletHistory,
          ],
        }));
        return true;
      },
      toggleNotify: (productId) => {
        const on = !get().notifyMe.includes(productId);
        set((state) => ({
          notifyMe: on ? [...state.notifyMe, productId] : state.notifyMe.filter((id) => id !== productId),
        }));
        return on;
      },
      addRecentSearch: (query) =>
        set((state) => {
          const q = query.trim();
          if (!q) return state;
          return { recentSearches: [q, ...state.recentSearches.filter((s) => s.toLowerCase() !== q.toLowerCase())].slice(0, 6) };
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),
      reset: () => set(initial),
    }),
    {
      name: "bf-user",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      migrate: (persisted) => ({ ...initial, ...(persisted as object) }) as UserState,
    },
  ),
);
