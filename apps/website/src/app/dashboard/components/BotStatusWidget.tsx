import Link from "next/link";
import { LifeBuoy } from "lucide-react";

export default function BotStatusWidget() {
  return (
    <div className="card bg-base-200 card-border">
      <div className="card-body">
        <h3 className="card-title text-sm font-semibold text-white">
          Live Bot Status
        </h3>
        <div className="flex items-center gap-2 mt-1 mb-4">
          <span className="status status-success animate-pulse" />
          <span className="text-sm text-[#94A3B8]">Bot Status: Active</span>
        </div>
        <Link
          href="/dashboard/contact"
          className="btn btn-primary btn-sm"
        >
          <LifeBuoy className="w-4 h-4" />
          Contact Support
        </Link>
      </div>
    </div>
  );
}
