"use client";

import { ArrowRight, BadgePercent, Truck } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { ProductImage } from "@/components/shared/product-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { discountPercent } from "@/lib/catalog";

const HERO_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

function HeroFallbackArt() {
  const items = ["🍅", "🥬", "🍇", "🫓", "🥚", "🍉", "🥕", "🍵"];
  return (
    <div className="absolute inset-0 grid grid-cols-3 place-items-center gap-2 p-6 text-5xl sm:text-6xl" aria-hidden>
      {items.map((e, i) => (
        <span
          key={e}
          className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          style={{ transform: `rotate(${(i % 3) * 8 - 8}deg) translateY(${(i % 2) * 10}px)` }}
        >
          {e}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const { t, price } = useI18n();
  const catalog = useCatalog();
  const maxDiscount = Math.max(0, ...catalog.filter((p) => p.onSale).map(discountPercent));
  const pomegranates = catalog.find((p) => p.id === "kandahar-pomegranates");

  return (
    <section className="container-page pt-4 sm:pt-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:col-span-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgb(255_255_255/0.18),transparent_45%),radial-gradient(circle_at_10%_110%,rgb(0_0_0/0.25),transparent_50%)]" />
          <div className="relative grid items-center gap-4 p-6 sm:min-h-[360px] sm:grid-cols-[1.15fr_1fr] sm:p-9 lg:p-10">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <BadgePercent className="size-4" />
                {t("home.heroEyebrow")}
              </span>
              <h1 className="mt-4 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[44px]">
                {t("home.heroTitle", { minutes: siteConfig.delivery.etaMinutes })}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                {t("home.heroSubtitle", { count: Math.floor(catalog.length / 10) * 10 })}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button asChild size="lg" className="h-11 bg-white px-5 text-primary shadow-lg hover:bg-white/90 sm:h-12 sm:px-7">
                  <Link href="/deals">
                    {t("home.heroCta")}
                    <ArrowRight className="size-5 rtl:-scale-x-100" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-11 px-5 text-white ring-1 ring-white/40 hover:bg-white/10 hover:text-white sm:h-12 sm:px-7"
                >
                  <Link href="/categories">{t("home.heroSecondary")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto hidden aspect-square w-full max-w-[300px] sm:block">
              <div className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/20" />
              <div className="absolute inset-4 overflow-hidden rounded-full bg-primary-deep/40 shadow-2xl ring-4 ring-white/25">
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt=""
                  sizes="300px"
                  priority
                  fallback={<HeroFallbackArt />}
                />
              </div>
              {maxDiscount > 0 && (
                <div className="absolute -top-1 -end-1 grid size-24 rotate-12 place-items-center rounded-full bg-deal text-center text-deal-foreground shadow-xl ring-4 ring-white/30">
                  <span className="px-2 text-sm leading-tight font-extrabold">{t("home.heroBadge", { percent: maxDiscount })}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
          {pomegranates && (
            <Link
              href={`/product/${pomegranates.id}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-3xl bg-deal-soft p-5 transition hover:shadow-card-hover"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold tracking-wide text-deal uppercase">{t("home.promo1Eyebrow")}</p>
                <p className="mt-1 text-lg leading-snug font-extrabold">{t("home.promo1Title")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("home.promo1Text", { price: price(pomegranates.finalPrice) })}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-deal">
                  {t("home.seeAll")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </span>
              </div>
              <div className="size-24 shrink-0 overflow-hidden rounded-2xl shadow-md ring-4 ring-white sm:size-32">
                <ProductImage product={pomegranates} sizes="128px" />
              </div>
            </Link>
          )}
          <Link
            href="/categories"
            className="group relative hidden items-center gap-4 overflow-hidden rounded-3xl bg-primary-soft p-5 transition hover:shadow-card-hover sm:flex"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold tracking-wide text-primary uppercase">{t("home.promo2Eyebrow")}</p>
              <p className="mt-1 text-lg leading-snug font-extrabold">{t("home.promo2Title")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("home.promo2Text", { amount: price(siteConfig.delivery.freeThreshold) })}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                {t("home.heroSecondary")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
            <div className="grid size-28 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-md sm:size-32">
              <Truck className="size-14 transition-transform duration-500 group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2" strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
