import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a multi-line headline, optionally painting one word or phrase
 * with the brand gradient.
 */
export function Headline({
  lines,
  highlight,
  tone = "light",
}: {
  lines: string[];
  highlight?: string;
  tone?: "light" | "dark";
}) {
  const gradient = tone === "dark" ? "text-brand-on-dark" : "text-brand";
  return (
    <>
      {lines.map((line, index) => {
        const at = highlight ? line.indexOf(highlight) : -1;
        return (
          <Fragment key={line}>
            {index > 0 && <br />}
            {at === -1 || !highlight ? (
              line
            ) : (
              <>
                {line.slice(0, at)}
                <span className={cn(gradient)}>{highlight}</span>
                {line.slice(at + highlight.length)}
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
