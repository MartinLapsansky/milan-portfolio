"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "meno" | "priezvisko" | "email";
type FieldErrors = Partial<Record<FieldName, string>>;

export default function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const meno = String(data.get("meno") ?? "").trim();
    const priezvisko = String(data.get("priezvisko") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!meno) nextErrors.meno = "Vyplňte prosím meno.";
    if (!priezvisko) nextErrors.priezvisko = "Vyplňte prosím priezvisko.";
    if (!email) {
      nextErrors.email = "Vyplňte prosím e-mail.";
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Zadajte platnú e-mailovú adresu.";
    }

    setErrors(nextErrors);
    setSubmitted(false);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) {
        field.focus();
      }
      return;
    }

    // TODO: nahradiť reálnym odoslaním (Server Action / e-mailová služba).
    form.reset();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" aria-labelledby="kontakt-heading" className="w-full">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="text-center">
          <h2
            id="kontakt-heading"
            className="text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            Porozprávajme sa o vašej reklame
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Napíšte mi, čomu sa venujete a čo chcete reklamou dosiahnuť. Ozvem
            sa vám a preberieme možnosti spolupráce.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField id="meno" label="Meno" required error={errors.meno}>
              <Input
                id="meno"
                name="meno"
                autoComplete="given-name"
                placeholder="Ján"
                invalid={Boolean(errors.meno)}
                aria-describedby={errors.meno ? "meno-error" : undefined}
              />
            </FormField>

            <FormField
              id="priezvisko"
              label="Priezvisko"
              required
              error={errors.priezvisko}
            >
              <Input
                id="priezvisko"
                name="priezvisko"
                autoComplete="family-name"
                placeholder="Novák"
                invalid={Boolean(errors.priezvisko)}
                aria-describedby={
                  errors.priezvisko ? "priezvisko-error" : undefined
                }
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
              invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </FormField>

          <FormField id="firma" label="Firma alebo web">
            <Input
              id="firma"
              name="firma"
              autoComplete="organization"
              placeholder="Napr. mojafirma.sk"
            />
          </FormField>

          <FormField id="sprava" label="Ako vám môžem pomôcť?">
            <Textarea
              id="sprava"
              name="sprava"
              rows={5}
              placeholder="Stručne opíšte, čomu sa venujete a čo chcete reklamou dosiahnuť."
            />
          </FormField>

          {submitted && (
            <p
              role="status"
              className="rounded-lg border border-success bg-success-subtle px-4 py-3 text-sm font-medium text-success-strong"
            >
              Ďakujem za váš dopyt. Ozvem sa vám čo najskôr.
            </p>
          )}

          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Odoslať dopyt
            </Button>
            <p className="text-xs leading-relaxed text-text-subtle sm:max-w-xs sm:text-right">
              Zadané údaje použijem výlučne na kontaktovanie vás a odpoveď na
              váš dopyt.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
