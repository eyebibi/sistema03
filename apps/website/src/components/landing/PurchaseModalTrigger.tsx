"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import PurchaseDialog from "./PurchaseDialog";
import type { Dictionary } from "@/i18n/request";

interface PurchaseModalTriggerProps {
  planId: "basic" | "complete";
  planName: string;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  dict: Dictionary;
}

export default function PurchaseModalTrigger({
  planId,
  planName,
  children,
  className,
  variant = "default",
  size = "default",
  dict,
}: PurchaseModalTriggerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className={className}
        variant={variant}
        size={size}
      >
        {children}
      </Button>

      <PurchaseDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        planId={planId}
        planName={planName}
        dict={dict}
      />
    </>
  );
}
