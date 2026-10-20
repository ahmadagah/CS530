"use client";

import { ChevronDown, CircleHelp } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";

const QUESTIONS = [1, 2, 3, 4, 5, 6] as const;

export function FaqView() {
  const { t, price } = useI18n();
  const vars = {
    minutes: siteConfig.delivery.etaMinutes,
    amount: price(siteConfig.delivery.smallCartThreshold),
    free: price(siteConfig.delivery.freeThreshold),
  };

  return (
    <div className="container-page max-w-3xl py-6 sm:py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CircleHelp className="size-6" />
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("faq.title")}</h1>
      </div>
      <ul className="space-y-3">
        {QUESTIONS.map((n) => (
          <li key={n}>
            <details className="group rounded-2xl border bg-card shadow-card open:border-primary/30" open={n === 1}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold sm:p-5 [&::-webkit-details-marker]:hidden">
                {t(`faq.q${n}`)}
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pb-5">{t(`faq.a${n}`, vars)}</p>
            </details>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-surface p-6 text-center">
        <p className="font-semibold">{t("account.help")}</p>
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-105 active:scale-95"
        >
          <WhatsAppIcon className="size-5" />
          {t("footer.whatsapp")}
        </a>
      </div>
    </div>
  );
}
