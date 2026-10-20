"use client";

import { Direction } from "radix-ui";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import type { Locale } from "@/i18n/config";
import { I18nProvider, useI18n } from "@/i18n/provider";
import { StoreHydration } from "./shared/store-hydration";

function DirectionAwareShell({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  return (
    <Direction.Provider dir={dir}>
      {children}
      <Toaster position="bottom-center" dir={dir} offset={{ bottom: 24 }} mobileOffset={{ bottom: 84 }} />
    </Direction.Provider>
  );
}

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nProvider initialLocale={locale}>
      <DirectionAwareShell>
        <StoreHydration />
        {children}
      </DirectionAwareShell>
    </I18nProvider>
  );
}
