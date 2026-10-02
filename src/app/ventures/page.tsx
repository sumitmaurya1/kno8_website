import { BuildTimeline } from "@/components/home/BuildTimeline";
import { CTASection } from "@/components/home/CTASection";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { collaborators } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ventures",
  description:
    "How Kno8 turns opportunities into companies, the categories we are exploring next and how founders, creators and businesses can build with us.",
  path: "/ventures",
});

export default function VenturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Future ventures"
        title={["We're Just", "Getting Started."]}
        highlight="Getting Started."
        description="Kno8 continuously explores opportunities across technology, health, media, education, consumer products and digital services. The companies you see today are only the beginning."
      >
        <ButtonLink href="/partner">Build With Kno8</ButtonLink>
      </PageHero>

      <section aria-labelledby="areas-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="areas-title"
            eyebrow="Where we're looking"
            title={["Building Across", "Growing Categories."]}
            highlight="Growing Categories."
            description="These are the categories we keep returning to. A good idea outside them is still a good idea."
          />
          <div className="mt-14">
            <IndustryGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="process-title"
            eyebrow="The Kno8 way"
            title={["From Opportunity", "to Company."]}
            highlight="to Company."
            description="A new venture goes through the same five steps as every company before it."
          />
          <div className="mt-16">
            <BuildTimeline />
          </div>
        </Container>
      </section>

      <section aria-labelledby="who-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="who-title"
            eyebrow="Build with us"
            title={["Who We", "Work With."]}
            highlight="Work With."
          />
          <ul className="mt-14 grid gap-4 lg:grid-cols-3">
            {collaborators.map((item) => (
              <li key={item.title} className="rounded-3xl border border-line bg-surface shadow-card p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
