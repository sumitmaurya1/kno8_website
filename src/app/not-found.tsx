import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title={["This page", "doesn't exist."]}
      highlight="doesn't exist."
      description="The link may be old, or the page may have moved. The homepage and the companies list are good places to pick the trail back up."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/companies" variant="secondary">
          See our companies
        </ButtonLink>
      </div>
    </PageHero>
  );
}
