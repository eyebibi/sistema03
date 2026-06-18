import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BackButton from "./components/BackButton";
import NavbarDropdown from "./components/NavbarDropdown";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  // customer not logged in cannot access
  if (!session) redirect("/signin");

  return (
    <div className="container mx-auto max-w-[1280px]">
      <nav className="flex justify-between items-center w-full py-4">
        <div className="flex-1">
          <BackButton />
        </div>
        <div className="flex-none mx-auto px-2">
          <NavbarDropdown />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
