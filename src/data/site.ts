import type { NavItem, SocialPlatform } from "@/types";

export const siteConfig = {
  name: "Kno8",
  tagline: "Ideas. Companies. Possibilities.",
  title: "Kno8 — Building Ideas Into Companies",
  description:
    "Kno8 is a technology, media and venture company building digital products, platforms and consumer brands across multiple industries.",
  /** Set NEXT_PUBLIC_SITE_URL in production. Used for canonical URLs, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kno8.in",
  /** Public contact address. Shown on the contact page and in structured data when set. */
  email: null as string | null,
  /**
   * WhatsApp number in international format, digits only (e.g. "919876543210").
   * Adds a WhatsApp option to the floating chat button when set.
   */
  whatsapp: null as string | null,
  whatsappMessage: "Hi Kno8, I'd like to talk about",
  /** Shown on the legal pages. */
  legalLastUpdated: "2026-10-02",
};

/**
 * Kno8's social profiles. Replace `null` with the profile URL to make an
 * icon a working link. `showInFooter` icons are displayed even without a
 * URL (not clickable until one is set); the rest stay hidden until then.
 */
export const socialLinks: {
  platform: SocialPlatform;
  label: string;
  href: string | null;
  showInFooter?: boolean;
}[] = [
  { platform: "facebook", label: "Facebook", href: null, showInFooter: true },
  { platform: "instagram", label: "Instagram", href: null, showInFooter: true },
  { platform: "youtube", label: "YouTube", href: null, showInFooter: true },
  { platform: "x", label: "X (Twitter)", href: null, showInFooter: true },
  { platform: "linkedin", label: "LinkedIn", href: null },
];

/** Only the profiles that have a URL. */
export function activeSocialLinks(): { platform: SocialPlatform; href: string }[] {
  return socialLinks.flatMap((link) =>
    link.href ? [{ platform: link.platform, href: link.href }] : [],
  );
}

export const mainNav: NavItem[] = [
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export const mobileNav: NavItem[] = [...mainNav, { label: "Contact", href: "/contact" }];

export const contactInterests = [
  { value: "partnership", label: "Partnership" },
  { value: "investment", label: "Investment" },
  { value: "working-with-kno8", label: "Working With Kno8" },
  { value: "media-podcast", label: "Media / Podcast" },
  { value: "product-collaboration", label: "Product Collaboration" },
  { value: "other", label: "Other" },
] as const;

export type ContactInterest = (typeof contactInterests)[number]["value"];

export function contactHref(interest?: ContactInterest): string {
  return interest ? `/contact?interest=${interest}` : "/contact";
}
