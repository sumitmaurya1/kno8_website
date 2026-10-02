import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/content";

/** Uses native <details>, so it works without JavaScript and is keyboard accessible by default. */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeader
            id="faq-title"
            eyebrow="FAQ"
            title={["Frequently Asked", "Questions"]}
            highlight="Questions"
          />
          <ul className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <li key={faq.question}>
                <details className="group rounded-2xl border border-line bg-white shadow-card">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-iris transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-muted">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="text">
              Ask us something else
            </ButtonLink>
          </div>
        </div>

        <div aria-hidden="true" className="relative hidden lg:col-span-5 lg:block">
          <LogoMark
            className="mx-auto h-64 w-auto animate-float drop-shadow-[0_30px_35px_rgba(77,70,255,0.3)]"
            sizes="200px"
          />
          <p className="mt-6 -rotate-6 text-center font-script text-6xl leading-[0.8] text-iris">
            Ideas
            <br />
            Companies
            <br />
            Possibilities
          </p>
        </div>
      </Container>
    </section>
  );
}
