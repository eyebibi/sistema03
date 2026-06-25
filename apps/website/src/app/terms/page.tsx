import Squares from "@/blocks/backgrounds/Squares/Squares";
import { IconArrowLeft, IconScale } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { env } from "@/lib/public-env";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using Discly",
};

export default function TermsOfService() {
  // Replace this with your actual Terms of Service content
  const termsContent = `
**Effective date: January 30, 2025**

Welcome to Discly! By using our services, you agree to these Terms of Service. Please read them carefully.

1. Overview

Discly ("we", "our", "us") provides an AI-powered Discord bot to help users configure their servers quickly. By accessing or using our website (${env.NEXT_PUBLIC_BASE_URL}) and services, you agree to comply with these Terms.

2. User accounts and data

To use our services, we may collect certain information, including your email. For more details, please review our Privacy Policy at ${env.NEXT_PUBLIC_BASE_URL}/privacy.

3. Payments and refunds

Purchases made on Discly are eligible for a refund within 7 days of purchase.

Refund requests must be sent to ${env.NEXT_PUBLIC_EMAIL_FROM} directly or via the contact form on the website.

After 7 days, all purchases are final. This means it will not be possible to request a refund.

However, we reserve the right to deny refund requests if we suspect abuse of our refund policy.

4. User responsibilities

You must comply with all applicable Discord laws.

You are responsible for the content and actions within your Discord servers.

5. Limitations of liability

Discly is provided "as is" without warranties of any kind.

We are not liable for any losses or damages resulting from the use of our services.

6. Governing law

These Terms are governed by the laws of Brazil. Any dispute will be resolved in accordance with Brazilian law.

7. Changes to these Terms

We may update these Terms from time to time. Users will be notified of significant changes via email.

8. Contact information

For any questions, please contact us at ${env.NEXT_PUBLIC_EMAIL_FROM}.

Thank you for using Discly!`;

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
        <Link href="/" className="btn btn-ghost text-gray-300 hover:text-white">
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
              <IconScale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using the service
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-gray-300 leading-relaxed space-y-6 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: termsContent
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
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
              Have questions about these terms?
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
