"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart";
import { useCatalogStore } from "@/store/catalog";
import { useOrderStore } from "@/store/orders";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

const persistedStores = [useCartStore, useCatalogStore, useOrderStore, useUserStore];

/**
 * Loads the cart, orders, profile and admin edits from localStorage after the
 * first render (so server and client HTML match), keeps open tabs in sync,
 * and runs the demo order-status progression.
 */
export function StoreHydration() {
  const hydrated = useUIStore((s) => s.hydrated);

  useEffect(() => {
    Promise.all(persistedStores.map((store) => store.persist.rehydrate())).then(() =>
      useUIStore.getState().setHydrated(),
    );

    const onStorage = (event: StorageEvent) => {
      const store = persistedStores.find((s) => s.persist.getOptions().name === event.key);
      store?.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const stepMs = siteConfig.demo.orderStepSeconds * 1000;
    const timer = window.setInterval(() => {
      const { orders, advance } = useOrderStore.getState();
      const now = Date.now();
      for (const order of orders) {
        if (!order.autoProgress || order.status === "delivered") continue;
        const last = order.statusHistory[order.statusHistory.length - 1];
        if (now - Date.parse(last.at) >= stepMs) advance(order.id);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hydrated]);

  return null;
}
