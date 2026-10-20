import { FileText, Leaf } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { CopyTextButton } from "@/components/intake/copy-text-button";
import { IntakeMessage } from "@/components/intake/intake-message";
import { intakeSections } from "@/data/intake-questions";
import { intakeAsText, intakeConfigured, loadIntake, roleForKey } from "@/lib/intake";
import { isAnswered } from "@/lib/intake-types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner's answers",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ k?: string }> };

const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kabul" }) : null);

/** The developer's view of everything the owner has answered so far. */
export default async function AnswersPage({ searchParams }: Props) {
  const { k } = await searchParams;
  if (roleForKey(k) !== "admin") {
    return <IntakeMessage title="This link isn't valid" text="This page needs the developer's private link." />;
  }
  if (!intakeConfigured()) return <IntakeMessage title="Not ready yet" text="Blob storage isn't connected to this project." />;

  const data = await loadIntake();
  const host = (await headers()).get("host") ?? "bazaar-fresh.vercel.app";
  const fileUrl = (pathname: string, download = false) =>
    `/api/intake/file?k=${encodeURIComponent(k!)}&p=${encodeURIComponent(pathname)}${download ? "&download=1" : ""}`;
  const text = intakeAsText(data, (p) => `https://${host}${fileUrl(p)}`);
  const total = intakeSections.reduce((n, s) => n + s.questions.length, 0);
  const answered = intakeSections.flatMap((s) => s.questions).filter((q) => isAnswered(data.answers[q.id])).length;

  return (
    <div data-intake dir="ltr" lang="en" className="min-h-dvh bg-surface pb-16">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg leading-tight font-extrabold">Owner&apos;s answers</h1>
            <p className="text-xs text-muted-foreground">
              {answered} of {total} answered · {data.submittedAt ? `sent ${when(data.submittedAt)}` : "not sent yet"}
              {data.updatedAt && ` · last change ${when(data.updatedAt)} (Kabul time)`}
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-3xl gap-5 px-4 pt-5">
        <CopyTextButton text={text} />
        {intakeSections.map((section) => (
          <section key={section.id} className="overflow-hidden rounded-3xl border bg-white shadow-card">
            <h2 className="border-b px-5 py-3 text-base font-extrabold">{section.title}</h2>
            <dl className="divide-y">
              {section.questions.map((q) => {
                const a = data.answers[q.id];
                const done = isAnswered(a);
                const value = !a
                  ? ""
                  : Array.isArray(a.value)
                    ? a.value.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(", ")
                    : (q.options?.find((o) => o.id === a.value)?.label ?? a.value ?? "");
                return (
                  <div key={q.id} className="grid gap-1.5 px-5 py-4">
                    <dt className="text-sm font-semibold text-muted-foreground">{q.label}</dt>
                    <dd className={cn("text-[15px] whitespace-pre-wrap", !done && "text-muted-foreground/70 italic")}>
                      {done ? (
                        <>
                          {value}
                          {a?.note && <span className="block text-muted-foreground">Note: {a.note}</span>}
                        </>
                      ) : (
                        "No answer yet"
                      )}
                    </dd>
                    {a && a.files.length > 0 && (
                      <ul className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {a.files.map((f) => (
                          <li key={f.pathname}>
                            <a
                              href={fileUrl(f.pathname)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block aspect-square overflow-hidden rounded-xl border bg-surface"
                            >
                              {f.type.startsWith("image/") ? (
                                // eslint-disable-next-line @next/next/no-img-element -- private file served by our own route
                                <img src={fileUrl(f.pathname)} alt={f.name} loading="lazy" className="size-full object-cover" />
                              ) : (
                                <span className="flex size-full flex-col items-center justify-center gap-1 p-2 text-center text-[11px] break-all text-muted-foreground">
                                  <FileText className="size-6 text-primary" />
                                  {f.name}
                                </span>
                              )}
                            </a>
                            <a href={fileUrl(f.pathname, true)} className="mt-1 block truncate text-[11px] text-primary hover:underline">
                              Download
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
