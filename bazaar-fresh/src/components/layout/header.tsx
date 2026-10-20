"use client";

import { Clock, Truck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartButton } from "@/components/cart/cart-button";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { CategoryNav } from "./category-nav";
import { LanguageSwitcher } from "./language-switcher";
import { LocationSelector } from "./location-selector";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";

function AnnouncementBar() {
  const { t, price } = useI18n();
  return (
    <div className="bg-primary-deep text-[13px] text-white">
      <div className="container-page flex h-9 items-center justify-center gap-x-6 sm:justify-between">
        <p className="flex items-center gap-2 truncate font-medium">
          <Truck className="size-4 shrink-0 rtl:-scale-x-100" />
          <span className="truncate">{t("header.announcement", { amount: price(siteConfig.delivery.freeThreshold) })}</span>
          <span className="hidden opacity-60 sm:inline">·</span>
          <span className="hidden sm:inline">{t("header.announcementCod")}</span>
        </p>
        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hidden opacity-90 hover:opacity-100 sm:block" dir="ltr">
          {siteConfig.contact.phone}
        </a>
      </div>
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const onSearchPage = pathname === "/search";
  const onAdmin = pathname.startsWith("/admin");

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
        <div className="container-page flex h-16 items-center gap-2 sm:gap-3 lg:h-[72px] lg:gap-5">
          <Logo />
          <LocationSelector className="hidden max-w-60 lg:flex" />
          <SearchBar className="hidden max-w-2xl flex-1 md:block" />
          <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
            <LanguageSwitcher />
            <Link
              href="/account"
              aria-label={t("header.account")}
              className="hidden size-11 place-items-center rounded-full transition hover:bg-muted md:grid"
            >
              <User className="size-5" />
            </Link>
            <CartButton />
          </div>
        </div>
        {!onSearchPage && (
          <div className="container-page pb-3 md:hidden">
            <SearchBar />
          </div>
        )}
        {!onAdmin && (
          <div className="hidden md:block">
            <CategoryNav />
          </div>
        )}
      </header>
      {!onAdmin && (
        <div className="border-b bg-white md:hidden">
          <div className="container-page flex items-center justify-between gap-2 py-1.5">
            <LocationSelector compact className="-ms-2" />
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
              <Clock className="size-3.5" />
              {t("promise.fast", { hours: siteConfig.delivery.promiseHours })}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
