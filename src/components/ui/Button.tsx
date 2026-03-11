import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const styles = {
  base: "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  variant: {
    primary: "bg-black text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
    secondary:
      "bg-white text-black border-[1.5px] border-black hover:bg-black hover:text-white active:bg-gray-800",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-black",
    destructive: "bg-error text-white",
  },
  size: {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.base} rounded-md ${styles.variant[variant]} ${styles.size[size]} ${className}`}
      {...props}
    />
  );
}
