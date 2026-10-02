import { CTASection } from "@/components/home/CTASection";
import { PhilosophyGrid } from "@/components/home/PhilosophyGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { disciplines } from "@/data/content";
import { contactHref } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Kno8 builds companies across multiple industries and is always looking for curious developers, designers, marketers, creators, operators and domain experts.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={["Build the Next One", "With Us."]}
        highlight="With Us."
        description="Kno8 is building companies across multiple industries, which means we're constantly looking for curious people who enjoy solving problems and creating new things."
      >
        <ButtonLink href={contactHref("working-with-kno8")}>Introduce Yourself</ButtonLink>
      </PageHero>

      <section aria-labelledby="disciplines-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="disciplines-title"
            eyebrow="Who we look for"
            title={["Six Kinds", "of Builder."]}
            highlight="of Builder."
            description="Our companies need different skills at different stages. These are the disciplines we hire and collaborate across."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => (
              <li key={discipline.title} className="rounded-3xl border border-line bg-surface shadow-card p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {discipline.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{discipline.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="how-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="how-title"
            eyebrow="How we work"
            title={["Think Bigger.", "Build Better."]}
            highlight="Build Better."
          />
          <div className="mt-16">
            <PhilosophyGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="roles-title" className="py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="roles-title" className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              Open roles
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              We don&rsquo;t list specific openings here yet. If one of the disciplines above
              describes you, tell us what you do and what you&rsquo;d like to build, and
              we&rsquo;ll be in touch when there&rsquo;s a fit.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={contactHref("working-with-kno8")}>Introduce Yourself</ButtonLink>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
