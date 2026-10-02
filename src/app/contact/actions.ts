"use server";

import { contactInterests } from "@/data/site";

export type ContactField = "name" | "email" | "company" | "interest" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an enquiry and forwards it as JSON to CONTACT_WEBHOOK_URL
 * (a form service, automation webhook or your own endpoint).
 * Without that variable, enquiries are only logged in development and
 * rejected in production so nothing is silently lost.
 */
export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();
  const values: Record<ContactField, string> = {
    name: read("name"),
    email: read("email"),
    company: read("company"),
    interest: read("interest"),
    message: read("message"),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read("website")) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter an email address like name@example.com.";
  if (!contactInterests.some((option) => option.value === values.interest))
    errors.interest = "Choose what you're interested in.";
  if (values.message.length < 10)
    errors.message = "Tell us a little more — at least a sentence.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields and try again.", errors, values };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL is not set. Enquiry received:", values);
      return { status: "success" };
    }
    console.error("[contact] CONTACT_WEBHOOK_URL is not set. Enquiry was not delivered.");
    return {
      status: "error",
      message: "This form isn't connected yet, so your message wasn't sent. Please try again later.",
      values,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] Delivery failed:", error);
    return {
      status: "error",
      message: "Your message couldn't be sent. Check your connection and try again.",
      values,
    };
  }
}
