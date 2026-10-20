"use client";

import { Truck } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartButton } from "@/components/cart/cart-button";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { AccountMenu } from "./account-menu";
import { CategoryNav } from "./category-nav";
import { DeliveryEta } from "./delivery-eta";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";

function AnnouncementBar() {
  const { t, price } = useI18n();
  return (
    <div className="hidden bg-primary-deep text-[13px] text-white md:block">
      <div className="container-page flex h-8 items-center justify-between gap-x-6">
        <p className="flex items-center gap-2 truncate font-medium">
          <Truck className="size-4 shrink-0 rtl:-scale-x-100" />
          <span className="truncate">{t("header.announcement", { amount: price(siteConfig.delivery.freeThreshold) })}</span>
          <span className="opacity-60">·</span>
          <span>{t("header.announcementCod")}</span>
        </p>
        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="opacity-90 hover:opacity-100" dir="ltr">
          {siteConfig.contact.phone}
        </a>
      </div>
    </div>
  );
}

/**
 * Quick-commerce header: logo, delivery time + address, search, language,
 * login/account and cart. On phones the logo gives way to the delivery time,
 * like the Blinkit app.
 */
export function Header() {
  const pathname = usePathname();
  const onSearchPage = pathname === "/search";
  const onAdmin = pathname.startsWith("/admin");

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85">
        <div className="container-page flex h-16 items-center gap-2 sm:gap-3 lg:h-[76px] lg:gap-5">
          <Logo className="hidden md:flex" />
          <span className="hidden h-10 w-px bg-border md:block" />
          <DeliveryEta className="min-w-0 flex-1 md:max-w-60 md:flex-none" />
          <SearchBar className="hidden max-w-2xl flex-1 md:block" />
          <div className="ms-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <LanguageSwitcher />
            <AccountMenu className="hidden md:inline-flex" />
            <CartButton className="hidden md:inline-flex" />
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
    </>
  );
}
