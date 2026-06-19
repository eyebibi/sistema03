"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Mail, User, UserCog } from "lucide-react";
import Link from "next/link";
import SignOutForm from "./SignOutForm";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}>
      <div
        tabIndex={0}
        role="button"
        style={{ transition: "transform 0.12s ease, background-color 0.15s ease" }}
        className="btn btn-ghost bg-white/[0.01] border border-[#283242] hover:bg-transparent hover:!border-[#283242] outline-none focus-visible:outline-none"
        onClick={toggle}
      >
        <User className="w-4 h-4" />
        Your Account
        <ChevronDown className="w-4 h-4" />
      </div>
      <div
        tabIndex={-1}
        className="dropdown-content bg-base-200 border border-[#283242] rounded-2xl p-3 shadow-lg w-72 space-y-1"
      >
        <Link
          href="/dashboard/account-settings"
          onClick={close}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base-content/70 border border-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors duration-200"
        >
          <UserCog className="w-4 h-4 shrink-0" />
          Settings
        </Link>

        <Link
          href="/dashboard/contact"
          onClick={close}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base-content/70 border border-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors duration-200"
        >
          <Mail className="w-4 h-4 shrink-0" />
          Contact
        </Link>

        <SignOutForm onClose={close} />
      </div>
    </div>
  );
}
