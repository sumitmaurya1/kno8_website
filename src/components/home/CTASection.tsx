import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  title = ["Have an Idea", "Worth Building?"],
  highlight,
  paragraphs = [
    "We are always interested in meeting ambitious founders, creators, specialists and businesses working on meaningful ideas.",
    "Whether you're exploring a new company, partnership, product or content collaboration, we'd love to hear what you're building.",
  ],
  cta = { label: "Start a Conversation", href: "/contact" },
  id = "cta",
}: {
  title?: string[];
  highlight?: string;
  paragraphs?: string[];
  cta?: { label: string; href: string };
  id?: string;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="py-8 sm:py-12">
      <Container>
        <div
          className="on-dark relative overflow-hidden rounded-[2rem] text-white"
          style={{ backgroundImage: "linear-gradient(115deg, #0B1B6F 0%, #2330D0 55%, #5B2BE0 100%)" }}
        >
          {/* Large soft orbs echo the two halves of the logo. */}
          <span
            aria-hidden="true"
            className="absolute -left-24 top-1/3 h-80 w-80 animate-float rounded-full bg-[#2563FF]/50 [animation-duration:9s]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-32 -right-16 h-96 w-96 animate-float rounded-full bg-[#7B3BFF]/50 [animation-delay:-4s] [animation-duration:11s]"
          />
          <Reveal className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 sm:py-24">
            <h2 id={`${id}-title`} className="display text-[clamp(2.25rem,5vw,4rem)]">
              <Headline lines={title} highlight={highlight} tone="dark" />
            </h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-white/85">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9">
              <ButtonLink href={cta.href} variant="light">
                {cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
