import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="flex justify-start items-center p-4">
        <Link href="/" className="btn btn-ghost">
          <ArrowLeft />
          Back
        </Link>
      </header>
      {children}
    </div>
  );
}
