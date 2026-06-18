import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="flex justify-start items-center p-4">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft />
            Voltar
          </Button>
        </Link>
      </header>
      {children}
    </div>
  );
}
