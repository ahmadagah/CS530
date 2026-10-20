"use client";

import { ChevronDown, MapPin, Store } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig, type StoreId } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";

export function LocationSelector({ className, compact }: { className?: string; compact?: boolean }) {
  const { t, locale, storeName } = useI18n();
  const storeId = useUserStore((s) => s.storeId);
  const setStore = useUserStore((s) => s.setStore);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex min-w-0 items-center gap-2 rounded-full text-start transition hover:bg-muted data-[state=open]:bg-muted",
          compact ? "h-9 px-2" : "h-11 px-3",
          className,
        )}
      >
        <MapPin className={cn("shrink-0 text-primary", compact ? "size-4" : "size-5")} />
        <span className="flex min-w-0 flex-col leading-tight">
          {!compact && <span className="text-[11px] text-muted-foreground">{t("header.deliverFrom")}</span>}
          <span className={cn("truncate font-semibold", compact ? "text-xs" : "text-sm")}>{storeName(storeId)}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>{t("header.chooseStore")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={storeId}
          onValueChange={(value) => {
            setStore(value as StoreId);
            toast.success(t("header.storeChanged", { store: storeName(value) }), { id: "store" });
          }}
        >
          {siteConfig.stores.map((s) => (
            <DropdownMenuRadioItem key={s.id} value={s.id} className="items-start py-2.5">
              <Store className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold">{s.name[locale]}</span>
                <span className="text-xs text-muted-foreground">{s.hours[locale]}</span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
