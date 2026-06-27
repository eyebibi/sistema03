import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default function SiteNavbar() {
  return (
    <nav className="flex items-center sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300/50 min-h-16 px-4">
      <div className="max-w-[1080px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Discly" width={28} height={28} className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight">Discly</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="btn btn-ghost btn-sm">
            Sign In
          </Link>
          <CheckoutButton planId="complete" className="btn btn-primary btn-sm">
            Build My Server
          </CheckoutButton>
        </div>
      </div>
    </nav>
  );
}
