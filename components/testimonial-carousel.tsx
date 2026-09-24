"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    event: "Wedding",
    quote: "It was the perfect blend of songs, and we were dancing all night!",
    attribution: "Abigail G.",
    location: "",
    avatarUrl: "/media/avatar-abigail.svg",
  },
  {
    event: "Quinceañera",
    quote: "MB really came through for my daughter’s Quinceañera.",
    attribution: "Brian & Rachel M.",
    location: "Muttontown, NY",
    avatarUrl: "/media/avatar-brian-rachel.svg",
  },
  {
    event: "Bar Mitzvah",
    quote: "you’ll be seeing us soon for our daughter’s Bat Mitzvah within the next year!",
    attribution: "Jennifer L.",
    location: "Syosset, NY",
    avatarUrl: "/media/avatar-jennifer.svg",
  },
] as const;

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(testimonials.length - 1, index));
    const card = track.children.item(next) as HTMLElement | null;
    if (!card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
    setActiveIndex(next);
  }

  return (
    <section className="testimonial-section" aria-labelledby="testimonial-heading">
      <div className="shell">
        <div className="testimonial-heading">
          <div><p className="eyebrow">IN THEIR OWN WORDS</p><h2 id="testimonial-heading">The moments they <em>remember.</em></h2></div>
          <div className="testimonial-controls" aria-label="Testimonial controls">
            <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous testimonial" aria-controls="testimonial-track">←</button>
            <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === testimonials.length - 1} aria-label="Next testimonial" aria-controls="testimonial-track">→</button>
          </div>
        </div>
        <ul className="testimonial-track" id="testimonial-track" ref={trackRef} onScroll={(event) => {
          const track = event.currentTarget;
          const firstCard = track.children.item(0) as HTMLElement | null;
          if (!firstCard) return;
          const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
          setActiveIndex(Math.min(testimonials.length - 1, Math.round(track.scrollLeft / (firstCard.offsetWidth + gap))));
        }}>
          {testimonials.map((item, index) => (
            <li className="testimonial-card" key={item.attribution}>
              <span className="testimonial-index">0{index + 1} / {item.event}</span>
              <blockquote><p>“{item.quote}”</p></blockquote>
              <p className="testimonial-attribution flex items-center gap-3"><Image src={item.avatarUrl} width={42} height={42} alt="" className="rounded-full" /><span>{item.attribution}{item.location ? <><span aria-hidden="true"> · </span>{item.location}</> : null}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
