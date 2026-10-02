import { FoundersSection } from "@/components/about/FoundersSection";
import { CompaniesGrid } from "@/components/companies/CompaniesGrid";
import { BuildTimeline } from "@/components/home/BuildTimeline";
import { CTASection } from "@/components/home/CTASection";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { PhilosophyGrid } from "@/components/home/PhilosophyGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { milestones } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Kno8",
  description:
    "Kno8 is a growing family of companies united by curiosity, technology and the ambition to create useful products.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kno8"
        title={["We Don't Build", "Just One Thing."]}
        highlight="Just One Thing."
        description="Kno8 is a growing family of companies united by curiosity, technology and the ambition to create useful products."
      >
        <ButtonLink href="/companies">See Our Companies</ButtonLink>
      </PageHero>

      <ManifestoSection eyebrow="Our story" id="story" />

      <FoundersSection />

      <section aria-labelledby="approach-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="approach-title"
            eyebrow="Our approach"
            title={["From Opportunity", "to Company."]}
            highlight="to Company."
            description="Every Kno8 company moves through the same five steps, from spotting a problem worth solving to standing as its own brand."
          />
          <div className="mt-16">
            <BuildTimeline />
          </div>
        </Container>
      </section>

      <section aria-labelledby="philosophy-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="philosophy-title"
            eyebrow="Our philosophy"
            title={["Think Bigger.", "Build Better."]}
            highlight="Build Better."
          />
          <div className="mt-16">
            <PhilosophyGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="areas-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="areas-title"
            eyebrow="Areas we explore"
            title={["Building Across", "Growing Categories."]}
            highlight="Growing Categories."
          />
          <div className="mt-14">
            <IndustryGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="timeline-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="timeline-title"
            eyebrow="Timeline"
            title={["Where We Are", "So Far."]}
            highlight="So Far."
          />
          <ol className="mt-16">
            {milestones.map((milestone) => (
              <li key={milestone.title} className="border-t border-line">
                <Reveal className="grid gap-3 py-8 lg:grid-cols-12 lg:gap-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted lg:col-span-3 lg:pt-2">
                    {milestone.period}
                  </p>
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:col-span-4">
                    {milestone.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted lg:col-span-5">
                    {milestone.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="companies-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="companies-title"
            eyebrow="Our companies"
            title={["Different Ideas.", "One Vision."]}
            highlight="One Vision."
          />
          <div className="mt-14">
            <CompaniesGrid showFutureCard={false} />
          </div>
        </Container>
      </section>

      <CTASection
        id="build-with-us"
        title={["Build", "With Us."]}
        highlight="With Us."
        paragraphs={[
          "We are always interested in meeting ambitious founders, creators, specialists and businesses working on meaningful ideas.",
        ]}
        cta={{ label: "Partner With Us", href: "/partner" }}
      />
    </>
  );
}
