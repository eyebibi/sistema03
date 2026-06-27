"use client";

import { useCallback, type ReactNode } from "react";

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
  const handleClick = useCallback(async () => {
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
    }
  }, [planId]);

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
