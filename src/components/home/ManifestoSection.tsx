import { Quote } from "lucide-react";
import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { manifesto } from "@/data/content";

export function ManifestoSection({
  eyebrow = "Why Kno8",
  id = "manifesto",
  cta,
}: {
  eyebrow?: string;
  id?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="py-8 sm:py-12">
      <Container>
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-navy text-white">
          <AnimatedGradient tone="dark" className="left-1/3 opacity-70" />
          <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
            <div className="lg:col-span-6">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <h2 id={`${id}-title`} className="display mt-4 text-[clamp(2.25rem,4.6vw,3.75rem)]">
                <Headline lines={["Built Around", "Curiosity."]} highlight="Curiosity." tone="dark" />
              </h2>
              <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-white/80">
                {manifesto.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-white">{manifesto.close}</p>
              </div>
              {cta && (
                <div className="mt-9">
                  <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
                </div>
              )}
            </div>

            <Reveal className="lg:col-span-6 lg:pl-6">
              <Quote aria-hidden="true" className="h-8 w-8 fill-current text-[#7C8CFF]" />
              <p className="mt-4 text-white/75">{manifesto.lead}</p>
              <p className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
                {manifesto.belief}
              </p>
              <ul className="mt-8 border-t border-white/15">
                {manifesto.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="border-b border-white/15 py-3.5 text-lg font-medium text-white/90"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
