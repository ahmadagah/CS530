"use client";

import { Flame } from "lucide-react";
import { useMemo } from "react";
import { DealsCountdown } from "@/components/home/countdown";
import { ProductListing } from "@/components/product/product-listing";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";

export function DealsView() {
  const { t } = useI18n();
  const catalog = useCatalog();
  const deals = useMemo(() => catalog.filter((p) => p.onSale), [catalog]);

  return (
    <div className="container-page py-5 sm:py-8">
      <Breadcrumbs items={[{ href: "/", label: t("nav.home") }, { label: t("category.dealsTitle") }]} />
      <div className="mt-4 mb-6 flex flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-deal to-[#e0480f] p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Flame className="size-7" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("category.dealsTitle")}</h1>
            <p className="text-sm text-white/85">{t("category.dealsHint")}</p>
          </div>
        </div>
        <div className="[&>span]:bg-white [&>span]:text-deal">
          <DealsCountdown />
        </div>
      </div>
      <ProductListing products={deals} hideSaleFilter />
    </div>
  );
}
