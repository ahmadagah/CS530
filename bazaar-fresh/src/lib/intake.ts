import "server-only";

import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import { intakeQuestions, intakeSections } from "@/data/intake-questions";
import {
  INTAKE_FILE_PREFIX,
  isAnswered,
  type IntakeAnswer,
  type IntakeData,
  type IntakeFile,
  type StoredIntakeAnswer,
} from "@/lib/intake-types";

/*
 * Owner questionnaire storage. Answers live in one private JSON file in Vercel Blob;
 * uploaded files live next to it under intake/files/. Access is by secret link keys:
 * INTAKE_KEY for the owner's form, INTAKE_ADMIN_KEY for the developer's answers page.
 */

const ANSWERS_PATH = "intake/answers.json";
const MAX_TEXT = 5000;
const MAX_NOTE = 1000;
const MAX_FILES = 40;

export type IntakeRole = "owner" | "admin";

/** Which role a link key unlocks, if any. */
export function roleForKey(key: string | null | undefined): IntakeRole | null {
  if (!key) return null;
  const { INTAKE_KEY, INTAKE_ADMIN_KEY } = process.env;
  if (INTAKE_ADMIN_KEY && key === INTAKE_ADMIN_KEY) return "admin";
  if (INTAKE_KEY && key === INTAKE_KEY) return "owner";
  return null;
}

export const intakeConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const empty = (): IntakeData => ({ answers: {}, updatedAt: null, submittedAt: null });

async function readAnswers(): Promise<{ data: IntakeData; etag: string | null }> {
  const result = await get(ANSWERS_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return { data: empty(), etag: null };
  const text = await new Response(result.stream).text();
  try {
    return { data: { ...empty(), ...(JSON.parse(text) as IntakeData) }, etag: result.blob.etag };
  } catch {
    return { data: empty(), etag: result.blob.etag };
  }
}

export async function loadIntake(): Promise<IntakeData> {
  return (await readAnswers()).data;
}

function cleanFile(input: unknown): IntakeFile | null {
  if (!input || typeof input !== "object") return null;
  const f = input as Record<string, unknown>;
  if (typeof f.pathname !== "string" || !f.pathname.startsWith(INTAKE_FILE_PREFIX) || f.pathname.includes("..")) return null;
  return {
    pathname: f.pathname.slice(0, 300),
    name: typeof f.name === "string" ? f.name.slice(0, 200) : "file",
    type: typeof f.type === "string" ? f.type.slice(0, 120) : "",
    size: typeof f.size === "number" && Number.isFinite(f.size) ? f.size : 0,
  };
}

/** Keeps only known questions and values that fit each question's type. */
function cleanAnswer(questionId: string, input: unknown): IntakeAnswer | null {
  const question = intakeQuestions.find((q) => q.id === questionId);
  if (!question || !input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const optionIds = new Set(question.options?.map((o) => o.id));
  let value: IntakeAnswer["value"] = null;
  if (question.type === "many") {
    value = Array.isArray(raw.value) ? raw.value.filter((v): v is string => typeof v === "string" && optionIds.has(v)) : [];
  } else if (question.type === "one") {
    value = typeof raw.value === "string" && optionIds.has(raw.value) ? raw.value : null;
  } else if (question.type !== "files") {
    value = typeof raw.value === "string" ? raw.value.slice(0, MAX_TEXT) : null;
  }
  const files = Array.isArray(raw.files) ? raw.files.map(cleanFile).filter((f): f is IntakeFile => f !== null).slice(0, MAX_FILES) : [];
  const note = typeof raw.note === "string" ? raw.note.slice(0, MAX_NOTE) : "";
  return { value, note, files };
}

/** Merges the given answers into storage. Retries when another save landed first. */
export async function saveIntake(changes: Record<string, unknown>, submit: boolean): Promise<IntakeData> {
  const now = new Date().toISOString();
  for (let attempt = 0; ; attempt++) {
    const { data, etag } = await readAnswers();
    for (const [id, input] of Object.entries(changes)) {
      const answer = cleanAnswer(id, input);
      if (!answer) continue;
      const before = data.answers[id];
      const same = before && JSON.stringify({ ...before, updatedAt: undefined }) === JSON.stringify({ ...answer, updatedAt: undefined });
      data.answers[id] = { ...answer, updatedAt: same ? before.updatedAt : now } satisfies StoredIntakeAnswer;
    }
    data.updatedAt = now;
    if (submit) data.submittedAt = now;
    try {
      await put(ANSWERS_PATH, JSON.stringify(data), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
        cacheControlMaxAge: 60,
        ...(etag ? { ifMatch: etag } : {}),
      });
      return data;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError && attempt < 2) continue;
      throw error;
    }
  }
}

/** Streams one uploaded file from the private store. */
export async function readIntakeFile(pathname: string) {
  if (!pathname.startsWith(INTAKE_FILE_PREFIX) || pathname.includes("..")) return null;
  const result = await get(pathname, { access: "private" });
  return result && result.statusCode === 200 ? result : null;
}

/** All answers as plain text, for copying into a chat or an email. */
export function intakeAsText(data: IntakeData, fileUrl: (pathname: string) => string): string {
  const total = intakeQuestions.length;
  const answered = intakeQuestions.filter((q) => isAnswered(data.answers[q.id])).length;
  const lines = [
    "Bazaar Fresh: answers from the store owner",
    `${answered} of ${total} answered${data.submittedAt ? `, sent ${data.submittedAt}` : ", not sent yet"}${data.updatedAt ? `, last change ${data.updatedAt}` : ""}`,
    "",
  ];
  for (const section of intakeSections) {
    lines.push(`== ${section.title} ==`);
    for (const q of section.questions) {
      const a = data.answers[q.id];
      lines.push(`Q: ${q.label}`);
      if (!isAnswered(a)) {
        lines.push("A: (no answer)", "");
        continue;
      }
      const parts: string[] = [];
      if (Array.isArray(a.value)) parts.push(a.value.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(", "));
      else if (a.value) parts.push(q.options ? (q.options.find((o) => o.id === a.value)?.label ?? a.value) : a.value);
      if (a.note) parts.push(`(${a.note})`);
      if (parts.length) lines.push(`A: ${parts.join(" ")}`);
      for (const f of a.files) lines.push(`File: ${f.name} ${fileUrl(f.pathname)}`);
      lines.push("");
    }
  }
  return lines.join("\n");
}
