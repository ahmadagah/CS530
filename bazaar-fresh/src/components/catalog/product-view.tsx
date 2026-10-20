"use client";

import { Banknote, CircleCheck, CircleX, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddToCartControl } from "@/components/product/add-to-cart-control";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Price } from "@/components/shared/price";
import { ProductImage } from "@/components/shared/product-image";
import { Rating } from "@/components/shared/rating";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/data/products";
import { useCartQuantity } from "@/hooks/use-cart";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { discountPercent, LOW_STOCK_THRESHOLD } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductView({ id }: { id: string }) {
  const { t, locale, price, packSize, productName, categoryName } = useI18n();
  const catalog = useCatalog();
  const product = catalog.find((p) => p.id === id);
  const inCart = useCartQuantity(id);
  const buyBox = useRef<HTMLDivElement>(null);
  const [buyBoxVisible, setBuyBoxVisible] = useState(true);

  // On phones, show a sticky add-to-cart bar once the main button scrolls out of view.
  useEffect(() => {
    const el = buyBox.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setBuyBoxVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const related = useMemo(() => {
    if (!product) return [];
    return catalog
      .filter((p) => p.category === product.category && p.id !== product.id)
      .sort((a, b) => Number(b.inStock) - Number(a.inStock) || b.reviews - a.reviews)
      .slice(0, 10);
  }, [catalog, product]);

  if (!product) return null;
  const category = getCategory(product.category);
  const name = productName(product);
  // Show the "other" name as a subtitle: the local name in English, the English name in Pashto/Dari.
  const altName = locale === "en" ? product.localName?.fa : product.localName ? product.name : undefined;
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;
  const { promiseHours } = siteConfig.delivery;

  const details = [
    { label: t("product.brand"), value: product.brand },
    { label: t("product.size"), value: packSize(product.size) },
    { label: t("product.origin"), value: product.origin === "local" ? t("product.local") : t("product.imported") },
    { label: t("product.category"), value: category ? categoryName(category) : "" },
  ];

  return (
    <div className="container-page pt-5 pb-24 sm:py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: t("nav.home") },
          ...(category ? [{ href: `/category/${category.slug}`, label: categoryName(category) }] : []),
          { label: name },
        ]}
      />

      <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border shadow-card md:sticky md:top-36">
            <ProductImage product={product} priority sizes="(max-width: 768px) 100vw, 600px" className={cn(!product.inStock && "opacity-70")} />
            <div className="pointer-events-none absolute start-4 top-4 flex flex-col gap-2">
              {product.onSale && (
                <Badge variant="deal" className="px-3 py-1 text-sm">
                  {t("product.off", { percent: discountPercent(product) })}
                </Badge>
              )}
              {product.origin === "local" && (
                <Badge variant="soft" className="bg-white/90 px-3 py-1 text-sm backdrop-blur">
                  {t("product.localBadge")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-primary">{product.brand}</p>
          <h1 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{name}</h1>
          {altName && (
            <p className="mt-1 text-base text-muted-foreground">
              <bdi>{altName}</bdi>
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Rating rating={product.rating} reviews={product.reviews} className="text-sm" />
            <span className="text-sm text-muted-foreground">{packSize(product.size)}</span>
          </div>

          <div ref={buyBox} className="mt-5 rounded-3xl border bg-surface p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <Price product={product} size="lg" />
              {product.onSale && (
                <Badge variant="dealSoft" className="px-3 py-1 text-sm">
                  {t("product.save", { amount: price(product.price - product.finalPrice) })}
                </Badge>
              )}
            </div>

            <p
              className={cn(
                "mt-3 flex items-center gap-1.5 text-sm font-semibold",
                !product.inStock ? "text-muted-foreground" : lowStock ? "text-deal" : "text-primary",
              )}
            >
              {product.inStock ? <CircleCheck className="size-4" /> : <CircleX className="size-4" />}
              {!product.inStock
                ? t("product.outOfStock")
                : lowStock
                  ? t("product.lowStock", { count: product.stock })
                  : t("product.inStock")}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <AddToCartControl product={product} variant="page" />
              {inCart > 0 && (
                <span className="text-sm text-muted-foreground animate-in fade-in">
                  {t("product.inCart", { count: inCart })} · {price(inCart * product.finalPrice)}
                </span>
              )}
            </div>
            {!product.inStock && <p className="mt-3 text-sm text-muted-foreground">{t("product.soldOutNote")}</p>}
          </div>

          <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {[
              { icon: Truck, text: t("product.deliveryNote", { hours: promiseHours }), flip: true },
              { icon: Banknote, text: t("product.codNote") },
              { icon: ShieldCheck, text: t("product.freshNote") },
            ].map(({ icon: Icon, text, flip }) => (
              <li key={text} className="flex items-center gap-2.5 rounded-2xl border p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                  <Icon className={cn("size-[18px]", flip && "rtl:-scale-x-100")} />
                </span>
                <span className="text-xs leading-snug font-medium">{text}</span>
              </li>
            ))}
          </ul>

          <section className="mt-7">
            <h2 className="text-lg font-bold">{t("product.description")}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground" lang="en" dir="ltr">
              {product.description}
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="mb-3 text-lg font-bold">{t("product.details")}</h2>
            <dl className="divide-y overflow-hidden rounded-2xl border text-sm">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[40%_1fr] gap-3 px-4 py-3">
                  <dt className="text-muted-foreground">{d.label}</dt>
                  <dd className="font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      {product.inStock && (
        <div
          aria-hidden={buyBoxVisible}
          className={cn(
            "fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t bg-white/95 px-4 py-2.5 shadow-[0_-6px_20px_rgb(0_0_0/0.06)] backdrop-blur transition-transform duration-300 md:hidden",
            buyBoxVisible ? "pointer-events-none translate-y-[calc(100%+4rem)]" : "translate-y-0",
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{name}</p>
            <Price product={product} size="sm" />
          </div>
          <AddToCartControl product={product} variant="page" className="h-11 w-auto min-w-0 px-5 sm:min-w-0" />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <SectionHeader
            title={t("product.related")}
            href={category ? `/category/${category.slug}` : undefined}
            linkLabel={t("home.seeAll")}
          />
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
