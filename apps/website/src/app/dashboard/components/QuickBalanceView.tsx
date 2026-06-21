"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coins, ShoppingCart } from "lucide-react";

export default function QuickBalanceView() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits))
      .catch(() => {});
  }, []);

  return (
    <div className="card bg-base-200 card-border">
      <div className="card-body">
        <h3 className="card-title text-sm font-semibold text-white flex items-center gap-2">
          <Coins className="w-4 h-4 text-yellow-400" />
          Quick Balance
        </h3>
        <p className="text-2xl font-bold text-white mt-1">
          {credits !== null
            ? `${credits.toLocaleString()} credits`
            : <span className="inline-block h-7 w-[90px] bg-white/5 rounded animate-pulse align-middle" />}
        </p>
        <div className="card-actions mt-4">
          <Link
            href="/dashboard/billing"
            className="btn btn-primary btn-sm w-full"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Credits
          </Link>
        </div>
      </div>
    </div>
  );
}
