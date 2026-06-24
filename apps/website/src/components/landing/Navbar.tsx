import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";
import MobileMenuWrapper from "./MobileMenuWrapper";
import PurchaseModalTrigger from "./PurchaseModalTrigger";
import type { Dictionary } from "@/i18n/request";

export const getNavLinks = (dict: Dictionary) => [
  { label: dict.navbar.home, href: "/" },
  { label: dict.navbar.features, href: "/#features" },
  { label: dict.navbar.pricing, href: "/#pricing" },
  { label: dict.navbar.faq, href: "/#faq" },
];

interface NavbarProps {
  dict: Dictionary;
  locale: string;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const navLinks = getNavLinks(dict);

  return (
    <nav
      className="flex flex-row justify-between items-center w-full h-16 px-4 sm:px-6 lg:px-10 backdrop-blur-sm bg-white/10 rounded-full z-20 fixed top-4 sm:top-10 left-1/2 transform -translate-x-1/2 max-w-7xl"
      style={{
        width: "95%",
      }}
      role="navigation"
      aria-label={dict.navbar.navigationLabel}
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
        aria-label={dict.navbar.userActionsLabel}
      >
        <Link href={`/${locale}/dashboard`}>
          <Button className="rounded-full" variant="outline" size="sm">
            {dict.navbar.signIn}
          </Button>
        </Link>
        <PurchaseModalTrigger
          dict={dict}
          planId="complete"
          planName="Ilimitado"
          className="rounded-full"
          size="sm"
        >
          <IconSparkles className="w-4 h-4" aria-hidden="true" />
          <span className="hidden lg:inline">
            {dict.navbar.configureNow}
          </span>
          <span className="lg:hidden">{dict.navbar.create}</span>
        </PurchaseModalTrigger>
      </div>

      <MobileMenuWrapper dict={dict} />
    </nav>
  );
}
