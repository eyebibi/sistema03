import { Card, CardContent } from "@/components/ui/card";
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
      <h1 className="font-bold text-2xl">Detalhes da conta</h1>
      <p>Veja suas informações da conta</p>
      <Card className="border-gray-700 w-full my-3">
        <CardContent className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-white" /> Plano
              </h2>

              <div className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white mt-2">
                Plano {capitalize(customerPlan.plan)} 🎉
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {customerPlan.plan === "BASIC" && <UpgradePlanButton />}
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" /> Endereço de e-mail
            </h2>
            <div className="flex gap-2 items-center">
              <p>{customerEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
