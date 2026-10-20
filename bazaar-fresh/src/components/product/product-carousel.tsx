"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { CatalogProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

/**
 * Horizontally scrolling row of product cards. Uses native scroll-snap, so it
 * swipes naturally on phones and runs right-to-left in Pashto and Dari.
 */
export function ProductCarousel({ products, className }: { products: CatalogProduct[]; className?: string }) {
  const { t, dir } = useI18n();
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    // scrollLeft is negative when scrolling an RTL container, so use its magnitude.
    const offset = Math.abs(el.scrollLeft);
    setCanPrev(offset > 4);
    setCanNext(offset + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update, dir, products.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const sign = dir === "rtl" ? -1 : 1;
    el.scrollBy({ left: direction * sign * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrow =
    "absolute top-[34%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border bg-white text-foreground shadow-lg transition hover:scale-105 hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:grid";

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scroller}
        onScroll={update}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-3 sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23.5%] lg:w-[18.6%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label={t("home.previous")}
        onClick={() => scrollByPage(-1)}
        disabled={!canPrev}
        className={cn(arrow, "-start-5")}
      >
        <ChevronLeft className="size-5 rtl:-scale-x-100" />
      </button>
      <button
        type="button"
        aria-label={t("home.next")}
        onClick={() => scrollByPage(1)}
        disabled={!canNext}
        className={cn(arrow, "-end-5")}
      >
        <ChevronRight className="size-5 rtl:-scale-x-100" />
      </button>
    </div>
  );
}
