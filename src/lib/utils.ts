import { siteConfig } from "@/data/site";
import type { Company, CompanyAccent } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export const defaultAccent: CompanyAccent = { from: "#2563FF", to: "#6D35FF" };

export function getAccent(company: Pick<Company, "accent">): CompanyAccent {
  return company.accent ?? defaultAccent;
}

/** "Health • Wellness • Women" -> ["Health", "Wellness", "Women"] */
export function splitCategory(category: string): string[] {
  return category
    .split("•")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
