"use client";

import AuthFormInputWithLabel from "../auth/AuthFormInputWithLabel";
import { useActionState, useEffect, useState } from "react";
import { sendResetPasswordEmail } from "@/app/actions/sendResetPasswordEmail";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { Send } from "lucide-react";


type SendResetPasswordEmailResponse =
  | {
      message: string;
      error?: undefined;
    }
  | {
      error: string;
      message?: undefined;
    };

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");

  const [sendResetPasswordEmailState, sendResetPasswordEmailAction, isPending] =
    useActionState(
      sendResetPasswordEmail.bind(null, email),
      {} as SendResetPasswordEmailResponse,
    );

  useEffect(() => {
    if (sendResetPasswordEmailState?.error) {
      toast.error("Error", {
        description: sendResetPasswordEmailState.error,
      });

      return;
    }

    if (
      sendResetPasswordEmailState.message &&
      !sendResetPasswordEmailState.error
    ) {
      toast.success("Success", {
        description: sendResetPasswordEmailState.message,
      });
    }
  }, [sendResetPasswordEmailState]);

  return (
    <form className="max-w-md mx-auto" action={sendResetPasswordEmailAction}>
      <div className="text-center font-bold text-3xl my-4 gap-5 justify-center items-center flex-col text-white">
        <Image
          src="/logo.png"
          alt="Discly logo"
          width={60}
          height={60}
          className="mx-auto"
        />

        <h1 className="text-2xl font-bold mt-3">Reset password</h1>
      </div>

      <AuthFormInputWithLabel
        autoComplete="email"
        id="email"
        name="email"
        placeholder="email@gmail.com"
        type="email"
        labelname="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="btn btn-primary btn-block mt-10" type="submit" disabled={isPending}>
        {isPending ? <LoadingSpinner /> : <Send className="size-4" />}
        Send email
      </button>
    </form>
  );
}
