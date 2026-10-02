import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { companies, getCompany, getRelatedCompanies, statusLabels } from "@/data/companies";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getAccent, hostname } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return pageMetadata({
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
    path: `/companies/${company.slug}`,
  });
}

function VisitButton({
  website,
  name,
  variant = "primary",
}: {
  website: string | null;
  name: string;
  variant?: "primary" | "light";
}) {
  return website ? (
    <ButtonLink href={website} external variant={variant}>
      Visit Website
    </ButtonLink>
  ) : (
    <ButtonLink href="/contact" variant={variant}>
      Ask About {name}
    </ButtonLink>
  );
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const accent = getAccent(company);
  const related = getRelatedCompanies(company.slug);
  const facts = [
    { label: "Category", value: company.category },
    { label: "Status", value: statusLabels[company.status] },
    { label: "Parent company", value: "Kno8" },
    ...(company.facts ?? []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    slogan: company.tagline,
    url: company.website ?? absoluteUrl(`/companies/${company.slug}`),
    logo: absoluteUrl(company.logo),
    parentOrganization: { "@type": "Organization", name: "Kno8", url: absoluteUrl("/") },
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-line pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[20%] -top-[30%] h-[46rem] w-[46rem] rounded-full opacity-25"
          style={{
            background: `radial-gradient(closest-side, ${accent.to}, transparent)`,
          }}
        />
        <Container className="relative">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={88}
            height={88}
            priority
            className="h-[5.5rem] w-[5.5rem] animate-rise rounded-3xl"
          />
          <Eyebrow className="mt-10 animate-rise [animation-delay:60ms]">{company.category}</Eyebrow>
          <h1 className="display mt-5 animate-rise text-[clamp(2.75rem,7.4vw,6rem)] [animation-delay:120ms]">
            {company.name}
          </h1>
          <p
            className="mt-4 animate-rise bg-clip-text font-display text-2xl font-medium tracking-tight text-transparent [animation-delay:180ms] sm:text-3xl"
            style={{ backgroundImage: `linear-gradient(100deg, ${accent.from}, ${accent.to})` }}
          >
            {company.tagline}
          </p>
          <p className="mt-8 max-w-2xl animate-rise text-lg leading-relaxed text-muted [animation-delay:240ms] sm:text-xl">
            {company.description}
          </p>
          <div className="mt-10 animate-rise [animation-delay:300ms]">
            <VisitButton website={company.website} name={company.name} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-title" className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="about-title" className="display text-4xl sm:text-5xl lg:col-span-4">
            About
          </h2>
          <div className="space-y-6 text-xl leading-relaxed text-navy/85 lg:col-span-8">
            {company.longDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {company.whatWeDo && company.whatWeDo.length > 0 && (
        <section aria-labelledby="what-title" className="py-14 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-12">
            <h2 id="what-title" className="display text-4xl sm:text-5xl lg:col-span-4">
              What {company.name} does
            </h2>
            <ul className="lg:col-span-8">
              {company.whatWeDo.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-line py-5 text-lg leading-relaxed first:pt-0"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0"
                    style={{ color: accent.to }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {company.mission && (
        <section aria-labelledby="mission-title" className="on-dark bg-navy py-20 text-white sm:py-28">
          <Container>
            <h2
              id="mission-title"
              className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/70"
            >
              Mission
            </h2>
            <Reveal>
              <p className="display mt-6 max-w-5xl text-[clamp(1.9rem,4.2vw,3.5rem)] !leading-[1.08]">
                {company.mission}
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      {company.offerings && company.offerings.length > 0 && (
        <section aria-labelledby="offerings-title" className="py-14 sm:py-20">
          <Container>
            <h2 id="offerings-title" className="display text-4xl sm:text-5xl">
              {company.offeringsTitle ?? "Products and services"}
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.offerings.map((offering) => (
                <li
                  key={offering.title}
                  className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-card p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${accent.from}, ${accent.to})`,
                    }}
                  />
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {offering.title}
                  </h3>
                  {offering.description && (
                    <p className="mt-2 leading-relaxed text-muted">{offering.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="info-title" className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="info-title" className="display text-4xl sm:text-5xl lg:col-span-4">
            Company information
          </h2>
          <dl className="lg:col-span-8">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 border-b border-line py-5 first:pt-0 sm:grid-cols-3 sm:gap-6"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:pt-1">
                  {fact.label}
                </dt>
                <dd className="text-lg sm:col-span-2">{fact.value}</dd>
              </div>
            ))}
            <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:pt-1">
                Website
              </dt>
              <dd className="text-lg sm:col-span-2">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-electric underline underline-offset-4"
                  >
                    {hostname(company.website)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="text-muted">Not published yet</span>
                )}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-14 sm:py-20">
          <Container>
            <h2 id="related-title" className="display text-4xl sm:text-5xl">
              More from Kno8
            </h2>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <CompanyCard company={item} variant="compact" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="visit-title" className="px-3 pb-3 sm:px-5">
        <div className="on-dark rounded-[2rem] bg-navy text-white sm:rounded-[2.5rem]">
          <Container className="flex flex-col items-start gap-8 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="visit-title" className="display text-[clamp(2.25rem,5vw,4.25rem)]">
                {company.tagline}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/75">
                {company.website
                  ? `See what ${company.name} is building.`
                  : `${company.name} doesn't have a public site listed here yet. Get in touch and we'll point you the right way.`}
              </p>
            </div>
            <VisitButton website={company.website} name={company.name} variant="light" />
          </Container>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
