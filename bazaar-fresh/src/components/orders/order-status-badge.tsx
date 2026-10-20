"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/provider";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<OrderStatus, string> = {
  received: "bg-sky-50 text-sky-700",
  packing: "bg-amber-50 text-amber-700",
  out_for_delivery: "bg-deal-soft text-deal",
  delivered: "bg-primary-soft text-primary",
};

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const { t } = useI18n();
  return (
    <Badge variant="muted" className={cn(styles[status], className)}>
      <span className={cn("size-1.5 rounded-full bg-current", status !== "delivered" && "animate-pulse")} />
      {t(`order.status.${status}`)}
    </Badge>
  );
}
