"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { readStore, subscribe, writeStore } from "@/lib/clientStore";

const NOTICE_KEY = "kno8-cookie-notice";

/**
 * Tells visitors what this site stores on their device. There are no
 * tracking cookies to consent to, so this is a notice rather than a consent
 * prompt. If analytics are added later, replace it with a real accept /
 * decline choice and load those scripts only after acceptance.
 */
export function CookieNotice() {
  // Hidden on the server and until the saved state is known, so it never flashes.
  const dismissed = useSyncExternalStore(
    subscribe,
    () => readStore(NOTICE_KEY) === "dismissed",
    () => true,
  );

  if (dismissed) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed bottom-5 left-5 right-24 z-30 rounded-3xl border border-line bg-surface p-5 shadow-card sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-iris">
          <Cookie aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-semibold text-fg">No tracking cookies here.</span> This site only
          saves your theme choice and this notice on your device.{" "}
          <Link href="/privacy#cookies" className="font-semibold text-electric underline underline-offset-4">
            Privacy policy
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => writeStore(NOTICE_KEY, "dismissed")}
        className="bg-brand mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
      >
        Got it
      </button>
    </section>
  );
}
