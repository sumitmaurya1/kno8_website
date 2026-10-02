import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Company } from "@/types";
import { cn, getAccent, hostname, splitCategory } from "@/lib/utils";

function accentStyle(company: Company): CSSProperties {
  const accent = getAccent(company);
  return {
    "--accent-from": accent.from,
    "--accent-to": accent.to,
  } as CSSProperties;
}

function CategoryTags({ category }: { category: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {splitCategory(category).map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function WebsiteLink({ company }: { company: Company }) {
  if (!company.website) return null;
  return (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit the ${company.name} website (opens in a new tab)`}
      className="relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      {hostname(company.website)}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

/**
 * `feature` is the large split card used for featured companies; `flip`
 * mirrors it so consecutive cards alternate. `compact` is the grid card.
 * The whole card is clickable through the stretched title link.
 */
export function CompanyCard({
  company,
  variant = "feature",
  flip = false,
  headingLevel: Heading = "h3",
}: {
  company: Company;
  variant?: "feature" | "compact";
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const href = `/companies/${company.slug}`;

  if (variant === "compact") {
    return (
      <article
        style={accentStyle(company)}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card p-7 transition-[border-color,transform] duration-500 ease-out-soft hover:-translate-y-1 hover:border-fg/25 sm:p-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-(--accent-from) to-(--accent-to)"
        />
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-2xl"
        />
        <Heading className="mt-6 font-display text-2xl font-semibold tracking-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {company.name}
          </Link>
        </Heading>
        <p className="mt-1 font-medium text-fg/80">{company.tagline}</p>
        <p className="mb-6 mt-4 leading-relaxed text-muted">{company.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <CategoryTags category={company.category} />
          <WebsiteLink company={company} />
        </div>
      </article>
    );
  }

  return (
    <article
      style={accentStyle(company)}
      className="group relative grid overflow-hidden rounded-[2rem] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-fg/20 hover:shadow-[0_30px_60px_-40px_rgba(6,11,34,0.35)] lg:grid-cols-12"
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[26rem]",
          flip && "lg:order-2",
        )}
      >
        <Image
          src={company.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
        />
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={72}
          height={72}
          className="absolute left-7 top-7 h-[4.5rem] w-[4.5rem] rounded-[1.25rem] shadow-[0_16px_30px_-18px_rgba(6,11,34,0.5)] sm:left-9 sm:top-9"
        />
      </div>

      <div className="flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14">
        <CategoryTags category={company.category} />
        <Heading className="display mt-7 text-[clamp(2rem,3.6vw,3.25rem)]">
          <Link href={href} className="after:absolute after:inset-0">
            {company.name}
          </Link>
        </Heading>
        <p className="mt-3 bg-gradient-to-r from-(--accent-from) to-(--accent-to) bg-clip-text font-display text-xl font-medium tracking-tight text-transparent sm:text-2xl">
          {company.tagline}
        </p>
        <p className="mb-10 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {company.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-[0.95rem] font-semibold text-white shadow-button transition-[filter] duration-200 group-hover:brightness-110"
          >
            Explore Company
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
          </span>
          <WebsiteLink company={company} />
        </div>
      </div>
    </article>
  );
}
