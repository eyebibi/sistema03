import Hero from "@/components/landing/Hero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ObjectionsSection from "@/components/landing/Objections";
import PricingSection from "@/components/landing/PricingSection/PricingSection";
import IsItForYouSection from "@/components/landing/IsItForYou";
import FaqSection from "@/components/landing/FaqSection/FaqSection";
import LastCtaSection from "@/components/landing/LastCtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <FeaturesSection />
        <ObjectionsSection />
        <PricingSection />
        <IsItForYouSection />
        <FaqSection />
        <LastCtaSection />
      </main>
      <Footer />
    </>
  );
}
