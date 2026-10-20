import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("cart.title") };
}

export default function CartPage() {
  return <CartView />;
}
