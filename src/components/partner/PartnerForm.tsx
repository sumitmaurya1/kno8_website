"use client";

import { useActionState, useState } from "react";
import { ArrowRight, CheckCircle2, Handshake, Rocket, TrendingUp } from "lucide-react";
import { submitPartner, type PartnerField, type PartnerState } from "@/app/partner/actions";
import { buttonClass } from "@/components/ui/ButtonLink";
import { partnerPaths, type PartnerPath } from "@/data/content";
import { cn } from "@/lib/utils";

const initialState: PartnerState = { status: "idle" };

const icons = { founders: Rocket, investors: TrendingUp, collaborators: Handshake };

const fieldClass =
  "mt-2 block w-full rounded-2xl border border-fg/20 bg-surface px-4 py-3.5 text-base text-fg placeholder:text-muted/70 transition-colors hover:border-fg/40 focus:border-electric focus:outline-2 focus:outline-offset-0 focus:outline-electric aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-700 dark:text-red-400">
      {message}
    </p>
  );
}

export function PartnerForm({
  defaultPath = "founders",
  interestOptions,
}: {
  defaultPath?: PartnerPath;
  /** Extra "area of interest" choices for investors, e.g. company names. */
  interestOptions: string[];
}) {
  const [path, setPath] = useState<PartnerPath>(defaultPath);
  const [state, formAction, pending] = useActionState(submitPartner, initialState);
  const current = partnerPaths.find((option) => option.value === path)!;
  const details: string[] =
    path === "investors"
      ? [current.details[0], ...interestOptions, ...current.details.slice(1)]
      : [...current.details];

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-electric" />
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">Message sent.</h2>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
          Thanks for writing. Your message is with the Kno8 team and we&rsquo;ll reply by email.
        </p>
      </div>
    );
  }

  const error = (field: PartnerField) => state.errors?.[field];
  const describedBy = (field: PartnerField) => (error(field) ? `${field}-error` : undefined);

  return (
    <form action={formAction} noValidate>
      <fieldset>
        <legend className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted">
          First, who are you?
        </legend>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {partnerPaths.map((option) => {
            const Icon = icons[option.value];
            const selected = option.value === path;
            return (
              <label
                key={option.value}
                className={cn(
                  "relative block cursor-pointer rounded-2xl border bg-surface p-6 shadow-card transition-[border-color,transform] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric",
                  selected ? "border-electric" : "border-line hover:-translate-y-0.5 hover:border-fg/25",
                )}
              >
                <input
                  type="radio"
                  name="path"
                  value={option.value}
                  checked={selected}
                  onChange={() => setPath(option.value)}
                  className="sr-only"
                />
                <span className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-full",
                      selected ? "bg-brand text-white" : "bg-tint text-iris",
                    )}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 rounded-full border-2",
                      selected ? "border-electric bg-electric shadow-[inset_0_0_0_3px_var(--color-surface)]" : "border-fg/25",
                    )}
                  />
                </span>
                <span className="mt-5 block font-display text-xl font-bold tracking-tight">
                  {option.title}
                </span>
                <span className="mt-2 block leading-relaxed text-muted">{option.summary}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* `key` resets the path-specific fields when the path changes. */}
      <div
        key={path}
        className="mt-6 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10"
      >
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
            <label htmlFor="organisation" className="text-sm font-semibold">
              {current.orgLabel} <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="organisation"
              name="organisation"
              type="text"
              autoComplete="organization"
              defaultValue={state.values?.organisation}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="detail" className="text-sm font-semibold">
              {current.detailLabel}
            </label>
            <select
              id="detail"
              name="detail"
              required
              defaultValue={details.includes(state.values?.detail ?? "") ? state.values?.detail : ""}
              aria-invalid={Boolean(error("detail"))}
              aria-describedby={describedBy("detail")}
              className={cn(fieldClass, "h-[3.375rem] py-0")}
            >
              <option value="" disabled>
                Choose one
              </option>
              {details.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ErrorText id="detail-error" message={error("detail")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm font-semibold">
              {current.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              defaultValue={state.values?.message}
              aria-invalid={Boolean(error("message"))}
              aria-describedby={describedBy("message")}
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
            {pending ? "Sending…" : current.submitLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
          <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
            {state.status === "error" ? state.message : null}
          </p>
        </div>
      </div>
    </form>
  );
}
