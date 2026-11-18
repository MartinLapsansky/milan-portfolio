import { z } from "zod";

/**
 * Canonical contact-form field names — they mirror the Prisma
 * `ContactSubmission` model one-to-one so payloads map to columns without
 * any renaming layer.
 */
export const CONTACT_FIELD_NAMES = [
  "name",
  "lastName",
  "email",
  "company",
  "message",
] as const;

export type ContactFieldName = (typeof CONTACT_FIELD_NAMES)[number];

/** Upper bounds for each field (guards the TEXT columns from abuse). */
export const CONTACT_LIMITS = {
  name: 100,
  lastName: 100,
  email: 254,
  company: 150,
  message: 5000,
} as const;

/** Hidden field that bots fill in; humans never see it. */
export const CONTACT_HONEYPOT_FIELD = "website";

export const CONTACT_MESSAGES = {
  required: "Toto pole je povinné.",
  invalidEmail: "Zadajte platnú e-mailovú adresu.",
  tooLong: "Text je príliš dlhý.",
  invalid: "Skontrolujte označené polia.",
  success: "Ďakujem za váš dopyt. Ozvem sa vám čo najskôr.",
  serverError: "Odoslanie zlyhalo. Skúste to prosím znova.",
} as const;

/**
 * Single validation contract for the contact payload. Consumed by the server
 * action (authoritative) and by the form for its limits/labels.
 * Optional fields normalize to values the database always accepts:
 * `company` → `null`, `message` → `""`.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, CONTACT_MESSAGES.required)
    .max(CONTACT_LIMITS.name, CONTACT_MESSAGES.tooLong),
  lastName: z
    .string()
    .trim()
    .min(1, CONTACT_MESSAGES.required)
    .max(CONTACT_LIMITS.lastName, CONTACT_MESSAGES.tooLong),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(CONTACT_LIMITS.email, CONTACT_MESSAGES.tooLong)
    .pipe(z.email(CONTACT_MESSAGES.invalidEmail)),
  company: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.company, CONTACT_MESSAGES.tooLong)
    .optional()
    .transform((value) => (value ? value : null)),
  message: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.message, CONTACT_MESSAGES.tooLong)
    .optional()
    .transform((value) => value ?? ""),
});

/** Payload derived from the schema — never redeclare the shape by hand. */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

export type ContactFormStatus = "idle" | "success" | "error";

/**
 * State returned by the server action. Must stay plain and serializable
 * because it crosses the Server Action boundary into `useActionState`.
 */
export interface ContactFormState {
  status: ContactFormStatus;
  message?: string;
  errors?: ContactFormErrors;
}

export const CONTACT_INITIAL_STATE: ContactFormState = { status: "idle" };

/** Reads the payload out of a `FormData` instance; never trusts the client. */
export function parseContactFormData(
  formData: FormData,
): Record<ContactFieldName, string> {
  return {
    name: String(formData.get("name") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

/** Flattens Zod issues into one message per known field. */
export function toContactFieldErrors(error: z.ZodError): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field === "string" && isContactFieldName(field) && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

function isContactFieldName(value: string): value is ContactFieldName {
  return (CONTACT_FIELD_NAMES as readonly string[]).includes(value);
}
