"use client";

import {
  AlertTriangle,
  Boxes,
  ClipboardList,
  ExternalLink,
  PackageX,
  RotateCcw,
  Search,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { HydrationGate } from "@/components/shared/hydration-gate";
import { ProductImage } from "@/components/shared/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, getSeedProduct, type CategorySlug } from "@/data/products";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { LOW_STOCK_THRESHOLD, normalizeText } from "@/lib/catalog";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCatalogStore } from "@/store/catalog";
import { useOrderStore } from "@/store/orders";

const RESTOCK_UNITS = 20;

/** Converts Eastern Arabic digits to Western so prices can be typed on a Dari/Pashto keyboard. */
function parseAmount(raw: string): number | null {
  const western = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d]/g, "");
  if (!western) return null;
  const n = Number(western);
  return Number.isFinite(n) ? n : null;
}

/** Number input that saves on blur or Enter, and reverts on Escape. */
function InlineNumberInput({
  value,
  onCommit,
  allowEmpty,
  label,
  className,
}: {
  value: number | undefined;
  onCommit: (value: number | null) => void;
  allowEmpty?: boolean;
  label: string;
  className?: string;
}) {
  const [draft, setDraft] = useState(value?.toString() ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(value?.toString() ?? "");
  }, [value, focused]);

  const commit = () => {
    const parsed = parseAmount(draft);
    if (parsed === null) {
      if (allowEmpty && value !== undefined) onCommit(null);
      else setDraft(value?.toString() ?? "");
      return;
    }
    if (parsed !== value) onCommit(parsed);
  };

  return (
    <Input
      aria-label={label}
      inputMode="numeric"
      dir="ltr"
      value={draft}
      placeholder={allowEmpty ? "—" : undefined}
      onFocus={() => setFocused(true)}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        setFocused(false);
        commit();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          setDraft(value?.toString() ?? "");
          setTimeout(() => (e.target as HTMLInputElement).blur());
        }
      }}
      className={cn("h-9 w-24 rounded-lg px-2.5 text-end tabular-nums md:text-sm", className)}
    />
  );
}

function StatCard({ icon: Icon, label, value, tone }: { icon: typeof Boxes; label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-card">
      <span className={cn("grid size-9 place-items-center rounded-xl", tone)}>
        <Icon className="size-[18px]" />
      </span>
      <p className="mt-3 text-xl font-extrabold tabular-nums sm:text-2xl">{value}</p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function ProductsTab() {
  const { t, productName, categoryName, num, packSize } = useI18n();
  const catalog = useCatalog();
  const overrides = useCatalogStore((s) => s.overrides);
  const updateProduct = useCatalogStore((s) => s.updateProduct);
  const resetProduct = useCatalogStore((s) => s.resetProduct);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const [lowOnly, setLowOnly] = useState(false);

  const rows = useMemo(() => {
    const q = normalizeText(query);
    return catalog.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (lowOnly && p.stock > LOW_STOCK_THRESHOLD) return false;
      if (!q) return true;
      return normalizeText(`${p.name} ${p.localName?.ps ?? ""} ${p.localName?.fa ?? ""} ${p.brand}`).includes(q);
    });
  }, [catalog, query, category, lowOnly]);

  const saved = (name: string) => toast.success(t("admin.saved", { name }), { id: "admin-save" });

  return (
    <div className="rounded-3xl border bg-card shadow-card">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("admin.search")} className="h-10 ps-9" />
        </div>
        <div className="flex items-center gap-3">
          <Select value={category} onValueChange={(v) => setCategory(v as CategorySlug | "all")}>
            <SelectTrigger size="sm" className="h-10 min-w-44 flex-1 sm:flex-none" aria-label={t("admin.category")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.allCategories")}</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.emoji} {categoryName(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium whitespace-nowrap">
            <Switch checked={lowOnly} onCheckedChange={setLowOnly} />
            {t("admin.lowStockOnly")}
          </label>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="p-10 text-center text-sm text-muted-foreground">{t("admin.noProducts")}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="ps-4">{t("admin.product")}</TableHead>
              <TableHead className="hidden lg:table-cell">{t("admin.category")}</TableHead>
              <TableHead className="text-end">{t("admin.price")} (؋)</TableHead>
              <TableHead className="text-end">{t("admin.salePrice")} (؋)</TableHead>
              <TableHead className="text-end">{t("admin.stock")}</TableHead>
              <TableHead className="text-center">{t("admin.inStock")}</TableHead>
              <TableHead className="pe-4">
                <span className="sr-only">{t("admin.edited")}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => {
              const name = productName(p);
              const edited = Boolean(overrides[p.id]);
              const low = p.inStock && p.stock <= LOW_STOCK_THRESHOLD;
              const category = categories.find((c) => c.slug === p.category);
              return (
                <TableRow key={p.id} className={cn(!p.inStock && "bg-muted/30")}>
                  <TableCell className="ps-4">
                    <div className="flex min-w-56 items-center gap-3">
                      <span className="size-11 shrink-0 overflow-hidden rounded-xl border">
                        <ProductImage product={p} sizes="44px" />
                      </span>
                      <div className="min-w-0">
                        <Link href={`/product/${p.id}`} className="line-clamp-1 font-semibold hover:text-primary">
                          {name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {p.brand} · {packSize(p.size)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {category && categoryName(category)}
                  </TableCell>
                  <TableCell className="text-end">
                    <InlineNumberInput
                      label={`${t("admin.price")}: ${name}`}
                      value={p.price}
                      onCommit={(price) => {
                        if (!price) return;
                        updateProduct(p.id, { price });
                        saved(name);
                      }}
                      className="ms-auto"
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <InlineNumberInput
                      label={`${t("admin.salePrice")}: ${name}`}
                      value={p.salePrice}
                      allowEmpty
                      onCommit={(salePrice) => {
                        if (salePrice !== null && salePrice >= p.price) {
                          toast.error(t("admin.saleInvalid"), { id: "admin-save" });
                          return;
                        }
                        updateProduct(p.id, { salePrice: salePrice || null });
                        saved(name);
                      }}
                      className={cn("ms-auto", p.onSale && "border-deal/40 text-deal")}
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex items-center justify-end gap-2">
                      {low && (
                        <AlertTriangle className="size-4 shrink-0 text-deal" aria-label={t("admin.statLowStock")} />
                      )}
                      <InlineNumberInput
                        label={`${t("admin.stock")}: ${name}`}
                        value={p.stock}
                        onCommit={(stock) => {
                          updateProduct(p.id, { stock: stock ?? 0 });
                          saved(name);
                        }}
                        className={cn("w-20", !p.inStock && "border-destructive/40 text-destructive")}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      aria-label={`${t("admin.inStock")}: ${name}`}
                      checked={p.inStock}
                      onCheckedChange={(on) => {
                        if (on) {
                          const seed = getSeedProduct(p.id)?.stock ?? 0;
                          updateProduct(p.id, { stock: seed > 0 ? seed : RESTOCK_UNITS });
                          toast.success(t("admin.restocked", { name }), { id: "admin-save" });
                        } else {
                          updateProduct(p.id, { stock: 0 });
                          toast(t("admin.markedOut", { name }), { id: "admin-save" });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="pe-4">
                    {edited && (
                      <div className="flex items-center justify-end gap-1">
                        <Badge variant="info" className="hidden sm:inline-flex">
                          {t("admin.edited")}
                        </Badge>
                        <button
                          type="button"
                          title={t("admin.resetRow")}
                          aria-label={`${t("admin.resetRow")}: ${name}`}
                          onClick={() => resetProduct(p.id)}
                          className="grid size-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <RotateCcw className="size-4" />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <p className="border-t px-4 py-3 text-xs text-muted-foreground">
        {t("category.productsCount", { count: rows.length })} · {num(catalog.length)}
      </p>
    </div>
  );
}

function OrdersTab() {
  const { t, price, date, num } = useI18n();
  const orders = useOrderStore((s) => s.orders);
  const setStatus = useOrderStore((s) => s.setStatus);

  if (orders.length === 0) {
    return <p className="rounded-3xl border bg-card p-10 text-center text-sm text-muted-foreground">{t("admin.noOrders")}</p>;
  }

  return (
    <div className="rounded-3xl border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="ps-4">{t("admin.order")}</TableHead>
            <TableHead>{t("admin.date")}</TableHead>
            <TableHead>{t("admin.customer")}</TableHead>
            <TableHead className="text-end">{t("admin.items")}</TableHead>
            <TableHead className="text-end">{t("admin.total")}</TableHead>
            <TableHead>{t("admin.payment")}</TableHead>
            <TableHead className="pe-4">{t("admin.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="ps-4">
                <Link href={`/orders/${order.id}`} className="inline-flex items-center gap-1 font-bold whitespace-nowrap text-primary hover:underline">
                  <span dir="ltr">{order.id}</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {date(order.createdAt, "dateTime")}
              </TableCell>
              <TableCell>
                <p className="font-medium whitespace-nowrap">{order.customerName}</p>
                <p className="text-xs whitespace-nowrap text-muted-foreground" dir="ltr">
                  {order.phone}
                </p>
              </TableCell>
              <TableCell className="text-end tabular-nums">{num(order.items.reduce((n, i) => n + i.quantity, 0))}</TableCell>
              <TableCell className="text-end font-semibold whitespace-nowrap tabular-nums">{price(order.total)}</TableCell>
              <TableCell className="whitespace-nowrap">{t(`payment.${order.paymentMethod}`)}</TableCell>
              <TableCell className="pe-4">
                <Select
                  value={order.status}
                  onValueChange={(value) => {
                    const status = value as OrderStatus;
                    setStatus(order.id, status);
                    toast.success(t("admin.statusUpdated", { number: order.id, status: t(`order.status.${status}`) }), {
                      id: "admin-status",
                    });
                  }}
                >
                  <SelectTrigger size="sm" className="h-9 min-w-44 rounded-full border-0 bg-transparent p-0 pe-2 shadow-none focus-visible:ring-0 [&>svg]:ms-auto">
                    <OrderStatusBadge status={order.status} className="px-2.5 py-1" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {ORDER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {t(`order.status.${s}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-[480px] rounded-3xl" />
    </div>
  );
}

function AdminContents() {
  const { t, num, price } = useI18n();
  const catalog = useCatalog();
  const orders = useOrderStore((s) => s.orders);

  const outOfStock = catalog.filter((p) => !p.inStock).length;
  const lowStock = catalog.filter((p) => p.inStock && p.stock <= LOW_STOCK_THRESHOLD).length;
  const activeOrders = orders.filter((o) => o.status !== "delivered").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={Boxes} label={t("admin.statProducts")} value={num(catalog.length)} tone="bg-primary-soft text-primary" />
        <StatCard icon={PackageX} label={t("admin.statOutOfStock")} value={num(outOfStock)} tone="bg-destructive/10 text-destructive" />
        <StatCard icon={AlertTriangle} label={t("admin.statLowStock")} value={num(lowStock)} tone="bg-deal-soft text-deal" />
        <StatCard icon={Truck} label={t("admin.statActiveOrders")} value={num(activeOrders)} tone="bg-sky-50 text-sky-700" />
        <StatCard icon={Wallet} label={t("admin.statRevenue")} value={price(revenue)} tone="bg-violet-50 text-violet-700" />
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">
            <Boxes /> {t("admin.products")}
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ClipboardList /> {t("admin.orders")}
            {activeOrders > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-deal px-1 text-[11px] text-white">
                {num(activeOrders)}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function AdminView() {
  const { t } = useI18n();

  const resetAll = () => {
    useCatalogStore.getState().reset();
    useOrderStore.getState().reset();
    toast.success(t("admin.resetDone"));
  };

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="soft" className="mb-2">
            <ShieldCheck /> {t("admin.demoNote")}
          </Badge>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("admin.title")}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("admin.subtitle")}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={resetAll}>
            <RotateCcw /> {t("admin.reset")}
          </Button>
          <Button asChild>
            <Link href="/">
              <ExternalLink /> {t("admin.storefront")}
            </Link>
          </Button>
        </div>
      </div>
      <HydrationGate fallback={<AdminSkeleton />}>
        <AdminContents />
      </HydrationGate>
    </div>
  );
}
