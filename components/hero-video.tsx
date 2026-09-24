"use client";
import { useEffect, useRef, useState } from "react";
import { AdvancedButton } from "@/components/advanced-button";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduced.matches) ref.current?.play().then(() => setPlaying(true)).catch(() => {});
    const onChange = () => { if (reduced.matches) { ref.current?.pause(); setPlaying(false); } };
    reduced.addEventListener("change", onChange);
    return () => reduced.removeEventListener("change", onChange);
  }, []);
  function toggle() { if (!ref.current) return; if (playing) { ref.current.pause(); setPlaying(false); } else { ref.current.play().then(() => setPlaying(true)).catch(() => {}); } }
  return <><video ref={ref} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/media/concept-cinematic-cold-sparks.webp" aria-label="MB Events sparkler entrance footage"><source src="/media/mb-hero-sparkler.mp4" type="video/mp4" /></video><AdvancedButton className="video-toggle" variant="secondary" tone="dark" size="compact" type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Ⅱ" : "▶"}<span>{playing ? "PAUSE FILM" : "PLAY FILM"}</span></AdvancedButton></>;
}
