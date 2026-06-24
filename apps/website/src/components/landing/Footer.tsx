import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconMail } from "@tabler/icons-react";
import { env } from "@/lib/public-env";
import type { Dictionary } from "@/i18n/request";

interface FooterProps {
  dict: Dictionary;
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-white/5 backdrop-blur-sm border-t border-white/10 mt-20"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <section className="space-y-4" aria-labelledby="brand-heading">
            <header className="flex items-center gap-3">
              <Image src="/logo.png" alt="Discly logo" width={32} height={32} />
              <h3 id="brand-heading" className="text-white text-xl font-bold">
                Discly
              </h3>
            </header>
            <p className="text-gray-300 text-sm leading-relaxed">
              {dict.footer.brandDescription}
            </p>
            <div
              className="flex gap-3"
              role="group"
              aria-label="Social media links"
            >
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM}
                  aria-label="Send us an email"
                >
                  <IconMail size={18} />
                </Link>
              </Button>
            </div>
          </section>

          {/* Product Links */}
          <section className="space-y-4" aria-labelledby="product-nav-heading">
            <h4 id="product-nav-heading" className="text-white font-semibold">
              {dict.footer.productHeading}
            </h4>
            <nav aria-labelledby="product-nav-heading">
              <ul className="flex flex-col gap-2" role="list">
                <li>
                  <Link
                    href="/#features"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.featuresLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.pricingLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/changelog`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.changelogLink}
                  </Link>
                </li>
              </ul>
            </nav>
          </section>

          {/* Support Links */}
          <section className="space-y-4" aria-labelledby="support-nav-heading">
            <h4 id="support-nav-heading" className="text-white font-semibold">
              {dict.footer.supportHeading}
            </h4>
            <nav aria-labelledby="support-nav-heading">
              <ul className="flex flex-col gap-2" role="list">
                <li>
                  <Link
                    href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.contactLink}
                  </Link>
                </li>
              </ul>
            </nav>
          </section>

          {/* Legal Links */}
          <section className="space-y-4" aria-labelledby="legal-nav-heading">
            <h4 id="legal-nav-heading" className="text-white font-semibold">
              {dict.footer.legalHeading}
            </h4>
            <nav aria-labelledby="legal-nav-heading">
              <ul className="flex flex-col gap-2" role="list">
                <li>
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.privacyLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/terms`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.footer.termsLink}
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Discly. {dict.footer.copyright}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>{dict.footer.madeWith}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
