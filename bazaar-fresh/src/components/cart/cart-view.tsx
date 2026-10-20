"use client";

import { ArrowLeft, Banknote, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import { ProductCarousel } from "@/components/product/product-carousel";
import { EmptyState } from "@/components/shared/empty-state";
import { HydrationGate } from "@/components/shared/hydration-gate";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/use-cart";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { useCartStore } from "@/store/cart";
import { CartLineItem } from "./cart-line-item";
import { FreeDeliveryProgress } from "./free-delivery-progress";
import { OrderSummaryRows } from "./order-summary";

function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4 rounded-3xl border p-5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-24 rounded-xl" />
            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="mt-4 h-8 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-80 rounded-3xl" />
    </div>
  );
}

function CartContents() {
  const { t, price } = useI18n();
  const cart = useCart();
  const catalog = useCatalog();
  const clear = useCartStore((s) => s.clear);
  const isEmpty = cart.items.length === 0 && cart.unavailable.length === 0;

  const suggestions = useMemo(() => {
    const inCart = new Set([...cart.items, ...cart.unavailable].map((i) => i.product.id));
    return catalog.filter((p) => p.popular && p.inStock && !inCart.has(p.id)).slice(0, 10);
  }, [catalog, cart.items, cart.unavailable]);

  if (isEmpty) {
    return (
      <>
        <EmptyState
          icon={ShoppingBasket}
          title={t("cart.empty")}
          description={t("cart.emptyHint", { hours: siteConfig.delivery.promiseHours })}
          action={
            <Button asChild size="lg">
              <Link href="/">{t("cart.startShopping")}</Link>
            </Button>
          }
          className="rounded-3xl border border-dashed"
        />
        {suggestions.length > 0 && (
          <section className="mt-12">
            <SectionHeader title={t("home.popular")} subtitle={t("home.popularHint")} />
            <ProductCarousel products={suggestions} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border bg-card px-4 shadow-card sm:px-6">
          <div className="flex items-center justify-between border-b py-4">
            <p className="font-semibold">{t("cart.itemCount", { count: cart.count })}</p>
            <button
              type="button"
              onClick={() => {
                clear();
                toast(t("cart.cleared"));
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
              {t("cart.clear")}
            </button>
          </div>
          <ul className="divide-y">
            {cart.items.map((item) => (
              <CartLineItem key={item.product.id} item={item} size="lg" />
            ))}
            {cart.unavailable.map((item) => (
              <CartLineItem key={item.product.id} item={item} unavailable size="lg" />
            ))}
          </ul>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-36">
          <div className="rounded-3xl border bg-card p-5 shadow-card">
            <h2 className="mb-4 text-lg font-bold">{t("cart.summary")}</h2>
            <FreeDeliveryProgress remaining={cart.freeDeliveryRemaining} progress={cart.freeDeliveryProgress} className="mb-5" />
            <OrderSummaryRows totals={cart} savings={cart.savings} />
            {cart.items.length > 0 ? (
              <Button asChild size="lg" className="mt-5 w-full justify-between">
                <Link href="/checkout">
                  <span>{t("cart.checkout")}</span>
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 tabular-nums">{price(cart.total)}</span>
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="mt-5 w-full" disabled>
                {t("cart.checkout")}
              </Button>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Banknote className="size-4" />
              {t("promise.codText")}
            </p>
          </div>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">
              <ArrowLeft className="rtl:-scale-x-100" />
              {t("cart.continue")}
            </Link>
          </Button>
        </aside>
      </div>

      {suggestions.length > 0 && (
        <section className="mt-12">
          <SectionHeader title={t("cart.suggestions")} />
          <ProductCarousel products={suggestions} />
        </section>
      )}
    </>
  );
}

export function CartView() {
  const { t } = useI18n();
  return (
    <div className="container-page py-6 sm:py-10">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">{t("cart.title")}</h1>
      <HydrationGate fallback={<CartSkeleton />}>
        <CartContents />
      </HydrationGate>
    </div>
  );
}
