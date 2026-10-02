import {
  BadgeCheck,
  BookOpen,
  Building2,
  Hourglass,
  Lightbulb,
  Package,
  RefreshCcw,
  Sparkles,
  Zap,
  Compass,
  Cpu,
  HeartPulse,
  Mic,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export const positioning: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Ideas", description: "Where it starts", icon: Lightbulb },
  { title: "Companies", description: "What we build", icon: Building2 },
  { title: "Products", description: "Made to be used", icon: Package },
  { title: "Media", description: "Stories worth sharing", icon: Mic },
  { title: "Technology", description: "Tools with purpose", icon: Cpu },
  { title: "Possibilities", description: "What comes next", icon: Sparkles },
];

export const buildSteps = [
  {
    title: "Discover",
    description:
      "We identify real-world problems, emerging behaviours and opportunities worth solving.",
  },
  {
    title: "Design",
    description:
      "We turn ideas into brands, experiences, products and sustainable business models.",
  },
  {
    title: "Build",
    description:
      "Our teams develop technology, platforms, content and operational systems.",
  },
  {
    title: "Launch",
    description:
      "We take products to market, learn from real users and continuously improve.",
  },
  {
    title: "Scale",
    description:
      "Successful ideas evolve into independent brands and businesses within the Kno8 ecosystem.",
  },
];

export const industries: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Technology & SaaS",
    description: "Digital tools and platforms that make work and everyday life simpler.",
    icon: Cpu,
  },
  {
    title: "Health & Wellness",
    description: "Consumer wellness platforms designed around meaningful human needs.",
    icon: HeartPulse,
  },
  {
    title: "Media & Podcasts",
    description:
      "Conversations, stories and content that share knowledge and inspire action.",
    icon: Mic,
  },
  {
    title: "Consumer Products",
    description: "Digital-first brands designed around changing customer behaviour.",
    icon: ShoppingBag,
  },
  {
    title: "Education & Knowledge",
    description: "Products that make learning more useful, accessible and engaging.",
    icon: BookOpen,
  },
  {
    title: "Future Ventures",
    description: "New industries, ideas and experiments continuously being explored.",
    icon: Compass,
  },
];

export const philosophy: { title: string; description: string; icon: LucideIcon }[] = [
  {
    icon: BadgeCheck,
    title: "Useful Over Trendy",
    description:
      "We focus on ideas that solve genuine problems rather than simply following trends.",
  },
  {
    icon: Hourglass,
    title: "Long-Term Thinking",
    description:
      "Brands and products should be designed to evolve for years, not weeks.",
  },
  {
    icon: Zap,
    title: "Technology With Purpose",
    description:
      "Technology matters when it improves someone's experience or creates meaningful value.",
  },
  {
    icon: RefreshCcw,
    title: "Build. Learn. Improve.",
    description:
      "Products become better through real customers, real feedback and continuous iteration.",
  },
];

export const manifesto = {
  lead: "Kno8 started with a simple belief:",
  belief: "Great companies begin with curiosity about how things could be better.",
  paragraphs: [
    "We explore ideas, test possibilities and build products around genuine customer problems.",
    "Instead of limiting ourselves to one industry, Kno8 operates as a growing ecosystem of companies, products and experiments.",
  ],
  outcomes: [
    "Some become platforms.",
    "Some become brands.",
    "Some become media.",
    "Some become entirely new companies.",
  ],
  close: "What connects them is the ambition to build something useful.",
};

export const disciplines = [
  { title: "Developers", description: "Engineers who turn early ideas into working products." },
  { title: "Designers", description: "People who shape brands, interfaces and experiences." },
  { title: "Marketers", description: "People who find the audience and tell the story clearly." },
  { title: "Creators", description: "Writers, hosts and producers who make things worth following." },
  { title: "Operators", description: "People who keep a young company running and growing." },
  { title: "Domain Experts", description: "Specialists who bring real knowledge of a field to what we build." },
];

/**
 * About page timeline. `period` is free text ("2024", "Early 2025", "Today").
 * Replace the labels with real dates as they are confirmed.
 */
export const milestones = [
  {
    period: "The starting point",
    title: "A belief about curiosity",
    description:
      "Kno8 begins with the idea that great companies start with curiosity about how things could be better.",
  },
  {
    period: "First companies",
    title: "Brewing Startup and NariCareLife",
    description:
      "Two companies in two very different fields: one for founders and builders, one for women's wellness.",
  },
  {
    period: "Today",
    title: "A parent company",
    description:
      "Kno8 operates as a growing ecosystem of companies, products and experiments rather than a single product.",
  },
  {
    period: "Next",
    title: "More companies",
    description:
      "New ventures across technology, health, media, education, consumer products and digital services.",
  },
];

export const ventureAreas = [
  "Technology",
  "Health",
  "Media",
  "Education",
  "Consumer products",
  "Digital services",
];

export const collaborators = [
  {
    title: "Founders",
    description:
      "You have an idea or an early company and want a partner who will help design, build and launch it.",
  },
  {
    title: "Creators and specialists",
    description:
      "You know a field deeply, or have an audience, and want to turn that into a product, brand or show.",
  },
  {
    title: "Businesses",
    description:
      "You see a partnership, product or content collaboration that fits one of our companies.",
  },
];

/** Homepage FAQ. Answers restate what the rest of the site already says. */
export const faqs = [
  {
    question: "What is Kno8?",
    answer:
      "Kno8 is a technology, media and venture company. It is the parent company that builds and operates multiple businesses, creating digital products, platforms and consumer brands.",
  },
  {
    question: "Is Kno8 only a technology company?",
    answer:
      "No. Instead of limiting ourselves to one industry, Kno8 operates as a growing ecosystem of companies, products and experiments. Some become platforms, some become brands, some become media.",
  },
  {
    question: "How does Kno8 build a company?",
    answer:
      "In five steps: discover a real problem, design the brand and business, build the product, launch and learn from real users, then scale it into an independent brand within the Kno8 ecosystem.",
  },
  {
    question: "Will Kno8 launch more companies?",
    answer:
      "Yes. Kno8 continuously explores opportunities across technology, health, media, education, consumer products and digital services. The companies you see today are only the beginning.",
  },
  {
    question: "How can I work or partner with Kno8?",
    answer:
      "Use the contact page to tell us what you're building or what you do. We are always interested in meeting founders, creators, specialists and businesses working on meaningful ideas.",
  },
];

/** The three routes on the Partner page. Each has its own short form. */
export const partnerPaths = [
  {
    value: "founders",
    title: "Founders",
    summary:
      "You have an idea or an early company and want a partner to help design, build and launch it.",
    orgLabel: "Company or idea name",
    orgRequired: false,
    detailLabel: "Stage",
    details: ["Just an idea", "Prototype", "Launched", "Growing"],
    messageLabel: "What are you building?",
    submitLabel: "Send My Idea",
  },
  {
    value: "investors",
    title: "Investors",
    summary: "You're interested in Kno8 or one of its companies and want an introduction.",
    orgLabel: "Firm",
    orgRequired: false,
    detailLabel: "Area of interest",
    /** Company names are appended automatically from companies.ts. */
    details: ["Kno8 as a whole", "Future ventures"],
    messageLabel: "What would you like to know?",
    submitLabel: "Request an Introduction",
  },
  {
    value: "collaborators",
    title: "Collaborators",
    summary:
      "You see a partnership, product or content collaboration that fits one of our companies.",
    orgLabel: "Organisation",
    orgRequired: false,
    detailLabel: "Type of collaboration",
    details: ["Partnership", "Product collaboration", "Media / Podcast", "Other"],
    messageLabel: "What do you have in mind?",
    submitLabel: "Propose a Collaboration",
  },
] as const;

export type PartnerPath = (typeof partnerPaths)[number]["value"];
