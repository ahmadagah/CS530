"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

/** Blinkit-style row of three category promo banners. */
export function PromoCards() {
  const { t } = useI18n();
  const promos = [
    { href: "/category/baby", title: t("home.promo3Title"), text: t("home.promo3Text"), emoji: "🍼", bg: "#e8f4fd", accent: "#1d6fb8" },
    { href: "/category/household-cleaning", title: t("home.promo4Title"), text: t("home.promo4Text"), emoji: "🧽", bg: "#fdf3dc", accent: "#a86a00" },
    { href: "/category/snacks?sub=dry-fruits", title: t("home.promo5Title"), text: t("home.promo5Text"), emoji: "🥜", bg: "#f6e9f6", accent: "#8a3f8a" },
  ];
  return (
    <section className="container-page">
      <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
        {promos.map((p) => (
          <li key={p.href} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <Link
              href={p.href}
              className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-card-hover"
              style={{ backgroundColor: p.bg }}
            >
              <span className="relative z-10 max-w-[62%]">
                <span className="block text-lg leading-tight font-extrabold" style={{ color: p.accent }}>
                  {p.title}
                </span>
                <span className="mt-1 block text-xs leading-snug text-[#3b3b3b]">{p.text}</span>
              </span>
              <span
                className="relative z-10 inline-flex h-9 w-fit items-center rounded-xl px-4 text-sm font-bold text-white shadow-sm"
                style={{ backgroundColor: p.accent }}
              >
                {t("home.orderNow")}
              </span>
              <span
                aria-hidden
                className="absolute -end-2 -bottom-3 text-[96px] leading-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              >
                {p.emoji}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
