import { IconShield } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { env } from "@/lib/public-env";
import Footer from "@/components/landing/Footer";
import SiteNavbar from "@/components/SiteNavbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for using Discly",
};

export default function PrivacyPolicy() {
  return (
    <>
      <SiteNavbar />

      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4">

          <div className="text-center">
            <div className="w-14 h-14 rounded-box bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
              <IconShield className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold">
              Privacy Policy
            </h1>
            <p className="text-base text-base-content/60 max-w-[55ch] mx-auto mt-4">
              See how Discly handles your data.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-24 bg-base-200/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="card bg-base-200 border border-base-300/40">
            <div className="card-body space-y-6">
              <p className="text-sm text-base-content/50">
                Effective date: January 30, 2025
              </p>

              <p className="text-base text-base-content/70 leading-relaxed">
                Welcome to Discly (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
              </p>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">1. Information we collect</h2>
                <p className="text-base text-base-content/70 leading-relaxed mb-2">
                  Personal data: we collect your email address.
                </p>
                <p className="text-base text-base-content/70 leading-relaxed">
                  Non-personal data: we do not collect any non-personal data.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">2. Purpose of data collection</h2>
                <p className="text-base text-base-content/70 leading-relaxed mb-3">
                  We process your data to:
                </p>
                <ul className="list-disc pl-5 text-base text-base-content/70 leading-relaxed space-y-1">
                  <li>Process your purchases.</li>
                  <li>Contact you regarding our services.</li>
                  <li>Ensure the proper functioning of our bot.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">3. Data sharing</h2>
                <p className="text-base text-base-content/70 leading-relaxed">
                  We do not share your data with third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">4. Children&apos;s privacy</h2>
                <p className="text-base text-base-content/70 leading-relaxed">
                  We do not collect data from children.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">5. Updates to this Policy</h2>
                <p className="text-base text-base-content/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. If any changes are made, we will notify users via email.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight mb-3">6. Contact information</h2>
                <p className="text-base text-base-content/70 leading-relaxed">
                  To resolve any questions about this Privacy Policy, please contact us at{" "}
                  <a
                    href={`mailto:${env.NEXT_PUBLIC_EMAIL_FROM}`}
                    className="link link-primary"
                  >
                    {env.NEXT_PUBLIC_EMAIL_FROM}
                  </a>.
                </p>
              </div>

              <div className="divider" />

              <p className="text-sm text-base-content/50">
                By using Discly, you agree to the terms of this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-base text-base-content/60 mb-6">
            Have questions about how your data is handled?
          </p>
          <Link
            href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM}
            className="btn btn-primary btn-lg gap-2"
          >
            Contact us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
