"use client";

import {
  ArrowLeft,
  CalendarClock,
  Check,
  CreditCard,
  FastForward,
  Gift,
  MapPin,
  MessageSquareText,
  PackageSearch,
  Phone,
  RotateCcw,
  Star,
  Store,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BillDetails } from "@/components/cart/bill-details";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { EmptyState } from "@/components/shared/empty-state";
import { HydrationGate } from "@/components/shared/hydration-gate";
import { ProductImage } from "@/components/shared/product-image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { useCatalog } from "@/hooks/use-catalog";
import { useReorder } from "@/hooks/use-reorder";
import { useI18n } from "@/i18n/provider";
import type { Order } from "@/lib/types";
import { useOrderStore } from "@/store/orders";
import { HelpChat } from "./help-chat";
import { OrderMap } from "./order-map";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderTimeline } from "./order-timeline";
import { RateOrder } from "./rate-order";
import { useOrderProgress } from "./use-order-progress";

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">{icon}</span>
      <div className="min-w-0 text-sm">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 font-medium">{children}</div>
      </div>
    </div>
  );
}

function Confirmation({ order }: { order: Order }) {
  const { t, price } = useI18n();
  const firstName = order.customerName.split(" ")[0];
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-6 text-center text-primary-foreground shadow-lg sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255/0.2),transparent_60%)]" />
      <div className="relative">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-primary shadow-xl ring-8 ring-white/20 animate-check sm:size-20">
          <Check className="size-9 sm:size-11" strokeWidth={3} />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">{t("order.thanks", { name: firstName })}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/85 sm:text-base">{t("order.placedText")}</p>
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl bg-white/12 px-5 py-3 text-sm backdrop-blur">
          <span>
            {t("order.number")}: <strong className="font-mono tracking-wide" dir="ltr">{order.id}</strong>
          </span>
          <span className="hidden h-4 w-px bg-white/30 sm:block" />
          <span>
            {t("cart.total")}: <strong>{price(order.total)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-80 rounded-3xl" />
      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Skeleton className="h-72 rounded-3xl" />
        <Skeleton className="h-72 rounded-3xl" />
      </div>
    </div>
  );
}

/** Minutes from order placed to delivered, for "Delivered in 18 minutes". */
function deliveredMinutes(order: Order): number | undefined {
  const delivered = order.statusHistory.find((h) => h.status === "delivered")?.at;
  if (!delivered) return undefined;
  return Math.max(1, Math.round((Date.parse(delivered) - Date.parse(order.createdAt)) / 60_000));
}

function OrderDetails({ id, justPlaced }: { id: string; justPlaced: boolean }) {
  const order = useOrderStore((s) => s.orders.find((o) => o.id === id));
  const { t } = useI18n();
  if (!order) {
    return (
      <EmptyState
        icon={PackageSearch}
        title={t("order.notFound")}
        description={t("order.notFoundHint")}
        action={
          <Button asChild>
            <Link href="/account#orders">{t("nav.orders")}</Link>
          </Button>
        }
        className="rounded-3xl border border-dashed"
      />
    );
  }
  return <Tracking order={order} justPlaced={justPlaced} />;
}

function Tracking({ order, justPlaced }: { order: Order; justPlaced: boolean }) {
  const { t, price, date, num, packSize, storeName, productName } = useI18n();
  const router = useRouter();
  const advance = useOrderStore((s) => s.advance);
  const catalog = useCatalog();
  const reorder = useReorder();
  const { minutesLeft, riderProgress } = useOrderProgress(order);

  const active = order.status !== "delivered";
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);
  const slotDay = siteConfig.deliverySlots.find((s) => s.id === order.slotId)?.day ?? "today";
  const slotLabel = `${t(`slots.${slotDay}`)} · ${t(`slots.${order.slotId}`, { minutes: siteConfig.delivery.etaMinutes })}`;
  const tookMinutes = deliveredMinutes(order);
  const headline = active
    ? order.status === "out_for_delivery" && minutesLeft <= 1
      ? t("order.arrivingSoon")
      : t("order.arrivingIn", { minutes: minutesLeft })
    : t("order.deliveredIn", { minutes: tookMinutes ?? siteConfig.delivery.etaMinutes });

  return (
    <>
      {justPlaced && <Confirmation order={order} />}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl" dir="auto">
            {t("order.trackTitle", { number: order.id })}
          </h2>
          <p className="text-sm text-muted-foreground">{t("order.placedOn", { date: date(order.createdAt, "dateTime") })}</p>
        </div>
        <OrderStatusBadge status={order.status} className="px-3 py-1 text-sm" />
      </div>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-card">
        <div className="bg-primary px-5 py-4 text-primary-foreground sm:px-7">
          <p className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl">
            {active && (
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-white" />
              </span>
            )}
            {headline}
          </p>
          <p className="mt-0.5 text-sm text-white/85">{t(`order.statusText.${order.status}`)}</p>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {active && (order.status === "out_for_delivery" || order.status === "packing") && (
            <OrderMap progress={riderProgress} showRider={order.status === "out_for_delivery"} />
          )}

          <OrderTimeline order={order} />

          {order.status === "out_for_delivery" && (
            <div className="flex items-center gap-3 rounded-2xl border bg-deal-soft/60 p-4 animate-fade-up">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-deal text-lg font-bold text-white">
                {t("order.riderName").charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{t("order.rider")}</p>
                <p className="font-bold">{t("order.riderName")}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-star text-star" /> {t("order.riderRated")} · {t("order.riderVehicle")}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone /> {t("order.call")}
                </a>
              </Button>
            </div>
          )}

          {active && order.autoProgress && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed p-3.5">
              <p className="text-xs text-muted-foreground">{t("order.demoNote", { seconds: siteConfig.demo.orderStepSeconds })}</p>
              <Button variant="secondary" size="sm" onClick={() => advance(order.id)}>
                <FastForward className="rtl:-scale-x-100" />
                {t("order.advance")}
              </Button>
            </div>
          )}
        </div>
      </section>

      {!active && (
        <div className="mt-5">
          <RateOrder order={order} />
        </div>
      )}

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1fr_380px]">
        <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
          <h3 className="mb-2 font-bold">
            {t("order.items")} <span className="font-normal text-muted-foreground">({num(itemCount)})</span>
          </h3>
          <ul className="divide-y">
            {order.items.map((item) => {
              const product = catalog.find((p) => p.id === item.productId);
              return (
                <li key={item.productId} className="flex items-center gap-3 py-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl border">
                    <ProductImage
                      product={{ image: item.image, emoji: item.emoji, name: item.name, category: product?.category ?? "fruits-vegetables" }}
                      sizes="56px"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    {product ? (
                      <Link href={`/product/${item.productId}`} className="line-clamp-1 text-sm font-medium hover:text-primary">
                        {productName(product)}
                      </Link>
                    ) : (
                      <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {num(item.quantity)} × {price(item.price)} · {packSize(item.size)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{price(item.price * item.quantity)}</span>
                </li>
              );
            })}
          </ul>
          <BillDetails bill={order} couponCode={order.couponCode} className="mt-3 border-t pt-4" />
        </section>

        <aside className="space-y-5">
          <section className="space-y-4 rounded-3xl border bg-card p-5 shadow-card sm:p-6">
            <h3 className="font-bold">{t("order.details")}</h3>
            <InfoRow icon={<MapPin className="size-4" />} label={t("order.deliveryTo")}>
              <p>{order.customerName}</p>
              <p className="font-normal text-muted-foreground">
                {order.address.line}, {order.address.area}, {order.address.city}
              </p>
              <p className="font-normal text-muted-foreground" dir="ltr">
                {order.phone}
              </p>
            </InfoRow>
            {order.receiver && (
              <InfoRow icon={<Gift className="size-4" />} label={t("order.receiver")}>
                <p>{order.receiver.name}</p>
                <p className="font-normal text-muted-foreground" dir="ltr">
                  {order.receiver.phone}
                </p>
              </InfoRow>
            )}
            <InfoRow icon={<CalendarClock className="size-4" />} label={t("order.slot")}>
              {slotLabel}
            </InfoRow>
            <InfoRow icon={<CreditCard className="size-4" />} label={t("order.payment")}>
              {t(`payment.${order.paymentMethod}`)}
            </InfoRow>
            {order.couponCode && (
              <InfoRow icon={<Ticket className="size-4" />} label={t("order.coupon")}>
                <span dir="ltr">{order.couponCode}</span>
              </InfoRow>
            )}
            {order.instructions.length > 0 && (
              <InfoRow icon={<MessageSquareText className="size-4" />} label={t("order.instructions")}>
                {order.instructions.map((i) => t(`instructions.${i}`)).join(" · ")}
              </InfoRow>
            )}
            <InfoRow icon={<Store className="size-4" />} label={t("order.store")}>
              {storeName(order.storeId)}
            </InfoRow>
          </section>

          <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
            <p className="text-sm font-semibold">{t("order.help")}</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <HelpChat order={order} minutesLeft={minutesLeft} />
              <Button asChild className="bg-whatsapp text-white hover:bg-whatsapp/90">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Order ${order.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" />
                  {t("order.chat")}
                </a>
              </Button>
              {!active && (
                <Button
                  variant="outline"
                  onClick={() => {
                    reorder(order);
                    router.push("/cart");
                  }}
                >
                  <RotateCcw />
                  {t("order.reorder")}
                </Button>
              )}
              <Button asChild variant="ghost">
                <Link href="/">
                  <ArrowLeft className="rtl:-scale-x-100" />
                  {t("order.backToShop")}
                </Link>
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

export function OrderView({ id, justPlaced }: { id: string; justPlaced: boolean }) {
  return (
    <div className="container-page py-6 sm:py-10">
      <HydrationGate fallback={<OrderSkeleton />}>
        <OrderDetails id={id} justPlaced={justPlaced} />
      </HydrationGate>
    </div>
  );
}
