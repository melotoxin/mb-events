"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  eyebrow?: string;
  features?: readonly string[];
  ctaLabel?: string;
  className?: string;
  imageSizes?: string;
}

export function AdvancedCard({ title, description, imageSrc, imageAlt, href, eyebrow, features, ctaLabel = "Explore experience", className, imageSizes = "(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 25vw" }: CardProps) {
  const reducedMotion = useReducedMotion();
  const reveal = {
    rest: { opacity: 0, y: reducedMotion ? 0 : 18, height: 0 },
    hover: { opacity: 1, y: 0, height: "auto" },
  };

  return (
    <motion.a
      href={href}
      aria-label={`Explore ${title}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
      className={cn("advanced-card group relative isolate flex min-h-[23rem] flex-col justify-end overflow-hidden bg-[#17253a] p-6 text-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c5a475] md:min-h-[27rem]", className)}
    >
      <Image src={imageSrc} alt={imageAlt} fill sizes={imageSizes} className="-z-20 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transform-none" />
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
      {eyebrow && <span className="absolute left-6 top-6 border border-white/20 bg-white/10 px-3 py-2 text-[.68rem] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">{eyebrow}</span>}
      <div className="relative border-t border-white/35 pt-5">
        <h3 className="font-serif text-[clamp(2rem,3vw,3.2rem)] leading-[1.02] tracking-[-.04em]">{title}</h3>
        <motion.div variants={reveal} transition={{ duration: reducedMotion ? 0 : 0.38, ease: "easeOut" }} className="hidden overflow-hidden md:block">
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">{description}</p>
          {features && <ul className="mt-4 list-inside list-disc space-y-1 text-xs text-white/80">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
          <span className="mt-6 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-3 text-[.68rem] font-bold uppercase tracking-[.14em] backdrop-blur-md">{ctaLabel}<span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span></span>
        </motion.div>
        <div className="md:hidden">
          <p className="mt-3 text-sm leading-relaxed text-white/85">{description}</p>
          {features && <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-white/80">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
          <span className="mt-5 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[.12em] backdrop-blur-md">{ctaLabel} ↗</span>
        </div>
      </div>
    </motion.a>
  );
}
