import SignInForm from "../components/signin/SignInForm";
import AuthFooter from "../components/auth/AuthFooter";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Discly",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
  },
};

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/dashboard");
  return (
    <div className="flex flex-col gap-10 w-full pr-3 pl-3 items-center justify-center min-h-[calc(100vh-10vh)]">
      <SignInForm />

      <AuthFooter
        spanText="Forgot your password? "
        linkText="Reset password"
        linkHref="/reset-password"
      />
    </div>
  );
}
