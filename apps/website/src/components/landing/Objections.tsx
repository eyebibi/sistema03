import type { Dictionary } from "@/i18n/request";

interface ObjectionsSectionProps {
  dict: Dictionary;
}

export default function ObjectionsSection({ dict }: ObjectionsSectionProps) {
  const objections = dict.objections.items;

  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      aria-labelledby="objections-heading"
    >
      <header className="flex flex-col justify-center items-center mt-20 sm:mt-24 lg:mt-32">
        <h2
          id="objections-heading"
          className="text-gray-200 text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
        >
          {dict.objections.heading}
        </h2>

        <div
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10 max-w-xl mx-auto mt-10 sm:mt-12 lg:mt-16 w-full"
          role="list"
        >
          {objections.map((objection) => (
            <article
              key={objection.question}
              className="space-y-2 sm:space-y-3"
              role="listitem"
            >
              <h3 className="text-gray-300 font-bold text-lg sm:text-xl">
                {objection.question}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {objection.answer}
              </p>
            </article>
          ))}
        </div>
      </header>
    </section>
  );
}
