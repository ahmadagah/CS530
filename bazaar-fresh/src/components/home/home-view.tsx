"use client";

import { useMemo } from "react";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeader } from "@/components/shared/section-header";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { discountPercent } from "@/lib/catalog";
import { useOrderStore } from "@/store/orders";
import { CategoryTiles } from "./category-tiles";
import { DealsCountdown } from "./countdown";
import { DeliveryPromise } from "./delivery-promise";
import { Hero } from "./hero";

export function HomeView() {
  const { t } = useI18n();
  const catalog = useCatalog();
  const orders = useOrderStore((s) => s.orders);

  const deals = useMemo(
    () => catalog.filter((p) => p.onSale).sort((a, b) => Number(b.inStock) - Number(a.inStock) || discountPercent(b) - discountPercent(a)),
    [catalog],
  );
  const popular = useMemo(() => catalog.filter((p) => p.popular && p.inStock).slice(0, 10), [catalog]);
  const orderAgain = useMemo(() => {
    const ids = [...new Set(orders.flatMap((o) => o.items.map((i) => i.productId)))];
    return ids.map((id) => catalog.find((p) => p.id === id)).filter((p) => p !== undefined).slice(0, 12);
  }, [orders, catalog]);

  return (
    <div className="space-y-10 sm:space-y-14">
      <div className="space-y-4 sm:space-y-5">
        <Hero />
        <DeliveryPromise />
      </div>

      <CategoryTiles />

      {deals.length > 0 && (
        <section id="deals" className="bg-gradient-to-b from-deal-soft/80 to-transparent py-8 sm:py-10">
          <div className="container-page">
            <SectionHeader
              title={t("home.weeklyDeals")}
              subtitle={t("home.weeklyDealsHint")}
              href="/deals"
              linkLabel={t("home.seeAll")}
              aside={
                <span className="hidden sm:inline-flex">
                  <DealsCountdown />
                </span>
              }
            />
            <div className="mb-4 sm:hidden">
              <DealsCountdown />
            </div>
            <ProductCarousel products={deals} />
          </div>
        </section>
      )}

      <section className="container-page">
        <SectionHeader title={t("home.popular")} subtitle={t("home.popularHint")} href="/categories" linkLabel={t("home.seeAll")} />
        <ProductGrid products={popular} />
      </section>

      {orderAgain.length > 0 && (
        <section className="container-page">
          <SectionHeader
            title={t("home.orderAgain")}
            subtitle={t("home.orderAgainHint")}
            href="/account#orders"
            linkLabel={t("nav.orders")}
          />
          <ProductCarousel products={orderAgain} />
        </section>
      )}
    </div>
  );
}
