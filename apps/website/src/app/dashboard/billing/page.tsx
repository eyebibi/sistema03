"use client";

import { useEffect, useState } from "react";
import CreditPackageCard from "./components/CreditPackageCard";

const packages = [
  { credits: 100, price: "$2.99", iconSize: 24 },
  { credits: 200, price: "$4.99", iconSize: 32 },
  { credits: 500, price: "$9.99", iconSize: 40 },
  { credits: 1000, price: "$17.99", iconSize: 48 },
];

export default function BillingPage() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div
        className="rounded-xl p-8 mb-8 text-white bg-gradient-to-br from-[#5865F2] via-[#4752C4] to-[#3730A3]"
      >
        <p className="text-sm font-medium opacity-80 mb-1">
          Your Current Balance
        </p>
        <p className="text-5xl font-bold">
          {credits !== null
            ? `${credits.toLocaleString()}`
            : "---"}
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-5 pl-8">
        Purchase Additional Credits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => (
          <CreditPackageCard
            key={pkg.credits}
            credits={pkg.credits}
            price={pkg.price}
            iconSize={pkg.iconSize}
          />
        ))}
      </div>
    </div>
  );
}
