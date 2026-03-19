import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg px-4 py-2 font-medium transition",
        variant === "primary" &&
          "bg-slate-900 text-white hover:bg-slate-700",
        variant === "secondary" &&
          "border border-slate-300 bg-white hover:bg-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}