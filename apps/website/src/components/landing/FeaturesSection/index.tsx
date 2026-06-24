import Testimonial from "../Testimonial";
import NavigationAndCard from "./NavigationAndCard";
import type { Dictionary } from "@/i18n/request";

interface FeaturesSectionProps {
  dict: Dictionary;
}

export default function FeaturesSection({ dict }: FeaturesSectionProps) {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      id="features"
      aria-labelledby="features-heading"
    >
      <header className="flex flex-row items-center gap-4 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-32 justify-center text-center">
        <h2 id="features-heading">{dict.features.heading}</h2>
      </header>

      <NavigationAndCard dict={dict} />

      <aside
        className="mx-auto max-w-xl mt-8 sm:mt-10 lg:mt-12 px-4"
        aria-label="Customer testimonial"
      >
        <Testimonial
          personImagePath="/avatar1.webp"
          personName={dict.features.testimonialPerson}
          personRole={dict.features.testimonialRole}
          testimonial={dict.features.testimonial}
        />
      </aside>
    </section>
  );
}
