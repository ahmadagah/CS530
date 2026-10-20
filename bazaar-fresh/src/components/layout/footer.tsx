"use client";

import { Banknote, Clock, Landmark, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import Link from "next/link";
import { AppleIcon, PlayStoreIcon, WhatsAppIcon } from "@/components/shared/brand-icons";
import { categories } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { localizeDigits } from "@/lib/format";
import { Logo } from "./logo";

function StoreBadge({ icon, top, bottom }: { icon: React.ReactNode; top: string; bottom: string }) {
  return (
    <span
      className="inline-flex h-12 min-w-40 items-center gap-2.5 rounded-xl bg-black px-3.5 text-white ring-1 ring-white/15"
      >
      {icon}
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] opacity-80">{top}</span>
        <span className="text-[15px] font-semibold tracking-tight">{bottom}</span>
      </span>
    </span>
  );
}

export function Footer() {
  const { t, categoryName, locale, siteName } = useI18n();
  const year = localizeDigits(String(new Date().getFullYear()), locale);
  const minutes = siteConfig.delivery.etaMinutes;
  const linkClass = "text-sm text-white/70 transition hover:text-white";

  return (
    <footer className="mt-16 bg-[#0e1a14] text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{t("footer.tagline", { minutes })}</p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-105 active:scale-95"
          >
            <WhatsAppIcon className="size-5" />
            {t("footer.whatsapp")}
          </a>
          <ul className="mt-5 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="size-4" />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wide text-white/90 uppercase">{t("footer.shop")}</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/deals" className={linkClass}>
                {t("nav.weeklyDeals")}
              </Link>
            </li>
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className={linkClass}>
                  {categoryName(c)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/categories" className={linkClass}>
                {t("nav.allCategories")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wide text-white/90 uppercase">{t("footer.help")}</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/account" className={linkClass}>
                {t("header.account")}
              </Link>
            </li>
            <li>
              <Link href="/account#orders" className={linkClass}>
                {t("nav.orders")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className={linkClass}>
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link href="/cart" className={linkClass}>
                {t("cart.title")}
              </Link>
            </li>
            <li>
              <Link href="/admin" className={linkClass}>
                {t("admin.title")}
              </Link>
            </li>
          </ul>
          <h3 className="mt-8 mb-3 text-sm font-bold tracking-wide text-white/90 uppercase">{t("footer.payments")}</h3>
          <ul className="flex flex-wrap gap-2 text-xs text-white/80">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
              <Banknote className="size-3.5" /> {t("payment.cod")}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
              <Smartphone className="size-3.5" /> HesabPay
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
              <Landmark className="size-3.5" /> {t("payment.bank")}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wide text-white/90 uppercase">{t("footer.stores")}</h3>
          <ul className="space-y-4">
            {siteConfig.stores.map((s) => (
              <li key={s.id} className="rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/8">
                <p className="font-semibold">{s.name[locale]}</p>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-white/65">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" />
                  {s.address[locale]}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
                  <Clock className="size-3.5 shrink-0" />
                  {s.hours[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-5 py-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-xs font-semibold text-white/60">{t("footer.comingSoon")}</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <StoreBadge icon={<AppleIcon className="size-6" />} top={t("footer.appStore")} bottom={t("footer.appStoreName")} />
              <StoreBadge
                icon={<PlayStoreIcon className="size-6" />}
                top={t("footer.googlePlay")}
                bottom={t("footer.googlePlayName")}
              />
            </div>
          </div>
          <p className="text-center text-xs text-white/50 md:text-end">
            {t("footer.rights", { year, name: siteName })}
          </p>
        </div>
      </div>
    </footer>
  );
}
