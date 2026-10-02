import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "The terms that apply when you use the Kno8 website.",
  path: "/terms",
});

// Template wording. Have it reviewed by a legal adviser before launch.
const sections: LegalSection[] = [
  {
    id: "using",
    heading: "Using this website",
    paragraphs: [
      "This website provides information about Kno8 and the companies it builds and operates. You may browse it and share links to it for personal or business purposes.",
      "Please do not misuse the site: do not attempt to disrupt it, gain unauthorised access to it or use it to send unsolicited or unlawful material.",
    ],
  },
  {
    id: "companies",
    heading: "Kno8 companies",
    paragraphs: [
      "Each Kno8 company operates its own website, products and services under its own terms. Those terms, not these, govern your use of that company's products.",
    ],
  },
  {
    id: "content",
    heading: "Content and intellectual property",
    paragraphs: [
      "The text, design, logos and other material on this website belong to Kno8 or its companies unless stated otherwise. You may not reproduce them for commercial use without written permission.",
    ],
  },
  {
    id: "information",
    heading: "Information on this site",
    paragraphs: [
      "We aim to keep this website accurate and current, but it is provided for general information only. Nothing on it is professional, medical, financial or investment advice, or an offer to invest in Kno8 or any of its companies.",
    ],
  },
  {
    id: "links",
    heading: "Links to other websites",
    paragraphs: [
      "This website links to other sites, including those of Kno8 companies. We are not responsible for the content or practices of websites we do not operate.",
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    paragraphs: [
      "To the extent permitted by law, Kno8 is not liable for any loss arising from your use of, or reliance on, this website.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last changed.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="These terms apply when you use this website. By using it, you agree to them."
      sections={sections}
    />
  );
}
