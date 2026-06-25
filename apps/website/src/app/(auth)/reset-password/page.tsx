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
