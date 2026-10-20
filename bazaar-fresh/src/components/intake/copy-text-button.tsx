"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Copies all answers as plain text, falling back to a selectable box when the clipboard is blocked. */
export function CopyTextButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  return (
    <div className="grid gap-2">
      <Button
        size="lg"
        onClick={() =>
          navigator.clipboard
            .writeText(text)
            .then(() => setState("copied"))
            .catch(() => setState("manual"))
        }
      >
        {state === "copied" ? <Check /> : <Copy />}
        {state === "copied" ? "Copied" : "Copy all answers"}
      </Button>
      {state === "manual" && (
        <textarea
          readOnly
          value={text}
          onFocus={(e) => e.currentTarget.select()}
          aria-label="All answers"
          className="h-48 w-full rounded-xl border bg-white p-3 text-xs"
        />
      )}
    </div>
  );
}
