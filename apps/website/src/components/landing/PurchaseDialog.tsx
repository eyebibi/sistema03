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

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  planId: "basic" | "complete";
  planName: string;
}

export default function PurchaseDialog({
  isOpen,
  onOpenChange,
  planId,
  planName,
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
          <DialogTitle>Complete sua compra</DialogTitle>
          <DialogDescription>
            Digite seu email para prosseguir com a compra do plano {planName}.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email para receber acesso</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
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
            planId={planId}
            payerEmail={email}
            disabled={!isValid || !email}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
