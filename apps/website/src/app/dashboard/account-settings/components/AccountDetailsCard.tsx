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
    <div className="w-full max-w-120">
      <h1 className="font-bold text-2xl">Account details</h1>
      <p>View your account information</p>
      <div className="card bg-base-200 w-full my-3">
        <div className="card-body p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base-content flex items-center gap-2">
                <Star className="w-4 h-4" /> Plan
              </h2>

              <span className="badge badge-primary mt-2">
                Plan: {capitalize(customerPlan.plan)} 🎉
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {customerPlan.plan === "BASIC" && <UpgradePlanButton />}
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-base-content flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email address
            </h2>
            <div className="flex gap-2 items-center">
              <p>{customerEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
