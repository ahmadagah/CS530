import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-2 sm:p-2.5">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2 px-1 pt-3 pb-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
