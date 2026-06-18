import { cn } from "@/lib/utils";
import AuthFooter from "../components/auth/AuthFooter";
import RequestPasswordResetForm from "../components/reset-password/RequestPasswordResetForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir senha",
  description: "Redefinir senha no Discly",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "bg-background",
        )}
      />

      <div className="w-full space-y-8 p-8">
        <RequestPasswordResetForm />

        <AuthFooter
          spanText="Lembrou sua senha? "
          linkText="Entrar na conta"
          linkHref="/signin"
        />
      </div>
    </div>
  );
}
