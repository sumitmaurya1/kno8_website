import { PartnerForm } from "@/components/partner/PartnerForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companies } from "@/data/companies";
import { partnerPaths } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner With Us",
  description:
    "Three ways to work with Kno8: bring an idea as a founder, start a conversation as an investor, or propose a partnership or collaboration.",
  path: "/partner",
});

const expectations = [
  {
    title: "Tell us what you have in mind",
    description: "Pick the path that fits and fill in the short form. A few honest sentences are enough.",
  },
  {
    title: "It reaches the Kno8 team",
    description: "Your message goes to the people who build and run our companies.",
  },
  {
    title: "We reply by email",
    description: "If there is a fit, we will write back to arrange a conversation.",
  },
];

export default async function PartnerPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string | string[] }>;
}) {
  const { path } = await searchParams;
  const requested = Array.isArray(path) ? path[0] : path;
  const defaultPath = partnerPaths.find((option) => option.value === requested)?.value;

  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title={["Build It", "With Kno8."]}
        highlight="With Kno8."
        description="We are always interested in meeting ambitious founders, creators, specialists and businesses working on meaningful ideas. Choose the path that fits you."
      />

      <section aria-label="Partner enquiry" className="pb-16 sm:pb-24">
        <Container>
          <PartnerForm
            defaultPath={defaultPath}
            interestOptions={companies.map((company) => company.name)}
          />
        </Container>
      </section>

      <section aria-labelledby="expect-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            id="expect-title"
            eyebrow="What to expect"
            title={["After You", "Press Send."]}
            highlight="Press Send."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {expectations.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-surface p-7 shadow-card"
              >
                <p className="text-sm font-bold text-iris">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
