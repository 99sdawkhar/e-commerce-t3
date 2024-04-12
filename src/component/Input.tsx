import { cn } from "@/utils/tailwind";
import React from "react";

interface IInput {
  label?: string;
  rightLabel?: string;
  name: string;
  checked?: boolean;
  type: string;
  placeholder?: string;
  value?: string;
  handleChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  classes?: string;
  parentClass?: string;
  error?: string;
  extraData?: React.ReactNode;
}

const Input = (props: IInput) => {
  const {
    label,
    rightLabel,
    name,
    checked,
    type,
    placeholder,
    value,
    handleChange,
    onKeyDown,
    error,
    classes,
    parentClass,
    extraData,
  } = props;
  return (
    <fieldset className={cn("relative mb-6 flex flex-col", parentClass)}>
      {label && (
        <label htmlFor={name} className="mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        checked={checked}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "mb-1 flex rounded-md border border-[#C1C1C1] p-2",
          classes,
        )}
      />
      {rightLabel && (
        <label htmlFor={name} className="mb-1">
          {rightLabel}
        </label>
      )}
      {extraData}
      {error && <span className="text-red-600">{error}</span>}
    </fieldset>
  );
};

export default Input;
