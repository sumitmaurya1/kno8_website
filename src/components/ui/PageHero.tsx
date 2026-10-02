import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Headline } from "./Headline";

/** Shared opening block for inner pages. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string[];
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="pb-12 pt-32 sm:pb-16 sm:pt-40">
      <Container>
        <Eyebrow className="animate-rise">{eyebrow}</Eyebrow>
        <h1 className="display mt-5 animate-rise text-[clamp(2.75rem,6.4vw,5rem)] [animation-delay:80ms]">
          <Headline lines={title} highlight={highlight} />
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-muted [animation-delay:160ms] sm:text-xl">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-9 animate-rise [animation-delay:240ms]">{children}</div>
        )}
      </Container>
    </section>
  );
}
