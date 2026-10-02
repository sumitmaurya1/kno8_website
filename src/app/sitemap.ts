import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { articles } from "@/data/insights";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes = [
  "/",
  "/about",
  "/companies",
  "/ventures",
  "/partner",
  "/insights",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...companies.map((company) => ({
      url: absoluteUrl(`/companies/${company.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: article.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
