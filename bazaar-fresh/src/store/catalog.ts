import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductOverride } from "@/lib/catalog";

interface CatalogState {
  /** Admin edits keyed by product id. Seed data in src/data/products.ts is never modified. */
  overrides: Record<string, ProductOverride>;
  updateProduct: (id: string, patch: ProductOverride) => void;
  resetProduct: (id: string) => void;
  reset: () => void;
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      overrides: {},
      updateProduct: (id, patch) =>
        set((state) => ({ overrides: { ...state.overrides, [id]: { ...state.overrides[id], ...patch } } })),
      resetProduct: (id) =>
        set((state) => {
          const overrides = { ...state.overrides };
          delete overrides[id];
          return { overrides };
        }),
      reset: () => set({ overrides: {} }),
    }),
    {
      name: "bf-catalog",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
