import type { Article } from "@/types";

/** Add an entry to publish an article at /insights/[slug]. Newest first is handled automatically. */
const entries: Article[] = [
  {
    slug: "why-kno8-is-a-parent-company",
    title: "Why Kno8 is a parent company, not a single product",
    excerpt:
      "Kno8 is no longer one product in one category. Here is why we organise ourselves as a family of companies instead.",
    category: "Company",
    publishedAt: "2026-10-02",
    readingMinutes: 3,
    body: [
      {
        paragraphs: [
          "Kno8 started with a simple belief: great companies begin with curiosity about how things could be better. Curiosity does not stay inside one industry, and over time neither did we.",
          "Today Kno8 is a parent company. We build and operate multiple businesses, each with its own name, audience and purpose.",
        ],
      },
      {
        heading: "One philosophy, different industries",
        paragraphs: [
          "Our companies operate across different industries, but they share one philosophy: identify meaningful problems, build thoughtful products and create experiences people genuinely value.",
          "That shared way of working is what Kno8 contributes. The individual companies contribute focus. A wellness platform and a startup media platform should not look or sound alike, and they do not have to.",
        ],
      },
      {
        heading: "What this changes",
        paragraphs: [
          "Instead of limiting ourselves to one industry, Kno8 operates as a growing ecosystem of companies, products and experiments. Some become platforms. Some become brands. Some become media. Some become entirely new companies.",
          "What connects them is the ambition to build something useful.",
        ],
      },
    ],
  },
  {
    slug: "from-opportunity-to-company",
    title: "From opportunity to company: the five steps we follow",
    excerpt:
      "Discover, design, build, launch, scale. A short walk through how an idea moves through Kno8.",
    category: "How we build",
    publishedAt: "2026-10-02",
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          "Every Kno8 company moves through the same five steps. The steps are simple on purpose. They keep us honest about where an idea really is.",
        ],
      },
      {
        heading: "Discover",
        paragraphs: [
          "We identify real-world problems, emerging behaviours and opportunities worth solving. The test at this stage is whether the problem is genuine, not whether the idea is fashionable.",
        ],
      },
      {
        heading: "Design",
        paragraphs: [
          "We turn ideas into brands, experiences, products and sustainable business models. A company needs all four before it is worth building.",
        ],
      },
      {
        heading: "Build",
        paragraphs: [
          "Our teams develop technology, platforms, content and operational systems. Depending on the company, the product might be software, a service or a show.",
        ],
      },
      {
        heading: "Launch",
        paragraphs: [
          "We take products to market, learn from real users and continuously improve. Products become better through real customers, real feedback and continuous iteration.",
        ],
      },
      {
        heading: "Scale",
        paragraphs: [
          "Successful ideas evolve into independent brands and businesses within the Kno8 ecosystem.",
        ],
      },
    ],
  },
  {
    slug: "meet-brewing-startup-and-naricarelife",
    title: "Meet the companies: Brewing Startup and NariCareLife",
    excerpt:
      "One is for founders and builders. The other supports women through every stage of life. Both are Kno8 companies.",
    category: "Companies",
    publishedAt: "2026-10-02",
    readingMinutes: 3,
    body: [
      {
        heading: "Brewing Startup",
        paragraphs: [
          "Brewing Startup is a platform for founders, builders and ambitious minds exploring entrepreneurship, startup ideas, product building and the stories behind growing companies.",
          "Through insightful content, conversations and resources, it aims to make the startup journey easier to understand and more exciting to begin.",
        ],
      },
      {
        heading: "NariCareLife",
        paragraphs: [
          "NariCareLife is a women-focused wellness platform designed to support women through different stages of life with personalised nutrition, wellness programs and professional consultations.",
          "Its programs cover PCOS and PCOD, pregnancy and postpartum, thyroid and hormonal wellness, fertility, menopause, healthy weight loss and gain, and child nutrition.",
        ],
      },
      {
        heading: "What they have in common",
        paragraphs: [
          "Very little on the surface, and that is the point. The two companies serve different people with different needs. What they share is the way they were built: start from a meaningful problem and make something people genuinely value.",
          "The companies you see today are only the beginning.",
        ],
      },
    ],
  },
];

export const articles: Article[] = [...entries].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
