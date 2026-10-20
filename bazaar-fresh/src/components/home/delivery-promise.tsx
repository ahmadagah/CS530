"use client";

import { Banknote, Clock, ShieldCheck, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function DeliveryPromise({ className }: { className?: string }) {
  const { t, price } = useI18n();
  const { freeThreshold, etaMinutes } = siteConfig.delivery;
  const items = [
    { icon: Truck, title: t("promise.freeDelivery"), text: t("promise.freeDeliveryText", { amount: price(freeThreshold) }), flip: true },
    { icon: Clock, title: t("promise.fast", { minutes: etaMinutes }), text: t("promise.fastText") },
    { icon: Banknote, title: t("promise.cod"), text: t("promise.codText") },
    { icon: ShieldCheck, title: t("promise.fresh"), text: t("promise.freshText") },
  ];
  return (
    <section className={cn("container-page", className)}>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:rounded-3xl sm:border sm:bg-surface sm:p-3 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text, flip }) => (
          <li
            key={title}
            className="flex w-[72%] shrink-0 snap-start items-center gap-3 rounded-2xl border bg-white p-3 shadow-card sm:w-auto sm:border-0 sm:p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon className={cn("size-5", flip && "rtl:-scale-x-100")} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm leading-tight font-bold">{title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
