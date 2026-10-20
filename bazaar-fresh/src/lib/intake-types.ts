/** Shared shapes for the owner questionnaire (/questions). Safe to import on client and server. */

export interface IntakeFile {
  /** Path inside the private Blob store, e.g. "intake/files/logo-a1b2.png". */
  pathname: string;
  name: string;
  type: string;
  size: number;
}

export interface IntakeAnswer {
  value: string | string[] | null;
  note: string;
  files: IntakeFile[];
}

export interface StoredIntakeAnswer extends IntakeAnswer {
  updatedAt: string;
}

export interface IntakeData {
  answers: Record<string, StoredIntakeAnswer>;
  updatedAt: string | null;
  submittedAt: string | null;
}

export const INTAKE_FILE_PREFIX = "intake/files/";

export function isAnswered(answer: IntakeAnswer | undefined): boolean {
  if (!answer) return false;
  const { value } = answer;
  const hasValue = Array.isArray(value) ? value.length > 0 : value != null && value.trim() !== "";
  return hasValue || answer.files.length > 0 || answer.note.trim() !== "";
}
