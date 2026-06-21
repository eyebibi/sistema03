"use client";

import { Coins } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CreditPackageCard({
  credits,
  price,
  iconSize = 24,
  onSelect,
  loading = false,
}: {
  credits: number;
  price: string;
  iconSize?: number;
  onSelect: (credits: number) => void;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between h-full min-h-[240px] bg-[#1E2028] border border-white/5 rounded-lg p-6">
      <div className="flex flex-col items-center gap-2">
        <Coins size={iconSize} className="text-yellow-400" />
        <h3 className="text-lg font-bold text-white">{credits.toLocaleString()}</h3>
        <p className="text-sm font-semibold text-[#E2E8F0]">{price}</p>
      </div>

      <button
        className="btn btn-primary btn-sm w-full mt-6"
        disabled={loading}
        onClick={() => onSelect(credits)}
      >
        {loading && <LoadingSpinner />}
        Select Package
      </button>
    </div>
  );
}
