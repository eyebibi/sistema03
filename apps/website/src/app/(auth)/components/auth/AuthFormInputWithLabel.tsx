"use client";

import { InputHTMLAttributes } from "react";

type InputAndLabelProps = {
  labelname: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function AuthFormInputWithLabel(props: InputAndLabelProps) {
  return (
    <div className="space-y-2">
      <label className="label" htmlFor={props.name}>
        {props.labelname}
      </label>
      <input
        className="input w-full depthless"
        autoCapitalize="none"
        autoComplete={props.autoComplete}
        autoCorrect="off"
        required
        {...props}
      />
    </div>
  );
}
