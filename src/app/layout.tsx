import type { Metadata, Viewport } from "next";
import { Kristi, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/ui/BackToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { CookieNotice } from "@/components/ui/CookieNotice";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { companies } from "@/data/companies";
import { activeSocialLinks, siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
// Decorative handwritten accent only; never used for content that must be read.
const script = Kristi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kristi",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFF",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/brand/kno8-mark.png"),
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  ...(siteConfig.email ? { email: siteConfig.email } : {}),
  sameAs: activeSocialLinks().map((link) => link.href),
  subOrganization: companies.map((company) => ({
    "@type": "Organization",
    name: company.name,
    description: company.description,
    url: company.website ?? absoluteUrl(`/companies/${company.slug}`),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${jakarta.variable} ${script.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip">
        {/* Applies a saved dark theme before first paint, so the page never flashes light. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("kno8-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <ChatWidget />
          <CookieNotice />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
