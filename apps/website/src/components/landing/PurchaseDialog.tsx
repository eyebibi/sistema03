"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PurchaseButton from "./PurchaseButton";
import type { Dictionary } from "@/i18n/request";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  planId: "basic" | "complete";
  planName: string;
  dict: Dictionary;
}

export default function PurchaseDialog({
  isOpen,
  onOpenChange,
  planId,
  planName,
  dict,
}: PurchaseDialogProps) {
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const email = watch("email", "");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-gray-600">
        <DialogHeader className="text-white">
          <DialogTitle>{dict.purchaseDialog.title}</DialogTitle>
          <DialogDescription>
            {dict.purchaseDialog.description.replace("{planName}", planName)}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{dict.purchaseDialog.label}</Label>
            <Input
              id="email"
              type="email"
              placeholder={dict.purchaseDialog.placeholder}
              {...register("email")}
              className={`${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <PurchaseButton
            dict={dict}
            planId={planId}
            payerEmail={email}
            disabled={!isValid || !email}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
