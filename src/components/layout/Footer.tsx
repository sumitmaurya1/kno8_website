import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { companies } from "@/data/companies";
import { contactHref, siteConfig, socialLinks } from "@/data/site";
import type { NavItem } from "@/types";

const columns: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Companies", href: "/companies" },
      { label: "Careers", href: "/careers" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ventures",
    links: [
      ...companies.map((company) => ({
        label: company.name,
        href: `/companies/${company.slug}`,
      })),
      { label: "Future Ventures", href: "/ventures" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Podcast", href: contactHref("media-podcast") },
      { label: "Insights", href: "/insights" },
      { label: "Resources", href: "/insights#articles" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/privacy#cookies" },
    ],
  },
];

export function Footer() {
  const socials = socialLinks.filter((link) => link.href || link.showInFooter);

  return (
    <footer className="overflow-hidden border-t border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Kno8 home" className="inline-flex min-h-11 items-center">
              <Logo />
            </Link>
            <p className="mt-3 text-muted">{siteConfig.tagline}</p>

            <div className="mt-8">
              <SocialLinks links={socials} owner="Kno8" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-display text-base font-bold tracking-tight">
                  {column.title}
                </h2>
                <ul className="mt-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-[0.95rem] text-muted transition-colors hover:text-electric"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-line pt-8 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Kno8. All rights reserved.</p>
          <p>We Build Ideas Into Companies.</p>
        </div>
      </Container>

      {/* Oversized wordmark that closes the page. */}
      <p
        aria-hidden="true"
        className="display pointer-events-none -mb-[0.16em] select-none overflow-hidden bg-gradient-to-b from-electric/20 to-orchid/0 bg-clip-text text-center text-[27vw] leading-[0.8] text-transparent"
      >
        Kno8
      </p>
    </footer>
  );
}
