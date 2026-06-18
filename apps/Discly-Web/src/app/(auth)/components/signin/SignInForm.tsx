"use client";

import { handleSignIn } from "@/app/actions/handleSignIn";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import AuthFormInputWithLabel from "../auth/AuthFormInputWithLabel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  const router = useRouter();

  const [signInState, signInAction, isSigninPending] = useActionState(
    handleSignIn,
    {
      canRedirect: false,
    },
  );

  useEffect(() => {
    if (signInState.error) {
      toast.error(signInState.error.message || "Erro", {
        description:
          "Algo saiu errado. Se você acha que isso deveria funcionar, por favor, contate o suporte.",
      });

      return;
    }

    if (signInState.canRedirect) {
      router.push("/dashboard");
    }
  }, [signInState]);

  return (
    <form className="max-w-md mx-auto  text-white" action={signInAction}>
      <div className="text-center font-bold text-3xl my-4 gap-5 justify-center items-center flex-col">
        <Image
          src="/logo.png"
          alt="Discly logo"
          width={60}
          height={60}
          className="mx-auto"
        />

        <h1 className="text-2xl font-bold mt-3">Entrar</h1>
      </div>
      <div className="flex flex-col space-y-4">
        <AuthFormInputWithLabel
          autoComplete="email"
          id="email"
          name="email"
          placeholder="email@gmail.com"
          type="email"
          labelname="Email"
        />
        <AuthFormInputWithLabel
          autoComplete="current-password"
          id="password"
          name="password"
          placeholder="********"
          type="password"
          labelname="Senha"
        />
      </div>
      <input className="hidden" name="redirectTo" value="/dashboard" readOnly />
      <Button
        className="w-full mt-10"
        variant="default"
        type="submit"
        disabled={isSigninPending}
      >
        {isSigninPending ? (
          <LoadingSpinner />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Entrar na conta
      </Button>
    </form>
  );
}
