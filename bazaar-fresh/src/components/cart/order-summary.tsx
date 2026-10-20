"use client";

import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/provider";
import type { Totals } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function OrderSummaryRows({
  totals,
  savings = 0,
  className,
  children,
}: {
  totals: Pick<Totals, "subtotal" | "deliveryFee" | "total">;
  savings?: number;
  className?: string;
  children?: ReactNode;
}) {
  const { t, price } = useI18n();
  return (
    <div className={cn("space-y-2.5 text-sm", className)}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">{t("cart.subtotal")}</span>
        <span className="font-semibold tabular-nums">{price(totals.subtotal)}</span>
      </div>
      {savings > 0 && (
        <div className="flex justify-between text-deal">
          <span>{t("cart.savings")}</span>
          <span className="font-semibold tabular-nums">−{price(savings)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-muted-foreground">{t("cart.deliveryFee")}</span>
        {totals.deliveryFee === 0 ? (
          <span className="font-semibold text-primary">{t("cart.free")}</span>
        ) : (
          <span className="font-semibold tabular-nums">{price(totals.deliveryFee)}</span>
        )}
      </div>
      {children}
      <Separator />
      <div className="flex items-baseline justify-between pt-0.5">
        <span className="text-base font-bold">{t("cart.total")}</span>
        <span className="text-xl font-extrabold tabular-nums">{price(totals.total)}</span>
      </div>
    </div>
  );
}
