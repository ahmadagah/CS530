"use client";

import { ChevronDown, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

/** "Delivery in 20 minutes · Home – Shahr-e-Naw" block that opens the location picker. */
export function DeliveryEta({ className }: { className?: string }) {
  const { t, storeName } = useI18n();
  const setLocationOpen = useUIStore((s) => s.setLocationOpen);
  const loggedIn = useUserStore((s) => s.loggedIn);
  const storeId = useUserStore((s) => s.storeId);
  const address = useUserStore((s) => s.addresses.find((a) => a.id === s.deliveryAddressId));
  const where = loggedIn && address ? `${address.label} – ${address.line}, ${address.area}` : storeName(storeId);

  return (
    <button
      type="button"
      onClick={() => setLocationOpen(true)}
      className={cn("group flex min-w-0 flex-col items-start rounded-xl px-1 py-0.5 text-start", className)}
      aria-label={t("header.selectLocation")}
    >
      <span className="flex items-center gap-1 text-base leading-tight font-extrabold tracking-tight sm:text-lg">
        <Zap className="size-4 fill-deal text-deal" />
        {t("header.deliveryIn", { minutes: siteConfig.delivery.etaMinutes })}
      </span>
      <span className="flex max-w-full items-center gap-0.5 text-xs text-muted-foreground group-hover:text-foreground sm:text-[13px]">
        <span className="truncate">{where}</span>
        <ChevronDown className="size-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
      </span>
    </button>
  );
}
