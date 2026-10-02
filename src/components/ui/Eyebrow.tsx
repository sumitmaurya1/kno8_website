import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.7rem] font-semibold uppercase tracking-[0.3em]",
        tone === "dark" ? "text-white/70" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
