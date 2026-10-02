import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Headline } from "./Headline";

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  tone = "light",
  align = "left",
  id,
  className,
  children,
}: {
  eyebrow?: string;
  title: string[];
  highlight?: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Applied to the heading so a <section> can reference it with aria-labelledby. */
  id?: string;
  className?: string;
  /** Optional action rendered under the description. */
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "display text-[clamp(2rem,4vw,3.25rem)]",
          eyebrow && "mt-4",
          tone === "dark" ? "text-white" : "text-fg",
        )}
      >
        <Headline lines={title} highlight={highlight} tone={tone} />
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-white/75" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
