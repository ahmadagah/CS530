"use client";

import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeMeta, locales } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition hover:bg-muted data-[state=open]:bg-muted",
          className,
        )}
        aria-label={t("header.language")}
      >
        <Languages className="size-[18px] text-primary" />
        <span>{localeMeta[locale].short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("header.language")}</DropdownMenuLabel>
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => setLocale(l)}
            className="justify-between"
            dir={localeMeta[l].dir}
            lang={localeMeta[l].htmlLang}
          >
            <span className={cn(l !== "en" && "font-[family-name:var(--font-rtl)] text-[15px]")}>{localeMeta[l].label}</span>
            {l === locale && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
