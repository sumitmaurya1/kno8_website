import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqList } from "@/components/ui/FaqList";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Tilt } from "@/components/ui/Tilt";
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
          <div className="space-y-6 text-xl leading-relaxed text-fg/85 lg:col-span-8">
            {company.longDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {company.audience && company.audience.length > 0 && (
              <div className="pt-4">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted">
                  Who it&rsquo;s for
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {company.audience.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-base font-semibold shadow-card"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

      {company.howItWorks && company.howItWorks.length > 0 && (
        <section aria-labelledby="how-title" className="py-14 sm:py-20">
          <Container>
            <h2 id="how-title" className="display text-4xl sm:text-5xl">
              How {company.name} works
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {company.howItWorks.map((step, index) => (
                <li key={step.title}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-card">
                      <p
                        className="font-display text-4xl font-bold tracking-tight"
                        style={{ color: accent.from }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
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
                  className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-card p-7"
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

      {company.highlights && company.highlights.length > 0 && (
        <section aria-labelledby="why-title" className="py-14 sm:py-20">
          <Container>
            <h2 id="why-title" className="display text-4xl sm:text-5xl">
              Why {company.name}
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.highlights.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={(index % 3) * 0.06} className="h-full">
                    <Tilt>
                      <article className="h-full rounded-2xl border border-line bg-surface p-7 shadow-card">
                        <IconBadge icon={Sparkles} />
                        <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                      </article>
                    </Tilt>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {company.gallery && company.gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="py-14 sm:py-20">
          <Container>
            <h2 id="gallery-title" className="display text-4xl sm:text-5xl">
              A closer look
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.gallery.map((image) => (
                <li
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-card"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {company.faqs && company.faqs.length > 0 && (
        <section aria-labelledby="company-faq-title" className="py-14 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-12">
            <h2 id="company-faq-title" className="display text-4xl sm:text-5xl lg:col-span-4">
              Questions about {company.name}
            </h2>
            <div className="lg:col-span-8">
              <FaqList faqs={company.faqs} />
            </div>
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
            {company.socials && company.socials.length > 0 && (
              <div className="grid gap-3 border-b border-line py-5 sm:grid-cols-3 sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:pt-3">
                  Follow
                </dt>
                <dd className="sm:col-span-2">
                  <SocialLinks links={company.socials} owner={company.name} />
                </dd>
              </div>
            )}
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
