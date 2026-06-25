"use client";

import AuthFormInputWithLabel from "@/app/(auth)/components/auth/AuthFormInputWithLabel";
import {
  changePassword,
  ChangePasswordResponse,
} from "@/app/actions/changePassword";
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
        description: "Your password has been changed.",
      });
    }
  }, [changePasswordResponse]);

  return (
    <div className="max-w-[420px]">
      <h1 className="font-bold text-2xl mb-1">Reset password</h1>
      <p className="text-sm text-[#94A3B8] mb-4">Reset your password here</p>
      <div className="card bg-base-200 card-border">
        <div className="card-body p-8">
          <form className="flex flex-col gap-5" action={changePasswordAction}>
            <AuthFormInputWithLabel
              labelname="Current password"
              placeholder="********"
              name="currentPassword"
              type="password"
              className="input w-full depthless"
            />

            <AuthFormInputWithLabel
              labelname="New password"
              placeholder="********"
              name="newPassword"
              type="password"
              className="input w-full depthless"
            />

            <button className="btn btn-primary w-full" disabled={isPending}>
              {isPending ? <span className="loading loading-spinner"></span> : <Lock className="w-4 h-4" />}
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
