import ReleaseCard from "@/components/changelog/ReleaseCard";
import { IconReplace } from "@tabler/icons-react";
import { Metadata } from "next";
import { RELEASES } from "./releases";
import SiteNavbar from "@/components/SiteNavbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Discly Changelog",
};

export default function Changelog() {
  return (
    <>
      <SiteNavbar />
      <section className="w-full min-h-screen flex flex-col relative overflow-hidden pt-24 pb-20">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-box bg-primary/10 text-primary mx-auto">
              <IconReplace className="w-10 h-10" />
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-base-content">
              Changelog
            </h1>
            <p className="mt-2 text-base-content/60 max-w-2xl mx-auto">
              Public history of changes, improvements, and fixes to Discly.
              Released updates are listed below.
            </p>
          </header>

          <main className="relative">
            <div className="hidden md:block absolute left-6 top-6 bottom-6 w-px bg-primary/30" />

            <div className="space-y-8">
              {RELEASES.map((r) => (
                <ReleaseCard key={r.version} release={r} />
              ))}
            </div>
          </main>

          <footer className="mt-10 text-center text-sm text-base-content/60">
            All updates are meant to make Discly better and better :)
          </footer>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100/80 pointer-events-none z-5"></div>
      </section>
      <Footer />
    </>
  );
}
