import { Mouse } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { companies } from "@/data/companies";
import { industries } from "@/data/content";
import { HeroVisual } from "./HeroVisual";

/** Figures come from the site's own data, so they stay true as companies are added. */
const facts = [
  { value: String(companies.length), label: "Companies today" },
  { value: String(industries.length), label: "Categories we explore" },
  { value: "More", label: "Ventures on the way" },
];

export function Hero() {
  return (
    <section className="relative overflow-x-clip pb-10 pt-28 sm:pt-36">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <Eyebrow className="animate-rise text-navy">Kno8 — Building what&rsquo;s next</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.75rem,6.6vw,5.25rem)]">
            <span className="block origin-bottom animate-flip [animation-delay:80ms]">
              We Build Ideas
            </span>
            <span className="block origin-bottom animate-flip [animation-delay:220ms]">
              Into <span className="text-brand">Companies.</span>
            </span>
          </h1>
          <div className="mt-7 max-w-xl animate-rise space-y-4 text-lg leading-relaxed text-muted [animation-delay:380ms]">
            <p>
              Kno8 is a technology, media and venture company creating digital products,
              platforms and consumer brands for the next generation.
            </p>
            <p>
              From an idea on paper to a product used in the real world, we build businesses
              designed to grow, evolve and create meaningful impact.
            </p>
          </div>
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:480ms]">
            <ButtonLink href="/companies">Explore Our Companies</ButtonLink>
            <ButtonLink href="/about" variant="text">
              About Kno8
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-xl animate-rise grid-cols-3 sm:flex sm:max-w-none [animation-delay:580ms]">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse justify-end border-line pr-3 sm:pr-8 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-8"
              >
                <dt className="mt-1 text-sm text-muted sm:whitespace-nowrap">{fact.label}</dt>
                <dd className="font-display text-3xl font-bold tracking-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>

      <p
        aria-hidden="true"
        className="mt-12 hidden flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted lg:flex"
      >
        <Mouse className="h-5 w-5" strokeWidth={1.5} />
        Scroll to explore
      </p>
    </section>
  );
}
