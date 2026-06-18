"use client";

import AuthFormInputWithLabel from "@/app/(auth)/components/auth/AuthFormInputWithLabel";
import {
  changePassword,
  ChangePasswordResponse,
} from "@/app/actions/changePassword";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ResetPasswordCard() {
  const session = useSession();

  const customerEmail =
    session.status === "authenticated" ? session.data.user.email : null;

  const [changePasswordResponse, changePasswordAction, isPending] =
    useActionState(
      changePassword.bind(null, customerEmail),
      {} as ChangePasswordResponse,
    );

  useEffect(() => {
    // some error happened
    if (changePasswordResponse.message) {
      toast.error(changePasswordResponse.message, {
        description: changePasswordResponse.action,
      });

      return;
    }

    if (changePasswordResponse.success) {
      toast.success("Success", {
        description: "Sua senha foi alterada.",
      });
    }
  }, [changePasswordResponse]);

  return (
    <div className="w-full max-w-120">
      <h1 className="font-bold text-2xl">Redefinir senha</h1>
      <p>Redefina sua senha aqui</p>
      <Card className="border-gray-700 w-full my-3">
        <CardContent className="p-8">
          <form className="flex flex-col gap-5" action={changePasswordAction}>
            <AuthFormInputWithLabel
              labelname="Senha atual"
              placeholder="********"
              name="currentPassword"
              type="password"
            />

            <AuthFormInputWithLabel
              labelname="Nova senha"
              placeholder="********"
              name="newPassword"
              type="password"
            />

            <Button disabled={isPending}>
              {isPending ? <LoadingSpinner /> : <Lock className="w-4 h-4" />}
              Redefinir senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
