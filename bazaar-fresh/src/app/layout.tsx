import "@fontsource-variable/inter";
import "@fontsource-variable/vazirmatn";
import "@fontsource/noto-naskh-arabic/arabic-400.css";
import "@fontsource/noto-naskh-arabic/arabic-700.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { LoginDialog } from "@/components/auth/login-dialog";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingCartBar } from "@/components/cart/floating-cart-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocationDialog } from "@/components/layout/location-dialog";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { ShopOnly } from "@/components/layout/shop-only";
import { VariantSheet } from "@/components/product/variant-sheet";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { localeMeta } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = createTranslator(locale);
  const name = locale === "en" ? siteConfig.name : siteConfig.localName[locale];
  const minutes = siteConfig.delivery.etaMinutes;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("meta.title", { name, minutes }), template: `%s · ${name}` },
    description: t("meta.description", { minutes }),
    applicationName: siteConfig.name,
    openGraph: { siteName: siteConfig.name, type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: siteConfig.colors.primary,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const { htmlLang, dir } = localeMeta[locale];
  const t = createTranslator(locale);
  const { colors } = siteConfig;
  const brandColors = {
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--deal": colors.deal,
    "--deal-foreground": colors.dealForeground,
  } as CSSProperties;

  return (
    <html lang={htmlLang} dir={dir} style={brandColors}>
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] has-[[data-intake]]:pb-0 md:pb-0">
        <Providers locale={locale}>
          <ShopOnly>
            <a
              href="#main"
              className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
            >
              {t("nav.skipToContent")}
            </a>
            <Header />
          </ShopOnly>
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <ShopOnly>
            <Footer />
            <FloatingCartBar />
            <MobileTabBar />
            <CartDrawer />
            <LoginDialog />
            <LocationDialog />
            <VariantSheet />
          </ShopOnly>
        </Providers>
      </body>
    </html>
  );
}
