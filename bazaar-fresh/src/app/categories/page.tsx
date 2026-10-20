import type { Metadata } from "next";
import { CategoriesView } from "@/components/catalog/categories-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("category.allTitle") };
}

export default function CategoriesPage() {
  return <CategoriesView />;
}
