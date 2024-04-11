import { cn } from "@/utils/tailwind";
import React from "react";

interface IButton {
    classes?: string;
    type: "submit" | "reset" | "button"
    disabled?: boolean;
    name: string
}

const Button = ({ type, disabled, classes, name }: IButton) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn("mb-12 w-full rounded-md bg-black py-4 text-center uppercase text-white", disabled && 'disabled',classes)}
    >
      {name}
    </button>
  );
};

export default Button;
