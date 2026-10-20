"use client";

import { upload } from "@vercel/blob/client";
import { ArrowLeft, ArrowRight, Check, CircleAlert, ExternalLink, FileText, Leaf, Loader2, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { intakeQuestions, intakeSections, type IntakeQuestion } from "@/data/intake-questions";
import { INTAKE_FILE_PREFIX, isAnswered, type IntakeAnswer, type IntakeData, type IntakeFile } from "@/lib/intake-types";
import { cn } from "@/lib/utils";

type SaveState = "idle" | "saving" | "saved" | "offline";
type Answers = Record<string, IntakeAnswer>;

const TOTAL = intakeQuestions.length;
const FINISH = intakeSections.length;
const DRAFT_KEY = "bf-intake-draft";

const blank = (): IntakeAnswer => ({ value: null, note: "", files: [] });

function fileUrl(key: string, pathname: string) {
  return `/api/intake/file?k=${encodeURIComponent(key)}&p=${encodeURIComponent(pathname)}`;
}

/** Shrinks large photos before upload so they send quickly on mobile data. */
async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) || file.size < 1.5 * 1024 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    const png = file.type === "image/png";
    if (!png) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, png ? "image/png" : "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    const name = png ? file.name : file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], name, { type: blob.type });
  } catch {
    return file;
  }
}

const safeName = (name: string) =>
  name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(-80) || "file";

export function IntakeForm({ linkKey, initial }: { linkKey: string; initial: IntakeData }) {
  const [answers, setAnswers] = useState<Answers>(() => {
    const out: Answers = {};
    for (const [id, a] of Object.entries(initial.answers)) out[id] = { value: a.value, note: a.note, files: a.files };
    return out;
  });
  const [section, setSection] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [submittedAt, setSubmittedAt] = useState(initial.submittedAt);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [uploading, setUploading] = useState<Record<string, string[]>>({});

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const dirty = useRef(new Map<string, number>());
  const version = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const inflight = useRef<Promise<boolean> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((t) => (t === message ? null : t)), 4500);
  }, []);

  /** Sends every changed answer. Resolves true when everything is saved. */
  const flush = useCallback(
    async (submit = false): Promise<boolean> => {
      window.clearTimeout(timer.current);
      if (inflight.current) await inflight.current;
      if (dirty.current.size === 0 && !submit) return true;
      const sent = new Map(dirty.current);
      const payload: Answers = {};
      for (const id of sent.keys()) payload[id] = answersRef.current[id] ?? blank();
      const run = (async () => {
        setSaveState("saving");
        try {
          const res = await fetch(`/api/intake?k=${encodeURIComponent(linkKey)}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ answers: payload, submit }),
          });
          if (!res.ok) throw new Error(String(res.status));
          const data = (await res.json()) as { submittedAt: string | null };
          for (const [id, v] of sent) if (dirty.current.get(id) === v) dirty.current.delete(id);
          if (submit) setSubmittedAt(data.submittedAt);
          try {
            localStorage.removeItem(DRAFT_KEY);
          } catch {}
          setSaveState(dirty.current.size ? "saving" : "saved");
          return true;
        } catch {
          setSaveState("offline");
          try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(answersRef.current));
          } catch {}
          return false;
        }
      })();
      inflight.current = run;
      const ok = await run;
      inflight.current = null;
      if (ok && dirty.current.size) timer.current = window.setTimeout(() => void flush(), 800);
      return ok;
    },
    [linkKey],
  );

  const update = useCallback(
    (id: string, patch: Partial<IntakeAnswer>, delay = 1200) => {
      setAnswers((all) => {
        const next = { ...all, [id]: { ...(all[id] ?? blank()), ...patch } };
        answersRef.current = next;
        return next;
      });
      dirty.current.set(id, ++version.current);
      setSaveState("saving");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => void flush(), delay);
    },
    [flush],
  );

  // Retry unsaved changes when the connection comes back, and warn before closing with unsaved work.
  useEffect(() => {
    const online = () => dirty.current.size && void flush();
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty.current.size) e.preventDefault();
    };
    window.addEventListener("online", online);
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [flush]);

  const addFiles = async (q: IntakeQuestion, list: File[]) => {
    for (const original of list) {
      const tag = `${original.name}-${Math.random()}`;
      setUploading((u) => ({ ...u, [q.id]: [...(u[q.id] ?? []), tag] }));
      try {
        const file = await shrinkImage(original);
        const blob = await upload(`${INTAKE_FILE_PREFIX}${safeName(file.name)}`, file, {
          access: "private",
          handleUploadUrl: "/api/intake/upload",
          clientPayload: linkKey,
          contentType: file.type || undefined,
          multipart: file.size > 8 * 1024 * 1024,
        });
        const added: IntakeFile = { pathname: blob.pathname, name: original.name, type: blob.contentType, size: file.size };
        const current = answersRef.current[q.id]?.files ?? [];
        update(q.id, { files: [...current, added] }, 0);
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        showToast(
          /content type|not allowed/i.test(message)
            ? `“${original.name}” can't be added here. Please send it on WhatsApp.`
            : /too large|size/i.test(message)
              ? `“${original.name}” is too big (100 MB max). Please send it on WhatsApp.`
              : `“${original.name}” didn't upload. Check your internet and try again.`,
        );
      } finally {
        setUploading((u) => ({ ...u, [q.id]: (u[q.id] ?? []).filter((t) => t !== tag) }));
      }
    }
  };

  const go = (index: number, focusId?: string) => {
    void flush();
    setSection(Math.max(0, Math.min(FINISH, index)));
    window.setTimeout(() => {
      const target = focusId && document.getElementById(`q-${focusId}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0 });
    }, 0);
  };

  const send = async () => {
    setSending(true);
    const ok = await flush(true);
    setSending(false);
    showToast(ok ? "Sent. Thank you! I'll go through your answers and message you." : "Not sent. Check your internet and try again.");
  };

  const answeredIn = (ids: string[]) => ids.filter((id) => isAnswered(answers[id])).length;
  const answered = answeredIn(intakeQuestions.map((q) => q.id));

  return (
    <div data-intake dir="ltr" lang="en" className="min-h-dvh bg-surface pb-28 text-foreground">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-4 pt-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base leading-tight font-extrabold">Bazaar Fresh</p>
              <p className="truncate text-xs text-muted-foreground">What your developer needs from you</p>
            </div>
            <SaveBadge state={saveState} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-soft">
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(answered / TOTAL) * 100}%` }} />
            </div>
            <span className="text-muted-foreground tabular-nums">
              {answered} of {TOTAL} answered
            </span>
          </div>
          <nav aria-label="Sections" className="no-scrollbar -mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4 pb-3">
            {intakeSections.map((s, i) => {
              const done = answeredIn(s.questions.map((q) => q.id));
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === section ? "step" : undefined}
                  className={cn(
                    "flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition",
                    i === section ? "border-foreground bg-foreground text-white" : "bg-white text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.title}
                  <span className={cn("text-[11px] tabular-nums", done === s.questions.length && i !== section && "text-primary")}>
                    {done}/{s.questions.length}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => go(FINISH)}
              aria-current={section === FINISH ? "step" : undefined}
              className={cn(
                "flex h-9 shrink-0 items-center rounded-full border px-3 text-[13px] font-semibold transition",
                section === FINISH ? "border-foreground bg-foreground text-white" : "bg-white text-muted-foreground hover:text-foreground",
              )}
            >
              Finish
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-2xl gap-4 px-4 pt-5">
        {section === 0 && (
          <section className="grid gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">Let&apos;s finish your online store</h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I need a few answers from you to finish the website and the mobile apps. Skip anything you don&apos;t know. Your answers
              save automatically, so you can stop and come back to this link any time. When you&apos;re done, tap “Send my answers” on
              the last page.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              You don&apos;t need to tell me prices, delivery fees, opening hours, offers or staff details. You&apos;ll set those yourself in
              the admin dashboard.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Add photos and files (Excel, PDF, pictures) right under the question they belong to. Never type passwords here.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-bold text-primary"
            >
              Open the demo website <ExternalLink className="size-4" />
            </a>
          </section>
        )}

        {saveState === "offline" && (
          <p className="flex items-start gap-2 rounded-2xl bg-deal-soft p-3 text-sm">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-deal" />
            Your last changes aren&apos;t saved yet. They&apos;re kept on this device and will save when your internet is back.
          </p>
        )}

        {section < FINISH ? (
          <section className="overflow-hidden rounded-3xl border bg-white shadow-card">
            <div className="grid gap-1 px-5 pt-5 pb-2">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">
                Part {section + 1} of {FINISH}
              </p>
              <h2 className="text-xl font-extrabold tracking-tight">{intakeSections[section].title}</h2>
              {intakeSections[section].intro && <p className="text-sm text-muted-foreground">{intakeSections[section].intro}</p>}
            </div>
            <div className="divide-y">
              {intakeSections[section].questions.map((q) => (
                <QuestionField
                  key={q.id}
                  question={q}
                  answer={answers[q.id] ?? blank()}
                  linkKey={linkKey}
                  uploading={uploading[q.id]?.length ?? 0}
                  onChange={(patch, delay) => update(q.id, patch, delay)}
                  onBlur={() => void flush()}
                  onFiles={(files) => void addFiles(q, files)}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="grid gap-4 rounded-3xl border bg-white p-5 shadow-card">
            <h2 className="text-xl font-extrabold tracking-tight">All done?</h2>
            <p className="text-sm text-muted-foreground">
              You answered {answered} of {TOTAL} questions. You can come back and change anything, even after sending.
            </p>
            <ul className="divide-y rounded-2xl border text-sm">
              {intakeSections.map((s, i) => (
                <li key={s.id}>
                  <button type="button" onClick={() => go(i)} className="flex w-full justify-between gap-3 px-4 py-2.5 text-start">
                    <span>{s.title}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {answeredIn(s.questions.map((q) => q.id))}/{s.questions.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {submittedAt && (
              <p className="flex items-center gap-2 rounded-2xl bg-primary-soft p-3 text-sm font-semibold text-primary">
                <Check className="size-4" /> Sent on {new Date(submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}.
                Thank you!
              </p>
            )}
            <Button size="lg" className="h-12 text-base" onClick={send} disabled={sending}>
              {sending ? <Loader2 className="animate-spin" /> : <Check />}
              {submittedAt ? "Send again with my changes" : "Send my answers"}
            </Button>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-2xl gap-2.5 px-4 py-2.5">
          {section > 0 && (
            <Button variant="outline" size="lg" className="h-12" onClick={() => go(section - 1)}>
              <ArrowLeft /> Back
            </Button>
          )}
          {section < FINISH && (
            <Button size="lg" className="h-12 flex-1 text-base" onClick={() => go(section + 1)}>
              {section === FINISH - 1 ? "Finish" : "Next"} <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {toast && (
        <div role="status" className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-md rounded-2xl bg-foreground px-4 py-3 text-sm text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function SaveBadge({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  const styles: Record<Exclude<SaveState, "idle">, string> = {
    saving: "bg-muted text-muted-foreground",
    saved: "bg-primary-soft text-primary",
    offline: "bg-deal-soft text-deal",
  };
  const text = { saving: "Saving…", saved: "Saved", offline: "Not saved" }[state];
  return (
    <span aria-live="polite" className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", styles[state])}>
      {text}
    </span>
  );
}

function QuestionField({
  question: q,
  answer,
  linkKey,
  uploading,
  onChange,
  onBlur,
  onFiles,
}: {
  question: IntakeQuestion;
  answer: IntakeAnswer;
  linkKey: string;
  uploading: number;
  onChange: (patch: Partial<IntakeAnswer>, delay?: number) => void;
  onBlur: () => void;
  onFiles: (files: File[]) => void;
}) {
  const done = isAnswered(answer);
  const labelId = `label-${q.id}`;
  const inputClass =
    "w-full rounded-xl border-[1.5px] border-input bg-surface px-3.5 py-2.5 text-base outline-none transition focus:border-primary focus:bg-white";

  const label = (
    <span className="flex items-start gap-2.5 text-[16px] leading-snug font-bold">
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] transition",
          done ? "border-primary bg-primary text-white" : "border-input text-transparent",
        )}
      >
        <Check className="size-3" strokeWidth={3.5} />
      </span>
      <span id={labelId}>{q.label}</span>
    </span>
  );

  return (
    <div id={`q-${q.id}`} className="grid scroll-mt-44 gap-2.5 px-5 py-5">
      {q.type === "text" || q.type === "long" ? <label htmlFor={`in-${q.id}`}>{label}</label> : label}
      {q.hint && <p className="-mt-1 ps-7.5 text-sm text-muted-foreground">{q.hint}</p>}
      <div className="grid gap-2.5 ps-7.5">
        {q.type === "text" && (
          <input
            id={`in-${q.id}`}
            type="text"
            inputMode={q.inputMode}
            autoComplete="off"
            placeholder="Type your answer…"
            value={typeof answer.value === "string" ? answer.value : ""}
            onChange={(e) => onChange({ value: e.target.value })}
            onBlur={onBlur}
            className={inputClass}
          />
        )}
        {q.type === "long" && (
          <textarea
            id={`in-${q.id}`}
            rows={3}
            placeholder="Type your answer…"
            value={typeof answer.value === "string" ? answer.value : ""}
            onChange={(e) => onChange({ value: e.target.value })}
            onBlur={onBlur}
            className={cn(inputClass, "min-h-24 resize-y")}
          />
        )}
        {(q.type === "one" || q.type === "many") && (
          <div role={q.type === "one" ? "radiogroup" : "group"} aria-labelledby={labelId} className="grid gap-2">
            {q.options?.map((o) => {
              const selected = Array.isArray(answer.value) ? answer.value.includes(o.id) : answer.value === o.id;
              const toggle = () => {
                if (q.type === "one") onChange({ value: selected ? null : o.id }, 0);
                else {
                  const current = Array.isArray(answer.value) ? answer.value : [];
                  onChange({ value: selected ? current.filter((v) => v !== o.id) : [...current, o.id] }, 0);
                }
              };
              return (
                <button
                  key={o.id}
                  type="button"
                  role={q.type === "one" ? "radio" : "checkbox"}
                  aria-checked={selected}
                  onClick={toggle}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-xl border-[1.5px] bg-white px-3.5 py-2.5 text-start text-[15px] transition",
                    selected ? "border-primary bg-primary-soft" : "border-input hover:border-primary/40",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-5.5 shrink-0 place-items-center border-2 transition",
                      q.type === "one" ? "rounded-full" : "rounded-md",
                      selected ? "border-primary bg-primary text-white" : "border-input text-transparent",
                    )}
                  >
                    <Check className="size-3.5" strokeWidth={3.5} />
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>
        )}
        {q.note && (
          <>
            <label htmlFor={`note-${q.id}`} className="text-sm font-semibold text-muted-foreground">
              {q.note}
            </label>
            <input
              id={`note-${q.id}`}
              type="text"
              placeholder="Type here…"
              value={answer.note}
              onChange={(e) => onChange({ note: e.target.value })}
              onBlur={onBlur}
              className={inputClass}
            />
          </>
        )}
        {q.type === "files" && (
          <>
            {(answer.files.length > 0 || uploading > 0) && (
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {answer.files.map((f, i) => (
                  <li key={f.pathname} className="relative aspect-square overflow-hidden rounded-xl border bg-surface">
                    {f.type.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element -- private file served by our own route
                      <img src={fileUrl(linkKey, f.pathname)} alt={f.name} loading="lazy" className="size-full object-cover" />
                    ) : (
                      <span className="flex size-full flex-col items-center justify-center gap-1 p-2 text-center text-[11px] break-all text-muted-foreground">
                        <FileText className="size-6 text-primary" />
                        {f.name}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label={`Remove ${f.name}`}
                      onClick={() => onChange({ files: answer.files.filter((_, j) => j !== i) }, 0)}
                      className="absolute end-1 top-1 grid size-7 place-items-center rounded-full bg-black/60 text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
                {Array.from({ length: uploading }, (_, i) => (
                  <li key={`up-${i}`} className="grid aspect-square place-items-center rounded-xl border bg-surface">
                    <Loader2 className="size-6 animate-spin text-primary" />
                  </li>
                ))}
              </ul>
            )}
            <label className="relative flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-primary bg-primary-soft px-4 py-3 font-bold text-primary focus-within:ring-[3px] focus-within:ring-ring/40">
              <input
                type="file"
                multiple
                aria-labelledby={labelId}
                accept={
                  q.accept === "image"
                    ? "image/*"
                    : "image/*,application/pdf,.pdf,.csv,text/csv,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/*"
                }
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  if (files.length) onFiles(files);
                }}
                className="absolute size-px opacity-0"
              />
              <Plus className="size-5" /> {q.accept === "image" ? "Add photos" : "Add photos or files"}
            </label>
          </>
        )}
      </div>
    </div>
  );
}
