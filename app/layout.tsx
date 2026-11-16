import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import CookieConsent from "@/components/shared/CookieConsent";
import Footer from "@/components/shared/Footer";
import "./globals.css";

/* One family for the whole interface. Archivo is a variable grotesque
   (100–900) with latin + latin-ext coverage, so the heavy hero headline and
   the Slovak diacritics (Č, Š, Ž, Ľ, Ť, Ô …) come from the same face.
   Components reach it through the `--font-sans` token in `app/tokens.css`. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE_URL = "https://milanivancak.sk"; // TODO: replace with the real domain once known

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Milan Ivančák | PPC reklama a výkonnostný marketing",
    template: "%s | Milan Ivančák",
  },
  description:
    "Milan Ivančák — špecialista na PPC reklamu. Pomáham firmám získavať zákazníkov cez výkonné kampane na Google Ads a Meta Ads s merateľnými výsledkami.",
  applicationName: "Milan Ivančák",
  authors: [{ name: "Milan Ivančák" }],
  keywords: [
    "PPC reklama",
    "Google Ads",
    "Meta Ads",
    "výkonnostný marketing",
    "Milan Ivančák",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: SITE_URL,
    siteName: "Milan Ivančák",
    title: "Milan Ivančák | PPC reklama",
    description:
      "Pomáham firmám získavať zákazníkov cez výkonné PPC kampane na Google Ads a Meta Ads.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sk"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
