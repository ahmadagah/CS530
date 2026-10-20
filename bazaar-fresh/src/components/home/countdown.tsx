"use client";

import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";

/** End of the current deals week: the coming Friday at midnight (the Afghan weekend). */
function endOfDealsWeek(now: Date): Date {
  const end = new Date(now);
  const daysUntilFriday = (5 - now.getDay() + 7) % 7 || 7;
  end.setDate(now.getDate() + daysUntilFriday);
  end.setHours(0, 0, 0, 0);
  return end;
}

export function DealsCountdown() {
  const { t } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <span className="inline-block h-7 w-36 rounded-full bg-deal/10" />;

  const ms = endOfDealsWeek(now).getTime() - now.getTime();
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const time = [d > 0 && t("time.d", { n: d }), t("time.h", { n: h }), t("time.m", { n: m })].filter(Boolean).join(" ");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-deal px-3 py-1.5 text-xs font-bold text-deal-foreground shadow-sm">
      <Timer className="size-3.5" />
      {t("home.endsIn", { time })}
    </span>
  );
}
