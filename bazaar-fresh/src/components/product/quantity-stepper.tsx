"use client";

import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const sizes = {
  xs: { wrap: "h-9 p-0.5", btn: "size-6 sm:size-7", icon: "size-3.5", text: "min-w-5 text-sm" },
  sm: { wrap: "h-9 gap-0.5 p-0.5", btn: "size-8", icon: "size-4", text: "min-w-6 text-sm" },
  md: { wrap: "h-10 gap-1 p-1", btn: "size-8", icon: "size-4", text: "min-w-8 text-[15px]" },
  lg: { wrap: "h-12 gap-1 p-1", btn: "size-10", icon: "size-5", text: "min-w-10 text-base" },
};

export function QuantityStepper({
  quantity,
  max,
  onIncrement,
  onDecrement,
  size = "md",
  className,
}: {
  quantity: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const { t, num } = useI18n();
  const s = sizes[size];
  const atMax = quantity >= max;
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-lg bg-primary text-primary-foreground shadow-md animate-in zoom-in-90 fade-in duration-200",
        s.wrap,
        className,
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label={quantity === 1 ? t("product.remove") : t("product.decrease")}
        className={cn("grid place-items-center rounded-md transition hover:bg-white/15 active:scale-90", s.btn)}
      >
        <Minus className={s.icon} strokeWidth={3} />
      </button>
      <span key={quantity} className={cn("text-center font-bold tabular-nums animate-in zoom-in-75 duration-200", s.text)} aria-live="polite">
        {num(quantity)}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={atMax}
        aria-label={atMax ? t("product.maxReached", { count: max }) : t("product.increase")}
        title={atMax ? t("product.maxReached", { count: max }) : undefined}
        className={cn(
          "grid place-items-center rounded-md transition hover:bg-white/15 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40",
          s.btn,
        )}
      >
        <Plus className={s.icon} strokeWidth={3} />
      </button>
    </div>
  );
}
