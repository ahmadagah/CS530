import { Leaf } from "lucide-react";

/** Full-page notice for the questions pages (bad link, storage not set up). */
export function IntakeMessage({ title, text }: { title: string; text: string }) {
  return (
    <div data-intake dir="ltr" lang="en" className="grid min-h-dvh place-items-center bg-surface px-4">
      <div className="grid max-w-sm justify-items-center gap-3 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Leaf className="size-6" />
        </span>
        <h1 className="text-xl font-extrabold">{title}</h1>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
