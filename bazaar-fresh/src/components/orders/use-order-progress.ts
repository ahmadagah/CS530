"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { ORDER_STATUSES, type Order } from "@/lib/types";

export interface OrderProgress {
  /** Minutes until delivery, scaled so the demo's ~1 minute run maps onto the promised delivery time. */
  minutesLeft: number;
  /** 0–1: how far the rider is along the route on the map. */
  riderProgress: number;
}

/** Live (per-second) delivery countdown and rider position for the tracking page. */
export function useOrderProgress(order: Order): OrderProgress {
  const [now, setNow] = useState(() => Date.now());
  const active = order.status !== "delivered";

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const { etaMinutes } = siteConfig.delivery;
  if (!active) return { minutesLeft: 0, riderProgress: 1 };

  const stepMs = siteConfig.demo.orderStepSeconds * 1000;
  const stepIndex = ORDER_STATUSES.indexOf(order.status);
  const stepsLeft = ORDER_STATUSES.length - 1 - stepIndex;
  const lastAt = Date.parse(order.statusHistory[order.statusHistory.length - 1].at);
  const intoStep = order.autoProgress ? Math.min(stepMs, Math.max(0, now - lastAt)) : 0;
  const remainingMs = stepsLeft * stepMs - intoStep;
  const totalMs = (ORDER_STATUSES.length - 1) * stepMs;

  return {
    minutesLeft: Math.max(1, Math.ceil((remainingMs / totalMs) * etaMinutes)),
    riderProgress: order.status === "out_for_delivery" ? Math.min(0.92, 0.08 + (intoStep / stepMs) * 0.84) : 0,
  };
}
