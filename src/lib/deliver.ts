export type DeliveryResult = "sent" | "not-configured" | "failed";

/**
 * Forwards a form submission as JSON to CONTACT_WEBHOOK_URL (a form
 * service, automation webhook or your own endpoint). Without that variable
 * submissions are logged in development and reported as not configured in
 * production, so nothing is silently lost.
 */
export async function deliver(
  form: string,
  values: Record<string, string>,
): Promise<DeliveryResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[${form}] CONTACT_WEBHOOK_URL is not set. Submission received:`, values);
      return "sent";
    }
    console.error(`[${form}] CONTACT_WEBHOOK_URL is not set. Submission was not delivered.`);
    return "not-configured";
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, ...values, submittedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    return "sent";
  } catch (error) {
    console.error(`[${form}] Delivery failed:`, error);
    return "failed";
  }
}

export const deliveryErrors: Record<Exclude<DeliveryResult, "sent">, string> = {
  "not-configured":
    "This form isn't connected yet, so your message wasn't sent. Please try again later.",
  failed: "Your message couldn't be sent. Check your connection and try again.",
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
