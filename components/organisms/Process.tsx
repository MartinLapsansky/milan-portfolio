"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faComment,
  faMagnifyingGlassChart,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import useInView from "@/hooks/useInView";

interface ProcessStage {
  name: string;
  icon: IconDefinition;
}

const STAGES: ProcessStage[] = [
  { name: "Úvodný rozhovor", icon: faComment },
  { name: "Kontrola webu a merania", icon: faMagnifyingGlassChart },
  { name: "Príprava a spustenie kampaní", icon: faRocket },
  { name: "Vyhodnocovanie a úpravy", icon: faChartLine },
];

/* Static delay classes so Tailwind can detect them at build time. */
const STEP_DELAY_CLASSES = [
  "[animation-delay:0ms]",
  "[animation-delay:110ms]",
  "[animation-delay:220ms]",
  "[animation-delay:330ms]",
] as const;

const REVEAL_HIDDEN = "reveal opacity-0 motion-reduce:opacity-100";

export default function Process() {
  const { ref, inView } = useInView<HTMLElement>();



  /* Reveal the section the first time it enters the viewport. */

  return (
    <section
      ref={ref}
      id="priebeh-spoluprace"
      aria-labelledby="priebeh-spoluprace-heading"
      className="w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <h2
          id="priebeh-spoluprace-heading"
          className={[
            "mx-auto max-w-3xl text-center text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl",
            inView ? "animate-rise" : REVEAL_HIDDEN,
          ].join(" ")}
        >
          PRIEBEH SPOLUPRÁCE
        </h2>
        <div className="flex justify-center items-center">
          <ol className="mx-auto text-2xl mt-14 max-w-3xl sm:mt-20">
            {STAGES.map((stage, index) => {
              const isLast = index === STAGES.length - 1;

              return (
                  <li
                      key={stage.name}
                      className={[
                        "relative flex gap-6 sm:gap-8",
                        isLast ? "" : "pb-12 sm:pb-16",
                        inView ? "animate-rise" : REVEAL_HIDDEN,
                        inView ? STEP_DELAY_CLASSES[index] : "",
                      ]
                          .filter(Boolean)
                          .join(" ")}
                  >
                    {/* Dashed connector runs from this node's bottom edge to the
                    next stage, passing behind the solid icon nodes. */}
                    {!isLast && (
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-8 top-16 -ml-px border-l-2 border-dashed border-border-strong"
                        />
                    )}

                    <span
                        aria-hidden="true"
                        className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand"
                    >
                  <FontAwesomeIcon icon={stage.icon} className="h-7 w-7" />
                </span>

                    <div className="pt-1.5">
                  <span className="block text-sm font-semibold uppercase tracking-widest text-text-subtle">
                    Krok {String(index + 1).padStart(2, "0")}
                  </span>
                      <h3 className="mt-1.5 text-xl font-bold leading-tight tracking-tight text-text sm:text-2xl">
                        {stage.name}
                      </h3>
                    </div>
                  </li>
              );
            })}
          </ol>
        </div>


      </div>
    </section>
  );
}
