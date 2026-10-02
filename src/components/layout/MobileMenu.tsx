"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { companies } from "@/data/companies";
import { mobileNav } from "@/data/site";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep keyboard focus inside the open menu.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy text-white lg:hidden"
        >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 sm:px-8">
            <Link
              href="/"
              aria-label="Kno8 home"
              onClick={onClose}
              className="inline-flex min-h-11 items-center"
            >
              <Logo tone="dark" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-5 pt-6 sm:px-8">
            <ul>
              {mobileNav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.06 + index * 0.04,
                  }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="display flex min-h-16 items-center text-[2.25rem] text-white/90 aria-[current=page]:text-aqua"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto px-5 pb-10 pt-12 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">
              Our companies
            </p>
            <ul className="mt-4 grid gap-1 sm:grid-cols-2">
              {companies.map((company) => (
                <li key={company.slug}>
                  <Link
                    href={`/companies/${company.slug}`}
                    onClick={onClose}
                    className="flex min-h-14 items-center gap-3 rounded-xl py-2"
                  >
                    <Image
                      src={company.logo}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-lg"
                    />
                    <span className="font-semibold">{company.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
