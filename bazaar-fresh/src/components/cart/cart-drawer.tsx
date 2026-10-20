"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { useUIStore } from "@/store/ui";
import { CartLineItem } from "./cart-line-item";
import { FreeDeliveryProgress } from "./free-delivery-progress";
import { OrderSummaryRows } from "./order-summary";

export function CartDrawer() {
  const { t, dir, price } = useI18n();
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
      <SheetContent side={dir === "rtl" ? "left" : "right"} closeLabel={t("common.close")} className="gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>{t("cart.title")}</SheetTitle>
          <SheetDescription>{t("cart.itemCount", { count: cart.count })}</SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <EmptyState
            icon={ShoppingBasket}
            title={t("cart.empty")}
            description={t("cart.emptyHint", { hours: siteConfig.delivery.promiseHours })}
            action={
              <Button asChild size="lg" onClick={close}>
                <Link href="/">{t("cart.startShopping")}</Link>
              </Button>
            }
            className="my-auto"
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <FreeDeliveryProgress
                remaining={cart.freeDeliveryRemaining}
                progress={cart.freeDeliveryProgress}
                className="mt-4"
              />
              <ul className="divide-y">
                {cart.items.map((item) => (
                  <CartLineItem key={item.product.id} item={item} onNavigate={close} />
                ))}
                {cart.unavailable.map((item) => (
                  <CartLineItem key={item.product.id} item={item} unavailable onNavigate={close} />
                ))}
              </ul>
            </div>
            <SheetFooter className="border-t bg-surface/60 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <OrderSummaryRows totals={cart} savings={cart.savings} className="mb-2" />
              {cart.items.length > 0 ? (
                <Button asChild size="lg" className="w-full justify-between">
                  <Link href="/checkout" onClick={close}>
                    <span>{t("cart.checkout")}</span>
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 tabular-nums">{price(cart.total)}</span>
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="w-full" disabled>
                  {t("cart.checkout")}
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/cart" onClick={close}>
                  {t("cart.viewCart")}
                </Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
