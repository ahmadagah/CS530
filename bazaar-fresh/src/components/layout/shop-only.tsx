"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the shop's header, footer, tab bar and cart on the owner questions pages. */
export function ShopOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/questions")) return null;
  return <>{children}</>;
}
