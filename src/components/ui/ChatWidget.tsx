"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, Mail, MessageCircle, Send, X } from "lucide-react";
import { siteConfig } from "@/data/site";

const optionClass =
  "flex min-h-14 items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-paper";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm5.800 14.200c-.200.700-1.400 1.300-2 1.400-.500.100-1.200.100-1.900-.100-.400-.100-1-.300-1.700-.600-3-1.300-5-4.300-5.100-4.500-.200-.200-1.200-1.600-1.200-3.100s.800-2.200 1.100-2.500c.300-.300.600-.400.800-.400h.600c.200 0 .400 0 .700.500l.900 2.200c.100.200.100.400 0 .600l-.300.500-.500.500c-.100.200-.300.300-.100.700.200.300.900 1.500 1.900 2.400 1.300 1.200 2.400 1.500 2.700 1.700.300.100.500.100.700-.100l1-1.200c.200-.300.400-.200.700-.100l2.100 1c.300.200.500.200.600.400.100.100.100.700-.100 1.400Z" />
    </svg>
  );
}

/**
 * Floating "talk to us" button. Opens a small menu of ways to reach Kno8:
 * WhatsApp and email appear once they are set in src/data/site.ts.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const whatsappHref = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : null;

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-30 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-menu"
            role="dialog"
            aria-label="Talk to Kno8"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-3 w-[min(20rem,calc(100vw-2.5rem))] origin-bottom-right rounded-3xl border border-line bg-surface p-3 shadow-card"
          >
            <p className="px-3 pb-1 pt-2 font-display text-lg font-bold tracking-tight">
              Talk to Kno8
            </p>
            <p className="px-3 pb-2 text-sm text-muted">Choose how you&rsquo;d like to reach us.</p>
            <ul>
              {whatsappHref && (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={optionClass}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">WhatsApp</span>
                      <span className="block text-sm text-muted">Opens a chat in a new tab</span>
                    </span>
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" onClick={() => setOpen(false)} className={optionClass}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-iris">
                    <Send aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold">Send a message</span>
                    <span className="block text-sm text-muted">Use the contact form</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/partner" onClick={() => setOpen(false)} className={optionClass}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-iris">
                    <Handshake aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold">Partner with us</span>
                    <span className="block text-sm text-muted">Founders, investors, collaborators</span>
                  </span>
                </Link>
              </li>
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className={optionClass}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-iris">
                      <Mail aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-semibold">Email</span>
                      <span className="block text-sm text-muted">{siteConfig.email}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close contact options" : "Talk to Kno8"}
        aria-expanded={open}
        aria-controls="chat-menu"
        onClick={() => setOpen((value) => !value)}
        className="bg-brand flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-white shadow-button transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
