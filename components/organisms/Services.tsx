"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faKey,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import ServiceCard from "@/components/molecules/ServiceCard";

interface ServiceItem {
  name: string;
  description: string;
  icon: IconDefinition;
}

const SERVICES: ServiceItem[] = [
  {
    name: "Google Ads",
    description:
      "Príprava a správa reklám vo vyhľadávaní Google pre firmy a poskytovateľov služieb.",
    icon: faBullhorn,
  },
  {
    name: "Kľúčové slová a reklamné texty",
    description:
      "Výber relevantných vyhľadávaní a tvorba reklamných textov podľa ponuky a cieľov podnikania.",
    icon: faKey,
  },
  {
    name: "Meranie konverzií",
    description:
      "Nastavenie merania dopytov a rezervácií pomocou Google Analytics 4 a Google Tag Managera.",
    icon: faChartLine,
  },
  {
    name: "Vyhodnocovanie a optimalizácia",
    description:
      "Sledovanie nákladov a výsledkov kampaní, pravidelné vyhodnotenie a návrhy ďalších úprav.",
    icon: faSliders,
  },
];

/* Static delay classes so Tailwind can detect them at build time. */
const CARD_DELAY_CLASSES = [
  "[animation-delay:0ms]",
  "[animation-delay:110ms]",
  "[animation-delay:220ms]",
  "[animation-delay:330ms]",
] as const;

const REVEAL_HIDDEN = "reveal opacity-0 motion-reduce:opacity-100";

const ARROW_BUTTON_CLASSES =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors duration-200 hover:bg-primary-subtle hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-40";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* Reveal the section the first time it enters the viewport. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallback = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 1);
    setCanScrollRight(track.scrollLeft < maxScrollLeft - 1);
  }, []);

  /* Keep the arrow buttons in sync with the horizontal scroll position. */
  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => updateScrollState();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = (firstCard?.offsetWidth ?? track.clientWidth * 0.85) + gap;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      aria-labelledby="sluzby-heading"
      className="w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-5">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="sluzby-heading"
            className={[
              "text-3xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-4xl lg:text-5xl",
              inView ? "animate-rise" : REVEAL_HIDDEN,
            ].join(" ")}
          >
            AKÉ SLUŽBY PONÚKAM ?
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Posunúť služby doľava"
              className={ARROW_BUTTON_CLASSES}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Posunúť služby doprava"
              className={ARROW_BUTTON_CLASSES}
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Služby"
          tabIndex={0}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-reduce:scroll-auto"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              description={service.description}
              icon={service.icon}
              className={[
                "min-h-50 w-[min(100vw,28rem)] shrink-0 snap-start",
                inView ? "animate-rise" : REVEAL_HIDDEN,
                inView ? CARD_DELAY_CLASSES[index] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
