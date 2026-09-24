"use client";

import { motion, useReducedMotion } from "motion/react";

const timeline = [
  { time: "04:30", label: "Guest arrival", detail: "Welcome music" },
  { time: "06:00", label: "Grand entrance", detail: "Your entrance track" },
  { time: "08:15", label: "Dance floor opens", detail: "The songs you love" },
] as const;

export function ClientPortalTeaser() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-[#101b2a] py-20 text-white md:py-28" aria-labelledby="portal-teaser-heading">
      <div className="shell flex flex-col items-center gap-14 md:flex-row md:gap-20">
        <div className="flex-1">
          <p className="eyebrow text-[#d6b586]">STRESS-FREE COORDINATION</p>
          <h2 id="portal-teaser-heading" className="mt-5 max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.02] tracking-[-.05em]">
            One event. <em className="font-normal text-[#d8b787]">One clear plan.</em>
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">
            Stress-Free Coordination: Every client receives access to our proprietary digital timeline and music curation portal.
          </p>
          <div className="mt-10 grid gap-5 border-t border-white/20 pt-8 text-sm text-white/75 sm:grid-cols-3">
            <div><span className="mb-3 block text-xs font-bold tracking-[.16em] text-[#d8b787]">01 / PLAN</span>Keep the flow of the day in view.</div>
            <div><span className="mb-3 block text-xs font-bold tracking-[.16em] text-[#d8b787]">02 / CURATE</span>Share the music that feels like you.</div>
            <div><span className="mb-3 block text-xs font-bold tracking-[.16em] text-[#d8b787]">03 / COORDINATE</span>Bring the key details together.</div>
          </div>
          <a className="mt-10 inline-flex min-h-12 items-center bg-[#c72b2b] px-6 text-[.65rem] font-bold uppercase tracking-[.15em] transition-colors hover:bg-[#a52121]" href="/build">Start my event ↗</a>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="relative w-full max-w-[23rem] shrink-0 md:w-[38%]"
        >
          <div className="absolute -inset-6 rounded-full bg-[#c5a475]/10 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-[2.8rem] border-[9px] border-[#273449] bg-[#f7f3ec] p-3 shadow-[0_35px_75px_rgba(0,0,0,.35)]" aria-label="Preview of the MB event timeline interface">
            <div className="mx-auto mb-4 h-5 w-28 rounded-full bg-[#273449]" aria-hidden="true" />
            <div className="rounded-[1.8rem] bg-white px-5 pb-8 pt-7 text-[#101b2a]">
              <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#a02e31]">YOUR EVENT SPACE</p>
              <h3 className="mt-3 font-serif text-3xl tracking-[-.04em]">The celebration</h3>
              <p className="mt-1 text-xs text-[#6d7680]">Timeline preview</p>
              <div className="mt-7 rounded-xl bg-[#f4f0e8] p-4">
                <p className="text-[.62rem] font-bold uppercase tracking-[.14em] text-[#9d3033]">EVENT DAY</p>
                <div className="mt-4 space-y-5">
                  {timeline.map(({ time, label, detail }) => (
                    <div key={time} className="flex gap-3 border-l-2 border-[#c5a475] pl-3">
                      <span className="w-11 shrink-0 text-[.65rem] font-bold text-[#9d3033]">{time}</span>
                      <div><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-[#69727d]">{detail}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e2d9cd] px-4 py-3 text-xs"><span>Music favorites</span><span className="text-[#9d3033]">12 songs ♪</span></div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-white/55">Illustrative interface preview</p>
        </motion.div>
      </div>
    </section>
  );
}
