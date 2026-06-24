"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

export default function CreditsPill() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits))
      .catch(() => { });
  }, []);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/5 border border-white/10 h-[32px] w-fit overflow-hidden ${credits === null ? "animate-pulse" : ""
        }`}
    >
      {credits !== null ? (
        <>
          <Coins className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="text-white whitespace-nowrap">{credits.toLocaleString()} credits</span>
        </>
      ) : (
        <>
          <span className="block w-4 h-4 rounded-full bg-white/10 shrink-0" />
          <span className="block w-[85px] h-4 bg-white/10 rounded" />
        </>
      )}
    </div>
  );
}
