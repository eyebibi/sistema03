import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Discly",
  description: "Privacy Policy for Discly",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
