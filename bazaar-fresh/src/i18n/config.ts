import type { Locale } from "@/config/site";
import en from "./messages/en.json";
import fa from "./messages/fa.json";
import ps from "./messages/ps.json";

export type { Locale };
export type Messages = typeof en;
export type Direction = "ltr" | "rtl";

export const locales: Locale[] = ["en", "ps", "fa"];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "bf-locale";

export const localeMeta: Record<Locale, { label: string; short: string; dir: Direction; htmlLang: string }> = {
  en: { label: "English", short: "EN", dir: "ltr", htmlLang: "en" },
  ps: { label: "پښتو", short: "پښتو", dir: "rtl", htmlLang: "ps-AF" },
  fa: { label: "دری", short: "دری", dir: "rtl", htmlLang: "fa-AF" },
};

// Pashto and Dari have no "_one" plural variants; missing keys fall back to English.
export const messages: Record<Locale, Messages> = { en, ps: ps as Messages, fa: fa as Messages };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as string[]).includes(value);
}
