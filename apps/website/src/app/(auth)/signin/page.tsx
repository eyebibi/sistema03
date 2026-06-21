import SignInForm from "../components/signin/SignInForm";
import AuthFooter from "../components/auth/AuthFooter";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Discly",
};

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/dashboard");
  return (
    <div className="flex w-full items-center justify-center min-h-[calc(100vh-10vh)]">
      <div
        className="absolute inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-base-100"
      />
      <div className="w-full space-y-8 p-8">
        {/* <FormSeparator /> */}

        <SignInForm />

        <AuthFooter
          spanText="Forgot your password? "
          linkText="Reset password"
          linkHref="/reset-password"
        />
      </div>
    </div>
  );
}
