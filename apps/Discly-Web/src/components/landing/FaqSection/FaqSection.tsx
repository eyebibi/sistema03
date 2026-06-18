import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
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

        <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-14 lg:mt-16">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3 sm:space-y-4"
            role="group"
            aria-label="Frequently asked questions"
          >
            {faqs.map((faq, index) => (
              <div key={index}>
                <AccordionItem
                  value={`item-${index}`}
                  className={cn(
                    "border border-white/10 rounded-lg px-4 sm:px-6 py-2",
                    "bg-white/5 backdrop-blur-sm",
                    "hover:bg-white/10 transition-colors duration-200",
                  )}
                >
                  <AccordionTrigger
                    className="text-left text-gray-300 font-semibold text-sm sm:text-base lg:text-lg hover:text-gray-200 transition-colors [&[data-state=open]]:text-primary"
                    aria-describedby={`faq-answer-${index}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    id={`faq-answer-${index}`}
                    className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed pt-2 pb-4"
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </header>
    </section>
  );
}
