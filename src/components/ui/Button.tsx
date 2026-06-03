"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-tight transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-60",
        variant === "primary" &&
          "bg-[color:var(--primary)] text-white shadow-[0_10px_26px_rgba(15,76,129,0.24)] hover:bg-[color:var(--secondary)]",
        variant === "secondary" &&
          "bg-[color:var(--light)] text-[color:var(--primary)] hover:bg-white border border-[rgba(15,76,129,0.18)]",
        variant === "ghost" &&
          "bg-transparent text-[color:var(--primary)] hover:bg-[rgba(47,128,237,0.10)] border border-transparent",
        className
      )}
      {...props}
    />
  );
});

