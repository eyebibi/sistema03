import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Discly",
  description: "Terms of Service for Discly",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
