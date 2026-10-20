import type { Metadata } from "next";
import { AdminView } from "@/components/admin/admin-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("admin.title"), robots: { index: false } };
}

export default function AdminPage() {
  return <AdminView />;
}
