import Image from "next/image";
import Button from "@/components/atoms/Button";
import portrait from "@/assets/profile_photo1.png";
import arrowTopRight from "@/assets/arrow_top_right.png";

export default function Hero() {
  return (
    <section
      id="domov"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-x-clip"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-10 lg:pt-16">
        <div className="flex flex-col items-start">
          <h1
            id="hero-heading"
            className="animate-rise text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            MILAN IVANČÁK
          </h1>
          <span className="mt-1 block text-text-brand text-4xl font-bold">PPC REKLAMA</span>


          <p className="animate-rise mt-6 max-w-xl text-base text-text-muted sm:text-lg [animation-delay:140ms]">
            Pomáham firmám získavať viac zákazníkov cez výkonnostnú PPC reklamu
            na Google a Meta. Bez zbytočnej byrokracie — merateľné výsledky od
            prvého dňa.
          </p>

          <div className="animate-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 [animation-delay:220ms]">
            <Button href="#kontakt" size="lg" className="w-full sm:w-auto">
              NEZÁVÄZNE MA KONTAKTOVAŤ
            </Button>
            <Button
              href="#projekty"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              POZRIEŤ PROJEKTY
            </Button>
          </div>
        </div>

        <div className="animate-fade-in relative mx-auto w-full max-w-md [animation-delay:120ms] sm:max-w-lg lg:max-w-none">
          <div className="relative aspect-4/5 w-full isolate">
            {/* Decorative arrow drifting behind the portrait toward the top-right corner. */}
            <div className="animate-drift-arrow absolute -right-4 -top-6 z-0 h-28 w-36 sm:h-56 sm:w-64 lg:-right-20 lg:-top-1 lg:h-120 lg:w-140">
              <Image
                src={arrowTopRight}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1200px) 9rem, (max-width: 1200px) 12rem, 40rem"
                className="object-contain"
              />
            </div>
            <Image
              src={portrait}
              alt="Milan Ivančák, špecialista na PPC reklamu"
              fill
              preload
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 640px, 650px"
              className="z-10 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
