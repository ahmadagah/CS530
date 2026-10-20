"use client";

import { Headset, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/provider";
import type { Order } from "@/lib/types";
import { cn } from "@/lib/utils";

type Message = { id: number; from: "bot" | "me"; text: string; whatsapp?: boolean };
const QUICK = ["q1", "q2", "q3", "q4"] as const;

/** Demo support chat with quick questions and canned answers; anything else is routed to WhatsApp. */
export function HelpChat({ order, minutesLeft }: { order: Order; minutesLeft: number }) {
  const { t, siteName } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const push = (m: Omit<Message, "id">) => setMessages((all) => [...all, { ...m, id: nextId.current++ }]);

  const botReply = (text: string, whatsapp?: boolean) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      push({ from: "bot", text, whatsapp });
    }, 700);
  };

  const ask = (key: (typeof QUICK)[number]) => {
    push({ from: "me", text: t(`help.${key}`) });
    const answers = {
      q1: t("help.a1", { status: t(`order.status.${order.status}`), minutes: minutesLeft }),
      q2: t("help.a2"),
      q3: t("help.a3"),
      q4: t("help.a4"),
    };
    botReply(answers[key], key === "q3" || key === "q4");
  };

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Order ${order.id}`)}`;

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
          if (messages.length === 0) push({ from: "bot", text: t("help.greeting", { number: order.id }) });
        }}
      >
        <Headset /> {t("help.title")}
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" closeLabel={t("common.close")} className="mx-auto h-[85dvh] max-w-lg sm:bottom-4 sm:rounded-3xl">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Headset className="size-5" />
              </span>
              {t("help.agent", { name: siteName })}
            </SheetTitle>
            <SheetDescription className="sr-only">{t("help.title")}</SheetDescription>
          </SheetHeader>
          <div ref={list} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm animate-fade-up",
                    m.from === "me" ? "rounded-ee-md bg-primary text-primary-foreground" : "rounded-es-md bg-white",
                  )}
                >
                  {m.text}
                  {m.whatsapp && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1.5 font-semibold text-[#128c4b] hover:underline"
                    >
                      <WhatsAppIcon className="size-4" /> {t("order.chat")}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex w-fit gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 120}ms` }} />
                ))}
              </div>
            )}
          </div>
          <div className="border-t p-3">
            <div className="no-scrollbar -mx-3 mb-3 flex gap-2 overflow-x-auto px-3">
              {QUICK.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => ask(key)}
                  className="shrink-0 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition hover:border-primary hover:text-primary"
                >
                  {t(`help.${key}`)}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const text = draft.trim();
                if (!text) return;
                push({ from: "me", text });
                setDraft("");
                botReply(t("help.fallback"), true);
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t("help.placeholder")}
                aria-label={t("help.placeholder")}
                className="h-11 min-w-0 flex-1 rounded-full border bg-muted px-4 text-sm outline-none focus:border-primary focus:bg-white"
              />
              <Button type="submit" size="icon" aria-label={t("help.send")} disabled={!draft.trim()}>
                <SendHorizontal className="rtl:-scale-x-100" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
