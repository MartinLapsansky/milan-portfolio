import type { Metadata } from "next";
import Link from "next/link";
import CookieConsentTrigger from "@/components/atoms/CookieConsentTrigger";
import Header from "@/components/shared/Header";

const SITE_URL = "https://milanivancak.sk"; // TODO: replace with the real domain once known

const TITLE = "Informácie o cookies";
const DESCRIPTION =
  "Prehľad cookies používaných na tomto webe, ich účel, doba uchovávania a možnosť kedykoľvek zmeniť svoj súhlas s ich používaním.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cookies" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: `${SITE_URL}/cookies`,
    siteName: "Milan Ivančák",
    title: `${TITLE} | Milan Ivančák`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const PARAGRAPH = "mt-3 text-base leading-relaxed text-text-muted";
const SECTION_HEADING =
  "mt-10 text-xl font-bold leading-tight text-text sm:text-2xl";
const SUB_HEADING = "mt-6 text-base font-bold text-text";
const BACK_LINK =
  "inline-flex rounded-sm text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";
const TEXT_LINK =
  "font-medium text-link underline-offset-2 transition-colors duration-200 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

export default function CookiesPage() {
  return (
    <main className="min-h-screen w-full [background:var(--gradient-hero)]">
      <Header />

      <section
        aria-labelledby="cookies-heading"
        className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        <Link href="/" className={BACK_LINK}>
          ← Späť na úvod
        </Link>

        <h1
          id="cookies-heading"
          className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl"
        >
          Informácie o cookies
        </h1>

        <p className={PARAGRAPH}>
          Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači
          pri návšteve webu. Pomáhajú zabezpečiť správne fungovanie stránky a s
          vaším súhlasom aj zlepšovať jej obsah na základe merania návštevnosti.
        </p>

        <h2 className={SECTION_HEADING}>Aké cookies používam</h2>

        <h3 className={SUB_HEADING}>Nevyhnutné cookies</h3>
        <p className={PARAGRAPH}>
          Tieto cookies zabezpečujú základné fungovanie webu a nie je možné ich
          vypnúť. Patrí sem aj uloženie vášho rozhodnutia o súhlase s cookies,
          aby sa vám dialóg nezobrazoval pri každej návšteve.
        </p>

        <h3 className={SUB_HEADING}>Analytické cookies</h3>
        <p className={PARAGRAPH}>
          Pomáhajú mi anonymne zisťovať, ako web používate (napríklad ktoré
          stránky sú najnavštevovanejšie). Používajú sa len vtedy, ak s nimi
          vyslovíte súhlas.
        </p>

        <h3 className={SUB_HEADING}>Marketingové cookies</h3>
        <p className={PARAGRAPH}>
          Slúžia na zobrazovanie relevantnejších reklám a meranie ich účinnosti.
          Bez vášho súhlasu sa nepoužívajú.
        </p>

        <h2 className={SECTION_HEADING}>Ako zmeniť svoj súhlas</h2>
        <p className={PARAGRAPH}>
          Svoj súhlas môžete kedykoľvek zmeniť alebo odvolať.{" "}
          <CookieConsentTrigger
            label="Otvoriť nastavenia súhlasov"
            className={TEXT_LINK}
          />
          . Cookies si môžete spravovať aj priamo v nastaveniach svojho
          prehliadača, kde ich môžete vymazať alebo zablokovať.
        </p>



        <p className={PARAGRAPH}>
          Viac o spracúvaní osobných údajov sa dozviete v{" "}
          <Link href="/ochrana-osobnych-udajov" className={TEXT_LINK}>
            ochrane osobných údajov
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
