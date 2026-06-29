"use client";

import { useCallback, useState, type ReactNode } from "react";
import { IconLoader2 } from "@tabler/icons-react";

interface CheckoutButtonProps {
  planId: "basic" | "complete";
  className?: string;
  children: ReactNode;
}

export default function CheckoutButton({
  planId,
  className,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [planId]);

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading && <IconLoader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
