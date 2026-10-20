"use client";

import { BadgePercent, Bike, HandCoins, Package, ReceiptText, ShoppingBag, Ticket } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import type { Bill } from "@/lib/types";
import { cn } from "@/lib/utils";

function Row({ icon, label, children, hint }: { icon: ReactNode; label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="flex items-start gap-2 text-muted-foreground">
        <span className="mt-0.5 text-foreground/70">{icon}</span>
        <span>
          {label}
          {hint && <span className="block text-[11px] text-deal">{hint}</span>}
        </span>
      </span>
      <span className="shrink-0 text-end tabular-nums">{children}</span>
    </div>
  );
}

/** Blinkit-style "Bill details": items, delivery, handling, small-cart fee, coupon, tip and grand total. */
export function BillDetails({
  bill,
  savings,
  couponCode,
  showTitle = true,
  className,
}: {
  bill: Bill;
  savings?: number;
  couponCode?: string;
  showTitle?: boolean;
  className?: string;
}) {
  const { t, price } = useI18n();
  const { fee, smallCartThreshold } = siteConfig.delivery;
  const icon = "size-4";

  return (
    <div className={cn("text-sm", className)}>
      {showTitle && <h3 className="mb-3 font-bold">{t("cart.billDetails")}</h3>}
      <div className="space-y-2.5">
        <Row icon={<ReceiptText className={icon} />} label={t("cart.itemsTotal")}>
          {bill.mrpTotal > bill.subtotal && (
            <span className="me-1.5 text-xs text-muted-foreground line-through">{price(bill.mrpTotal)}</span>
          )}
          <span className="font-semibold">{price(bill.subtotal)}</span>
        </Row>
        <Row icon={<Bike className={cn(icon, "rtl:-scale-x-100")} />} label={t("cart.deliveryFee")}>
          {bill.deliveryFee === 0 ? (
            <>
              <span className="me-1.5 text-xs text-muted-foreground line-through">{price(fee)}</span>
              <span className="font-semibold text-primary">{t("cart.free")}</span>
            </>
          ) : (
            <span className="font-semibold">{price(bill.deliveryFee)}</span>
          )}
        </Row>
        {bill.handlingFee > 0 && (
          <Row icon={<Package className={icon} />} label={t("cart.handlingFee")}>
            <span className="font-semibold">{price(bill.handlingFee)}</span>
          </Row>
        )}
        {bill.smallCartFee > 0 && (
          <Row
            icon={<ShoppingBag className={icon} />}
            label={t("cart.smallCartFee")}
            hint={t("cart.smallCartHint", { amount: price(smallCartThreshold - bill.subtotal) })}
          >
            <span className="font-semibold">{price(bill.smallCartFee)}</span>
          </Row>
        )}
        {bill.couponDiscount > 0 && (
          <Row icon={<Ticket className={icon} />} label={`${t("cart.couponDiscount")}${couponCode ? ` (${couponCode})` : ""}`}>
            <span className="font-semibold text-primary">−{price(bill.couponDiscount)}</span>
          </Row>
        )}
        {bill.tip > 0 && (
          <Row icon={<HandCoins className={icon} />} label={t("cart.tip")}>
            <span className="font-semibold">{price(bill.tip)}</span>
          </Row>
        )}
        <div className="flex items-baseline justify-between border-t pt-3">
          <span className="text-base font-bold">{t("cart.grandTotal")}</span>
          <span className="text-lg font-extrabold tabular-nums">{price(bill.total)}</span>
        </div>
      </div>
      {savings !== undefined && savings > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary-soft px-4 py-3 text-primary">
          <BadgePercent className="size-6 shrink-0" />
          <div>
            <p className="flex flex-wrap items-center gap-x-1.5 font-bold">
              {t("cart.totalSavings")} <span className="tabular-nums">{price(savings)}</span>
            </p>
            <p className="text-xs text-primary/80">{t("cart.totalSavingsText")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
