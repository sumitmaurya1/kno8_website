import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article className="pb-24 pt-36 sm:pb-32 sm:pt-44">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="display mt-6 text-[clamp(2.75rem,6vw,4.75rem)]">{title}</h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Last updated{" "}
          <time dateTime={siteConfig.legalLastUpdated}>
            {formatDate(siteConfig.legalLastUpdated)}
          </time>
        </p>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-4">
            <ul className="lg:sticky lg:top-28">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-2xl lg:col-span-8">
            <p className="text-xl leading-relaxed">{intro}</p>
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-12">
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-[1.75] text-fg/85">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
