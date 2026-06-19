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
      <div className="flex items-center min-h-[calc(100vh-5em)] px-5">
        <div className="flex flex-row-reverse justify-between w-full items-start gap-5">
          <AccountDetailsCard
            customerPlan={customerPlan}
            customerEmail={customerEmail}
          />

          <ResetPasswordCard />
        </div>
      </div>
    </SessionProvider>
  );
}
