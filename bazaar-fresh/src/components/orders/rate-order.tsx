"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/provider";
import type { Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useOrderStore } from "@/store/orders";

const LABELS = ["order.rate1", "order.rate2", "order.rate3", "order.rate4", "order.rate5"] as const;

/** "How was your order?" star rating shown once an order is delivered. */
export function RateOrder({ order }: { order: Order }) {
  const { t } = useI18n();
  const rate = useOrderStore((s) => s.rate);
  const [hover, setHover] = useState(0);
  const value = hover || order.rating || 0;

  return (
    <section className="rounded-3xl border bg-card p-5 text-center shadow-card sm:p-6">
      <h3 className="font-bold">{order.rating ? t("order.yourRating") : t("order.rateTitle")}</h3>
      <div className="mt-3 flex justify-center gap-1.5" onMouseLeave={() => setHover(0)} dir="ltr">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={t(LABELS[n - 1])}
            onMouseEnter={() => setHover(n)}
            onClick={() => {
              rate(order.id, n);
              toast.success(t("order.rateThanks"));
            }}
            className="rounded-full p-1 transition hover:scale-110 active:scale-95"
          >
            <Star className={cn("size-9 transition-colors", n <= value ? "fill-star text-star" : "text-border")} />
          </button>
        ))}
      </div>
      <p className="mt-2 h-5 text-sm font-semibold text-muted-foreground">{value > 0 ? t(LABELS[value - 1]) : ""}</p>
    </section>
  );
}
