"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();

  const linkProps = {
    href: pathname === "/dashboard" ? "/" : "/dashboard",
    text: pathname === "/dashboard" ? "Homepage" : "Dashboard",
  };

  return (
    <Link
      href={linkProps.href}
      style={{ transition: "transform 0.12s ease-out, background-color 0.15s ease" }}
      className="btn btn-ghost bg-white/[0.01] border border-[#283242] hover:bg-transparent hover:!border-[#283242] outline-none focus-visible:outline-none"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">{linkProps.text}</span>
    </Link>
  );
}
