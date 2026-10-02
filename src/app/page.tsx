import { CompaniesGrid } from "@/components/companies/CompaniesGrid";
import { BuildTimeline } from "@/components/home/BuildTimeline";
import { CareersSection } from "@/components/home/CareersSection";
import { CTASection } from "@/components/home/CTASection";
import { EcosystemMap } from "@/components/home/EcosystemMap";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { PhilosophyGrid } from "@/components/home/PhilosophyGrid";
import { PositioningStrip } from "@/components/home/PositioningStrip";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { articles } from "@/data/insights";

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      <Hero />
      <PositioningStrip />

      <section aria-labelledby="companies-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="companies-title"
            eyebrow="Our companies"
            title={["Different Ideas.", "One Vision."]}
            highlight="One Vision."
            description="Our companies operate across different industries, but they share one philosophy — identify meaningful problems, build thoughtful products and create experiences people genuinely value."
          />
          <div className="mt-12">
            <CompaniesGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="build-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="build-title"
            eyebrow="The Kno8 way"
            title={["From Opportunity", "to Company."]}
            highlight="to Company."
          />
          <Reveal className="mt-14 rounded-[2rem] border border-line bg-white p-7 shadow-card sm:p-10 lg:p-12">
            <BuildTimeline />
          </Reveal>
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
          <div className="mt-12">
            <IndustryGrid />
          </div>
        </Container>
      </section>

      <ManifestoSection cta={{ label: "More About Kno8", href: "/about" }} />

      <section aria-labelledby="philosophy-title" className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <SectionHeader
            id="philosophy-title"
            eyebrow="Philosophy"
            title={["Think Bigger.", "Build Better."]}
            highlight="Build Better."
            className="lg:col-span-5"
          />
          <div className="lg:col-span-7">
            <PhilosophyGrid columns={2} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="ecosystem-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="ecosystem-title"
            eyebrow="Ecosystem"
            title={["One Company.", "Multiple Possibilities."]}
            highlight="Multiple Possibilities."
          />
          <div className="mt-16">
            <EcosystemMap />
          </div>
        </Container>
      </section>

      {latest.length > 0 && (
        <section aria-labelledby="insights-title" className="py-16 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                id="insights-title"
                eyebrow="Latest insights"
                title={["Notes From", "the Build."]}
                highlight="the Build."
              />
              <ButtonLink href="/insights" variant="text">
                View All Insights
              </ButtonLink>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((article, index) => (
                <li key={article.slug}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <Tilt>
                      <ArticleCard article={article} index={index} />
                    </Tilt>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CTASection />
      <FaqSection />
      <CareersSection />
    </>
  );
}
