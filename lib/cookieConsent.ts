/**
 * Cookie-consent plumbing shared by the consent dialog and every "reopen
 * settings" trigger. Free of React so both server and client modules can
 * import the constants.
 */

/** Name of the cookie that stores the visitor's consent decision. */
export const COOKIE_CONSENT_NAME = "milan_cookie_consent";

/**
 * Window event used to reopen the consent dialog from anywhere on the site
 * (e.g. the footer "Nastavenia súhlasov" button).
 */
export const COOKIE_CONSENT_EVENT = "open-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

/** One year, in seconds. */
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
