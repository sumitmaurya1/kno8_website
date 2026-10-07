import type { SocialLink } from "@/types";

export interface Founder {
  name: string;
  role: string;
  /** Areas the person leads, shown as chips. */
  focus?: string[];
  bio?: string;
  /** Work email, shown as a mail button. */
  email?: string;
  /** Path under /public, e.g. "/team/jane-doe.jpg". Initials are shown when omitted. */
  photo?: string;
  links?: SocialLink[];
}

/**
 * The people behind Kno8, shown in the "Founders" section of the About page.
 * While the list is empty the section stays hidden.
 */
export const founders: Founder[] = [
  {
    name: "Girish Naidu",
    role: "Founder & Strategic Advisor",
    focus: ["Investor Relations", "Consultations"],
    email: "girish@kno8.in",
  },
  {
    name: "Sumit Maurya",
    role: "Co-founder & Technology Lead",
    focus: ["Web Development", "App Development", "UI/UX Design"],
    email: "sumit@kno8.in",
  },
  {
    name: "Sunita Ghorai",
    role: "Co-founder & Brand Strategist",
    focus: ["Brand Strategy", "Storytelling", "Strategic Partnerships"],
    email: "sunita@kno8.in",
  },
];
