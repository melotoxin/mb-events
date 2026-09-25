"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  BookOpen,
  BriefcaseBusiness,
  Cake,
  Check,
  Crown,
  GraduationCap,
  Heart,
  MoreHorizontal,
  PartyPopper,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { eventTypes } from "@/lib/lead";

type EventType = (typeof eventTypes)[number];

interface EventCardContent {
  icon: LucideIcon;
  description: string;
}

const cardContent: Record<EventType, EventCardContent> = {
  Wedding: { icon: Heart, description: "A celebration of your story." },
  "Sweet 16": { icon: Cake, description: "A milestone made yours." },
  Quinceañera: { icon: Crown, description: "A day to remember." },
  "Bar Mitzvah": { icon: BookOpen, description: "A meaningful milestone." },
  "Bat Mitzvah": { icon: Star, description: "A moment worth celebrating." },
  Birthday: { icon: PartyPopper, description: "Celebrate another year." },
  Corporate: { icon: BriefcaseBusiness, description: "Bring everyone together." },
  "School Event": { icon: GraduationCap, description: "Celebrate your community." },
  "Private Party": { icon: Sparkles, description: "Make it personal." },
  Other: { icon: MoreHorizontal, description: "Tell us your idea." },
};

export interface EventTypeCardsProps {
  value?: string;
  onChange: (value: EventType) => void;
}

export function EventTypeCards({ value, onChange }: EventTypeCardsProps) {
  const reducedMotion = useReducedMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": nextIndex = (index + 1) % eventTypes.length; break;
      case "ArrowLeft":
      case "ArrowUp": nextIndex = (index - 1 + eventTypes.length) % eventTypes.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = eventTypes.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onChange(eventTypes[nextIndex]);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div role="radiogroup" aria-label="Event type" className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
      {eventTypes.map((eventType, index) => {
        const { icon: Icon, description } = cardContent[eventType];
        const selected = value === eventType;
        return (
          <motion.button
            key={eventType}
            ref={(node) => { buttonRefs.current[index] = node; }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (!value && index === 0) ? 0 : -1}
            onClick={() => onChange(eventType)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            whileHover={reducedMotion ? undefined : { scale: 1.025, y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 px-3 py-5 text-center shadow-[0_8px_25px_rgba(39,33,23,0.045)] transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:shadow-[0_16px_34px_rgba(91,72,40,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ad874d] sm:min-h-48 md:px-4 ${selected ? "border-[#b58e4e] bg-[#fffaf0] shadow-[0_16px_32px_rgba(166,124,56,0.14)]" : "border-[#e5e0d7] bg-white hover:border-[#cbb994]"}`}
          >
            {selected && <span aria-hidden="true" className="absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full bg-[#b58e4e] text-white shadow-sm"><Check className="size-3.5" strokeWidth={2.5} /></span>}
            <Icon aria-hidden="true" className="mb-4 size-8 text-[#a7834b] md:size-9" strokeWidth={1.45} />
            <span className="font-serif text-[1.05rem] leading-tight text-[#222b38] sm:text-lg">{eventType}</span>
            <span className="mt-2 max-w-40 text-[.72rem] leading-snug text-[#737878] sm:text-xs">{description}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
