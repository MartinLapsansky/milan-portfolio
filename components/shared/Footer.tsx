import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import CookieConsentTrigger from "@/components/atoms/CookieConsentTrigger";
import CopyrightYear from "@/components/atoms/CopyrightYear";
import logoText from "@/assets/logo_text.png";

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: IconDefinition;
}

/* Mirrors the header navigation (plus Certifikáty) so the footer lists every
   page on the site. Hrefs are absolute so the anchors also work off the home
   route. */
const PAGE_LINKS: FooterLink[] = [
  { href: "/#domov", label: "Domov" },
  { href: "/#o-mne", label: "O mne" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#priebeh-spoluprace", label: "Priebeh spolupráce" },
  { href: "/#projekty", label: "Projekty" },
  { href: "/#kontakt", label: "Kontakt" },
  { href: "/certifikaty", label: "Certifikáty" },
];

/* TODO: replace with the real profile URLs. */
const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://www.facebook.com/", label: "Facebook", icon: faFacebookF },
  { href: "https://www.instagram.com/", label: "Instagram", icon: faInstagram },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: faLinkedinIn },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/ochrana-osobnych-udajov", label: "Ochrana osobných údajov" },
  { href: "/cookies", label: "Informácie o cookies" },
];

const LINK_CLASSES =
  "inline-flex rounded-sm text-sm text-text-muted transition-colors duration-200 hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

const COLUMN_HEADING_CLASSES =
  "text-xs font-semibold uppercase tracking-wider text-primary";

const SOCIAL_BUTTON_CLASSES =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors duration-200 hover:border-primary-subtle-border hover:bg-primary-subtle hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

export default function Footer() {
  return (
    <footer className="w-full rounded-t-xl border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 justify-items-center gap-10 text-center sm:grid-cols-2 sm:justify-items-stretch sm:text-left lg:grid-cols-4 lg:gap-8">
          {/* 1 — Logo */}
          <div className="flex items-start">
            <Link
              href="/"
              aria-label="Milan Ivančák — prejsť na úvod"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Image
                src={logoText}
                alt="Milan Ivančák — PPC špecialista"
                width={144}
                height={144}
                className="flex items-center h-60 w-60 object-contain sm:h-32 sm:w-32 lg:h-70 lg:w-80"
              />
            </Link>
          </div>

          {/* 2 — Pages */}
          <nav aria-labelledby="footer-pages-heading" className="flex flex-col gap-4">
            <h2 id="footer-pages-heading" className={COLUMN_HEADING_CLASSES}>
              Navigácia
            </h2>
            <ul className="flex flex-col gap-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Social */}
          <div className="flex flex-col gap-2">
            <h2 className={COLUMN_HEADING_CLASSES}>Sociálne siete</h2>
            <ul className="flex items-center justify-center gap-3 sm:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={SOCIAL_BUTTON_CLASSES}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 — Legal */}
          <div className="flex flex-col gap-2">
            <h2 className={COLUMN_HEADING_CLASSES}>Právne informácie</h2>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieConsentTrigger />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-divider pt-6 sm:mt-12">
          <p className="text-center text-xs text-text-subtle sm:text-left">
            © <CopyrightYear /> Milan Ivančák. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
}
