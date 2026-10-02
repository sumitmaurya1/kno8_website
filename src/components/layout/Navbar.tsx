"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/ButtonLink";
import { companies } from "@/data/companies";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const linkClass =
  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-navy/80 transition-colors hover:text-electric aria-[current=page]:text-electric";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300",
          scrolled || megaOpen
            ? "border-line bg-white/90 backdrop-blur-md"
            : "border-transparent bg-white/60",
        )}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Kno8 home"
            className="inline-flex min-h-11 items-center"
            onClick={() => setMegaOpen(false)}
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.href === "/companies" ? (
                  <li key={item.href}>
                    <div
                      ref={megaRef}
                      className="flex h-[4.5rem] items-center"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                      onBlur={(event) => {
                        if (!megaRef.current?.contains(event.relatedTarget as Node | null)) {
                          setMegaOpen(false);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape" && megaOpen) {
                          setMegaOpen(false);
                          megaButtonRef.current?.focus();
                        }
                      }}
                    >
                      <button
                        ref={megaButtonRef}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="companies-menu"
                        onClick={() => setMegaOpen((open) => !open)}
                        className={cn(linkClass, "gap-1.5", isCurrent(item.href) && "text-electric")}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            megaOpen && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {megaOpen && (
                          <motion.div
                            id="companies-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_24px_48px_-28px_rgba(6,11,34,0.25)]"
                          >
                            <Container className="grid grid-cols-12 gap-10 py-10">
                              <div className="col-span-8">
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                                  Our companies
                                </p>
                                <ul className="mt-5 grid max-h-[60vh] grid-cols-2 gap-2 overflow-y-auto">
                                  {companies.map((company) => (
                                    <li key={company.slug}>
                                      <Link
                                        href={`/companies/${company.slug}`}
                                        onClick={() => setMegaOpen(false)}
                                        className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-paper"
                                      >
                                        <Image
                                          src={company.logo}
                                          alt=""
                                          width={48}
                                          height={48}
                                          className="h-12 w-12 shrink-0 rounded-xl"
                                        />
                                        <span>
                                          <span className="block font-display text-lg font-semibold tracking-tight">
                                            {company.name}
                                          </span>
                                          <span className="mt-0.5 block text-sm text-muted">
                                            {company.tagline}
                                          </span>
                                          <span className="mt-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted/80">
                                            {company.category}
                                          </span>
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="col-span-4 flex flex-col gap-3 border-l border-line pl-10">
                                {[
                                  {
                                    href: "/companies",
                                    title: "View All Companies",
                                    text: "Every company in the Kno8 family.",
                                  },
                                  {
                                    href: "/ventures",
                                    title: "Future Ventures",
                                    text: "What we are exploring next, and how to build with us.",
                                  },
                                ].map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMegaOpen(false)}
                                    className="group rounded-2xl border border-line bg-white p-5 shadow-card transition-colors hover:border-electric/40"
                                  >
                                    <span className="flex items-center justify-between font-semibold">
                                      {link.title}
                                      <ArrowRight
                                        aria-hidden="true"
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                      />
                                    </span>
                                    <span className="mt-1 block text-sm text-muted">{link.text}</span>
                                  </Link>
                                ))}
                              </div>
                            </Container>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={isCurrent(item.href)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={buttonClass("primary", "min-h-11 px-5 max-sm:hidden")}
            >
              Let&rsquo;s Talk
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-white lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}
