"use server";

import { partnerPaths } from "@/data/content";
import { deliver, deliveryErrors, EMAIL_PATTERN } from "@/lib/deliver";

export type PartnerField = "name" | "email" | "organisation" | "detail" | "message";

export interface PartnerState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<PartnerField, string>>;
  values?: Partial<Record<PartnerField, string>>;
}

/** Validates a partner enquiry for whichever path was chosen and delivers it. */
export async function submitPartner(
  _previous: PartnerState,
  formData: FormData,
): Promise<PartnerState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();
  const path = partnerPaths.find((option) => option.value === read("path"));
  const values: Record<PartnerField, string> = {
    name: read("name"),
    email: read("email"),
    organisation: read("organisation"),
    detail: read("detail"),
    message: read("message"),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read("website")) return { status: "success" };

  if (!path) {
    return { status: "error", message: "Choose who you are, then try again.", values };
  }

  const errors: PartnerState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter an email address like name@example.com.";
  if (!values.detail) errors.detail = `Choose an option for "${path.detailLabel}".`;
  if (values.message.length < 10)
    errors.message = "Tell us a little more — at least a sentence.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields and try again.", errors, values };
  }

  const result = await deliver("partner", { path: path.value, ...values });
  return result === "sent"
    ? { status: "success" }
    : { status: "error", message: deliveryErrors[result], values };
}
