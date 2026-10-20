"use client";

import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";

export function CartCountBadge({ count, className }: { count: number; className?: string }) {
  const { num } = useI18n();
  const pulse = useUIStore((s) => s.cartPulse);
  if (count === 0) return null;
  return (
    <span
      key={pulse}
      className={cn(
        "grid h-5 min-w-5 place-items-center rounded-full bg-deal px-1 text-[11px] leading-none font-bold text-deal-foreground ring-2 ring-white animate-pop",
        className,
      )}
    >
      {num(count > 99 ? 99 : count)}
    </span>
  );
}

export function CartButton({ className }: { className?: string }) {
  const { t, price } = useI18n();
  const { count, subtotal } = useCart();
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`${t("header.openCart")} (${t("cart.itemCount", { count })})`}
      className={cn(
        "relative inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary-hover active:scale-95",
        className,
      )}
    >
      <ShoppingBasket className="size-6" />
      {count > 0 ? (
        <span key={count} className="hidden flex-col items-start leading-tight sm:flex animate-in fade-in">
          <span className="text-xs font-semibold">{t("cart.itemCount", { count })}</span>
          <span className="tabular-nums">{price(subtotal)}</span>
        </span>
      ) : (
        <span className="hidden sm:inline">{t("nav.cart")}</span>
      )}
      <CartCountBadge count={count} className="absolute -end-1.5 -top-1.5 sm:hidden" />
    </button>
  );
}
