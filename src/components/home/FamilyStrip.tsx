import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { companies } from "@/data/companies";

/** Every company as a small logo chip, plus an open slot for what comes next. */
export function FamilyStrip() {
  return (
    <section aria-labelledby="family-title" className="pb-4 pt-2">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <h2
          id="family-title"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted"
        >
          The Kno8 family
        </h2>
        <ul className="flex flex-wrap gap-3">
          {companies.map((company) => (
            <li key={company.slug}>
              <Link
                href={`/companies/${company.slug}`}
                className="flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-5 text-sm font-semibold shadow-card transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-electric/40"
              >
                <Image
                  src={company.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full"
                />
                {company.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/ventures"
              className="flex min-h-12 items-center gap-2.5 rounded-full border border-dashed border-fg/25 py-1.5 pl-1.5 pr-5 text-sm font-semibold text-muted transition-colors duration-200 hover:border-electric/50 hover:text-electric"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tint text-iris">
                <Plus aria-hidden="true" className="h-4 w-4" />
              </span>
              Next venture
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
