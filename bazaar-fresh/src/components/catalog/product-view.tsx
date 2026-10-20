"use client";

import { BadgePercent, Boxes, ChevronRight, CircleCheck, CircleX, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddToCartControl } from "@/components/product/add-to-cart-control";
import { EtaPill } from "@/components/product/product-card";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Price } from "@/components/shared/price";
import { ProductImage } from "@/components/shared/product-image";
import { Rating } from "@/components/shared/rating";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/products";
import { useCartQuantity } from "@/hooks/use-cart";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { collapseVariants, discountPercent, LOW_STOCK_THRESHOLD, variantsOf } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductView({ id }: { id: string }) {
  const { t, locale, price, packSize, productName, categoryName, siteName } = useI18n();
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

  const { similar, alsoBought } = useMemo(() => {
    if (!product) return { similar: [], alsoBought: [] };
    const others = catalog.filter((p) => p.id !== product.id && (!product.variantGroup || p.variantGroup !== product.variantGroup));
    const rank = (a: (typeof catalog)[number], b: (typeof catalog)[number]) =>
      Number(b.inStock) - Number(a.inStock) || b.reviews - a.reviews;
    return {
      similar: collapseVariants(others.filter((p) => p.category === product.category).sort(rank)).slice(0, 10),
      alsoBought: collapseVariants(others.filter((p) => p.category !== product.category && p.popular && p.inStock).sort(rank)).slice(0, 10),
    };
  }, [catalog, product]);

  if (!product) return null;
  const category = getCategory(product.category);
  const subcategory = category?.subcategories.find((s) => s.slug === product.subcategory);
  const variants = variantsOf(product, catalog);
  const name = productName(product);
  // Show the "other" name as a subtitle: the Dari name in English, the English name in Pashto/Dari.
  const altName = locale === "en" ? product.localName?.fa : product.localName ? product.name : undefined;
  const lowStock = product.inStock && product.stock <= LOW_STOCK_THRESHOLD;

  const details = [
    { label: t("product.description"), value: product.description, ltr: true },
    { label: t("product.brand"), value: product.brand },
    { label: t("product.size"), value: packSize(product.size) },
    { label: t("product.shelfLife"), value: category?.shelfLife[locale] ?? "" },
    { label: t("product.countryOfOrigin"), value: product.origin === "local" ? t("product.afghanistan") : t("product.imported") },
    { label: t("product.returnPolicy"), value: t("product.returnPolicyText") },
    { label: t("product.disclaimer"), value: t("product.disclaimerText") },
  ];

  const why = [
    { icon: Zap, title: t("product.why1Title"), text: t("product.why1Text") },
    { icon: BadgePercent, title: t("product.why2Title"), text: t("product.why2Text") },
    { icon: Boxes, title: t("product.why3Title"), text: t("product.why3Text", { count: Math.floor(catalog.length / 10) * 10 }) },
  ];

  const detailsSection = (
    <section>
      <h2 className="mb-3 text-lg font-bold">{t("product.details")}</h2>
      <dl className="space-y-4 text-sm">
        {details.map((d) => (
          <div key={d.label}>
            <dt className="font-semibold">{d.label}</dt>
            <dd className="mt-0.5 leading-relaxed text-muted-foreground" lang={d.ltr ? "en" : undefined} dir={d.ltr ? "ltr" : undefined}>
              {d.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );

  return (
    <div className="container-page pt-4 pb-24 sm:py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: t("nav.home") },
          ...(category ? [{ href: `/category/${category.slug}`, label: categoryName(category) }] : []),
          ...(subcategory ? [{ label: categoryName(subcategory) }] : []),
          { label: name },
        ]}
      />

      <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border shadow-card">
            <ProductImage product={product} priority sizes="(max-width: 768px) 100vw, 600px" className={cn(!product.inStock && "opacity-60 grayscale")} />
            {product.onSale && (
              <span className="absolute start-4 top-0 rounded-b-xl bg-deal px-2.5 pt-1.5 pb-2 text-sm font-extrabold text-deal-foreground shadow">
                {t("product.off", { percent: discountPercent(product) }).toUpperCase()}
              </span>
            )}
          </div>
          <div className="hidden md:block">{detailsSection}</div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{name}</h1>
          {altName && (
            <p className="mt-1 text-base text-muted-foreground">
              <bdi>{altName}</bdi>
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <EtaPill className="text-[11px]" />
            <Rating rating={product.rating} reviews={product.reviews} className="text-sm" />
            {product.origin === "local" && <Badge variant="soft">{t("product.localBadge")}</Badge>}
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(product.brand)}`}
            className="mt-3 inline-flex w-fit items-center gap-0.5 text-sm font-semibold text-primary hover:underline"
          >
            {t("product.viewBrand", { brand: product.brand })}
            <ChevronRight className="size-4 rtl:-scale-x-100" />
          </Link>

          <div className="my-5 h-px bg-border" />

          {variants.length > 1 && (
            <section className="mb-5">
              <h2 className="mb-2.5 text-sm font-bold">{t("product.selectUnit")}</h2>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {variants.map((v) => {
                  const active = v.id === product.id;
                  return (
                    <Link
                      key={v.id}
                      href={`/product/${v.id}`}
                      replace
                      scroll={false}
                      className={cn(
                        "relative rounded-2xl border p-3 text-center transition hover:border-primary/50",
                        active && "border-primary bg-primary-soft/60 ring-1 ring-primary",
                        !v.inStock && "opacity-60",
                      )}
                    >
                      {v.onSale && (
                        <span className="absolute -top-2 start-1/2 -translate-x-1/2 rounded-md bg-deal px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-white rtl:translate-x-1/2">
                          {t("product.off", { percent: discountPercent(v) }).toUpperCase()}
                        </span>
                      )}
                      <span className="block text-sm font-semibold">{packSize(v.size)}</span>
                      <span className="mt-1 block text-sm font-extrabold tabular-nums">{price(v.finalPrice)}</span>
                      {v.onSale && <span className="block text-xs text-muted-foreground line-through">{price(v.price)}</span>}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div ref={buyBox} className="rounded-3xl border bg-surface p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">{packSize(product.size)}</p>
                <Price product={product} size="lg" />
              </div>
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

          <section className="mt-6">
            <h2 className="mb-3 text-base font-bold">{t("product.whyTitle", { name: siteName })}</h2>
            <ul className="space-y-3">
              {why.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{title}</span>
                    <span className="block text-xs leading-relaxed text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 md:hidden">{detailsSection}</div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <SectionHeader
            title={t("product.similar")}
            href={category ? `/category/${category.slug}` : undefined}
            linkLabel={t("home.seeAll")}
          />
          <ProductCarousel products={similar} />
        </section>
      )}
      {alsoBought.length > 0 && (
        <section className="mt-10">
          <SectionHeader title={t("product.alsoBought")} />
          <ProductCarousel products={alsoBought} />
        </section>
      )}

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
    </div>
  );
}
