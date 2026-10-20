import type { Metadata } from "next";
import { FaqView } from "@/components/faq/faq-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("faq.title") };
}

export default function FaqPage() {
  return <FaqView />;
}
