import { Fragment } from "react";
import { Spark } from "@/components/decor/Spark";
import { siteConfig } from "@/data/site";

/** "Ideas. Companies. Possibilities." -> ["Ideas", "Companies", "Possibilities"] */
const words = siteConfig.tagline
  .split(".")
  .map((word) => word.trim())
  .filter(Boolean);

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...words, ...words].map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={
              index % 2 === 0
                ? "display px-8 text-[clamp(3rem,9vw,7rem)] text-fg"
                : "display px-8 text-[clamp(3rem,9vw,7rem)] text-transparent [-webkit-text-stroke:1.5px_#6d35ff]"
            }
          >
            {word}
          </span>
          <Spark className="h-8 w-8 shrink-0 sm:h-12 sm:w-12" />
        </Fragment>
      ))}
    </div>
  );
}

/** The tagline as a slow, continuous band of large type. */
export function Marquee() {
  return (
    <section aria-label={siteConfig.tagline} className="overflow-hidden py-10 sm:py-14">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
