import type { Metadata } from "next";
import { OrderView } from "@/components/orders/order-view";
import { getLocale } from "@/i18n/server";
import { createTranslator } from "@/i18n/translator";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ placed?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = createTranslator(await getLocale());
  return { title: t("order.trackTitle", { number: (await params).id }), robots: { index: false } };
}

export default async function OrderPage({ params, searchParams }: Props) {
  const [{ id }, { placed }] = await Promise.all([params, searchParams]);
  return <OrderView id={decodeURIComponent(id)} justPlaced={placed === "1"} />;
}
