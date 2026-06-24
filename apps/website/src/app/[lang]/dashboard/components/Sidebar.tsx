"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
} from "lucide-react";
import { signOutAction } from "./actions";

const navLinks = (locale: string) => [
  { href: `/${locale}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
  { href: `/${locale}/dashboard/billing`, label: "Billing & Credits", icon: CreditCard },
  {
    href: `/${locale}/dashboard/account-settings`,
    label: "Account Settings",
    icon: Settings,
  },
  { href: `/${locale}/dashboard/contact`, label: "Support", icon: LifeBuoy },
];

export default function Sidebar({ userEmail, locale }: { userEmail: string; locale: string }) {
  const pathname = usePathname();
  const links = navLinks(locale);

  const closeDrawer = () => {
    const checkbox = document.getElementById(
      "sidebar-drawer",
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="flex flex-col min-h-screen w-[260px] bg-base-300">
      <Link
        href={`/${locale}/dashboard`}
        onClick={closeDrawer}
        className="flex items-center gap-3 px-6 pt-8 pb-6"
      >
        <Bot className="w-8 h-8 text-primary" />
        <span className="font-bold text-xl text-white">Discly</span>
      </Link>

      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={closeDrawer}
              className={`relative flex items-center gap-3 px-4 py-2.5 text-sm rounded-r-lg transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-white/[0.04] text-white"
                  : "text-[#94A3B8] hover:bg-white/[0.02] hover:text-[#E2E8F0]"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 inset-y-0 w-[3px] bg-primary rounded-r-sm" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.05] px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-[#94A3B8] truncate overflow-hidden whitespace-nowrap max-w-[160px]">
            {userEmail}
          </span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="btn btn-ghost btn-sm btn-square text-[#94A3B8] hover:text-red-500 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
