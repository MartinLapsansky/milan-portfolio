import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Button from "@/components/atoms/Button";

const SITE_URL = "https://milanivancak.sk"; // TODO: replace with the real domain once known

export const metadata: Metadata = {
  title: "Certifikáty",
  description:
    "Prehľad certifikátov a absolvovaných kurzov Milana Ivančáka v oblasti PPC reklamy, Google Ads a merania výsledkov kampaní.",
  alternates: { canonical: "/certifikaty" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: `${SITE_URL}/certifikaty`,
    siteName: "Milan Ivančák",
    title: "Certifikáty | Milan Ivančák",
    description:
      "Prehľad certifikátov a absolvovaných kurzov v oblasti PPC reklamy a Google Ads.",
  },
  robots: { index: true, follow: true },
};

export default function CertifikatyPage() {
  return (
    <main className="min-h-screen w-full [background:var(--gradient-hero)]">
      <Header />
      <section
        aria-labelledby="certifikaty-heading"
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36"
      >
        <h1
          id="certifikaty-heading"
          className="text-3xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-4xl lg:text-5xl"
        >
          Certifikáty
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          Certifikáty a absolvované kurzy pridám čoskoro. Medzitým sa môžete
          pozrieť na moje projekty alebo ma kontaktovať.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href="/" size="lg">
            Späť na úvod
          </Button>
          <Button href="/#projekty" variant="secondary" size="lg">
            Pozrieť projekty
          </Button>
        </div>
      </section>
    </main>
  );
}
