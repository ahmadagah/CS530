import { formatNumber, interpolate } from "@/lib/format";
import { messages, type Locale, type Messages } from "./config";

type Leaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];

export type MessageKey = Leaves<Messages>;
export type TranslateVars = Record<string, string | number>;
export type Translate = (key: MessageKey, vars?: TranslateVars) => string;

function lookup(dict: unknown, key: string): string | undefined {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === "string" ? node : undefined;
}

/**
 * Returns a `t(key, vars)` function for a locale. Numbers passed in `vars`
 * are formatted for the locale; `count: 1` picks the `_one` variant if present.
 */
export function createTranslator(locale: Locale): Translate {
  const dict = messages[locale];
  return (key, vars) => {
    const raw =
      (vars?.count === 1 ? lookup(dict, `${key}_one`) : undefined) ??
      lookup(dict, key) ??
      lookup(messages.en, key) ??
      key;
    if (!vars) return raw;
    const localized: TranslateVars = {};
    for (const [k, v] of Object.entries(vars)) {
      localized[k] = typeof v === "number" ? formatNumber(v, locale) : v;
    }
    return interpolate(raw, localized);
  };
}
