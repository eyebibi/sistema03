"use client";

import { SessionProvider } from "next-auth/react";
import ContactForm from "./components/ContactForm";
import HelpDeskPanel from "./components/HelpDeskPanel";

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 max-w-[950px] mx-auto">
      <SessionProvider>
        <ContactForm />
      </SessionProvider>
      <HelpDeskPanel />
    </div>
  );
}
