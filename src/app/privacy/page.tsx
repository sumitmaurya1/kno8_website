import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Kno8 collects, uses and protects information on this website.",
  path: "/privacy",
});

// Template wording. Have it reviewed against your actual data practices before launch.
const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "What this policy covers",
    paragraphs: [
      "This policy applies to this website, operated by Kno8. Each Kno8 company runs its own website and services and publishes its own privacy policy, which applies when you use that company's products.",
    ],
  },
  {
    id: "information",
    heading: "Information we collect",
    paragraphs: [
      "When you use the contact form we collect what you enter: your name, email address, company if you provide it, the topic you select and your message.",
      "Like most websites, our hosting provider may record basic technical information such as IP address, browser type and the pages requested, in order to deliver and secure the site.",
    ],
  },
  {
    id: "use",
    heading: "How we use it",
    paragraphs: [
      "We use contact form submissions to read and reply to your enquiry and to keep a record of the conversation. We do not sell personal information.",
      "We may share an enquiry with the relevant Kno8 company when your message is about that company.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    paragraphs: [
      "This website does not set advertising or tracking cookies. It saves two small preferences in your browser's local storage: whether you chose the light or dark theme, and whether you have dismissed the cookie notice. Neither is sent to us or shared with anyone.",
      "If we add analytics or similar tools in future, we will update this section to describe them and, where required, ask for your consent first.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiries for as long as needed to respond and to maintain a reasonable record of our correspondence, and delete them when they are no longer needed.",
    ],
  },
  {
    id: "rights",
    heading: "Your choices",
    paragraphs: [
      "You can ask us for a copy of the personal information we hold about you, ask us to correct it or ask us to delete it. Depending on where you live, you may have additional rights under local law.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    paragraphs: [
      "For any question about this policy or your information, write to us through the contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains what information Kno8 collects through this website, what we do with it and the choices you have."
      sections={sections}
    />
  );
}
