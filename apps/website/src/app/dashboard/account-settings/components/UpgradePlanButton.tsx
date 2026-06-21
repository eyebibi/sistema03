"use client";

import { useCallback, useEffect, useState } from "react";
import { WandSparkles } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function UpgradePlanButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgrade") === "success") {
      toast.success("Your plan has been upgraded!");
      window.history.replaceState({}, "", "/dashboard/account-settings");
    } else if (params.get("upgrade") === "canceled") {
      toast.error("Purchase canceled");
      window.history.replaceState({}, "", "/dashboard/account-settings");
    }
  }, []);

  const handleUpgrade = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-plan-upgrade-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <button
      className={className || "btn btn-outline btn-primary btn-sm"}
      disabled={loading}
      onClick={handleUpgrade}
    >
      {loading && <LoadingSpinner />}
      <WandSparkles className="w-4 h-4" /> Upgrade plan
    </button>
  );
}
