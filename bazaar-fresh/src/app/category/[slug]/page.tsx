import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/catalog/category-view";
import { getCategory } from "@/data/products";
import { getLocale } from "@/i18n/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return { title: category.name[await getLocale()] };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!getCategory(slug)) notFound();
  return <CategoryView slug={slug} />;
}
