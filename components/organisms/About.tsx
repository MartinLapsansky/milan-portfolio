"use client";

import Image from "next/image";
import Button from "@/components/atoms/Button";
import useInView from "@/hooks/useInView";
import portrait from "@/assets/profile_photo1.png";

const REVEAL_HIDDEN = "reveal opacity-0 motion-reduce:opacity-100";

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="o-mne"
      aria-labelledby="o-mne-heading"
      className="w-full"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start">
          <h2
            id="o-mne-heading"
            className={[
              "text-3xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-4xl lg:text-5xl",
              inView ? "animate-rise" : REVEAL_HIDDEN,
            ].join(" ")}
          >
            Niečo o mne
          </h2>

          <p
            className={[
              "mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg",
              inView ? "animate-rise [animation-delay:120ms]" : REVEAL_HIDDEN,
            ].join(" ")}
          >
            Som Milan Ivančák a rozvíjam sa v oblasti PPC reklamy. Zameriavam
            sa na Google Ads, meranie výsledkov a pochopenie toho, čo reklama
            prináša podnikaniu. Znalosti priebežne prenášam do praktických
            projektov a budujem si vlastné portfólio.
          </p>

          <div
            className={[
              "mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4",
              inView ? "animate-rise [animation-delay:220ms]" : REVEAL_HIDDEN,
            ].join(" ")}
          >
            {/* TODO: doplniť reálne CV PDF do public/ a upraviť odkaz nižšie. */}
            <Button
              href="/CV.pdf"
              external
              size="lg"
              className="w-full sm:w-auto"
            >
              CV
            </Button>
            <Button
              href="/certifikaty"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              CERTIFIKÁTY
            </Button>
            <Button
              href="#kontakt"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Kontaktuj ma
            </Button>
          </div>
        </div>

        <div
          className={[
            "mx-auto w-full max-w-sm",
            inView ? "animate-fade-in [animation-delay:120ms]" : REVEAL_HIDDEN,
          ].join(" ")}
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border border-border bg-surface shadow-lg">
            <Image
              src={portrait}
              alt="Milan Ivančák"
              fill
              sizes="(max-width: 1024px) 80vw, 24rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
