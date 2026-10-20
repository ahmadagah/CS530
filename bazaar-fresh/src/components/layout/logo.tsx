"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  const { siteName } = useI18n();
  return (
    <Link href="/" className={cn("group flex shrink-0 items-center gap-2", className)} aria-label={siteName}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl shadow-sm transition-transform group-hover:-rotate-6 sm:size-10",
          inverted ? "bg-white text-primary" : "bg-primary text-primary-foreground",
        )}
      >
        <Leaf className="size-5 sm:size-[22px]" strokeWidth={2.4} />
      </span>
      <span
        className={cn(
          "text-lg leading-none font-extrabold tracking-tight sm:text-xl",
          inverted ? "text-white" : "text-primary-deep",
        )}
      >
        {siteName}
      </span>
    </Link>
  );
}
