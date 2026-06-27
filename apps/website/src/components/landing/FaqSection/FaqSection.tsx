import { faqs } from "./faqs";

export default function FaqSection() {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <header className="flex flex-col justify-center items-center mt-20 sm:mt-24 lg:mt-32">
        <div className="text-center">
          <h2
            id="faq-heading"
            className="text-gray-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Perguntas Frequentes
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Tem perguntas? Temos respostas. Econtre tudo o que você precisa
            saber sobre o bot.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-14 lg:mt-16 space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 px-4 sm:px-6"
              role="group"
              aria-label="Frequently asked questions"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-left text-gray-300 font-semibold text-sm sm:text-base lg:text-lg hover:text-gray-200 transition-colors">
                {faq.question}
              </div>
              <div className="collapse-content text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </header>
    </section>
  );
}
