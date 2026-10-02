import Image from "next/image";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Tilt } from "@/components/ui/Tilt";
import { founders } from "@/data/team";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Renders the people in src/data/team.ts; hidden while that list is empty. */
export function FoundersSection() {
  if (founders.length === 0) return null;

  return (
    <section aria-labelledby="founders-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="founders-title"
          eyebrow={founders.length === 1 ? "Founder" : "Founders"}
          title={["The People", "Behind Kno8."]}
          highlight="Behind Kno8."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((founder, index) => (
            <li key={founder.name}>
              <Reveal delay={index * 0.06} className="h-full">
                <Tilt radius="rounded-3xl">
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-card">
                    {founder.photo ? (
                      <Image
                        src={founder.photo}
                        alt={`Portrait of ${founder.name}`}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="bg-brand flex h-24 w-24 items-center justify-center rounded-full font-display text-3xl font-bold text-white"
                      >
                        {initials(founder.name)}
                      </span>
                    )}
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="mt-1 font-semibold text-iris">{founder.role}</p>
                    {founder.bio && (
                      <p className="mt-4 leading-relaxed text-muted">{founder.bio}</p>
                    )}
                    {founder.focus && founder.focus.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {founder.focus.map((area) => (
                          <li
                            key={area}
                            className="rounded-full bg-tint px-3 py-1.5 text-sm font-semibold text-iris"
                          >
                            {area}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                      {founder.email && (
                        <a
                          href={`mailto:${founder.email}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold transition-colors hover:border-electric/50 hover:text-electric"
                        >
                          <Mail aria-hidden="true" className="h-4 w-4" />
                          {founder.email}
                        </a>
                      )}
                      <SocialLinks links={founder.links ?? []} owner={founder.name} />
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
