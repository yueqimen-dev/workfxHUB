import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border-2 border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-[3px] focus:ring-black/10 ${className}`}
      {...props}
    />
  );
}
