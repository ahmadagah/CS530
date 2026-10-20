"use client";

import { ChevronRight, CircleCheck, Ticket, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { siteConfig, type Coupon } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { checkCoupon, findCoupon } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export function useCouponText() {
  const { t, price } = useI18n();
  return (coupon: Coupon) =>
    t(`coupons.${coupon.code}`, {
      amount: price(coupon.value),
      min: price(coupon.minOrder),
      percent: coupon.value,
      max: price("maxDiscount" in coupon ? coupon.maxDiscount : 0),
    });
}

/** "Apply coupon" row plus the coupon list, as in the Blinkit cart. */
export function CouponSection({ subtotal, className }: { subtotal: number; className?: string }) {
  const { t, price } = useI18n();
  const couponCode = useCartStore((s) => s.couponCode);
  const setCoupon = useCartStore((s) => s.setCoupon);
  const describe = useCouponText();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const applied = findCoupon(couponCode);
  const appliedCheck = applied ? checkCoupon(applied, subtotal) : undefined;

  const apply = (coupon: Coupon) => {
    const check = checkCoupon(coupon, subtotal);
    if (!check.ok) {
      setError(t("cart.couponShort", { amount: price(check.shortBy), code: coupon.code }));
      return;
    }
    setCoupon(coupon.code);
    setOpen(false);
    setCode("");
    setError("");
    toast.success(t("cart.couponApplied", { code: coupon.code }), {
      description: check.freeDelivery
        ? t("cart.couponFreeDelivery", { code: coupon.code })
        : t("cart.couponSaved", { amount: price(check.discount) }),
    });
  };

  return (
    <>
      {applied ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border border-dashed p-3.5",
            appliedCheck?.ok ? "border-primary/50 bg-primary-soft/60" : "border-deal/50 bg-deal-soft",
            className,
          )}
        >
          {appliedCheck?.ok ? <CircleCheck className="size-5 shrink-0 text-primary" /> : <Ticket className="size-5 shrink-0 text-deal" />}
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-bold">{t("cart.couponApplied", { code: applied.code })}</p>
            <p className="text-xs text-muted-foreground">
              {appliedCheck?.ok
                ? appliedCheck.freeDelivery
                  ? t("cart.couponFreeDelivery", { code: applied.code })
                  : t("cart.couponSaved", { amount: price(appliedCheck.discount) })
                : appliedCheck && t("cart.couponShort", { amount: price(appliedCheck.shortBy), code: applied.code })}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCoupon(undefined)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
          >
            <X className="size-3.5" /> {t("cart.couponRemove")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border bg-background p-3.5 text-start transition hover:border-primary/40 hover:bg-primary-soft/40",
            className,
          )}
        >
          <span className="grid size-9 place-items-center rounded-full bg-deal-soft text-deal">
            <Ticket className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">{t("cart.applyCoupon")}</span>
            <span className="block text-xs text-muted-foreground">{t("cart.viewCoupons")}</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground rtl:-scale-x-100" />
        </button>
      )}

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          setError("");
        }}
      >
        <DialogContent closeLabel={t("common.close")} className="p-0">
          <div className="border-b p-5 pe-14">
            <DialogTitle>{t("cart.coupons")}</DialogTitle>
            <DialogDescription className="sr-only">{t("cart.applyCoupon")}</DialogDescription>
          </div>
          <form
            className="flex gap-2 p-5 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              const coupon = findCoupon(code);
              if (coupon) apply(coupon);
              else setError(t("cart.couponInvalid"));
            }}
          >
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder={t("cart.couponEnter")}
              aria-label={t("cart.couponEnter")}
              dir="ltr"
              className="font-semibold tracking-wider uppercase rtl:text-end"
            />
            <Button type="submit" disabled={!code.trim()}>
              {t("cart.couponApply")}
            </Button>
          </form>
          {error && <p className="px-5 text-xs font-medium text-destructive">{error}</p>}
          <ul className="space-y-3 p-5">
            {siteConfig.coupons.map((coupon) => {
              const check = checkCoupon(coupon, subtotal);
              return (
                <li key={coupon.code} className="rounded-2xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-deal bg-deal-soft px-2.5 py-1 text-sm font-extrabold tracking-wider text-deal" dir="ltr">
                        <Ticket className="size-3.5" /> {coupon.code}
                      </span>
                      <p className="mt-2 text-sm font-medium">{describe(coupon)}</p>
                      {!check.ok && (
                        <p className="mt-1 text-xs font-semibold text-deal">
                          {t("cart.couponShort", { amount: price(check.shortBy), code: coupon.code })}
                        </p>
                      )}
                    </div>
                    <Button size="sm" variant={check.ok ? "default" : "outline"} disabled={!check.ok} onClick={() => apply(coupon)}>
                      {t("cart.couponApply")}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
