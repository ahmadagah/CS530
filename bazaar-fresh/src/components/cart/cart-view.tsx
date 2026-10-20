"use client";

import { ArrowLeft, ShoppingBasket, Trash2 } from "lucide-react";
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
import { collapseVariants } from "@/lib/catalog";
import { useCartStore } from "@/store/cart";
import { BillDetails } from "./bill-details";
import { CancellationPolicy, DeliveryInstructions, TipSelector } from "./cart-extras";
import { ProceedButton, ShipmentHeader } from "./cart-drawer";
import { CartLineItem } from "./cart-line-item";
import { CartSuggestions } from "./cart-suggestions";
import { CouponSection } from "./coupon-section";
import { FreeDeliveryProgress } from "./free-delivery-progress";

function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4 rounded-3xl border p-5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-24 rounded-xl" />
            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="mt-4 h-8 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-96 rounded-3xl" />
    </div>
  );
}

function CartContents() {
  const { t } = useI18n();
  const cart = useCart();
  const catalog = useCatalog();
  const clear = useCartStore((s) => s.clear);
  const isEmpty = cart.items.length === 0 && cart.unavailable.length === 0;

  const popular = useMemo(() => collapseVariants(catalog.filter((p) => p.popular && p.inStock)).slice(0, 10), [catalog]);

  if (isEmpty) {
    return (
      <>
        <EmptyState
          icon={ShoppingBasket}
          title={t("cart.empty")}
          description={t("cart.emptyHint", { minutes: siteConfig.delivery.etaMinutes })}
          action={
            <Button asChild size="lg">
              <Link href="/">{t("cart.startShopping")}</Link>
            </Button>
          }
          className="rounded-3xl border border-dashed"
        />
        <section className="mt-12">
          <SectionHeader title={t("home.popular")} subtitle={t("home.popularHint")} />
          <ProductCarousel products={popular} />
        </section>
      </>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4">
        <div className="rounded-3xl border bg-card p-4 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <ShipmentHeader count={cart.count} />
            <button
              type="button"
              onClick={() => {
                clear();
                toast(t("cart.cleared"));
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">{t("cart.clear")}</span>
            </button>
          </div>
          <ul className="mt-2 divide-y">
            {cart.items.map((item) => (
              <CartLineItem key={item.product.id} item={item} size="lg" />
            ))}
            {cart.unavailable.map((item) => (
              <CartLineItem key={item.product.id} item={item} unavailable size="lg" />
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-4 shadow-card sm:p-6">
          <CartSuggestions />
        </div>
        <TipSelector className="bg-card" />
        <DeliveryInstructions className="bg-card" />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-36">
        <FreeDeliveryProgress remaining={cart.freeDeliveryRemaining} progress={cart.freeDeliveryProgress} />
        <CouponSection subtotal={cart.subtotal} />
        <div className="rounded-3xl border bg-card p-5 shadow-card">
          <BillDetails bill={cart} savings={cart.savings} couponCode={cart.appliedCoupon} />
          <div className="mt-5">
            {cart.items.length > 0 ? (
              <ProceedButton total={cart.total} />
            ) : (
              <Button size="lg" className="h-14 w-full rounded-2xl" disabled>
                {t("cart.proceed")}
              </Button>
            )}
          </div>
        </div>
        <CancellationPolicy />
        <Button asChild variant="ghost" className="w-full">
          <Link href="/">
            <ArrowLeft className="rtl:-scale-x-100" />
            {t("cart.continue")}
          </Link>
        </Button>
      </aside>
    </div>
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
