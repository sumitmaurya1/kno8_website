"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitContact, type ContactField, type ContactState } from "@/app/contact/actions";
import { buttonClass } from "@/components/ui/ButtonLink";
import { contactInterests } from "@/data/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "mt-2 block w-full rounded-2xl border border-fg/20 bg-surface px-4 py-3.5 text-base text-fg placeholder:text-muted/70 transition-colors hover:border-fg/40 focus:border-electric focus:outline-2 focus:outline-offset-0 focus:outline-electric aria-[invalid=true]:border-red-600 dark:border-red-400";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-700 dark:text-red-400">
      {message}
    </p>
  );
}

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-surface shadow-card p-8 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-electric" />
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          Conversation started.
        </h2>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
          Thanks for writing. Your message is with the Kno8 team and we&rsquo;ll reply by email.
        </p>
      </div>
    );
  }

  const error = (field: ContactField) => state.errors?.[field];
  const describedBy = (field: ContactField) => (error(field) ? `${field}-error` : undefined);
  return (
    <form action={formAction} noValidate className="rounded-3xl border border-line bg-surface shadow-card p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={Boolean(error("name"))}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
          <ErrorText id="name-error" message={error("name")} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={Boolean(error("email"))}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
          <ErrorText id="email-error" message={error("email")} />
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-semibold">
            Company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={state.values?.company}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="interest" className="text-sm font-semibold">
            I&rsquo;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            required
            defaultValue={state.values?.interest ?? defaultInterest ?? ""}
            aria-invalid={Boolean(error("interest"))}
            aria-describedby={describedBy("interest")}
            className={cn(fieldClass, "h-[3.375rem] py-0")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {contactInterests.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ErrorText id="interest-error" message={error("interest")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            defaultValue={state.values?.message}
            aria-invalid={Boolean(error("message"))}
            aria-describedby={describedBy("message")}
            placeholder="What are you building, and how could we help?"
            className={cn(fieldClass, "resize-y")}
          />
          <ErrorText id="message-error" message={error("message")} />
        </div>
      </div>

      {/* Honeypot for bots; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className={buttonClass("primary", "disabled:cursor-wait disabled:opacity-70")}
        >
          {pending ? "Sending…" : "Start the Conversation"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
          {state.status === "error" ? state.message : null}
        </p>
      </div>
    </form>
  );
}
