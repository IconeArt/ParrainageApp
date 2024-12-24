import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({
  icon: Icon,
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "flex items-center space-x-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
}