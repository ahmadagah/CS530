import type { Metadata } from "next";
import { AccountView } from "@/components/account/account-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("account.title"), robots: { index: false } };
}

export default function AccountPage() {
  return <AccountView />;
}
