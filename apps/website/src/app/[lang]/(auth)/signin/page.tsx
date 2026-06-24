import SignInForm from "../components/signin/SignInForm";
import AuthFooter from "../components/auth/AuthFooter";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "@/i18n/request";
import { type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return {
    title: dict.auth.signInTitle,
  }
}

export default async function SignInPage({ params }: Props) {
  const { lang } = await params;
  const session = await auth();

  if (session) redirect(`/${lang}/dashboard`);
  return (
    <div className="flex flex-col gap-10 w-full pr-3 pl-3 items-center justify-center min-h-[calc(100vh-10vh)]">
      <SignInForm locale={lang} />

      <AuthFooter
        spanText="Forgot your password? "
        linkText="Reset password"
        linkHref={`/${lang}/reset-password`}
      />
    </div>
  );
}
