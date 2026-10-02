import { CompaniesGrid } from "@/components/companies/CompaniesGrid";
import { CTASection } from "@/components/home/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Companies",
  description:
    "The companies built and operated by Kno8, across startups and media, health and wellness, and more to come.",
  path: "/companies",
});

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our companies"
        title={["Different Ideas.", "One Vision."]}
        highlight="One Vision."
        description="Our companies operate across different industries, but they share one philosophy — identify meaningful problems, build thoughtful products and create experiences people genuinely value."
      />
      <section aria-label="All Kno8 companies" className="py-16 sm:py-24">
        <Container>
          <CompaniesGrid headingLevel="h2" />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
