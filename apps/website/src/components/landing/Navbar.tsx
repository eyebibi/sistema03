import Link from "next/link";
import Image from "next/image";
import { IconSparkles } from "@tabler/icons-react";
import MobileMenuWrapper from "./MobileMenuWrapper";
import PurchaseButton from "./PurchaseButton";

export const navLinks = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Recursos",
    href: "/#features",
  },
  {
    label: "Planos",
    href: "/#pricing",
  },
  {
    label: "Perguntas frequentes",
    href: "/#faq",
  },
];

export default function Navbar() {
  return (
    <nav
      className="flex flex-row justify-between items-center w-full h-16 px-4 sm:px-6 lg:px-10 backdrop-blur-sm bg-white/10 rounded-full z-20 fixed top-4 sm:top-10 left-1/2 transform -translate-x-1/2 max-w-7xl"
      style={{
        width: "95%",
      }}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="flex flex-row items-center gap-4" role="banner">
        <Image src="/logo.png" alt="Discly logo" width={32} height={32} />
        <p className="text-white text-lg font-bold">Discly</p>
      </div>

      {/* Desktop Navigation */}
      <ul
        className="hidden md:flex flex-row items-center gap-4 text-gray-100"
        role="menubar"
      >
        {navLinks.map((navLink) => (
          <li key={navLink.label} role="none">
            <Link
              href={navLink.href}
              className="hover:text-white transition-colors"
              role="menuitem"
            >
              {navLink.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div
        className="hidden md:flex flex-row items-center gap-4"
        role="group"
        aria-label="Ações do usuário"
      >
        <Link href="/dashboard">
          <button className="btn btn-outline btn-sm rounded-full">
            Entrar
          </button>
        </Link>
        <PurchaseButton
          planId="complete"
          className="btn btn-primary btn-sm rounded-full"
        >
          <IconSparkles className="w-4 h-4" aria-hidden="true" />
          <span className="hidden lg:inline">
            Configurar meu servidor agora
          </span>
          <span className="lg:hidden">Criar</span>
        </PurchaseButton>
      </div>

      <MobileMenuWrapper />
    </nav>
  );
}
