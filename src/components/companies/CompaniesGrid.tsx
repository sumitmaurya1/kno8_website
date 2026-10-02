import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { companies as allCompanies } from "@/data/companies";
import type { Company } from "@/types";
import { CompanyCard } from "./CompanyCard";
import { FutureVentureCard } from "./FutureVentureCard";

/**
 * Renders every company from src/data/companies.ts. Featured companies get
 * large alternating cards; the rest fall into a compact grid, so the layout
 * holds up whether there are two companies or twenty.
 */
export function CompaniesGrid({
  companies = allCompanies,
  showFutureCard = true,
  headingLevel = "h3",
}: {
  companies?: Company[];
  showFutureCard?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const featured = companies.filter((company) => company.featured);
  const rest = companies.filter((company) => !company.featured);

  return (
    <div className="space-y-5">
      {featured.map((company, index) => (
        <Reveal key={company.slug}>
          <Tilt max={2.5} radius="rounded-[2rem]">
            <CompanyCard company={company} flip={index % 2 === 1} headingLevel={headingLevel} />
          </Tilt>
        </Reveal>
      ))}

      {rest.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((company, index) => (
            <li key={company.slug}>
              <Reveal delay={(index % 3) * 0.06} className="h-full">
                <Tilt radius="rounded-3xl">
                  <CompanyCard company={company} variant="compact" headingLevel={headingLevel} />
                </Tilt>
              </Reveal>
            </li>
          ))}
        </ul>
      )}

      {showFutureCard && (
        <Reveal>
          <Tilt max={2.5} radius="rounded-[2rem]">
            <FutureVentureCard />
          </Tilt>
        </Reveal>
      )}
    </div>
  );
}
