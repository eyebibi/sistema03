"use client";

import { IconMenu2, IconSparkles, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "./Navbar";
import Link from "next/link";
import PurchaseButton from "./PurchaseButton";

export default function MobileMenuWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menu"
      >
        {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Mobile Menu rendered in a portal to guarantee overlay */}
      {isMenuOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed left-0 right-0 top-24 bottom-0 bg-black/40 z-[9999] md:hidden flex flex-col items-stretch pointer-events-auto">
            <div className="absolute top-0 left-0 right-0 mt-2 bg-base-200 backdrop-blur-sm rounded-b-lg p-4 z-[10000]">
              <div className="flex flex-col gap-4">
                {navLinks
                  .filter((navLink) => navLink.label !== "Home")
                  .map((navLink) => (
                    <Link
                      href={navLink.href}
                      key={navLink.label}
                      className="text-gray-100 hover:text-white transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navLink.label}
                    </Link>
                  ))}
                <div className="border-t border-white/20 pt-4 flex flex-col gap-2">
                  <Link href="/signin">
                    <button className="btn btn-outline btn-sm rounded-full w-full">
                      Entrar
                    </button>
                  </Link>
                  <PurchaseButton
                    planId="complete"
                    className="btn btn-primary btn-sm rounded-full w-full"
                  >
                    <IconSparkles className="w-4 h-4" />
                    Configurar meu servidor agora
                  </PurchaseButton>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
