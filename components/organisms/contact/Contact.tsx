import ContactForm from "@/components/organisms/contact/ContactForm";

export default function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-heading" className="w-full">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="text-center">
          <h2
            id="kontakt-heading"
            className="text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            Porozprávajme sa o vašej reklame
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Napíšte mi, čomu sa venujete a čo chcete reklamou dosiahnuť. Ozvem
            sa vám a preberieme možnosti spolupráce.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
