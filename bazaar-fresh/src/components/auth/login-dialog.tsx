"use client";

import { ArrowLeft, Leaf, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/provider";
import { localizeDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

/** Converts Eastern Arabic digits (typed on Dari/Pashto keyboards) and strips everything else. */
function digitsOnly(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");
}

/** "0701234567" or "701234567" → "701234567"; returns null when it isn't an Afghan mobile number. */
function normalizeMobile(raw: string): string | null {
  const d = digitsOnly(raw).replace(/^0/, "");
  return /^7\d{8}$/.test(d) ? d : null;
}

const formatMobile = (d: string) => `+93 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;

/**
 * Demo login: enter any Afghan mobile number, then any 4-digit code.
 * Opened from the header, the cart ("Login to proceed") or the account page.
 */
export function LoginDialog() {
  const { t, siteName, locale } = useI18n();
  const router = useRouter();
  const open = useUIStore((s) => s.loginOpen);
  const redirect = useUIStore((s) => s.loginRedirect);
  const closeLogin = useUIStore((s) => s.closeLogin);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const mobile = normalizeMobile(phone);

  useEffect(() => {
    if (!open) return;
    setStep("phone");
    setCode(Array(OTP_LENGTH).fill(""));
    setVerifying(false);
  }, [open]);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [step, seconds]);

  const sendCode = () => {
    if (!mobile) return;
    setStep("otp");
    setSeconds(RESEND_SECONDS);
    setCode(Array(OTP_LENGTH).fill(""));
    window.setTimeout(() => boxes.current[0]?.focus(), 50);
  };

  const verify = (digits: string[]) => {
    if (!mobile || digits.some((d) => d === "")) return;
    setVerifying(true);
    window.setTimeout(() => {
      useUserStore.getState().login(formatMobile(mobile));
      const name = useUserStore.getState().profile.name.split(" ")[0];
      toast.success(t("auth.welcome", { name }));
      closeLogin();
      if (redirect) router.push(redirect);
    }, 700);
  };

  const setDigit = (index: number, value: string) => {
    const digit = digitsOnly(value).slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < OTP_LENGTH - 1) boxes.current[index + 1]?.focus();
    if (digit && next.every((d) => d !== "")) verify(next);
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) boxes.current[index - 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = digitsOnly(e.clipboardData.getData("text")).slice(0, OTP_LENGTH);
    if (pasted.length !== OTP_LENGTH) return;
    e.preventDefault();
    const next = pasted.split("");
    setCode(next);
    verify(next);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeLogin()}>
      <DialogContent closeLabel={t("common.close")} className="p-6 pt-8 sm:p-8">
        {step === "phone" ? (
          <form
            className="flex flex-col items-center text-center"
            onSubmit={(e) => {
              e.preventDefault();
              sendCode();
            }}
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Leaf className="size-8" strokeWidth={2.4} />
            </span>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">{t("auth.tagline")}</p>
            <DialogTitle className="mt-1 text-2xl font-extrabold">{t("auth.title")}</DialogTitle>
            <DialogDescription className="sr-only">{siteName}</DialogDescription>
            <label className="mt-6 flex h-14 w-full items-center gap-3 rounded-2xl border-2 border-input px-4 transition focus-within:border-primary">
              <span className="font-bold" dir="ltr">
                +93
              </span>
              <span className="h-6 w-px bg-border" />
              <input
                autoFocus
                inputMode="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="70 123 4567"
                aria-label={t("auth.phone")}
                className="min-w-0 flex-1 bg-transparent text-lg font-semibold tracking-wide outline-none placeholder:font-normal placeholder:text-muted-foreground/60 rtl:text-end"
              />
            </label>
            <Button type="submit" size="lg" className="mt-4 w-full rounded-2xl" disabled={!mobile}>
              {t("auth.continue")}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">{t("auth.terms")}</p>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => setStep("phone")}
              aria-label={t("auth.changeNumber")}
              className="absolute start-4 top-4 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-5 rtl:-scale-x-100" />
            </button>
            <DialogTitle className="text-xl font-extrabold">{t("auth.otpTitle")}</DialogTitle>
            <DialogDescription className="mt-2">
              {t("auth.otpSent", { phone: mobile ? formatMobile(mobile) : "" })}
            </DialogDescription>
            <div className="mt-6 flex gap-3" dir="ltr">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    boxes.current[i] = el;
                  }}
                  value={digit}
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  maxLength={2}
                  aria-label={`${t("auth.otpTitle")} ${i + 1}`}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  onPaste={onPaste}
                  disabled={verifying}
                  className={cn(
                    "size-14 rounded-2xl border-2 border-input text-center text-2xl font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15",
                    digit && "border-primary bg-primary-soft",
                  )}
                />
              ))}
            </div>
            <p className="mt-4 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {t("auth.otpHint")}
            </p>
            {verifying ? (
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                <Loader2 className="size-4 animate-spin" /> {t("auth.verify")}…
              </p>
            ) : seconds > 0 ? (
              <p className="mt-5 text-sm text-muted-foreground">
                {t("auth.resendIn", { seconds: localizeDigits(String(seconds), locale) })}
              </p>
            ) : (
              <button
                type="button"
                className="mt-5 text-sm font-semibold text-primary hover:underline"
                onClick={() => {
                  setSeconds(RESEND_SECONDS);
                  toast(t("auth.resent"));
                }}
              >
                {t("auth.resend")}
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
