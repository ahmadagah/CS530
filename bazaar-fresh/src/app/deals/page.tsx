import type { Metadata } from "next";
import { DealsView } from "@/components/catalog/deals-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("category.dealsTitle") };
}

export default function DealsPage() {
  return <DealsView />;
}
