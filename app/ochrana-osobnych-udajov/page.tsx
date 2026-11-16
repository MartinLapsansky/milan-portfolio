import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/shared/Header";

const SITE_URL = "https://milanivancak.sk"; // TODO: replace with the real domain once known

const TITLE = "Ochrana osobných údajov";
const DESCRIPTION =
  "Informácie o tom, aké osobné údaje spracúvam pri používaní tohto webu a pri kontaktovaní, na aký účel, ako dlho ich uchovávam a aké máte práva.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ochrana-osobnych-udajov" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: `${SITE_URL}/ochrana-osobnych-udajov`,
    siteName: "Milan Ivančák",
    title: `${TITLE} | Milan Ivančák`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const PARAGRAPH = "mt-3 text-base leading-relaxed text-text-muted";
const SECTION_HEADING =
  "mt-10 text-xl font-bold leading-tight text-text sm:text-2xl";
const BACK_LINK =
  "inline-flex rounded-sm text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

export default function OchranaOsobnychUdajovPage() {
  return (
    <main className="min-h-screen w-full [background:var(--gradient-hero)]">
      <Header />

      <section
        aria-labelledby="gdpr-heading"
        className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        <Link href="/" className={BACK_LINK}>
          ← Späť na úvod
        </Link>

        <h1
          id="gdpr-heading"
          className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl"
        >
          Ochrana osobných údajov
        </h1>

        <p className={PARAGRAPH}>
          Vaše súkromie mi nie je ľahostajné. Na tejto stránke vysvetľujem, aké
          osobné údaje spracúvam, prečo a aké máte práva pri používaní tohto
          webu a pri kontaktovaní ma.
        </p>

        <h2 className={SECTION_HEADING}>Aké údaje spracúvam</h2>
        <p className={PARAGRAPH}>
          Spracúvam len údaje, ktoré mi sami poskytnete prostredníctvom
          kontaktného formulára (meno, priezvisko, e-mail a prípadne názov
          firmy či webu a text správy). Ďalej môžem spracúvať technické údaje o
          návšteve webu, ak na to udelíte súhlas v nastaveniach cookies.
        </p>

        <h2 className={SECTION_HEADING}>Na aký účel a na akom právnom základe</h2>
        <p className={PARAGRAPH}>
          Údaje z kontaktného formulára používam výlučne na to, aby som vám
          odpovedal a dohodol s vami prípadnú spoluprácu. Právnym základom je
          oprávnený záujem a váš súhlas. Technické údaje spracúvam na základe
          vášho súhlasu, ktorý môžete kedykoľvek odvolať.
        </p>

        <h2 className={SECTION_HEADING}>Ako dlho údaje uchovávam</h2>
        <p className={PARAGRAPH}>
          Údaje z dopytu uchovávam len po dobu nevyhnutnú na vybavenie
          komunikácie a prípadnej spolupráce, najneskôr však do odvolania
          vášho súhlasu alebo do vznesenia námietky proti spracúvaniu.
        </p>

        <h2 className={SECTION_HEADING}>Cookies</h2>
        <p className={PARAGRAPH}>
          Tento web používa cookies na zabezpečenie svojho fungovania a so
          súhlasom aj na analytické účely. Podrobnosti a možnosť zmeniť svoj
          súhlas nájdete v{" "}
          <Link
            href="/cookies"
            className="font-medium text-link underline-offset-2 transition-colors duration-200 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            informáciách o cookies
          </Link>
          .
        </p>

        <h2 className={SECTION_HEADING}>Vaše práva</h2>
        <p className={PARAGRAPH}>
          Máte právo na prístup k svojim údajom, ich opravu či výmaz, právo na
          obmedzenie spracúvania, právo namietať proti spracúvaniu a právo
          kedykoľvek odvolať udelený súhlas. Ak sa domnievate, že svoje údaje
          spracúvam neoprávnene, môžete podať sťažnosť Úradu na ochranu
          osobných údajov Slovenskej republiky.
        </p>

        <h2 className={SECTION_HEADING}>Kontakt</h2>
        <p className={PARAGRAPH}>
          V prípade otázok ohľadom spracúvania osobných údajov ma môžete
          kontaktovať cez{" "}
          <Link
            href="/#kontakt"
            className="font-medium text-link underline-offset-2 transition-colors duration-200 hover:text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            kontaktný formulár
          </Link>
          .
        </p>

        <p className="mt-10 text-sm leading-relaxed text-text-subtle">
          Toto je vzorové znenie zásad ochrany osobných údajov. Pred spustením
          webu ho odporúčam prispôsobiť konkrétnym podmienkam a prípadne
          konzultovať s odborníkom.
        </p>
      </section>
    </main>
  );
}
