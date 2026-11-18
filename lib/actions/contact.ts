"use server";

import { prisma } from "@/lib/prisma";
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_MESSAGES,
  contactFormSchema,
  parseContactFormData,
  toContactFieldErrors,
  type ContactFormState,
} from "@/lib/contact";

/**
 * Persists a contact submission. Invoked from `<ContactForm />` through
 * React's `useActionState`; Server Actions are public POST endpoints, so the
 * payload is re-validated here regardless of any client-side checks.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots fill every field they find, humans never see this one.
  if (String(formData.get(CONTACT_HONEYPOT_FIELD) ?? "").trim()) {
    return { status: "success", message: CONTACT_MESSAGES.success };
  }

  const parsed = contactFormSchema.safeParse(parseContactFormData(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: CONTACT_MESSAGES.invalid,
      errors: toContactFieldErrors(parsed.error),
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: parsed.data,
      select: { id: true },
    });
  } catch {
    return { status: "error", message: CONTACT_MESSAGES.serverError };
  }

  return { status: "success", message: CONTACT_MESSAGES.success };
}
