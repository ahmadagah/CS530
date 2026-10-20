import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-14 text-center animate-fade-up", className)}>
      <div className="relative mb-5">
        <div className="absolute inset-0 scale-150 rounded-full bg-primary-soft blur-xl" />
        <div className="relative grid size-20 place-items-center rounded-full bg-primary-soft text-primary ring-8 ring-primary-soft/50">
          <Icon className="size-9" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
