import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("checkout.title"), robots: { index: false } };
}

export default function CheckoutPage() {
  return <CheckoutView />;
}
