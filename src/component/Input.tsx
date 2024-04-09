import React from 'react'

interface IInput {
    label?: string;
    name: string;
    type: string; 
    placeholder: string; 
    value: string;
    error?: string;
    handleChange: (e: any) => void;
}

const Input = (props: IInput) => {
    const { label, name, type, placeholder, value, handleChange, error } = props
  return (
    <fieldset>
        {label && <label htmlFor={name}>{label}</label>}
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
        {error && <span>{error}</span>}
    </fieldset>
  )
}

export default Input