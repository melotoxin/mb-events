"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { eventTypes } from "@/lib/lead";

const styles = ["The Nightclub", "Modern Elegance", "Traditional"] as const;
type EventType = (typeof eventTypes)[number];
type EventStyle = (typeof styles)[number];
type Step = 0 | 1 | 2 | 3;

type QuoteAnswers = {
  eventType: EventType | "";
  eventDate: string;
  style: EventStyle | "";
  name: string;
  email: string;
  website: string;
};

const stepTitles = ["What are you celebrating?", "When is the event?", "Choose the feeling.", "Where can we reach you?"] as const;

export function MultiStepLeadCapture() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<QuoteAnswers>({ eventType: "", eventDate: "", style: "", name: "", email: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const reducedMotion = useReducedMotion();

  function next() {
    if ((step === 0 && !answers.eventType) || (step === 1 && !answers.eventDate) || (step === 2 && !answers.style)) {
      setError("Please make a selection to continue.");
      return;
    }
    setError("");
    setStep((step + 1) as Step);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answers.eventType || !answers.eventDate || !answers.style) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "blueprint",
          eventType: answers.eventType,
          eventDate: answers.eventDate,
          vibe: answers.style,
          name: answers.name,
          email: answers.email,
          phone: "",
          contactMethod: "email",
          priorities: [],
          website: answers.website,
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Please check your details.");
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-[#ded8ce] bg-white p-7 shadow-[0_20px_60px_rgba(24,31,41,.06)] md:p-12" role="status">
        <p className="eyebrow text-[#a42b2e]">REQUEST RECEIVED</p>
        <h2 className="mt-5 font-serif text-4xl tracking-[-.04em] text-[#101b2a] md:text-5xl">Your event starts here.</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-[#596373]">MB has your event details. An Event Specialist can follow up by email with a tailored proposal when availability and scope are confirmed.</p>
        <div className="mt-8 border-l-[3px] border-[#c5a475] bg-[#f4f0e8] p-6">
          <p className="text-[.65rem] font-bold uppercase tracking-[.17em] text-[#a42b2e]">Illustrative 2026 planning range · not MB pricing</p>
          <p className="mt-3 font-serif text-3xl text-[#101b2a]">$2,500–$4,500</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#596373]">A rough New York area budget for DJ and MC entertainment. Lighting, effects, staffing, venue needs and travel can change the total. This range is a planning example, not a quote, package, date hold or offer from MB Events.</p>
          <p className="mt-4 text-xs text-[#596373]">Context: <a className="underline" href="https://www.theknot.com/content/average-wedding-cost-nyc" target="_blank" rel="noopener noreferrer">NYC DJ cost data</a> and <a className="underline" href="https://www.bls.gov/regions/northeast/news-release/2026/consumerpriceindex_newyork_20260911.htm" target="_blank" rel="noopener noreferrer">August 2026 New York area CPI</a>.</p>
        </div>
        <div className="mt-7 grid gap-4 text-sm text-[#344152] sm:grid-cols-3"><p><b>01 / Entertainment</b><br />Music, hosting and event flow.</p><p><b>02 / Atmosphere</b><br />Lighting and production options.</p><p><b>03 / Personalization</b><br />Moments built around your priorities.</p></div>
        <a href="/experiences" className="mt-8 inline-flex min-h-12 items-center bg-[#c72b2b] px-6 text-[.65rem] font-bold uppercase tracking-[.15em] text-white">Explore MB experiences ↗</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#ded8ce] bg-white p-6 shadow-[0_20px_60px_rgba(24,31,41,.06)] md:p-12" aria-labelledby="quoter-heading">
      <div className="flex items-center justify-between gap-4 text-[.65rem] font-bold uppercase tracking-[.17em] text-[#6b7480]">
        <span>STEP {step + 1} OF 4</span><span>EVENT INQUIRY</span>
      </div>
      <div className="mt-4 h-[3px] bg-[#eee8df]" aria-label={`${step + 1} of 4 steps`}><span className="block h-full bg-[#c72b2b] transition-[width]" style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={reducedMotion ? false : { opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -15 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          <h2 id="quoter-heading" className="mt-9 font-serif text-[clamp(2.2rem,4vw,3.7rem)] leading-tight tracking-[-.04em] text-[#101b2a]">{stepTitles[step]}</h2>

          {step === 0 && <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{eventTypes.map((type) => <button key={type} type="button" aria-pressed={answers.eventType === type} onClick={() => setAnswers((old) => ({ ...old, eventType: type }))} className={`min-h-16 border px-5 text-left text-sm font-semibold transition-colors ${answers.eventType === type ? "border-[#c72b2b] bg-[#fff5f0] text-[#101b2a]" : "border-[#d9d4cd] text-[#344152] hover:border-[#c72b2b]"}`}>{type}</button>)}</div>}

          {step === 1 && <label className="mt-8 grid max-w-sm gap-3 text-sm font-semibold text-[#344152]">Event date<input type="date" required min={new Date().toISOString().slice(0, 10)} value={answers.eventDate} onChange={(event) => setAnswers((old) => ({ ...old, eventDate: event.target.value }))} className="h-14 border border-[#d9d4cd] bg-[#fbfaf8] px-4 text-base" /></label>}

          {step === 2 && <div className="mt-8 grid gap-3 sm:grid-cols-3">{styles.map((style) => <button key={style} type="button" aria-pressed={answers.style === style} onClick={() => setAnswers((old) => ({ ...old, style }))} className={`min-h-28 border px-5 text-left font-serif text-xl transition-colors ${answers.style === style ? "border-[#c72b2b] bg-[#fff5f0] text-[#101b2a]" : "border-[#d9d4cd] text-[#344152] hover:border-[#c72b2b]"}`}>{style}</button>)}</div>}

          {step === 3 && <div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-[#344152]">Full name<input required minLength={2} maxLength={120} autoComplete="name" value={answers.name} onChange={(event) => setAnswers((old) => ({ ...old, name: event.target.value }))} className="h-14 border border-[#d9d4cd] bg-[#fbfaf8] px-4 text-base" /></label><label className="grid gap-2 text-sm font-semibold text-[#344152]">Email<input required type="email" autoComplete="email" value={answers.email} onChange={(event) => setAnswers((old) => ({ ...old, email: event.target.value }))} className="h-14 border border-[#d9d4cd] bg-[#fbfaf8] px-4 text-base" /></label><label className="absolute -left-[9999px]" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={answers.website} onChange={(event) => setAnswers((old) => ({ ...old, website: event.target.value }))} /></label></div>}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-6 border-l-[3px] border-[#c72b2b] bg-[#fff0ee] px-4 py-3 text-sm text-[#882727]" role="alert">{error}</p>}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
        {step > 0 ? <button type="button" onClick={() => { setError(""); setStep((step - 1) as Step); }} className="min-h-12 px-2 text-sm font-semibold text-[#344152]">← Back</button> : <span />}
        {step === 3 ? <button type="submit" disabled={busy} className="min-h-14 bg-[#c72b2b] px-6 text-[.65rem] font-bold uppercase tracking-[.15em] text-white transition-colors hover:bg-[#a52121] disabled:opacity-60">{busy ? "Sending…" : "Unlock planning range ↗"}</button> : <button type="button" onClick={next} className="min-h-14 bg-[#c72b2b] px-6 text-[.65rem] font-bold uppercase tracking-[.15em] text-white transition-colors hover:bg-[#a52121]">Continue →</button>}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-[#68727e]">Your details are used to follow up about this event. No date or price is confirmed until MB speaks with you.</p>
    </form>
  );
}
