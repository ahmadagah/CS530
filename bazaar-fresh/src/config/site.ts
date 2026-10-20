/**
 * Store-wide settings. Change the name, colors, delivery rules and store
 * locations here — every page reads from this file.
 */

export type Locale = "en" | "ps" | "fa";

/** A string with one value per supported language. */
export type Localized = Record<Locale, string>;

export const siteConfig = {
  name: "Bazaar Fresh",
  /** The store name as written in Pashto and Dari (shown in the header for those languages). */
  localName: { ps: "بازار تازه", fa: "بازار تازه" },
  /** Short prefix for order numbers, e.g. BF-482913. */
  orderPrefix: "BF",
  url: "https://bazaar-fresh.vercel.app",

  /**
   * Brand colors (any CSS color). `primary` is the main accent used for
   * buttons, links and the logo; `deal` is used for sale tags and promos.
   */
  colors: {
    primary: "#0b6b3a",
    primaryForeground: "#ffffff",
    deal: "#f26a1b",
    dealForeground: "#ffffff",
  },

  currency: {
    code: "AFN",
    symbol: "؋",
    /** "symbol" shows ؋ 250, "code" shows AFN 250. */
    display: "symbol" as "symbol" | "code",
    /** Show Eastern Arabic digits (۲۵۰) when the site is in Pashto or Dari. */
    nativeDigitsInRtl: true,
  },

  delivery: {
    /** Orders at or above this subtotal (AFN) get free delivery. */
    freeThreshold: 1500,
    /** Delivery fee (AFN) for orders below the threshold. */
    fee: 100,
    /** Promised delivery time in hours, shown in banners. */
    promiseHours: 2,
  },

  contact: {
    phone: "+93 79 900 1234",
    /** International format without "+" or spaces, used for the wa.me link. */
    whatsapp: "93799001234",
    email: "hello@bazaarfresh.af",
  },

  stores: [
    {
      id: "kabul-shahr-e-naw",
      name: { en: "Kabul – Shahr-e-Naw", ps: "کابل – شهر نو", fa: "کابل – شهر نو" },
      address: {
        en: "Shahr-e-Naw Park Road, near Haji Yaqub Square",
        ps: "د شهر نو پارک سړک، د حاجي یعقوب څلورلارې ته نږدې",
        fa: "سرک پارک شهر نو، نزدیک چهارراهی حاجی یعقوب",
      },
      hours: { en: "Daily 7:00 AM – 10:00 PM", ps: "هره ورځ ۷ بجې سهار – ۱۰ بجې شپه", fa: "همه روزه ۷ صبح – ۱۰ شب" },
      phone: "+93 79 900 1234",
    },
    {
      id: "kabul-karte-char",
      name: { en: "Kabul – Karte Char", ps: "کابل – کارته چار", fa: "کابل – کارته چهار" },
      address: {
        en: "Main Road, Karte Char, opposite Kabul University gate",
        ps: "عمومي سړک، کارته چار، د کابل پوهنتون د دروازې مخې ته",
        fa: "سرک عمومی کارته چهار، مقابل دروازه پوهنتون کابل",
      },
      hours: { en: "Daily 7:00 AM – 10:00 PM", ps: "هره ورځ ۷ بجې سهار – ۱۰ بجې شپه", fa: "همه روزه ۷ صبح – ۱۰ شب" },
      phone: "+93 79 900 2345",
    },
    {
      id: "herat-downtown",
      name: { en: "Herat – Downtown", ps: "هرات – د ښار مرکز", fa: "هرات – مرکز شهر" },
      address: {
        en: "Chowk-e-Golha, Shahr-e-Naw, Herat",
        ps: "د ګلها څلورلاری، شهر نو، هرات",
        fa: "چوک گلها، شهر نو، هرات",
      },
      hours: { en: "Daily 7:30 AM – 9:30 PM", ps: "هره ورځ ۷:۳۰ سهار – ۹:۳۰ شپه", fa: "همه روزه ۷:۳۰ صبح – ۹:۳۰ شب" },
      phone: "+93 79 900 3456",
    },
  ],

  /** Delivery windows offered at checkout. Labels live in the translation files under `slots`. */
  deliverySlots: [
    { id: "express", day: "today" },
    { id: "today-14", day: "today" },
    { id: "today-16", day: "today" },
    { id: "today-18", day: "today" },
    { id: "tomorrow-09", day: "tomorrow" },
    { id: "tomorrow-12", day: "tomorrow" },
    { id: "tomorrow-16", day: "tomorrow" },
  ],

  /** Payment options at checkout. The first one is the default. Labels live under `payment`. */
  paymentMethods: ["cod", "hesabpay", "bank"] as const,

  demo: {
    /** Seconds between automatic order status changes on the tracking page. */
    orderStepSeconds: 20,
  },
} as const;

export type StoreLocation = (typeof siteConfig.stores)[number];
export type StoreId = StoreLocation["id"];
export type DeliverySlotId = (typeof siteConfig.deliverySlots)[number]["id"];
export type PaymentMethod = (typeof siteConfig.paymentMethods)[number];

export function getStore(id: string): StoreLocation {
  return siteConfig.stores.find((s) => s.id === id) ?? siteConfig.stores[0];
}
