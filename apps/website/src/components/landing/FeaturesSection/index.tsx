import Testimonial from "../Testimonial";
import NavigationAndCard from "./NavigationAndCard";

export default function FeaturesSection() {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      id="features"
      aria-labelledby="features-heading"
    >
      <header className="flex flex-row items-center gap-4 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-32 justify-center text-center">
        <h2 id="features-heading">O que você vai ter</h2>
      </header>

      <NavigationAndCard />

      <aside
        className="mx-auto max-w-xl mt-8 sm:mt-10 lg:mt-12 px-4"
        aria-label="Customer testimonial"
      >
        <Testimonial
          personImagePath="/avatar1.webp"
          personName="Yves Mariano"
          personRole="CEO da wysion.com"
          testimonial="Não conheço muito de Discord. O Discly me ajudou a criar o servidor da minha comunidade do zero. Em questão de minutos já tava tudo pronto. Agradeço Tim, por ter criado essa ferramenta!"
        />
      </aside>
    </section>
  );
}
