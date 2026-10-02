import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/ui/FaqList";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/data/content";

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
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
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
