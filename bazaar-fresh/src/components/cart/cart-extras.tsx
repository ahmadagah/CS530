"use client";

import { BellOff, Check, DoorOpen, HandCoins, Info, PhoneOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { DELIVERY_INSTRUCTIONS, type DeliveryInstruction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const instructionIcons: Record<DeliveryInstruction, typeof PhoneOff> = {
  noCall: PhoneOff,
  noBell: BellOff,
  leaveAtDoor: DoorOpen,
  leaveWithGuard: ShieldCheck,
};

/** "Tip your delivery partner" chips with a custom amount. */
export function TipSelector({ className }: { className?: string }) {
  const { t, price } = useI18n();
  const tip = useCartStore((s) => s.tip);
  const setTip = useCartStore((s) => s.setTip);
  const presets: readonly number[] = siteConfig.delivery.tips;
  const [custom, setCustom] = useState(tip > 0 && !presets.includes(tip));
  const chip = "inline-flex h-9 items-center gap-1 rounded-full border px-3.5 text-sm font-semibold transition";

  return (
    <section className={cn("rounded-2xl border p-4", className)}>
      <h3 className="flex items-center gap-2 text-sm font-bold">
        <HandCoins className="size-4 text-primary" /> {t("cart.tipTitle")}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{t("cart.tipText")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((amount) => {
          const active = tip === amount && !custom;
          return (
            <button
              key={amount}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setCustom(false);
                setTip(active ? 0 : amount);
              }}
              className={cn(chip, active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}
            >
              {active && <Check className="size-3.5" />}
              {price(amount)}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={custom}
          onClick={() => {
            setCustom(!custom);
            if (custom) setTip(0);
          }}
          className={cn(chip, custom ? "border-primary bg-primary-soft text-primary" : "hover:border-primary/50")}
        >
          {t("cart.tipCustom")}
        </button>
      </div>
      {custom && (
        <input
          autoFocus
          inputMode="numeric"
          dir="ltr"
          aria-label={t("cart.tipCustomPrompt")}
          placeholder={t("cart.tipCustomPrompt")}
          defaultValue={tip > 0 ? String(tip) : ""}
          onChange={(e) => setTip(Number(e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "")) || 0)}
          className="mt-3 h-10 w-40 rounded-xl border px-3 text-sm font-semibold outline-none focus:border-primary rtl:text-end"
        />
      )}
    </section>
  );
}

/** "Avoid calling", "Leave at the door", … toggles. */
export function DeliveryInstructions({ className }: { className?: string }) {
  const { t } = useI18n();
  const selected = useCartStore((s) => s.instructions);
  const toggle = useCartStore((s) => s.toggleInstruction);
  return (
    <section className={cn("rounded-2xl border p-4", className)}>
      <h3 className="text-sm font-bold">{t("cart.instructions")}</h3>
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:flex-wrap">
        {DELIVERY_INSTRUCTIONS.map((key) => {
          const Icon = instructionIcons[key];
          const active = selected.includes(key);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(key)}
              className={cn(
                "flex w-28 shrink-0 flex-col items-start gap-2 rounded-xl border p-3 text-start text-xs font-semibold transition",
                active ? "border-primary bg-primary-soft text-primary" : "hover:border-primary/40",
              )}
            >
              <Icon className="size-5" />
              {t(`instructions.${key}`)}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function CancellationPolicy({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <section className={cn("rounded-2xl bg-surface p-4", className)}>
      <h3 className="flex items-center gap-1.5 text-sm font-bold">
        <Info className="size-4 text-muted-foreground" /> {t("cart.cancellationTitle")}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("cart.cancellationText")}</p>
    </section>
  );
}
