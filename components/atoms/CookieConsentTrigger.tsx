"use client";

import { COOKIE_CONSENT_EVENT } from "@/lib/cookieConsent";

interface CookieConsentTriggerProps {
  label?: string;
  className?: string;
}

const BASE_CLASSES =
  "inline-flex rounded-sm text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

const DEFAULT_TONE = "text-text-muted hover:text-text-brand";

/**
 * Link-styled button that reopens the cookie-consent dialog. It dispatches a
 * window event so it can live in any (server-rendered) part of the page while
 * the dialog itself stays a single client component.
 */
export default function CookieConsentTrigger({
  label = "Nastavenia súhlasov",
  className,
}: CookieConsentTriggerProps) {
  const classes = [BASE_CLASSES, className ?? DEFAULT_TONE].join(" ");

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))}
      className={classes}
    >
      {label}
    </button>
  );
}
