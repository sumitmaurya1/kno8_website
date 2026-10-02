import type { Company, CompanyStatus } from "@/types";

/**
 * The single source of truth for every Kno8 company.
 *
 * Add an entry here and it appears everywhere automatically: the homepage,
 * the Companies page, its own /companies/[slug] page, the navigation mega
 * menu, the mobile menu, the footer, the ecosystem map and the sitemap.
 */
export const companies: Company[] = [
  {
    name: "Brewing Startup",
    slug: "brewing-startup",
    category: "Startups • Entrepreneurship • Media",
    tagline: "Where Ideas Start Brewing.",
    description:
      "Brewing Startup is a platform for founders, builders and ambitious minds exploring entrepreneurship, startup ideas, product building and the stories behind growing companies.",
    longDescription: [
      "Brewing Startup is a platform for founders, builders and ambitious minds exploring entrepreneurship, startup ideas, product building and the stories behind growing companies.",
      "Through insightful content, conversations and resources, Brewing Startup aims to make the startup journey easier to understand and more exciting to begin.",
    ],
    logo: "/companies/brewing-startup-logo.png",
    image: "/companies/brewing-startup-cover.svg",
    website: "https://brewingstartup.com",
    status: "active",
    featured: true,
    accent: { from: "#C6962F", to: "#8F6418" },
    mission:
      "To make the startup journey easier to understand and more exciting to begin.",
    whatWeDo: [
      "Explores entrepreneurship, startup ideas and product building in plain language.",
      "Shares the stories behind growing companies and the people building them.",
      "Gives first-time founders a clearer picture of what starting actually involves.",
    ],
    audience: ["Founders", "Builders", "First-time entrepreneurs", "Ambitious minds"],
    highlights: [
      {
        title: "Plain language",
        description: "The startup journey explained so it is easier to understand.",
      },
      {
        title: "Real stories",
        description: "The stories behind growing companies, told by the people building them.",
      },
      {
        title: "A reason to start",
        description: "Made to leave you more excited to begin, not more intimidated.",
      },
    ],
    faqs: [
      {
        question: "Who is Brewing Startup for?",
        answer:
          "Founders, builders and ambitious minds exploring entrepreneurship, startup ideas and product building.",
      },
      {
        question: "What does Brewing Startup publish?",
        answer:
          "Insightful content, conversations and resources about starting and growing companies.",
      },
    ],
    offeringsTitle: "What you'll find",
    offerings: [
      {
        title: "Content",
        description:
          "Insightful pieces on startup ideas, product building and entrepreneurship.",
      },
      {
        title: "Conversations",
        description:
          "Discussions with founders and builders about how companies really grow.",
      },
      {
        title: "Resources",
        description:
          "Practical material for people who want to move from idea to first step.",
      },
    ],
  },
  {
    name: "NariCareLife",
    slug: "naricarelife",
    category: "Health • Wellness • Women",
    tagline: "Wellness for Every Stage of Her Life.",
    description:
      "NariCareLife is a women-focused wellness platform designed to support women through different stages of life with personalised nutrition, wellness programs and professional consultations.",
    longDescription: [
      "NariCareLife is a women-focused wellness platform designed to support women through different stages of life with personalised nutrition, wellness programs and professional consultations.",
      "Its ecosystem spans hormonal health, pregnancy and postpartum care, weight management and family nutrition, so support can change as a woman's needs change.",
    ],
    logo: "/companies/naricarelife-logo.png",
    image: "/companies/naricarelife-cover.svg",
    website: "https://naricarelife.com/",
    status: "active",
    featured: true,
    accent: { from: "#F64980", to: "#B3124D" },
    mission:
      "To support women through every stage of life with wellness that is personal, practical and professionally guided.",
    whatWeDo: [
      "Builds personalised nutrition plans around each woman's stage of life.",
      "Runs structured wellness programs for specific health needs.",
      "Connects women with professionals for one-to-one consultations.",
    ],
    audience: [
      "Teens and young adults",
      "Working women",
      "Women planning a pregnancy",
      "Expecting and new mothers",
      "Women in menopause",
      "Parents",
    ],
    howItWorks: [
      {
        title: "Choose your concern",
        description: "Select the wellness area where you need support.",
      },
      {
        title: "Select your plan",
        description: "Choose a 1, 3 or 6-month program that fits your life.",
      },
      {
        title: "Talk to your expert",
        description: "Connect one-on-one with a qualified nutrition professional.",
      },
      {
        title: "Follow your journey",
        description: "Receive structured guidance and track your progress over time.",
      },
    ],
    highlights: [
      {
        title: "Women's health focus",
        description:
          "Everything is shaped around women's nutrition needs, from the first period to menopause and the motherhood years in between.",
      },
      {
        title: "Plans built around your lifestyle",
        description:
          "Office hours, night shifts, school runs or joint family kitchens: the plan fits the day.",
      },
      {
        title: "Indian food friendly",
        description:
          "Familiar dals, sabzis, millets and regional favourites. No expensive imported superfoods required.",
      },
      {
        title: "Expert guidance by phone",
        description: "A simple voice call from home. No video, no travel, no waiting rooms.",
      },
      {
        title: "Sustainable habits",
        description: "Small, realistic changes that are easier to keep than strict rules.",
      },
      {
        title: "Progress-focused approach",
        description:
          "Regular reviews look at consistency, energy and routine, not just the number on a scale.",
      },
    ],
    faqs: [
      {
        question: "How do consultations take place?",
        answer:
          "By voice call, one-on-one with a qualified nutrition professional. There is no video call and no travel.",
      },
      {
        question: "How long are the programs?",
        answer: "Programs run as structured 1, 3 or 6-month journeys with dietitian consultations and progress reviews.",
      },
      {
        question: "Are the plans based on Indian food?",
        answer:
          "Yes. Plans are built around real Indian meals and routines, using familiar everyday foods.",
      },
      {
        question: "Does NariCareLife replace medical care?",
        answer:
          "No. It offers nutrition and lifestyle guidance that complements the care you receive from your doctor.",
      },
    ],
    offeringsTitle: "Wellness programs",
    offerings: [
      { title: "PCOS / PCOD wellness" },
      { title: "Pregnancy nutrition" },
      { title: "Postpartum wellness" },
      { title: "Thyroid wellness" },
      { title: "Hormonal wellness" },
      { title: "Fertility nutrition" },
      { title: "Menopause wellness" },
      { title: "Healthy weight loss" },
      { title: "Healthy weight gain" },
      { title: "Child nutrition" },
    ],
  },
];

export const statusLabels: Record<CompanyStatus, string> = {
  active: "Active",
  building: "In development",
  "coming-soon": "Coming soon",
};

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

export function getRelatedCompanies(slug: string, limit = 3): Company[] {
  return companies.filter((company) => company.slug !== slug).slice(0, limit);
}
