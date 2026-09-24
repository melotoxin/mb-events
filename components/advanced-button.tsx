"use client";

import type { AriaAttributes, MouseEventHandler, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends AriaAttributes {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  tone?: "light" | "dark";
  size?: "default" | "compact" | "icon";
  arrow?: "up-right" | "right" | "left";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  target?: string;
  rel?: string;
}

const variants = {
  primary: "border border-[#b9272d] bg-[#b9272d] text-white hover:border-[#d43a40] hover:bg-[#d43a40] hover:shadow-[0_10px_30px_rgba(185,39,45,.22)]",
  secondary: "border border-transparent bg-transparent text-[#17253a] hover:bg-[#17253a]/7",
  outline: "border border-[#17253a]/55 bg-transparent text-[#17253a] hover:border-[#17253a] hover:bg-[#17253a] hover:text-white",
} as const;

const darkVariants = {
  primary: variants.primary,
  secondary: "border border-transparent bg-transparent text-white hover:bg-white/10",
  outline: "border border-white/65 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#17253a]",
} as const;

const sizes = {
  default: "min-h-14 gap-7 px-6 py-3",
  compact: "min-h-11 gap-3 px-4 py-2",
  icon: "size-11 justify-center p-0",
} as const;

const arrows = { "up-right": "↗", right: "→", left: "←" } as const;

export function AdvancedButton({ children, variant = "primary", tone = "light", size = "default", arrow, className, href, type = "button", disabled, onClick, target, rel, ...aria }: ButtonProps) {
  const reducedMotion = useReducedMotion();
  const classes = cn(
    "advanced-button group inline-flex shrink-0 items-center justify-center whitespace-nowrap text-center text-xs font-bold uppercase tracking-[.14em] transition-[background-color,border-color,color,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a475] disabled:pointer-events-none disabled:opacity-50",
    tone === "dark" ? darkVariants[variant] : variants[variant],
    sizes[size],
    className,
  );
  const content = <>{children}{arrow && <span aria-hidden="true" className="inline-block text-lg leading-none transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transform-none">{arrows[arrow]}</span>}</>;
  const animation = { whileHover: reducedMotion ? undefined : { scale: 1.02 }, whileTap: reducedMotion ? undefined : { scale: 0.98 }, transition: { duration: 0.3, ease: "easeOut" as const } };

  if (href) {
    return <motion.a {...animation} {...aria} href={href} target={target} rel={rel} data-variant={variant} data-tone={tone} className={classes}>{content}</motion.a>;
  }
  return <motion.button {...animation} {...aria} type={type} disabled={disabled} onClick={onClick} data-variant={variant} data-tone={tone} className={classes}>{content}</motion.button>;
}
