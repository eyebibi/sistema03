"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const pathname = usePathname();

  const linkProps = {
    href: pathname === "/dashboard" ? "/" : "/dashboard",
    text: pathname === "/dashboard" ? "Página inicial" : "Dashboard",
  };

  return (
    <Button variant="ghost">
      <Link
        href={linkProps.href}
        className="!hidden sm:!inline-flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {linkProps.text}
      </Link>

      <Link href={linkProps.href} className="!inline-flex sm:!hidden">
        <ArrowLeft className="w-6 h-6" />
      </Link>
    </Button>
  );
}
