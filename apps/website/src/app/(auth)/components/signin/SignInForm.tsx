"use client";

import { handleSignIn } from "@/app/actions/handleSignIn";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LogIn } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import AuthFormInputWithLabel from "../auth/AuthFormInputWithLabel";
import Image from "next/image";


export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [signInState, signInAction, isSigninPending] = useActionState(
    handleSignIn,
    {
      canRedirect: false,
    },
  );

  useEffect(() => {
    if (searchParams.get("purchase") === "success") {
      toast.success("Purchase completed!", {
        description:
          "Please check your email to get your access credentials.",
        duration: 10000,
      });
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  useEffect(() => {
    if (signInState.error) {
      toast.error(signInState.error.message || "Error", {
        description:
          "Something went wrong. If you think this should work, please contact support.",
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

        <h1 className="text-2xl font-bold mt-3">Sign in</h1>
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
          labelname="Password"
        />
      </div>
      <input className="hidden" name="redirectTo" value="/dashboard" readOnly />
      <button
        className="btn btn-primary btn-block mt-10"
        type="submit"
        disabled={isSigninPending}
      >
        {isSigninPending ? (
          <LoadingSpinner />
        ) : (
          <LogIn className="size-4" />
        )}
        Sign in to your account
      </button>
    </form>
  );
}
