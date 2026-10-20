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

interface UserState {
  profile: Profile;
  addresses: Address[];
  storeId: StoreId;
  updateProfile: (patch: Partial<Profile>) => void;
  addAddress: (address: Omit<Address, "id">) => Address;
  removeAddress: (id: string) => void;
  setStore: (id: StoreId) => void;
  reset: () => void;
}

const initial = {
  profile: { name: demoUser.name, phone: demoUser.phone, email: demoUser.email },
  addresses: demoAddresses,
  storeId: siteConfig.stores[0].id as StoreId,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initial,
      updateProfile: (patch) => set((state) => ({ profile: { ...state.profile, ...patch } })),
      addAddress: (address) => {
        const created = { ...address, id: `addr-${Date.now().toString(36)}` };
        set((state) => ({ addresses: [...state.addresses, created] }));
        return created;
      },
      removeAddress: (id) => set((state) => ({ addresses: state.addresses.filter((a) => a.id !== id) })),
      setStore: (storeId) => set({ storeId }),
      reset: () => set(initial),
    }),
    {
      name: "bf-user",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
