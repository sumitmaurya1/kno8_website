import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { disciplines } from "@/data/content";

export function CareersSection() {
  return (
    <section aria-labelledby="careers-title" className="py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <SectionHeader
          id="careers-title"
          eyebrow="Careers"
          title={["Build the Next One", "With Us."]}
          highlight="With Us."
          description="Kno8 is building companies across multiple industries, which means we're constantly looking for curious people who enjoy solving problems and creating new things."
          className="lg:col-span-5"
        >
          <ButtonLink href="/careers">Explore Opportunities</ButtonLink>
        </SectionHeader>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-7">
          {disciplines.map((discipline) => (
            <li
              key={discipline.title}
              className="rounded-2xl border border-line bg-white px-5 py-6 font-display text-lg font-bold tracking-tight shadow-card"
            >
              {discipline.title}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
