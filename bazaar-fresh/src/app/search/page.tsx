import type { Metadata } from "next";
import { SearchView } from "@/components/catalog/search-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  const q = (await searchParams).q;
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  return { title: query ? t("search.resultsFor", { query }) : t("search.title"), robots: { index: false } };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (await searchParams).q;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  return <SearchView key={query} query={query} />;
}
