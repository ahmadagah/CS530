"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Category, Product } from "@/data/products";
import { formatDate, formatNumber, formatPrice, formatSize, type DateStyle } from "@/lib/format";
import { LOCALE_COOKIE, localeMeta, type Direction, type Locale } from "./config";
import { createTranslator, type Translate } from "./translator";

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  t: Translate;
  setLocale: (locale: Locale) => void;
  price: (amount: number) => string;
  num: (value: number) => string;
  date: (iso: string, style?: DateStyle) => string;
  packSize: (size: string) => string;
  productName: (product: Pick<Product, "name" | "localName">) => string;
  categoryName: (category: Pick<Category, "name">) => string;
  storeName: (storeId: string) => string;
  siteName: string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = localeMeta[next].htmlLang;
      document.documentElement.dir = localeMeta[next].dir;
      setLocaleState(next);
      router.refresh();
    },
    [router],
  );

  const value = useMemo<I18nContextValue>(() => {
    const meta = localeMeta[locale];
    return {
      locale,
      dir: meta.dir,
      t: createTranslator(locale),
      setLocale,
      price: (amount) => formatPrice(amount, locale),
      num: (n) => formatNumber(n, locale),
      date: (iso, style) => formatDate(iso, locale, style),
      packSize: (text) => formatSize(text, locale),
      productName: (p) => (locale !== "en" && p.localName ? p.localName[locale] : p.name),
      categoryName: (c) => c.name[locale],
      storeName: (id) => (siteConfig.stores.find((s) => s.id === id) ?? siteConfig.stores[0]).name[locale],
      siteName: locale === "en" ? siteConfig.name : siteConfig.localName[locale],
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
