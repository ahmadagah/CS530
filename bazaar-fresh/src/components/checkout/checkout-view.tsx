"use client";

import { Banknote, Gift, Info, Landmark, Loader2, Lock, LogIn, MapPin, ShoppingBasket, Smartphone, Store, Wallet, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { BillDetails } from "@/components/cart/bill-details";
import { CouponSection } from "@/components/cart/coupon-section";
import { EmptyState } from "@/components/shared/empty-state";
import { HydrationGate } from "@/components/shared/hydration-gate";
import { ProductImage } from "@/components/shared/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getStore, siteConfig, type DeliverySlotId, type PaymentMethod, type StoreId } from "@/config/site";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { toBill } from "@/lib/pricing";
import type { OrderItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/orders";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

/** Afghan mobile numbers: 07X XXX XXXX, optionally written with +93 / 0093. */
const AFGHAN_MOBILE = /^(?:\+93|0093|0)?7\d{8}$/;
const NEW_ADDRESS = "new";
const paymentIcons: Record<PaymentMethod, typeof Banknote> = { cod: Banknote, wallet: Wallet, hesabpay: Smartphone, bank: Landmark };

function Step({ n, title, icon, children }: { n: number; title: string; icon: ReactNode; children: ReactNode }) {
  const { num } = useI18n();
  return (
    <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
      <h2 className="flex items-center gap-3 text-lg font-bold">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
          {num(n)}
        </span>
        <span className="flex-1">{title}</span>
        <span className="text-muted-foreground">{icon}</span>
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-destructive" id={`${id}-error`}>
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

const choiceCard =
  "relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft/60 has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary";

function CheckoutSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-44 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-96 rounded-3xl" />
    </div>
  );
}

function CheckoutForm() {
  const router = useRouter();
  const { t, price, locale, productName, num } = useI18n();
  const cart = useCart();
  const profile = useUserStore((s) => s.profile);
  const addresses = useUserStore((s) => s.addresses);
  const defaultStore = useUserStore((s) => s.storeId);
  const deliveryAddressId = useUserStore((s) => s.deliveryAddressId);
  const walletBalance = useUserStore((s) => s.walletBalance);
  const instructions = useCartStore((s) => s.instructions);

  const [storeId, setStoreId] = useState<StoreId>(defaultStore);
  const [addressId, setAddressId] = useState(deliveryAddressId ?? addresses[0]?.id ?? NEW_ADDRESS);
  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [receiver, setReceiver] = useState({ name: "", phone: "" });
  const [newAddress, setNewAddress] = useState({ line: "", area: "", city: storeId.startsWith("herat") ? "Herat" : "Kabul" });
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [slotId, setSlotId] = useState<DeliverySlotId>(siteConfig.deliverySlots[0].id);
  const [payment, setPayment] = useState<PaymentMethod>(siteConfig.paymentMethods[0]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  if (cart.items.length === 0 && !placing) {
    return (
      <EmptyState
        icon={ShoppingBasket}
        title={t("checkout.emptyTitle")}
        description={t("checkout.emptyHint")}
        action={
          <Button asChild size="lg">
            <Link href="/">{t("cart.startShopping")}</Link>
          </Button>
        }
        className="rounded-3xl border border-dashed"
      />
    );
  }

  const store = getStore(storeId);
  const usingNewAddress = addressId === NEW_ADDRESS;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t("checkout.errors.required");
    if (!AFGHAN_MOBILE.test(phone.replace(/[\s\-()]/g, ""))) next.phone = t("checkout.errors.phone");
    if (forSomeoneElse) {
      if (!receiver.name.trim()) next.receiverName = t("checkout.errors.required");
      if (!AFGHAN_MOBILE.test(receiver.phone.replace(/[\s\-()]/g, ""))) next.receiverPhone = t("checkout.errors.phone");
    }
    if (payment === "wallet" && walletBalance < cart.total) next.payment = t("checkout.walletLow");
    if (usingNewAddress) {
      if (!newAddress.line.trim()) next.line = t("checkout.errors.required");
      if (!newAddress.area.trim()) next.area = t("checkout.errors.required");
      if (!newAddress.city.trim()) next.city = t("checkout.errors.required");
    }
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (placing) return;
    const found = validate();
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      toast.error(t("checkout.errors.fix"), { id: "checkout-error" });
      document.getElementById(firstError)?.focus();
      return;
    }

    setPlacing(true);
    // Simulate a short network round-trip so the demo feels real.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = useUserStore.getState();
    const address = usingNewAddress
      ? user.addAddress({ label: newAddress.area.trim(), line: newAddress.line.trim(), area: newAddress.area.trim(), city: newAddress.city.trim() })
      : (addresses.find((a) => a.id === addressId) ?? addresses[0]);
    user.updateProfile({ name: name.trim(), phone: phone.trim() });

    const items: OrderItem[] = cart.items.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      image: product.image,
      emoji: product.emoji,
      unit: product.unit,
      size: product.size,
      price: product.finalPrice,
      quantity,
    }));
    const order = useOrderStore.getState().placeOrder({
      customerName: name.trim(),
      phone: phone.trim(),
      storeId,
      address: { label: address.label, line: address.line, area: address.area, city: address.city },
      slotId,
      paymentMethod: payment,
      receiver: forSomeoneElse ? { name: receiver.name.trim(), phone: receiver.phone.trim() } : undefined,
      couponCode: cart.appliedCoupon,
      instructions,
      notes: notes.trim() || undefined,
      items,
      ...toBill(cart),
    });
    if (payment === "wallet") {
      user.payFromWallet(order.total, order.id);
      toast(t("checkout.walletPaid", { amount: price(order.total) }));
    }
    useCartStore.getState().clear();
    toast.success(t("checkout.orderPlaced"), { description: t("checkout.orderPlacedDesc", { number: order.id }) });
    router.push(`/orders/${order.id}?placed=1`);
  };

  const slotGroups = (["today", "tomorrow"] as const).map((day) => ({
    day,
    slots: siteConfig.deliverySlots.filter((s) => s.day === day),
  }));

  const placeLabel = placing ? t("checkout.placing") : t("checkout.placeOrder", { amount: price(cart.total) });

  return (
    <form id="checkout-form" onSubmit={onSubmit} noValidate className="grid items-start gap-6 pb-24 lg:grid-cols-[1fr_400px] lg:pb-0">
      <div className="space-y-4">
        <Step n={1} title={t("checkout.store")} icon={<Store className="size-5" />}>
          <Select
            value={storeId}
            onValueChange={(v) => {
              const id = v as StoreId;
              setStoreId(id);
              setNewAddress((a) => ({ ...a, city: id.startsWith("herat") ? "Herat" : "Kabul" }));
            }}
          >
            <SelectTrigger className="w-full" aria-label={t("checkout.store")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {siteConfig.stores.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>
              {store.address[locale]} · {store.hours[locale]}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t("checkout.storeHint")}</p>
        </Step>

        <Step n={2} title={t("checkout.address")} icon={<MapPin className="size-5" />}>
          <RadioGroup value={addressId} onValueChange={setAddressId} className="gap-2.5">
            {addresses.map((a) => (
              <label key={a.id} className={choiceCard}>
                <RadioGroupItem value={a.id} className="mt-0.5" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{a.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {a.line}, {a.area}, {a.city}
                  </span>
                </span>
              </label>
            ))}
            <label className={choiceCard}>
              <RadioGroupItem value={NEW_ADDRESS} className="mt-0.5" />
              <span className="text-sm font-semibold">{t("checkout.newAddress")}</span>
            </label>
          </RadioGroup>

          {usingNewAddress && (
            <div className="mt-4 grid gap-4 rounded-2xl bg-surface p-4 animate-fade-up sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="line" label={t("checkout.addressLine")} error={errors.line}>
                  <Input
                    id="line"
                    value={newAddress.line}
                    onChange={(e) => setNewAddress({ ...newAddress, line: e.target.value })}
                    placeholder={t("checkout.addressPlaceholder")}
                    aria-invalid={Boolean(errors.line)}
                    autoComplete="street-address"
                  />
                </Field>
              </div>
              <Field id="area" label={t("checkout.area")} error={errors.area}>
                <Input
                  id="area"
                  value={newAddress.area}
                  onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                  placeholder={t("checkout.areaPlaceholder")}
                  aria-invalid={Boolean(errors.area)}
                />
              </Field>
              <Field id="city" label={t("checkout.city")} error={errors.city}>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  aria-invalid={Boolean(errors.city)}
                  autoComplete="address-level2"
                />
              </Field>
            </div>
          )}
        </Step>

        <Step n={3} title={t("checkout.contact")} icon={<Smartphone className="size-5" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label={t("checkout.name")} error={errors.name}>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
              />
            </Field>
            <Field id="phone" label={t("checkout.phone")} error={errors.phone} hint={t("checkout.phoneHint")}>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                autoComplete="tel"
                className="text-start rtl:text-end"
              />
            </Field>
          </div>
          <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-surface p-3.5 text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Gift className="size-4 text-deal" /> {t("checkout.forSomeoneElse")}
            </span>
            <Switch checked={forSomeoneElse} onCheckedChange={setForSomeoneElse} />
          </label>
          {forSomeoneElse && (
            <div className="mt-4 grid gap-4 animate-fade-up sm:grid-cols-2">
              <Field id="receiverName" label={t("checkout.receiverName")} error={errors.receiverName}>
                <Input
                  id="receiverName"
                  value={receiver.name}
                  onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
                  aria-invalid={Boolean(errors.receiverName)}
                />
              </Field>
              <Field id="receiverPhone" label={t("checkout.receiverPhone")} error={errors.receiverPhone}>
                <Input
                  id="receiverPhone"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  value={receiver.phone}
                  onChange={(e) => setReceiver({ ...receiver, phone: e.target.value })}
                  aria-invalid={Boolean(errors.receiverPhone)}
                  className="text-start rtl:text-end"
                />
              </Field>
            </div>
          )}
        </Step>

        <Step n={4} title={t("checkout.slot")} icon={<Zap className="size-5" />}>
          <RadioGroup value={slotId} onValueChange={(v) => setSlotId(v as DeliverySlotId)} className="gap-5">
            {slotGroups.map((group) => (
              <div key={group.day}>
                <p className="mb-2.5 text-xs font-bold tracking-wide text-muted-foreground uppercase">{t(`slots.${group.day}`)}</p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {group.slots.map((slot) => (
                    <label
                      key={slot.id}
                      className={cn(choiceCard, "flex-col gap-1.5 p-3.5", slot.id === "express" && "col-span-2 sm:col-span-1")}
                    >
                      <span className="flex w-full items-center justify-between gap-2">
                        <RadioGroupItem value={slot.id} />
                        {slot.id === "express" && (
                          <Badge variant="deal" className="text-[10px]">
                            <Zap /> {t("slots.fastest")}
                          </Badge>
                        )}
                      </span>
                      <span className="text-sm leading-snug font-semibold">
                        {t(`slots.${slot.id}`, { minutes: siteConfig.delivery.etaMinutes })}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </RadioGroup>
        </Step>

        <Step n={5} title={t("checkout.payment")} icon={<Lock className="size-5" />}>
          <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="gap-2.5">
            {siteConfig.paymentMethods.map((method, i) => {
              const Icon = paymentIcons[method];
              return (
                <label key={method} className={choiceCard}>
                  <RadioGroupItem value={method} className="mt-1" />
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-border">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                      {t(`payment.${method}`)}
                      {i === 0 && <Badge variant="soft">{t("payment.popular")}</Badge>}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{t(`payment.${method}Desc`)}</span>
                    {method === "wallet" && (
                      <span className={cn("mt-1 block text-xs font-bold", walletBalance >= cart.total ? "text-primary" : "text-destructive")}>
                        {t("checkout.walletBalance", { amount: price(walletBalance) })}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </RadioGroup>
          {errors.payment && <p className="mt-2 text-xs font-medium text-destructive">{errors.payment}</p>}
          <div className="mt-5">
            <Field id="notes" label={t("checkout.notes")}>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("checkout.notesPlaceholder")}
                rows={2}
              />
            </Field>
          </div>
        </Step>
      </div>

      <aside className="lg:sticky lg:top-36">
        <div className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{t("cart.summary")}</h2>
            <Link href="/cart" className="text-sm font-semibold text-primary hover:underline">
              {t("checkout.editCart")}
            </Link>
          </div>
          <ul className="-mx-1 mb-5 max-h-72 space-y-3 overflow-y-auto px-1">
            {cart.items.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-xl border">
                  <ProductImage product={product} sizes="48px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm font-medium">{productName(product)}</span>
                  <span className="text-xs text-muted-foreground">
                    {num(quantity)} × {price(product.finalPrice)}
                  </span>
                </span>
                <span className="text-sm font-semibold tabular-nums">{price(lineTotal)}</span>
              </li>
            ))}
          </ul>
          <CouponSection subtotal={cart.subtotal} className="mb-5" />
          <BillDetails bill={cart} savings={cart.savings} couponCode={cart.appliedCoupon} />
          <Button type="submit" size="lg" className="mt-5 hidden w-full lg:flex" disabled={placing}>
            {placing && <Loader2 className="animate-spin" />}
            {placeLabel}
          </Button>
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-surface p-3 text-xs text-muted-foreground">
            <Info className="mt-px size-4 shrink-0" />
            {t("checkout.agree")}
          </p>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t bg-white/95 p-3 shadow-[0_-6px_20px_rgb(0_0_0/0.06)] backdrop-blur md:bottom-0 lg:hidden">
        <Button type="submit" size="lg" className="w-full" disabled={placing}>
          {placing && <Loader2 className="animate-spin" />}
          {placeLabel}
        </Button>
      </div>

      {placing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur-sm animate-in fade-in" role="status">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-8 shadow-2xl">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="font-semibold">{t("checkout.placing")}</p>
          </div>
        </div>
      )}
    </form>
  );
}

/** Checkout needs a (demo) login, like Blinkit's "Login to proceed". */
function LoginGate({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const loggedIn = useUserStore((s) => s.loggedIn);
  const openLogin = useUIStore((s) => s.openLogin);
  if (loggedIn) return <>{children}</>;
  return (
    <EmptyState
      icon={LogIn}
      title={t("auth.loginToProceed")}
      description={t("auth.loginToSee")}
      action={
        <Button size="lg" onClick={() => openLogin("/checkout")}>
          {t("header.login")}
        </Button>
      }
      className="rounded-3xl border border-dashed"
    />
  );
}

export function CheckoutView() {
  const { t } = useI18n();
  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("checkout.title")}</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Lock className="size-4" />
          {t("checkout.demoNote")}
        </p>
      </div>
      <HydrationGate fallback={<CheckoutSkeleton />}>
        <LoginGate>
          <CheckoutForm />
        </LoginGate>
      </HydrationGate>
    </div>
  );
}
