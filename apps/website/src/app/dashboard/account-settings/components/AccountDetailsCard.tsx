import { Mail, Star } from "lucide-react";
import UpgradePlanButton from "./UpgradePlanButton";
import { capitalize } from "@/helpers/capitalize";

export default function AccountDetailsCard({
  customerPlan,
  customerEmail,
}: {
  customerPlan: { plan: string };
  customerEmail: string;
}) {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-1">Account details</h1>
      <p className="text-sm text-[#94A3B8] mb-4">View your account information</p>
      <div className="card bg-base-200 card-border">
        <div className="card-body p-8 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-base-content" />
            <span className="text-base-content text-sm font-medium">Email address</span>
          </div>
          <p className="text-[#94A3B8] -mt-3">{customerEmail}</p>

          <div className="border-t border-white/5" />

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-base-content" />
            <span className="text-base-content text-sm font-medium">Current Plan</span>
          </div>
          <span className="badge badge-primary -mt-3">
            {capitalize(customerPlan.plan)}
          </span>

          {customerPlan.plan === "BASIC" && (
            <>
              <div className="border-t border-white/5" />
              <p className="text-sm text-[#94A3B8]">
                Unlock priority support and lower credits costs by upgrading to the best plan.
              </p>
              <UpgradePlanButton className="btn btn-primary w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
