"use client";

import { ChevronRight, MapPin, Package, Pencil, Plus, RotateCcw, Trash2, Wallet } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { HydrationGate } from "@/components/shared/hydration-gate";
import { ProductImage } from "@/components/shared/product-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { demoUser } from "@/data/demo";
import { getSeedProduct } from "@/data/products";
import { useReorder } from "@/hooks/use-reorder";
import { useI18n } from "@/i18n/provider";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/orders";
import { useUserStore } from "@/store/user";

function AccountSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-40 rounded-3xl" />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}

function ProfileCard() {
  const { t } = useI18n();
  const profile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    updateProfile({ name: draft.name.trim(), phone: draft.phone.trim(), email: draft.email.trim() });
    setEditing(false);
    toast.success(t("account.saved"));
  };

  const fields = [
    { key: "name", label: t("account.name"), type: "text", ltr: false },
    { key: "phone", label: t("account.phone"), type: "tel", ltr: true },
    { key: "email", label: t("account.email"), type: "email", ltr: true },
  ] as const;

  return (
    <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{t("account.profile")}</h2>
        {!editing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDraft(profile);
              setEditing(true);
            }}
          >
            <Pencil /> {t("account.edit")}
          </Button>
        )}
      </div>
      {editing ? (
        <form onSubmit={save} className="space-y-4 animate-fade-up">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={`profile-${f.key}`}>{f.label}</Label>
              <Input
                id={`profile-${f.key}`}
                type={f.type}
                dir={f.ltr ? "ltr" : undefined}
                className={f.ltr ? "rtl:text-end" : undefined}
                value={draft[f.key]}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                required={f.key === "name"}
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <Button type="submit">{t("account.save")}</Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
              {t("account.cancel")}
            </Button>
          </div>
        </form>
      ) : (
        <dl className="divide-y overflow-hidden rounded-2xl border text-sm">
          {fields.map((f) => (
            <div key={f.key} className="grid grid-cols-[35%_1fr] gap-3 px-4 py-3">
              <dt className="text-muted-foreground">{f.label}</dt>
              <dd className="truncate font-medium">
                <span dir={f.ltr ? "ltr" : undefined}>{profile[f.key]}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

function AddressesCard() {
  const { t } = useI18n();
  const addresses = useUserStore((s) => s.addresses);
  const addAddress = useUserStore((s) => s.addAddress);
  const removeAddress = useUserStore((s) => s.removeAddress);
  const [adding, setAdding] = useState(false);
  const empty = { label: "", line: "", area: "", city: "Kabul" };
  const [draft, setDraft] = useState(empty);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.line.trim() || !draft.area.trim()) return;
    addAddress({ ...draft, label: draft.label.trim() || draft.area.trim() });
    setDraft(empty);
    setAdding(false);
    toast.success(t("account.addressAdded"));
  };

  return (
    <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{t("account.addresses")}</h2>
        {!adding && (
          <Button variant="ghost" size="sm" onClick={() => setAdding(true)}>
            <Plus /> {t("account.addAddress")}
          </Button>
        )}
      </div>
      <ul className="space-y-2.5">
        {addresses.map((a) => (
          <li key={a.id} className="flex items-start gap-3 rounded-2xl border p-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <MapPin className="size-4" />
            </span>
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-semibold">{a.label}</p>
              <p className="text-muted-foreground">
                {a.line}, {a.area}, {a.city}
              </p>
            </div>
            <button
              type="button"
              aria-label={t("account.remove")}
              onClick={() => {
                removeAddress(a.id);
                toast(t("account.addressRemoved"));
              }}
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      {adding && (
        <form onSubmit={submit} className="mt-4 grid gap-3 rounded-2xl bg-surface p-4 animate-fade-up sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="addr-label">{t("account.label")}</Label>
            <Input
              id="addr-label"
              value={draft.label}
              placeholder={t("account.labelPlaceholder")}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addr-city">{t("checkout.city")}</Label>
            <Input id="addr-city" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="addr-line">{t("checkout.addressLine")}</Label>
            <Input
              id="addr-line"
              required
              value={draft.line}
              placeholder={t("checkout.addressPlaceholder")}
              onChange={(e) => setDraft({ ...draft, line: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="addr-area">{t("checkout.area")}</Label>
            <Input
              id="addr-area"
              required
              value={draft.area}
              placeholder={t("checkout.areaPlaceholder")}
              onChange={(e) => setDraft({ ...draft, area: e.target.value })}
            />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit">{t("account.save")}</Button>
            <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
              {t("account.cancel")}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

function OrderHistory() {
  const { t, price, date, num } = useI18n();
  const orders = useOrderStore((s) => s.orders);
  const reorder = useReorder();

  return (
    <section id="orders" className="scroll-mt-40 rounded-3xl border bg-card p-5 shadow-card sm:p-6">
      <h2 className="mb-4 text-lg font-bold">{t("account.orders")}</h2>
      {orders.length === 0 ? (
        <EmptyState icon={Package} title={t("account.noOrders")} description={t("account.noOrdersHint")} className="py-8" />
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => {
            const count = order.items.reduce((n, i) => n + i.quantity, 0);
            return (
              <li key={order.id} className="rounded-2xl border p-4 transition hover:border-primary/30 hover:shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-bold">
                      <span dir="ltr">{order.id}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {date(order.createdAt)} · {t("cart.itemCount", { count })}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {order.items.slice(0, 5).map((item) => (
                      <span key={item.productId} className="size-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <ProductImage
                          product={{
                            image: item.image,
                            emoji: item.emoji,
                            name: item.name,
                            category: getSeedProduct(item.productId)?.category ?? "fruits-vegetables",
                          }}
                          sizes="40px"
                        />
                      </span>
                    ))}
                    {order.items.length > 5 && (
                      <span className="grid size-10 place-items-center rounded-full border-2 border-white bg-muted text-xs font-bold">
                        +{num(order.items.length - 5)}
                      </span>
                    )}
                  </div>
                  <p className="text-base font-extrabold tabular-nums">{price(order.total)}</p>
                </div>
                <div className="mt-3 flex gap-2 border-t pt-3">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/orders/${order.id}`}>
                      {order.status === "delivered" ? t("account.viewOrder") : t("order.track")}
                      <ChevronRight className="rtl:-scale-x-100" />
                    </Link>
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="ghost" size="sm" onClick={() => reorder(order)}>
                      <RotateCcw /> {t("order.reorder")}
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function AccountContents() {
  const { t, price, num, date } = useI18n();
  const profile = useUserStore((s) => s.profile);
  const addresses = useUserStore((s) => s.addresses);
  const orders = useOrderStore((s) => s.orders);
  const spent = orders.reduce((sum, o) => sum + o.total, 0);
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const resetDemo = () => {
    useUserStore.getState().reset();
    useOrderStore.getState().reset();
    useCartStore.getState().clear();
    toast.success(t("account.resetDone"));
  };

  const stats = [
    { icon: Package, label: t("account.statOrders"), value: num(orders.length) },
    { icon: Wallet, label: t("account.statSpent"), value: price(spent) },
    { icon: MapPin, label: t("account.statAddresses"), value: num(addresses.length) },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgb(255_255_255/0.18),transparent_50%)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-xl font-extrabold text-primary shadow-lg">
              {initials}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">{t("account.hello", { name: profile.name.split(" ")[0] })}</h1>
              <p className="text-sm text-white/80">{t("account.memberSince", { date: date(demoUser.memberSince, "monthYear") })}</p>
              <p className="mt-1 text-xs text-white/70">{t("account.demoNote")}</p>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-2xl bg-white/12 px-3 py-2.5 backdrop-blur sm:px-4">
                <Icon className="size-4 opacity-80" />
                <p className="mt-1 text-base font-extrabold tabular-nums sm:text-lg">{value}</p>
                <p className="text-[11px] text-white/75">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <ProfileCard />
          <AddressesCard />
          <Button variant="outline" className="w-full" onClick={resetDemo}>
            <RotateCcw /> {t("account.resetDemo")}
          </Button>
        </div>
        <OrderHistory />
      </div>
    </div>
  );
}

export function AccountView() {
  return (
    <div className="container-page py-6 sm:py-10">
      <HydrationGate fallback={<AccountSkeleton />}>
        <AccountContents />
      </HydrationGate>
    </div>
  );
}
