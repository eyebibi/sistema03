"use client";

import {
  resetPassword,
  ResetPasswordResponse,
} from "@/app/actions/resetPassword";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import AuthFormInputWithLabel from "../auth/AuthFormInputWithLabel";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";


type FormProps = {
  error: boolean | { message: string; action: string };
  passwordResetId: string;
};

export default function ResetPasswordForm({
  error,
  passwordResetId,
}: FormProps) {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const [resetPasswordState, resetPasswordAction, isPending] = useActionState(
    resetPassword.bind(null, passwordResetId, newPassword),
    {} as ResetPasswordResponse,
  );

  useEffect(() => {
    if (
      typeof resetPasswordState.error === "undefined" &&
      !resetPasswordState.success
    )
      return;

    if (resetPasswordState?.success) {
      toast.success("Success!", {
        description:
          "Your password was reseted. You can now use it to log in again",
      });

      router.push("/signin");

      return;
    }

    if (!resetPasswordState?.success) {
      toast.error(resetPasswordState?.error?.message, {
        description: resetPasswordState?.error?.action,
      });
    }
  }, [resetPasswordState]);

  useEffect(() => {
    if (typeof error === "object") {
      toast.error(error.message, {
        description: error.action,
      });
    }
  }, [error]);

  if (typeof error === "object") return null;

  return (
    <form action={resetPasswordAction}>
      <AuthFormInputWithLabel
        autoComplete="new-password"
        id="newPassword"
        name="newPassword"
        placeholder="********"
        type="password"
        labelname="New password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />

      <button
        disabled={isPending}
        className="btn btn-primary btn-block my-5"
      >
        {isPending && <LoadingSpinner />}
        Reset password
      </button>
    </form>
  );
}
