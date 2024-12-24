import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  className?: string;
}

export function InputField({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  min,
  className = ""
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
        required={required}
        min={min}
      />
    </div>
  );
}