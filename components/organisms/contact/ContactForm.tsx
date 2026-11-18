"use client";

import { useActionState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";
import { submitContactForm } from "@/lib/actions/contact";
import {
  CONTACT_FIELD_NAMES,
  CONTACT_HONEYPOT_FIELD,
  CONTACT_INITIAL_STATE,
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
} from "@/lib/contact";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    CONTACT_INITIAL_STATE,
  );

  const errors = state.errors ?? {};

  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;

    const firstInvalid = CONTACT_FIELD_NAMES.find((field) => state.errors?.[field]);
    if (!firstInvalid) return;

    document.getElementById(firstInvalid)?.focus();
  }, [state]);

  return (
    <form action={formAction} aria-busy={isPending} className="relative mt-10 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="name" label="Meno" required error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="given-name"
            placeholder="Ján"
            maxLength={CONTACT_LIMITS.name}
            invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField id="lastName" label="Priezvisko" required error={errors.lastName}>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Novák"
            maxLength={CONTACT_LIMITS.lastName}
            invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
        </FormField>
      </div>

      <FormField id="email" label="E-mail" required error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jan.novak@firma.sk"
          maxLength={CONTACT_LIMITS.email}
          invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </FormField>

      <FormField id="company" label="Firma alebo web" error={errors.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Napr. mojafirma.sk"
          maxLength={CONTACT_LIMITS.company}
          invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
      </FormField>

      <FormField id="message" label="Ako vám môžem pomôcť?" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Stručne opíšte, čomu sa venujete a čo chcete reklamou dosiahnuť."
          maxLength={CONTACT_LIMITS.message}
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </FormField>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={CONTACT_HONEYPOT_FIELD}>Web</label>
        <input
          id={CONTACT_HONEYPOT_FIELD}
          name={CONTACT_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "success" && (
        <p
          role="status"
          className="rounded-lg border border-success bg-success-subtle px-4 py-3 text-sm font-medium text-success-strong"
        >
          {state.message ?? CONTACT_MESSAGES.success}
        </p>
      )}

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-lg border border-danger bg-danger-subtle px-4 py-3 text-sm font-medium text-danger-strong"
        >
          {state.message}
        </p>
      )}

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
          {isPending ? "Odosielam…" : "Odoslať dopyt"}
        </Button>
        <p className="text-xs leading-relaxed text-text-subtle sm:max-w-xs sm:text-right">
          Zadané údaje použijem výlučne na kontaktovanie vás a odpoveď na
          váš dopyt.
        </p>
      </div>
    </form>
  );
}
