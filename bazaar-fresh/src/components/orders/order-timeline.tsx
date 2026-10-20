"use client";

import { Bike, Check, ClipboardCheck, PackageOpen, Home } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { ORDER_STATUSES, type Order } from "@/lib/types";
import { cn } from "@/lib/utils";

const icons = { received: ClipboardCheck, packing: PackageOpen, out_for_delivery: Bike, delivered: Home };

/** Received → Packing → Out for delivery → Delivered. Vertical on phones, horizontal from `sm` up. */
export function OrderTimeline({ order }: { order: Order }) {
  const { t, date } = useI18n();
  const currentIndex = ORDER_STATUSES.indexOf(order.status);

  return (
    <ol className="relative grid gap-0 sm:grid-cols-4">
      {ORDER_STATUSES.map((status, i) => {
        const Icon = icons[status];
        const done = i < currentIndex || order.status === "delivered";
        const current = i === currentIndex && order.status !== "delivered";
        const reached = i <= currentIndex;
        const at = order.statusHistory.find((h) => h.status === status)?.at;
        const isLast = i === ORDER_STATUSES.length - 1;

        return (
          <li key={status} className="relative flex gap-4 pb-7 last:pb-0 sm:flex-col sm:items-center sm:gap-3 sm:pb-0 sm:text-center">
            {!isLast && (
              <>
                {/* Connector: vertical on mobile, horizontal on larger screens */}
                <span className="absolute start-[21px] top-11 bottom-0 w-0.5 bg-border sm:hidden">
                  <span className={cn("block w-full bg-primary transition-all duration-700", i < currentIndex ? "h-full" : "h-0")} />
                </span>
                <span className="absolute top-[21px] start-[calc(50%+28px)] hidden h-0.5 w-[calc(100%-56px)] bg-border sm:block">
                  <span className={cn("block h-full bg-primary transition-all duration-700", i < currentIndex ? "w-full" : "w-0")} />
                </span>
              </>
            )}
            <span
              className={cn(
                "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 transition-all duration-500",
                done && "border-primary bg-primary text-primary-foreground",
                current && "border-primary bg-white text-primary shadow-[0_0_0_6px] shadow-primary/15",
                !reached && "border-border bg-white text-muted-foreground",
              )}
            >
              {current && <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping-slow" />}
              {done ? <Check className="size-5 animate-check" strokeWidth={3} /> : <Icon className={cn("size-5", status === "out_for_delivery" && "rtl:-scale-x-100")} />}
            </span>
            <div className="min-w-0 pt-1.5 sm:pt-0">
              <p className={cn("text-sm font-bold", !reached && "text-muted-foreground")}>{t(`order.status.${status}`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {at ? date(at, "time") : "—"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
