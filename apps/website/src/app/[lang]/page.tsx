import Hero from "@/components/landing/Hero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ObjectionsSection from "@/components/landing/Objections";
import PricingSection from "@/components/landing/PricingSection/PricingSection";
import IsItForYouSection from "@/components/landing/IsItForYou";
import FaqSection from "@/components/landing/FaqSection/FaqSection";
import LastCtaSection from "@/components/landing/LastCtaSection";
import Footer from "@/components/landing/Footer";
import { getDictionary, hasLocale } from "@/i18n/request";
import { type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero dict={dict} locale={lang} />
      <main>
        <FeaturesSection dict={dict} />
        <ObjectionsSection dict={dict} />
        <PricingSection dict={dict} />
        <IsItForYouSection dict={dict} />
        <FaqSection dict={dict} />
        <LastCtaSection dict={dict} />
      </main>
      <Footer dict={dict} locale={lang} />
    </>
  );
}
