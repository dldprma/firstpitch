import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  radius = "3xl",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
  href,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 " +
    "font-semibold transition-all shadow-lg hover:shadow-xl active:shadow-md " +
    "touch-manipulation transform active:scale-95 font-pretendard " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  const variantClasses = {
    primary:
      "bg-[#f37c38] hover:bg-[#f37c38]/90 active:bg-[#f37c38]/80 text-white",
    secondary:
      "bg-[#5aa60e] hover:bg-[#5aa60e]/90 active:bg-[#5aa60e]/80 text-white",
    outline:
      "bg-transparent border-2 border-[#f37c38] text-[#f37c38] hover:bg-[#f37c38] hover:text-white active:bg-[#f37c38]/90",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const buttonClasses = `${baseClasses} ${radiusClasses[radius]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
