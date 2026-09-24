import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoTreatment = "vibrant" | "monochrome";

interface BrandLogoProps {
  treatment?: LogoTreatment;
  className?: string;
}

export function BrandLogo({ treatment = "vibrant", className }: BrandLogoProps) {
  return (
    <Link href="/" aria-label="MB Events home" className={cn("inline-flex shrink-0 items-center", className)}>
      <span className="relative block h-8 w-[172px] overflow-hidden md:h-10 md:w-[215px] xl:h-12 xl:w-[259px]">
        <Image
          src="/logo.png"
          alt="Michael Bryan Events"
          fill
          priority
          sizes="(min-width: 1280px) 259px, (min-width: 768px) 215px, 172px"
          className={cn("object-cover", treatment === "vibrant" ? "brightness-125 contrast-125" : "grayscale brightness-200 contrast-200")}
        />
      </span>
    </Link>
  );
}
