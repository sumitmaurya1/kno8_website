export type CompanyStatus = "active" | "building" | "coming-soon";

/** Optional per-company colours. Falls back to the Kno8 gradient when omitted. */
export interface CompanyAccent {
  from: string;
  to: string;
}

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "x" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

export interface TitledItem {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CompanyOffering {
  title: string;
  description?: string;
}

export interface Company {
  name: string;
  slug: string;
  /** Bullet-separated, e.g. "Health • Wellness • Women". */
  category: string;
  tagline: string;
  description: string;
  longDescription: string[];
  /** Path under /public. */
  logo: string;
  /** Path under /public. */
  image: string;
  /** Full URL, or null until the company has a public site. */
  website: string | null;
  status: CompanyStatus;
  /** Featured companies get the large card treatment. */
  featured: boolean;
  accent?: CompanyAccent;
  mission?: string;
  whatWeDo?: string[];
  offeringsTitle?: string;
  offerings?: CompanyOffering[];
  /** Who the company serves, as short labels. */
  audience?: string[];
  /** Ordered steps describing how a customer uses the company. */
  howItWorks?: TitledItem[];
  /** Reasons to choose the company. */
  highlights?: TitledItem[];
  faqs?: Faq[];
  /** Screenshots or photos; paths under /public. */
  gallery?: { src: string; alt: string }[];
  /** The company's own social profiles. */
  socials?: SocialLink[];
  /** Extra rows for the "Company information" table, e.g. { label: "Founded", value: "2025" }. */
  facts?: { label: string; value: string }[];
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-10-01". */
  publishedAt: string;
  readingMinutes: number;
  body: ArticleSection[];
}

export interface NavItem {
  label: string;
  href: string;
}
