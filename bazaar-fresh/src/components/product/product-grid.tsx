import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-skeletons";

const columns = {
  3: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
};

export function ProductGrid({
  products,
  cols = 5,
  className,
}: {
  products: CatalogProduct[];
  cols?: keyof typeof columns;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:gap-4", columns[cols], className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 10, cols = 5 }: { count?: number; cols?: keyof typeof columns }) {
  return (
    <div className={cn("grid gap-3 sm:gap-4", columns[cols])}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
