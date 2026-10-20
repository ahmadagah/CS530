import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, className }: { items: { href?: string; label: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs text-muted-foreground sm:text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60 rtl:-scale-x-100" />}
            {item.href ? (
              <Link href={item.href} className="truncate hover:text-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="truncate font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
