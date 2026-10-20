"use client";

import { useMemo } from "react";
import { ProductImage } from "@/components/shared/product-image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCatalog } from "@/hooks/use-catalog";
import { useI18n } from "@/i18n/provider";
import { discountPercent } from "@/lib/catalog";
import { useUIStore } from "@/store/ui";
import { AddToCartControl } from "./add-to-cart-control";

/** Size picker opened from a card's "N options" ADD button. */
export function VariantSheet() {
  const { t, price, packSize, productName } = useI18n();
  const group = useUIStore((s) => s.variantGroup);
  const setGroup = useUIStore((s) => s.setVariantGroup);
  const catalog = useCatalog();
  const variants = useMemo(
    () => (group ? catalog.filter((p) => p.variantGroup === group).sort((a, b) => a.finalPrice - b.finalPrice) : []),
    [catalog, group],
  );
  const first = variants[0];

  return (
    <Dialog open={Boolean(group)} onOpenChange={(open) => !open && setGroup(undefined)}>
      <DialogContent closeLabel={t("common.close")} className="p-0">
        <div className="border-b p-5 pe-14">
          <DialogTitle>{first ? productName(first) : ""}</DialogTitle>
          <DialogDescription>{t("product.selectUnit")}</DialogDescription>
        </div>
        <ul className="divide-y px-5 pb-5">
          {variants.map((v) => (
            <li key={v.id} className="flex items-center gap-3 py-3.5">
              <span className="size-14 shrink-0 overflow-hidden rounded-xl border">
                <ProductImage product={v} sizes="56px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{packSize(v.size)}</p>
                <p className="text-sm">
                  <span className="font-extrabold tabular-nums">{price(v.finalPrice)}</span>
                  {v.onSale && (
                    <>
                      <span className="ms-1.5 text-xs text-muted-foreground line-through">{price(v.price)}</span>
                      <span className="ms-1.5 text-xs font-bold text-deal">{t("product.off", { percent: discountPercent(v) })}</span>
                    </>
                  )}
                </p>
              </div>
              <AddToCartControl product={v} single />
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
