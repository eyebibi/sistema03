import { auth } from "@/auth";
import { getCustomerPlan } from "./actions/getCustomerPlan";
import ResetPasswordCard from "./components/ResetPasswordCard";
import { SessionProvider } from "next-auth/react";
import AccountDetailsCard from "./components/AccountDetailsCard";

export default async function AccountSettings() {
  const session = await auth();
  const customerEmail = session.user.email;

  const customerPlan = await getCustomerPlan(customerEmail);

  if (customerPlan.error) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-5em)] items-center justify-center">
        <h1 className="font-bold text-4xl">
          {customerPlan.error.message || "Unknown error"}
        </h1>
        <p>{customerPlan.error.action || "Please, try again."}</p>
      </div>
    );
  }

  return (
    <SessionProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[900px] mx-auto items-start">
        <ResetPasswordCard />

        <AccountDetailsCard
          customerPlan={customerPlan}
          customerEmail={customerEmail}
        />
      </div>
    </SessionProvider>
  );
}
