"use client";

import { ChevronRight, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { useUIStore } from "@/store/ui";

const HIDDEN_ON = ["/cart", "/checkout", "/admin", "/orders"];

/** Blinkit's green "N items · ؋X · View cart" bar that floats above the mobile tab bar. */
export function FloatingCartBar() {
  const { t, price } = useI18n();
  const pathname = usePathname();
  const { count, subtotal } = useCart();
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const pulse = useUIStore((s) => s.cartPulse);
  const hydrated = useUIStore((s) => s.hydrated);

  if (
    !hydrated ||
    count === 0 ||
    HIDDEN_ON.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/product/")
  )
    return null;

  return (
    <>
      {/* Keeps the end of the page clear of the floating bar. */}
      <div aria-hidden className="h-20 md:hidden" />
      <div className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 md:hidden">
        <button
          key={pulse}
          type="button"
          onClick={() => setCartOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl bg-primary px-3.5 py-2.5 text-start text-primary-foreground shadow-xl shadow-primary/30 animate-fade-up active:scale-[0.98]"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <ShoppingBasket className="size-5" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-xs font-semibold text-white/85">
              {t("cart.itemCount", { count })}
            </span>
            <span className="block text-base font-extrabold tabular-nums">
              {price(subtotal)}
            </span>
          </span>
          <span className="flex items-center gap-1 text-sm font-bold">
            {t("product.viewCart")}
            <ChevronRight className="size-4 rtl:-scale-x-100" />
          </span>
        </button>
      </div>
    </>
  );
}
