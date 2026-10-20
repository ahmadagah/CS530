import { ProductGridSkeleton } from "@/components/product/product-grid";
import { Skeleton } from "@/components/ui/skeleton";

/** Shown while a page is being rendered on the server during navigation. */
export default function Loading() {
  return (
    <div className="container-page space-y-6 py-6 sm:py-10" aria-busy="true">
      <Skeleton className="h-4 w-48" />
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ProductGridSkeleton count={10} />
    </div>
  );
}
