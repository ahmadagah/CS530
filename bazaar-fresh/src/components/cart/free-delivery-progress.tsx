"use client";

import { PartyPopper, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function FreeDeliveryProgress({
  remaining,
  progress,
  className,
}: {
  remaining: number;
  progress: number;
  className?: string;
}) {
  const { t, price } = useI18n();
  const unlocked = remaining === 0;
  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5 transition-colors",
        unlocked ? "border-primary/25 bg-primary-soft" : "border-deal/20 bg-deal-soft",
        className,
      )}
    >
      <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold">
        {unlocked ? (
          <PartyPopper className="size-[18px] text-primary animate-pop" />
        ) : (
          <Truck className="size-[18px] text-deal rtl:-scale-x-100" />
        )}
        <span className={unlocked ? "text-primary" : "text-foreground"}>
          {unlocked ? t("cart.freeUnlocked") : t("cart.freeProgress", { amount: price(remaining) })}
        </span>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-white"
        indicatorClassName={unlocked ? "bg-primary" : "bg-deal"}
      />
    </div>
  );
}
