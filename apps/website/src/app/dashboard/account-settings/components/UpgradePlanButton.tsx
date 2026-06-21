import Link from "next/link";
import { WandSparkles } from "lucide-react";

export default function UpgradePlanButton({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard/billing"
      className={className || "btn btn-outline btn-primary btn-sm"}
    >
      <WandSparkles className="w-4 h-4" /> Upgrade plan
    </Link>
  );
}
