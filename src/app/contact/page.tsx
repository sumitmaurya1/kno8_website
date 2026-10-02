import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { activeSocialLinks, contactInterests, siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Kno8 about partnerships, investment, working with us, media and podcast requests or product collaboration.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string | string[] }>;
}) {
  const { interest } = await searchParams;
  const requested = Array.isArray(interest) ? interest[0] : interest;
  const defaultInterest = contactInterests.find((option) => option.value === requested)?.value;

  return (
    <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow className="animate-rise">Contact</Eyebrow>
          <h1 className="display mt-6 animate-rise text-[clamp(2.75rem,5.6vw,4.75rem)] [animation-delay:80ms]">
            <Headline lines={["Let's Build", "Something Interesting."]} highlight="Interesting." />
          </h1>
          <p className="mt-8 max-w-md animate-rise text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Whether you&rsquo;re exploring a new company, partnership, product or content
            collaboration, we&rsquo;d love to hear what you&rsquo;re building.
          </p>

          <h2 className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            What people write to us about
          </h2>
          <ul className="mt-4 border-t border-line">
            {contactInterests
              .filter((option) => option.value !== "other")
              .map((option) => (
                <li key={option.value} className="border-b border-line py-3 font-medium">
                  {option.label}
                </li>
              ))}
          </ul>

          <div className="mt-8">
            <SocialLinks links={activeSocialLinks()} owner="Kno8" />
          </div>

          {siteConfig.email && (
            <p className="mt-8 text-muted">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-electric underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </p>
          )}
        </div>

        <div className="lg:col-span-7">
          <ContactForm defaultInterest={defaultInterest} />
        </div>
      </Container>
    </section>
  );
}
