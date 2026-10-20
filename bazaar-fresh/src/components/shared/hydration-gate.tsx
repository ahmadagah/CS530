"use client";

import type { ReactNode } from "react";
import { useHydrated } from "@/store/ui";

/** Renders `fallback` (usually a skeleton) until the cart, orders and profile have loaded from this browser. */
export function HydrationGate({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  return useHydrated() ? <>{children}</> : <>{fallback}</>;
}
