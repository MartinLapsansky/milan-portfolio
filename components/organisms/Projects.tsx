"use client";

import { useCallback, useState } from "react";
import ProjectCard from "@/components/molecules/ProjectCard";
import ProjectDetails from "@/components/molecules/ProjectDetails";
import Modal from "@/components/molecules/Modal";
import type { Project } from "@/lib/projects";
import placeholderImage from "@/assets/placeholder_image.png";
import useInView from "@/hooks/useInView";

/* ------------------------------------------------------------------
   EDITOVATEĽNÝ OBSAH — tu upravte alebo pridajte projektové karty.
   Obrázok: nahraďte `placeholderImage` vlastným importom z @/assets.
   Detaily sa zobrazujú až po kliknutí na kartu (modal).
------------------------------------------------------------------ */
const PROJECTS: Project[] = [
  {
    name: "Google Ads pre lokálnu službu",
    image: placeholderImage,
    status: "dokonceny",
    goal: "Získať viac dopytov z vyhľadávania pre lokálnu firmu s rozpočtom do 300 € / mesiac.",
    tools: "Google Ads, Google Analytics 4, Google Tag Manager",
    results:
      "Medziročný nárast konverzií o 42 % pri zachovaní nákladov na konverziu.",
    nextSteps:
      "Testovanie nových reklamných zostáv a rozšírenie o lokálne kampane.",
  },
  {
    name: "Meta Ads kampaň pre e-shop",
    image: placeholderImage,
    status: "rozpracovany",
    goal: "Otestovať predaj nového produktu cez Meta Ads a nájsť ziskové publikum.",
    tools: "Meta Ads Manager, Meta Pixel, Google Analytics 4",
    results:
      "Prebieha testovanie — priebežné vyhodnocovanie ceny za akvizíciu.",
    nextSteps:
      "Vyhodnotiť kreatívy, nastaviť retargeting a škálovať ziskové zostavy.",
  },
  {
    name: "Meranie konverzií pre B2B web",
    image: placeholderImage,
    status: "modelove-zadanie",
    goal: "Nastaviť spoľahlivé meranie dopytov a rezervácií na firemnom webe.",
    tools: "Google Tag Manager, Google Analytics 4",
    results:
      "Modelové zadanie — návrh merania a definícia kľúčových udalostí.",
    nextSteps: "Implementácia merania a kontrola dát po nasadení.",
  },
  {
    name: "Optimalizácia vyhľadávacích kampaní",
    image: placeholderImage,
    status: "dokonceny",
    goal: "Znížiť neefektívne výdavky a zvýšiť relevantnosť reklám vo vyhľadávaní.",
    tools: "Google Ads, Google Analytics 4",
    results:
      "Zvýšenie miery prekliku a zníženie ceny za preklik v testovanom období.",
    nextSteps:
      "Pravidelné vyhodnocovanie vyhľadávacích výrazov a úprava ponúk.",
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

export default function Projects() {
  const { ref, inView } = useInView<HTMLElement>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      ref={ref}
      id="projekty"
      aria-labelledby="projekty-heading"
      className="w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <h2
          id="projekty-heading"
          className={[
            "text-3xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-4xl lg:text-5xl",
            inView ? "animate-rise" : REVEAL_HIDDEN,
          ].join(" ")}
        >
          Moja práca
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              image={project.image}
              status={project.status}
              onOpen={() => setSelectedProject(project)}
              className={[
                inView ? "animate-rise" : REVEAL_HIDDEN,
                inView
                  ? CARD_DELAY_CLASSES[index % CARD_DELAY_CLASSES.length]
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>

      <Modal
        open={selectedProject !== null}
        onClose={closeProject}
        title={selectedProject?.name ?? ""}
      >
        {selectedProject && <ProjectDetails {...selectedProject} />}
      </Modal>
    </section>
  );
}
