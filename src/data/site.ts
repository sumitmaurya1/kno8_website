import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Kno8",
  tagline: "Ideas. Companies. Possibilities.",
  title: "Kno8 — Building Ideas Into Companies",
  description:
    "Kno8 is a technology, media and venture company building digital products, platforms and consumer brands across multiple industries.",
  /** Set NEXT_PUBLIC_SITE_URL in production. Used for canonical URLs, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kno8.com",
  /** Public contact address. Shown on the contact page and in structured data when set. */
  email: null as string | null,
  /** Shown on the legal pages. */
  legalLastUpdated: "2026-10-02",
};

export type SocialPlatform = "instagram" | "linkedin" | "youtube" | "x";

/** Add a profile URL to show its icon in the footer. Entries without a URL stay hidden. */
export const socialLinks: { platform: SocialPlatform; label: string; href: string | null }[] = [
  { platform: "instagram", label: "Instagram", href: null },
  { platform: "linkedin", label: "LinkedIn", href: null },
  { platform: "youtube", label: "YouTube", href: null },
  { platform: "x", label: "X", href: null },
];

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
