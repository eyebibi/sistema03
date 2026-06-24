import { FloatingGlowingEffect } from "@/components/ui/floating-glowing-effect";
import Link from "next/link";
import PurchaseModalTrigger from "./PurchaseModalTrigger";
import { env } from "@/lib/public-env";
import type { Dictionary } from "@/i18n/request";

interface LastCtaSectionProps {
  dict: Dictionary;
}

export default function LastCtaSection({ dict }: LastCtaSectionProps) {
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
            {dict.lastCta.heading}
          </h2>

          <PurchaseModalTrigger
            dict={dict}
            planId="complete"
            planName="Ilimitado"
            className="w-full sm:w-auto max-w-sm mx-auto mt-6 sm:mt-8 lg:mt-10"
          >
            {dict.lastCta.cta}
          </PurchaseModalTrigger>
        </header>

        <footer>
          <small className="text-gray-500">
            {dict.lastCta.footer}
            <Link href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM} className="text-primary">
              {dict.lastCta.contactLink}
            </Link>
          </small>
        </footer>
      </div>
    </section>
  );
}
