const objections = [
  {
    question: "...eu não sei usar o Discord?",
    answer:
      "Não há problema, você não precisa saber muito sobre o Discord. O Discly entende que deve configurar servidores, tudo que você precisa fazer é dizer o que você quer ter no seu. Você poderá ver um tutorial completo no seu painel.",
  },
  {
    question: "...eu ainda não tiver criado um servidor?",
    answer:
      "Não há problema, você pode criar um servidor no Discord, e depois adicionar o bot ao seu servidor. Você poderá ver um tutorial completo sobre como fazer isso no seu painel.",
  },
  {
    question: "...o bot não fizer o servidor do jeito que pedi?",
    answer:
      "Como o bot usa IA, o servidor pode não ficar exatamente como você quer. Mas, para evitar isso, você pode solicitar ao bot para reconfigurar seu servidor quantas vezes quiser, sem custos extras.",
  },
];

export default function ObjectionsSection() {
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
          &quot;Mas e se...&quot;
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
