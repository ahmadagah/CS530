"use client";

import { getCategory, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "./image-with-fallback";

export function EmojiTile({ emoji }: { emoji: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="absolute inset-[18%] rounded-full bg-white/60 blur-2xl" />
      <span className="relative text-[38cqw] leading-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.12)] select-none">
        {emoji}
      </span>
    </div>
  );
}

/**
 * Square product photo on a soft category-colored background. If the photo
 * can't be loaded it shows the product's emoji instead, so every product
 * always has an image.
 */
export function ProductImage({
  product,
  sizes,
  className,
  priority,
}: {
  product: Pick<Product, "image" | "emoji" | "name" | "category">;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const tint = getCategory(product.category)?.tint ?? "#f1f3f0";
  return (
    <div
      className={cn("@container relative aspect-square w-full overflow-hidden", className)}
      style={{ backgroundColor: tint }}
    >
      {product.image ? (
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          sizes={sizes}
          priority={priority}
          fallback={<EmojiTile emoji={product.emoji} />}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <EmojiTile emoji={product.emoji} />
      )}
    </div>
  );
}
