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
  extraData?: React.ReactNode;
}

const Input = (props: IInput) => {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    handleChange,
    onKeyDown,
    error,
    classes,
    extraData,
  } = props;
  return (
    <fieldset className="relative mb-6 flex max-w-[450px] flex-col">
      {label && (
        <label htmlFor={name} className="mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "mb-1 flex rounded-md border border-[#C1C1C1] p-2",
          classes,
        )}
      />
      {extraData}
      {error && <span className="text-red-600">{error}</span>}
    </fieldset>
  );
};

export default Input;
