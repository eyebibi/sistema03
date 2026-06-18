"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";

type InputAndLabelProps = {
  labelname: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function AuthFormInputWithLabel(props: InputAndLabelProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.name} className="text-white">
        {props.labelname}
      </Label>
      <Input
        className="w-full text-white"
        autoCapitalize="none"
        autoComplete={props.autoComplete}
        autoCorrect="off"
        required
        {...props}
      />
    </div>
  );
}
