"use client";

import { Star } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { localizeDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Rating({ rating, reviews, className }: { rating: number; reviews?: number; className?: string }) {
  const { t, locale } = useI18n();
  return (
    <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Star className="size-3.5 fill-star text-star" />
      <span className="font-semibold text-foreground">{localizeDigits(rating.toFixed(1), locale)}</span>
      {reviews !== undefined && <span>({t("product.reviews", { count: reviews })})</span>}
    </div>
  );
}
