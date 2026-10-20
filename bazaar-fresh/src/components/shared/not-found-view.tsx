"use client";

import { MapPinOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { EmptyState } from "./empty-state";

export function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="container-page py-16">
      <EmptyState
        icon={MapPinOff}
        title={t("common.notFoundTitle")}
        description={t("common.notFoundText")}
        action={
          <Button asChild size="lg">
            <Link href="/">{t("common.goHome")}</Link>
          </Button>
        }
      />
    </div>
  );
}
