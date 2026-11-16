import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Hero from "@/components/organisms/Hero";
import About from "@/components/organisms/About";
import Services from "@/components/organisms/Services";
import Process from "@/components/organisms/Process";
import Projects from "@/components/organisms/Projects";
import Contact from "@/components/organisms/Contact";

const SITE_URL = "https://milanivancak.sk"; // TODO: replace with the real domain once known

export const metadata: Metadata = {
  title: "Milan Ivančák | PPC reklama a výkonnostný marketing",
  description:
    "Milan Ivančák — špecialista na PPC reklamu. Pomáham firmám získavať zákazníkov cez výkonné kampane na Google Ads a Meta Ads s merateľnými výsledkami.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: SITE_URL,
    siteName: "Milan Ivančák",
    title: "Milan Ivančák | PPC reklama",
    description:
      "Pomáham firmám získavať zákazníkov cez výkonné PPC kampane na Google Ads a Meta Ads.",
  },
  twitter: {
    card: "summary",
    title: "Milan Ivančák | PPC reklama",
    description:
      "Pomáham firmám získavať zákazníkov cez výkonné PPC kampane na Google Ads a Meta Ads.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full [background:var(--gradient-hero)]">
      <Header />
      <Hero />
      <Services />
      <Process />
        <About />
      <Projects />
      <Contact />
    </main>
  );
}
