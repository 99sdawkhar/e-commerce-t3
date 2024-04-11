import { cn } from "@/utils/tailwind";
import React from "react";

interface IInput {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
  onKeyDown?: (e: any) => void;
  classes?: string;
  error?: string;
}

const Input = (
  props: IInput
) => {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    handleChange,
    onKeyDown,
    error,
    classes
  } = props;
  return (
    <fieldset className="flex flex-col max-w-[450px] mb-6">
      {label && <label htmlFor={name} className="mb-1">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn('flex border border-[#C1C1C1] rounded-md mb-1 py-1.5 px-2', classes)}
      />
      {error && <span className="text-red-600">{error}</span>}
    </fieldset>
  );
};

export default Input;
