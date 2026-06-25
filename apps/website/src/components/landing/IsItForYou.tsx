import { IconCheck, IconX } from "@tabler/icons-react";
import PurchaseModalTrigger from "./PurchaseModalTrigger";

const notForYou = [
  {
    text: (
      <>
        <b>Você prefere configurar seu servidor sozinho</b>, sem nenhuma ajuda
        personalizada.
      </>
    ),
  },
  {
    text: (
      <>
        <b>Você quer aprender como criar um servidor</b>, ao invés de a IA criar
        um para você.
      </>
    ),
  },
];

const forYou = [
  {
    text: (
      <>
        <b>Você quer ter um servidor para sua comunidade</b> e não sabe como
        criar um.
      </>
    ),
  },
  {
    text: (
      <>
        <b>Você não tem tempo para configurar um servidor</b>, mas precisa de
        um.
      </>
    ),
  },
  {
    text: (
      <>
        <b>Você precisa de um lugar para reunir sua audiência</b>, e precisa que
        isso seja feito rápido.
      </>
    ),
  },
];

export default function IsItForYouSection() {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative px-4 sm:px-6 lg:px-8"
      aria-labelledby="target-audience-heading"
    >
      <header className="flex flex-col justify-center items-center mt-20 sm:mt-24 lg:mt-32">
        <h2
          id="target-audience-heading"
          className="text-gray-200 text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
        >
          É para você?
        </h2>

        <div className="mt-10 sm:mt-12 lg:mt-16 flex flex-col gap-4 max-w-2xl w-full">
          <article>
            <h3 className="text-gray-200 text-lg sm:text-xl font-medium">
              NÃO é para você se:
            </h3>
            <ul
              className="mt-3 sm:mt-4 space-y-3 sm:space-y-4"
              role="list"
              aria-label="Reasons this product is not for you"
            >
              {notForYou.map((item, index) => (
                <li className="flex gap-3 items-start w-full" key={index}>
                  <IconX
                    className="text-red-500 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="text-base sm:text-lg">
                    <p className="text-gray-200 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3 className="text-gray-200 text-lg sm:text-xl font-medium mt-8 sm:mt-10">
              É para você se:
            </h3>
            <ul
              className="mt-3 sm:mt-4 space-y-3 sm:space-y-4"
              role="list"
              aria-label="Reasons this product is for you"
            >
              {forYou.map((item, index) => (
                <li className="flex gap-3 items-start w-full" key={index}>
                  <IconCheck
                    className="text-green-500 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="text-base sm:text-lg">
                    <p className="text-gray-200 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </header>

      <PurchaseModalTrigger
        planId="complete"
        planName="Ilimitado"
        className="w-full sm:w-auto max-w-sm mx-auto mt-6 sm:mt-8 lg:mt-10"
      >
        Configurar meu servidor agora
      </PurchaseModalTrigger>
    </section>
  );
}
