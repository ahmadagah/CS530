"use client";

import { ChevronRight, ShoppingBasket, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";
import { BillDetails } from "./bill-details";
import { CancellationPolicy, DeliveryInstructions, TipSelector } from "./cart-extras";
import { CartLineItem } from "./cart-line-item";
import { CartSuggestions } from "./cart-suggestions";
import { CouponSection } from "./coupon-section";
import { FreeDeliveryProgress } from "./free-delivery-progress";

/** Big "؋ 1,240 TOTAL · Proceed ›" button; asks to log in first when signed out. */
export function ProceedButton({ total, onNavigate }: { total: number; onNavigate?: () => void }) {
  const { t, price } = useI18n();
  const loggedIn = useUserStore((s) => s.loggedIn);
  const openLogin = useUIStore((s) => s.openLogin);
  const content = (
    <>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-base font-extrabold tabular-nums">{price(total)}</span>
        <span className="text-[11px] font-semibold tracking-wide uppercase opacity-80">{t("cart.totalLabel")}</span>
      </span>
      <span className="flex items-center gap-1 text-base font-bold">
        {loggedIn ? t("cart.proceed") : t("auth.loginToProceed")}
        <ChevronRight className="size-5 rtl:-scale-x-100" />
      </span>
    </>
  );
  if (!loggedIn) {
    return (
      <Button size="lg" className="h-14 w-full justify-between rounded-2xl px-5" onClick={() => openLogin("/checkout")}>
        {content}
      </Button>
    );
  }
  return (
    <Button asChild size="lg" className="h-14 w-full justify-between rounded-2xl px-5">
      <Link href="/checkout" onClick={onNavigate}>
        {content}
      </Link>
    </Button>
  );
}

/** Delivery-time header for the list of items, as on Blinkit. */
export function ShipmentHeader({ count }: { count: number }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        <Timer className="size-6" />
      </span>
      <div>
        <p className="font-extrabold">{t("header.deliveryIn", { minutes: siteConfig.delivery.etaMinutes })}</p>
        <p className="text-xs text-muted-foreground">{t("cart.shipment", { count })}</p>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { t, dir } = useI18n();
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);
  const cart = useCart();
  const pathname = usePathname();
  const close = () => setOpen(false);

  // Close the drawer when navigating to another page.
  useEffect(() => setOpen(false), [pathname, setOpen]);

  const isEmpty = cart.items.length === 0 && cart.unavailable.length === 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={dir === "rtl" ? "left" : "right"} closeLabel={t("common.close")} className="gap-0 bg-surface sm:max-w-[440px]">
        <SheetHeader className="border-b bg-background">
          <SheetTitle>{t("cart.title")}</SheetTitle>
          <SheetDescription className="sr-only">{t("cart.itemCount", { count: cart.count })}</SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <EmptyState
            icon={ShoppingBasket}
            title={t("cart.empty")}
            description={t("cart.emptyHint", { minutes: siteConfig.delivery.etaMinutes })}
            action={
              <Button asChild size="lg" onClick={close}>
                <Link href="/">{t("cart.startShopping")}</Link>
              </Button>
            }
            className="my-auto bg-background"
          />
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              <div className="rounded-2xl bg-background p-4 shadow-card">
                <ShipmentHeader count={cart.count} />
                <ul className="mt-2 divide-y">
                  {cart.items.map((item) => (
                    <CartLineItem key={item.product.id} item={item} onNavigate={close} />
                  ))}
                  {cart.unavailable.map((item) => (
                    <CartLineItem key={item.product.id} item={item} unavailable onNavigate={close} />
                  ))}
                </ul>
              </div>
              <FreeDeliveryProgress remaining={cart.freeDeliveryRemaining} progress={cart.freeDeliveryProgress} />
              <div className="rounded-2xl bg-background p-4 shadow-card">
                <CartSuggestions onNavigate={close} />
              </div>
              <CouponSection subtotal={cart.subtotal} />
              <div className="rounded-2xl bg-background p-4 shadow-card">
                <BillDetails bill={cart} savings={cart.savings} couponCode={cart.appliedCoupon} />
              </div>
              <TipSelector className="bg-background" />
              <DeliveryInstructions className="bg-background" />
              <CancellationPolicy className="bg-background" />
            </div>
            <div className="border-t bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {cart.items.length > 0 ? (
                <ProceedButton total={cart.total} onNavigate={close} />
              ) : (
                <Button size="lg" className="h-14 w-full rounded-2xl" disabled>
                  {t("cart.proceed")}
                </Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
