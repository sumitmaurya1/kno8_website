import { Plus } from "lucide-react";
import type { Faq } from "@/types";

/** Uses native <details>, so it works without JavaScript and is keyboard accessible by default. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <ul className="space-y-3">
      {faqs.map((faq) => (
        <li key={faq.question}>
          <details className="group rounded-2xl border border-line bg-surface shadow-card">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-iris transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-muted">{faq.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
