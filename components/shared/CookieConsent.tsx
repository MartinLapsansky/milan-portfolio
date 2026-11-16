"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_MAX_AGE,
  COOKIE_CONSENT_NAME,
  type CookieConsentValue,
} from "@/lib/cookieConsent";

function hasStoredConsent(): boolean {
  return document.cookie
    .split("; ")
    .some((entry) => entry.startsWith(`${COOKIE_CONSENT_NAME}=`));
}

/**
 * Cookie-consent dialog. Opens automatically on first visit (when no decision
 * has been stored yet) and can be reopened from anywhere via the
 * `COOKIE_CONSENT_EVENT` window event. The choice is persisted in a cookie for
 * one year; gate future analytics / marketing scripts on its value.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(COOKIE_CONSENT_EVENT, reopen);

    /* Open once after mount on the first visit. Deferred so the effect never
       sets state synchronously (which would cascade renders) and so the
       server-rendered markup stays identical during hydration. */
    const timer = hasStoredConsent()
      ? undefined
      : window.setTimeout(() => setOpen(true), 0);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, reopen);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const decide = (value: CookieConsentValue) => {
    document.cookie = `${COOKIE_CONSENT_NAME}=${value}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax`;
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={close} title="Cookies a ochrana súkromia">
      <div className="flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-text-muted sm:text-base">
          Tento web používa nevyhnutné cookies, aby správne fungoval. So
          súhlasom môžem používať aj analytické cookies na meranie návštevnosti
          a zlepšovanie obsahu. Svoju voľbu môžete kedykoľvek zmeniť.
        </p>

        <p className="text-sm leading-relaxed text-text-muted">
          Viac informácií nájdete v{" "}
          <Link
            href="/cookies"
            className="font-medium text-link underline-offset-2 transition-colors duration-200 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            informáciách o cookies
          </Link>{" "}
          a v{" "}
          <Link
            href="/ochrana-osobnych-udajov"
            className="font-medium text-link underline-offset-2 transition-colors duration-200 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            ochrane osobných údajov
          </Link>
          .
        </p>

        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => decide("rejected")}
            className="w-full sm:w-auto"
          >
            Odmietnuť
          </Button>
          <Button
            onClick={() => decide("accepted")}
            className="w-full sm:w-auto"
          >
            Prijať všetky
          </Button>
        </div>
      </div>
    </Modal>
  );
}
