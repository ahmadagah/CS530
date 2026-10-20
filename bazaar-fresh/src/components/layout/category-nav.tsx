"use client";

import { Flame, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/products";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function CategoryNav() {
  const { t, categoryName } = useI18n();
  const pathname = usePathname();
  const item =
    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold whitespace-nowrap transition-colors";

  return (
    <nav className="border-t border-border/60" aria-label={t("nav.categories")}>
      <div className="container-page no-scrollbar flex items-center gap-1 overflow-x-auto py-1.5">
        <Link
          href="/categories"
          className={cn(item, "text-foreground hover:bg-muted", pathname === "/categories" && "bg-muted")}
        >
          <LayoutGrid className="size-4 text-primary" />
          {t("nav.allCategories")}
        </Link>
        <Link
          href="/deals"
          className={cn(item, "text-deal hover:bg-deal-soft", pathname === "/deals" && "bg-deal-soft")}
        >
          <Flame className="size-4" />
          {t("nav.weeklyDeals")}
        </Link>
        <span className="mx-1 h-5 w-px shrink-0 bg-border" />
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={cn(
                item,
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                active && "bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary",
              )}
            >
              <span aria-hidden>{c.emoji}</span>
              {categoryName(c)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
