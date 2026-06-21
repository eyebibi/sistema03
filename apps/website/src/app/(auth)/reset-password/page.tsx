import AuthFooter from "../components/auth/AuthFooter";
import RequestPasswordResetForm from "../components/reset-password/RequestPasswordResetForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset password on Discly",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <div
        className="absolute inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-base-100"
      />

      <div className="w-full space-y-8 p-8">
        <RequestPasswordResetForm />

        <AuthFooter
          spanText="Remember your password? "
          linkText="Sign in"
          linkHref="/signin"
        />
      </div>
    </div>
  );
}
