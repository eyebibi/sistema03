import { IconScale } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { env } from "@/lib/public-env";
import Footer from "@/components/landing/Footer";
import SiteNavbar from "@/components/SiteNavbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using Discly",
};

export default function TermsOfService() {
  const termsContent = `
**Effective date: January 30, 2025**

Welcome to Discly! By using our services, you agree to these Terms of Service. Please read them carefully.

1. Overview

Discly ("we", "our", "us") provides an AI-powered Discord bot to help users configure their servers quickly. By accessing or using our website (${env.NEXT_PUBLIC_BASE_URL}) and services, you agree to comply with these Terms.

2. User accounts and data

To use our services, we may collect certain information, including your email address and Discord user ID. For more details, please review our Privacy Policy at ${env.NEXT_PUBLIC_BASE_URL}/privacy.

3. Payments and refunds

Purchases made on Discly are eligible for a refund within 7 days of purchase.

Refund requests must be sent to ${env.NEXT_PUBLIC_EMAIL_FROM} directly or via the contact form on the website.

After 7 days, all purchases are final. This means it will not be possible to request a refund.

However, we reserve the right to deny refund requests if we suspect abuse of our refund policy.

4. User responsibilities

You must comply with all applicable laws and Discord's Terms of Service.

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
    <>
      <SiteNavbar />

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6">
                <IconScale className="w-10 h-10 text-primary-content" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-base-content leading-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-base-content/80 text-lg sm:text-xl max-w-2xl mx-auto">
                Please read these terms carefully before using the service
              </p>
            </div>

            {/* Content Area */}
            <div className="card bg-base-200 border border-base-300/40">
              <div className="card-body p-8 sm:p-12">
                <div
                  className="text-base-content/80 leading-relaxed space-y-6 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: termsContent
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-base-content font-semibold">$1</strong>'
                      )
                      .replace(
                        /## (.*)/g,
                        '<h2 class="text-2xl font-bold text-base-content mt-8 mb-4 first:mt-0">$1</h2>'
                      )
                      .replace(
                        /# (.*)/g,
                        '<h1 class="text-3xl font-bold text-base-content mt-10 mb-6 first:mt-0">$1</h1>'
                      ),
                  }}
                />
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-12">
              <p className="text-base-content/60 mb-6">
                Have questions about these terms?
              </p>
              <Link
                href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM}
                className="btn btn-primary h-12 px-8 text-base font-medium"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
