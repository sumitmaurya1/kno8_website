import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FutureVentureCard() {
  return (
    <article className="on-dark relative overflow-hidden rounded-[2rem] bg-navy p-7 text-white sm:p-10 lg:p-14">
      <AnimatedGradient tone="dark" className="left-1/2 opacity-70" />
      <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark">Coming next</Eyebrow>
          <h3 className="display mt-6 text-[clamp(2rem,3.6vw,3.25rem)]">
            We&rsquo;re Just Getting Started.
          </h3>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-white/75">
            <p>
              Kno8 continuously explores opportunities across technology, health, media,
              education, consumer products and digital services.
            </p>
            <p>The companies you see today are only the beginning.</p>
          </div>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end">
          <ButtonLink href="/partner" variant="light">
            Build With Kno8
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
