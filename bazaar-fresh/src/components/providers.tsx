"use client";

import { Direction } from "radix-ui";
import { useSyncExternalStore, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import type { Locale } from "@/i18n/config";
import { I18nProvider, useI18n } from "@/i18n/provider";
import { StoreHydration } from "./shared/store-hydration";

const desktopQuery = "(min-width: 768px)";
const subscribeDesktop = (onChange: () => void) => {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

function DirectionAwareShell({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  // On phones toasts go to the top so they never cover the cart bar or checkout button.
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => true);
  return (
    <Direction.Provider dir={dir}>
      {children}
      <Toaster position={desktop ? "bottom-center" : "top-center"} dir={dir} offset={{ bottom: 24 }} mobileOffset={{ top: 12 }} />
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
