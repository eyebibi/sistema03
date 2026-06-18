import { FloatingGlowingEffect } from "@/components/ui/floating-glowing-effect";
import Link from "next/link";
import PurchaseModalTrigger from "./PurchaseModalTrigger";

export default function LastCtaSection() {
  return (
    <section
      className="w-full justify-center flex flex-col gap-4 relative mx-auto mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="final-cta-heading"
    >
      <div className="w-full max-w-4xl p-6 sm:p-10 lg:p-20 bg-white/5 backdrop-blur-sm rounded-lg mx-auto text-center flex flex-col gap-10">
        <FloatingGlowingEffect
          blur={0.01}
          borderWidth={1}
          spread={80}
          glow={true}
          disabled={false}
          duration={10}
          direction="counterclockwise"
          easing="linear"
        />
        <header className="flex flex-col">
          <h2
            id="final-cta-heading"
            className="text-gray-200 text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight"
          >
            Você está pronto?
          </h2>

          <PurchaseModalTrigger
            planId="complete"
            planName="Ilimitado"
            className="w-full sm:w-auto max-w-sm mx-auto mt-6 sm:mt-8 lg:mt-10"
          >
            Se sim, vem com o Discly
          </PurchaseModalTrigger>
        </header>

        <footer>
          <small className="text-gray-500">
            Ou, se você ainda tem dúvidas,{" "}
            <Link href="mailto:tim@mail.discly.live" className="text-primary">
              entre em contato comigo
            </Link>
          </small>
        </footer>
      </div>
    </section>
  );
}
