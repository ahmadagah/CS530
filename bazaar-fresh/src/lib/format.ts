import { siteConfig, type Locale } from "@/config/site";

const NATIVE_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
/** Left-to-right mark: keeps "؋ 250" in that order inside English text. */
const LRM = "‎";
const NBSP = " ";

function usesNativeDigits(locale: Locale) {
  return locale !== "en" && siteConfig.currency.nativeDigitsInRtl;
}

export function localizeDigits(value: string, locale: Locale): string {
  if (!usesNativeDigits(locale)) return value;
  return value.replace(/\d/g, (d) => NATIVE_DIGITS[Number(d)]).replace(/,/g, "٬").replace(/\./g, "٫");
}

/** Formats a whole number with thousands separators, e.g. 1,500 or ۱٬۵۰۰. */
export function formatNumber(value: number, locale: Locale): string {
  const grouped = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return localizeDigits(grouped, locale);
}

/** Formats an Afghani amount: "؋ 250" / "AFN 250" in English, "۲۵۰ ؋" / "۲۵۰ افغانی" in Pashto and Dari. */
export function formatPrice(value: number, locale: Locale): string {
  const n = formatNumber(value, locale);
  const { display, symbol, code } = siteConfig.currency;
  if (locale === "en") {
    return display === "code" ? `${code}${NBSP}${n}` : `${symbol}${LRM}${NBSP}${n}`;
  }
  return display === "code" ? `${n}${NBSP}افغانی` : `${n}${NBSP}${symbol}`;
}

/** Fills {placeholders} in a message. */
export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

// Afghanistan uses the solar (Hijri Shamsi) calendar. Browsers ship Dari month
// names but usually not Pashto ones, so both are spelled out here.
const SOLAR_MONTHS: Record<"ps" | "fa", string[]> = {
  fa: ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"],
  ps: ["وری", "غویی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "لیندۍ", "مرغومی", "سلواغه", "کب"],
};

const EN_DATE_STYLES: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  date: { day: "numeric", month: "short", year: "numeric" },
  monthYear: { month: "long", year: "numeric" },
  time: { hour: "numeric", minute: "2-digit" },
  dateTime: { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" },
};

export type DateStyle = "date" | "monthYear" | "time" | "dateTime";

/** Gregorian dates in English; solar-calendar dates with native digits in Pashto and Dari. */
export function formatDate(iso: string, locale: Locale, style: DateStyle = "date"): string {
  const d = new Date(iso);
  if (locale === "en") return new Intl.DateTimeFormat("en-GB", EN_DATE_STYLES[style]).format(d);

  const time = localizeDigits(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`, locale);
  if (style === "time") return time;

  const parts = new Intl.DateTimeFormat("en-u-ca-persian", { day: "numeric", month: "numeric", year: "numeric" }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  const month = SOLAR_MONTHS[locale][Number(part("month")) - 1];
  const year = localizeDigits(part("year"), locale);
  if (style === "monthYear") return `${month} ${year}`;

  const date = `${localizeDigits(part("day"), locale)} ${month} ${year}`;
  return style === "dateTime" ? `${date}، ${time}` : date;
}

const SIZE_WORDS: Record<"ps" | "fa", [RegExp, string][]> = {
  fa: [
    [/approx\./g, "تقریباً"],
    [/Family pack/g, "بسته خانوادگی"],
    [/\bkg\b/g, "کیلو"],
    [/\bg\b/g, "گرام"],
    [/\bml\b/g, "ملی‌لیتر"],
    [/\bL\b/g, "لیتر"],
    [/\b(pcs|eggs|piece|loaf)\b/g, "دانه"],
    [/\bbags\b/g, "پاکت"],
    [/\brolls\b/g, "رول"],
    [/\bwipes\b/g, "دستمال"],
    [/\bdiapers\b/g, "دانه"],
  ],
  ps: [
    [/approx\./g, "نږدې"],
    [/Family pack/g, "کورنی پاکټ"],
    [/\bkg\b/g, "کیلو"],
    [/\bg\b/g, "ګرامه"],
    [/\bml\b/g, "ملي لیتره"],
    [/\bL\b/g, "لیتره"],
    [/\b(pcs|eggs|piece|loaf)\b/g, "دانې"],
    [/\bbags\b/g, "پاکټه"],
    [/\brolls\b/g, "رولونه"],
    [/\bwipes\b/g, "دسمالونه"],
    [/\bdiapers\b/g, "دانې"],
  ],
};

/** Translates pack sizes such as "5 kg" or "6 × 330 ml" for Pashto and Dari. */
export function formatSize(size: string, locale: Locale): string {
  if (locale === "en") return size;
  const words = SIZE_WORDS[locale].reduce((text, [pattern, word]) => text.replace(pattern, word), size);
  return localizeDigits(words, locale);
}
