import Squares from "@/blocks/backgrounds/Squares/Squares";
import { IconArrowLeft, IconShield } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/lib/public-env";
import { getDictionary, hasLocale } from "@/i18n/request";
import { type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return {
    title: dict.legal.privacy.title,
    description: dict.legal.privacy.description,
  }
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Replace this with your actual Privacy Policy content
  const privacyContent = `
**Effective date: January 30, 2025**

Welcome to Discly ("we", "our", "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.

1. Information we collect

Personal data: we collect your email address.

Non-personal data: we do not collect any non-personal data.

2. Purpose of data collection

We process your data to:

Process your purchases.

Contact you regarding our services.

Ensure the proper functioning of our bot.

3. Data sharing

We do not share your data with third parties.

4. Children's privacy

We do not collect data from children.

5. Updates to this Policy

We may update this Privacy Policy from time to time. If any changes are made, we will notify users via email.

6. Contact information

To resolve any questions about this Privacy Policy, please contact us at ${env.NEXT_PUBLIC_EMAIL_FROM}.

By using Discly, you agree to the terms of this Privacy Policy.
  `;

  return (
    <section className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Squares
          speed={0.05}
          squareSize={60}
          direction="diagonal"
          borderColor="rgba(88, 101, 242, 0.3)"
          hoverFillColor="rgba(88, 101, 242, 0.1)"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link href={`/${lang}`} className="btn btn-ghost text-gray-300 hover:text-white">
          <IconArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-700 shadow-lg shadow-primary/25 mb-6">
              <IconShield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              See how Discly handles your data.
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-gray-300 leading-relaxed space-y-6 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: privacyContent
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    )
                    .replace(
                      /### (.*)/g,
                      '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>'
                    )
                    .replace(
                      /## (.*)/g,
                      '<h2 class="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">$1</h2>'
                    )
                    .replace(
                      /# (.*)/g,
                      '<h1 class="text-3xl font-bold text-white mt-10 mb-6 first:mt-0">$1</h1>'
                    ),
                }}
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Have questions about how your data is handled?
            </p>
            <Link href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM} className="btn bg-gradient-to-r! from-primary to-blue-700 hover:brightness-90 active:scale-95 h-12 px-8 text-base font-medium text-white border-0">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100/80 pointer-events-none z-5"></div>
    </section>
  );
}
