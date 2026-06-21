"use client";

import { Coins } from "lucide-react";

export default function CreditPackageCard({
  credits,
  price,
  iconSize = 24,
}: {
  credits: number;
  price: string;
  iconSize?: number;
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
        onClick={() => {
          console.log("Package selected:", { credits, price });
          alert(`You selected the ${credits.toLocaleString()} credits package for ${price}.`);
        }}
      >
        Select Package
      </button>
    </div>
  );
}
