"use client";

import { Check, Home, LocateFixed, Loader2, MapPin, Plus, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import { nearestStore } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

/** "Change location" sheet: detect the nearest store, or pick a saved address or store. */
export function LocationDialog() {
  const { t, locale } = useI18n();
  const open = useUIStore((s) => s.locationOpen);
  const setOpen = useUIStore((s) => s.setLocationOpen);
  const addresses = useUserStore((s) => s.addresses);
  const deliveryAddressId = useUserStore((s) => s.deliveryAddressId);
  const storeId = useUserStore((s) => s.storeId);
  const [detecting, setDetecting] = useState(false);
  const [failed, setFailed] = useState(false);
  const eta = siteConfig.delivery.etaMinutes;

  const detect = () => {
    setFailed(false);
    if (!("geolocation" in navigator)) {
      setFailed(true);
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const store = nearestStore(coords.latitude, coords.longitude);
        useUserStore.getState().setStore(store.id);
        setDetecting(false);
        setOpen(false);
        toast.success(t("location.detected", { store: store.name[locale] }));
      },
      () => {
        setDetecting(false);
        setFailed(true);
      },
      { timeout: 10_000 },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent closeLabel={t("common.close")} className="gap-0 p-0 sm:max-w-lg">
        <div className="border-b p-5 pe-14">
          <DialogTitle>{t("location.title")}</DialogTitle>
          <DialogDescription>{t("header.deliveryIn", { minutes: eta })}</DialogDescription>
        </div>
        <div className="space-y-5 p-5">
          <div>
            <Button size="lg" className="w-full rounded-2xl" onClick={detect} disabled={detecting}>
              {detecting ? <Loader2 className="animate-spin" /> : <LocateFixed />}
              {detecting ? t("location.detecting") : t("location.detect")}
            </Button>
            {failed && <p className="mt-2 text-center text-xs font-medium text-destructive">{t("location.detectFailed")}</p>}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {t("location.or")}
            <span className="h-px flex-1 bg-border" />
          </div>

          {addresses.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-bold">{t("location.saved")}</h3>
              <ul className="space-y-2">
                {addresses.map((a) => {
                  const active = a.id === deliveryAddressId;
                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        onClick={() => {
                          useUserStore.getState().selectAddress(a.id);
                          setOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-2xl border p-3.5 text-start transition hover:border-primary/40",
                          active && "border-primary bg-primary-soft/60",
                        )}
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border">
                          <Home className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">{a.label}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {a.line}, {a.area}, {a.city}
                          </span>
                        </span>
                        {active && <Check className="mt-1 size-4 shrink-0 text-primary" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section>
            <h3 className="mb-2 text-sm font-bold">{t("location.stores")}</h3>
            <ul className="space-y-2">
              {siteConfig.stores.map((s) => {
                const active = s.id === storeId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        useUserStore.getState().setStore(s.id);
                        setOpen(false);
                        toast.success(t("header.storeChanged", { store: s.name[locale] }), { id: "store" });
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border p-3.5 text-start transition hover:border-primary/40",
                        active && "border-primary bg-primary-soft/60",
                      )}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border">
                        <Store className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{s.name[locale]}</span>
                        <span className="block text-xs text-muted-foreground">{s.address[locale]}</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <MapPin className="size-3" /> {t("location.storeEta", { minutes: eta })} · {s.hours[locale]}
                        </span>
                      </span>
                      {active && <Check className="mt-1 size-4 shrink-0 text-primary" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <Link
            href="/account#addresses"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed p-3 text-sm font-semibold text-primary hover:bg-primary-soft"
          >
            <Plus className="size-4" /> {t("location.addNew")}
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
