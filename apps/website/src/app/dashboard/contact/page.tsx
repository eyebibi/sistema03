"use client";

import { SessionProvider } from "next-auth/react";
import ContactForm from "./components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <SessionProvider>
          <ContactForm />
        </SessionProvider>
      </div>
    </div>
  );
}
