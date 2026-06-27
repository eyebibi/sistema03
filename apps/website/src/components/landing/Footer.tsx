import Link from "next/link";
import { env } from "@/lib/public-env";

export default function Footer() {
  return (
    <footer className="text-base-content pt-16 pb-8 px-4">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex flex-row flex-wrap justify-center gap-8">
          <nav className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
              Product
            </h6>
            <Link href="/#what-you-get" className="link link-hover text-sm">Features</Link>
            <Link href="/#pricing" className="link link-hover text-sm">Pricing</Link>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
              Resources
            </h6>
            <Link href="/changelog" className="link link-hover text-sm">Changelog</Link>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
              Company
            </h6>
            <Link href="/" className="link link-hover text-sm">About</Link>
            <a href={"mailto:" + env.NEXT_PUBLIC_EMAIL_FROM} className="link link-hover text-sm">Contact</a>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
              Legal
            </h6>
            <Link href="/privacy" className="link link-hover text-sm">Privacy</Link>
            <Link href="/terms" className="link link-hover text-sm">Terms</Link>
          </nav>
        </div>
        <div className="mt-12 pt-8 border-t border-base-300/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Discly" className="h-5 w-5" />
            <span className="text-sm font-bold tracking-tight">Discly</span>
          </div>
          <p className="text-xs text-base-content/40">
            Built for Discord communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
