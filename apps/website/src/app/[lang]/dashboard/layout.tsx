import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import CreditsPill from "./components/CreditsPill";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await auth();

  if (!session) redirect(`/${lang}/signin`);

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <div className="flex items-center justify-between px-8 pt-8 pb-0">
          <label
            htmlFor="sidebar-drawer"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <div className="ml-auto">
            <CreditsPill />
          </div>
        </div>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar userEmail={session.user.email!} locale={lang} />
      </div>
    </div>
  );
}
