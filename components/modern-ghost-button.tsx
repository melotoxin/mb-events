"use client";

import type { AriaAttributes, MouseEventHandler, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GhostButtonBaseProps extends AriaAttributes {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

interface GhostButtonElementProps extends GhostButtonBaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface GhostButtonLinkProps extends GhostButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  type?: never;
  disabled?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type ModernGhostButtonProps = GhostButtonElementProps | GhostButtonLinkProps;

export function ModernGhostButton(props: ModernGhostButtonProps) {
  const reducedMotion = useReducedMotion();
  const { children, className, tone = "light", ...rest } = props;
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-5 whitespace-nowrap rounded-full border px-6 py-3 text-center text-sm font-semibold uppercase tracking-widest transition-[background-color,border-color,color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a475] motion-reduce:transition-none",
    tone === "dark"
      ? "border-[#f1aca9] bg-transparent text-[#ffe5e2] hover:bg-red-500/10"
      : "border-red-700 bg-transparent text-red-700 hover:bg-red-50",
    className,
  );
  const content = <>{children}<span aria-hidden="true" className="inline-block text-lg leading-none transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none">↗</span></>;
  const animation = { whileTap: reducedMotion ? undefined : { scale: 0.97 }, transition: { duration: 0.3, ease: "easeOut" as const } };

  if ("href" in rest && rest.href) {
    const { href, target, rel, onClick, ...aria } = rest;
    return <motion.a {...animation} {...aria} href={href} target={target} rel={rel} onClick={onClick} className={classes} style={{ color: tone === "dark" ? "#ffe5e2" : "#b91c1c" }}>{content}</motion.a>;
  }

  const { type = "button", disabled, onClick, ...aria } = rest as GhostButtonElementProps;
  return <motion.button {...animation} {...aria} type={type} disabled={disabled} onClick={onClick} className={cn(classes, "disabled:pointer-events-none disabled:opacity-50")}>{content}</motion.button>;
}
