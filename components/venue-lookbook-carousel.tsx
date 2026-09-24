"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

type VenueSlide = {
  name: string;
  location: string;
  image: `/media/${string}`;
  description: string;
};

const venues = [
  {
    name: "Oheka Castle",
    location: "Huntington, New York",
    image: "/media/concept-cinematic-cold-sparks.webp",
    description: "A grand setting for a memorable entrance and a room full of music.",
  },
  {
    name: "The Garden City Hotel",
    location: "Garden City, New York",
    image: "/media/concept-high-end-luxury-dancefloor.webp",
    description: "An elegant backdrop for a celebration with a modern point of view.",
  },
] as const satisfies readonly VenueSlide[];

export function VenueLookbookCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(venues.length - 1, index));
    const card = track.children.item(nextIndex) as HTMLElement | null;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
    setActiveIndex(nextIndex);
  }

  return (
    <section className="overflow-hidden bg-[#e8e1d6] py-20 md:py-28" aria-labelledby="venue-lookbook-heading">
      <div className="shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-[#a42b2e]">VENUE INSPIRATION</p>
            <h2 id="venue-lookbook-heading" className="mt-3 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-.05em] text-[#101b2a]">
              The room sets <em className="font-normal text-[#a7825c]">the stage.</em>
            </h2>
          </div>
          <div className="flex gap-2" aria-label="Lookbook controls">
            <motion.button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} whileTap={reducedMotion ? undefined : { scale: 0.94 }} className="grid size-11 place-items-center border border-[#7e7468] text-xl disabled:cursor-default disabled:opacity-35" aria-label="Previous venue" aria-controls="venue-lookbook-track">←</motion.button>
            <motion.button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === venues.length - 1} whileTap={reducedMotion ? undefined : { scale: 0.94 }} className="grid size-11 place-items-center border border-[#7e7468] text-xl disabled:cursor-default disabled:opacity-35" aria-label="Next venue" aria-controls="venue-lookbook-track">→</motion.button>
          </div>
        </div>

        <ul
          id="venue-lookbook-track"
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            const track = event.currentTarget;
            const first = track.children.item(0) as HTMLElement | null;
            if (!first) return;
            const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
            setActiveIndex(Math.min(venues.length - 1, Math.round(track.scrollLeft / (first.offsetWidth + gap))));
          }}
        >
          {venues.map((venue) => (
            <li key={venue.name} className="w-[min(88vw,650px)] shrink-0 snap-start bg-[#101b2a] text-white md:w-[min(70vw,800px)]">
              <div className="relative h-64 overflow-hidden md:h-96">
                <Image src={venue.image} alt={`Illustrative production concept for ${venue.name}`} fill sizes="(max-width: 768px) 88vw, 800px" className="object-cover" />
                <span className="absolute bottom-4 left-4 bg-[#101b2a]/85 px-3 py-2 text-[.62rem] font-bold uppercase tracking-[.16em]">Illustrative production concept</span>
              </div>
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
                <div>
                  <p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[#d8b787]">{venue.location}</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-.03em] md:text-4xl">{venue.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{venue.description}</p>
                </div>
                <a href="/build" className="shrink-0 text-[.65rem] font-bold uppercase tracking-[.15em] underline underline-offset-8">Discuss my venue ↗</a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[#596373]">Illustrative venue concepts. Ask MB about production options for your chosen space.</p>
      </div>
    </section>
  );
}
