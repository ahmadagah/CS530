import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/catalog/product-view";
import { getSeedProduct } from "@/data/products";
import { getLocale } from "@/i18n/server";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getSeedProduct((await params).id);
  if (!product) return {};
  const locale = await getLocale();
  return {
    title: locale !== "en" && product.localName ? product.localName[locale] : product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  if (!getSeedProduct(id)) notFound();
  return <ProductView id={id} />;
}
