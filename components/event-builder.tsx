"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { guestRanges, priorities, vibes } from "@/lib/lead";
import { AdvancedButton } from "@/components/advanced-button";
import { EventTypeCards } from "@/components/event-type-cards";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

type Draft = { eventType?: string; eventDate?: string; dateUnknown?: boolean; guestCount?: string; venueStatus?: string; vibe?: string; priorities?: string[]; step?: number };
const titles = ["What are you celebrating?", "When is the big day?", "How many guests?", "Have you found a venue?", "What's your vibe?", "What matters most?", "Almost there."];
const venueChoices = [{ value: "selected", label: "Venue selected" }, { value: "need_venue", label: "Help me find one" }, { value: "deciding", label: "Still deciding" }];

export function EventBuilder() {
  const [draft, setDraft] = useState<Draft>({ priorities: [], step: 0 });
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("Loading answers…");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", location: "", contactMethod: "either" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const step = draft.step || 0;
  const reducedMotion = useReducedMotion();
  const actionDisabled = busy || !loaded || (step === 0 && !draft.eventType);
  useEffect(() => { fetch("/api/drafts").then(r => r.json() as Promise<{ state?: Draft | null }>).then(data => { if (data.state) setDraft(data.state); setLoaded(true); }).catch(() => { setLoaded(true); setSaveState("Saving unavailable"); }); }, []);
  useEffect(() => { if (!loaded || complete) return; const timer = setTimeout(() => { setSaveState("Saving…"); fetch("/api/drafts", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(draft) }).then(r => { setSaveState(r.ok ? "Answers saved" : "Saving unavailable"); }).catch(() => setSaveState("Saving unavailable")); }, 600); return () => clearTimeout(timer); }, [draft, loaded, complete]);
  function update(patch: Partial<Draft>) { setDraft(old => ({ ...old, ...patch })); setError(""); }
  function next() {
    const valid = [!!draft.eventType, !!draft.eventDate || !!draft.dateUnknown, !!draft.guestCount, !!draft.venueStatus, !!draft.vibe, !!draft.priorities?.length][step];
    if (!valid) { setError("Please choose an answer to continue."); return; }
    update({ step: Math.min(6, step + 1) });
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ source: "builder", ...contact, eventType: draft.eventType, eventDate: draft.dateUnknown ? null : draft.eventDate, guestCount: draft.guestCount, venueStatus: draft.venueStatus, vibe: draft.vibe, priorities: draft.priorities || [], website: "" }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Please check your details.");
      setComplete(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); } finally { setBusy(false); }
  }
  if (complete) return <div className="form-card success-card" role="status"><p className="eyebrow">THANK YOU</p><h2>Your event starts here.</h2><p>We have your details. An MB Event Specialist will review them and get in touch. Your date has not been confirmed yet.</p><AdvancedButton href="/" arrow="right" className="mt-5">Back to MB Events</AdvancedButton></div>;
  return <div className="form-card builder-card"><div className="step-top"><span>STEP {step + 1} OF 7</span><span aria-live="polite">{saveState}</span></div><div className="step-progress" aria-label={`${step + 1} of 7 steps complete`}><span style={{ width: `${((step + 1) / 7) * 100}%`, background: "linear-gradient(90deg, #ac7d3b, #e3c891)" }} /></div><h2>{titles[step]}</h2>
    {step === 0 && <EventTypeCards value={draft.eventType} onChange={value => update({ eventType: value })} />}
    {step === 1 && <div className="field-stack"><label htmlFor="event-date">Event date</label><Input id="event-date" className="mb-input" type="date" min={new Date().toISOString().slice(0, 10)} value={draft.eventDate || ""} disabled={draft.dateUnknown} onChange={e => update({ eventDate: e.target.value, dateUnknown: false })} /><label className="check-row"><Checkbox checked={!!draft.dateUnknown} onCheckedChange={checked => update({ dateUnknown: checked === true, eventDate: checked ? "" : draft.eventDate })} />I don’t know yet</label></div>}
    {step === 2 && <ChoiceGroup value={draft.guestCount} options={guestRanges.map(x => ({ value: x, label: x }))} onChange={value => update({ guestCount: value })} />}
    {step === 3 && <ChoiceGroup value={draft.venueStatus} options={venueChoices} onChange={value => update({ venueStatus: value })} />}
    {step === 4 && <ChoiceGroup value={draft.vibe} options={vibes.map(x => ({ value: x, label: x }))} onChange={value => update({ vibe: value })} />}
    {step === 5 && <div className="choice-grid">{priorities.map(item => <label className="choice-card multi-choice" key={item}><Checkbox checked={draft.priorities?.includes(item)} onCheckedChange={checked => update({ priorities: checked ? [...(draft.priorities || []), item] : (draft.priorities || []).filter(x => x !== item) })} />{item}</label>)}</div>}
    {step === 6 && <form id="builder-contact" onSubmit={submit} className="contact-fields"><p>Where should we reach you? We’ll use these details to discuss your event.</p><div className="field-grid"><label>Full name<Input className="mb-input" required minLength={2} maxLength={120} autoComplete="name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} /></label><label>Email<Input className="mb-input" required type="email" autoComplete="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} /></label><label>Phone<Input className="mb-input" required type="tel" autoComplete="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} /></label><label>Approximate location<Input className="mb-input" maxLength={160} placeholder="Town or ZIP" value={contact.location} onChange={e => setContact({ ...contact, location: e.target.value })} /></label></div><fieldset className="contact-method"><legend>Preferred contact method</legend><label><input type="radio" name="contactMethod" checked={contact.contactMethod === "either"} onChange={() => setContact({ ...contact, contactMethod: "either" })} /> Either</label><label><input type="radio" name="contactMethod" checked={contact.contactMethod === "phone"} onChange={() => setContact({ ...contact, contactMethod: "phone" })} /> Phone</label><label><input type="radio" name="contactMethod" checked={contact.contactMethod === "email"} onChange={() => setContact({ ...contact, contactMethod: "email" })} /> Email</label></fieldset></form>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="step-actions">{step > 0 && <AdvancedButton variant="secondary" size="compact" type="button" arrow="left" onClick={() => update({ step: step - 1 })}>Back</AdvancedButton>}<motion.button type="button" disabled={actionDisabled} onClick={step === 6 ? () => document.querySelector<HTMLFormElement>("#builder-contact")?.requestSubmit() : next} whileHover={actionDisabled || reducedMotion ? undefined : { scale: 1.02 }} whileTap={actionDisabled || reducedMotion ? undefined : { scale: 0.98 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group inline-flex min-h-14 items-center justify-center gap-6 rounded-full border border-[#b58e4e] bg-gradient-to-r from-[#d2ac6d] via-[#f1dbad] to-[#c79a58] px-7 py-3 text-xs font-bold uppercase tracking-[.15em] text-[#25303d] shadow-[0_12px_28px_rgba(153,108,43,0.2)] transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_16px_32px_rgba(153,108,43,0.27)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ad874d] disabled:cursor-not-allowed disabled:border-[#ded9cf] disabled:bg-none disabled:bg-[#eeebe6] disabled:text-[#9a9995] disabled:shadow-none">{busy ? "Sending…" : step === 6 ? "Send my event" : "Continue"}<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none" /></motion.button></div>
  </div>;
}

function ChoiceGroup({ value, options, onChange }: { value?: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <RadioGroup className="choice-grid" value={value || ""} onValueChange={onChange}>{options.map(option => <label className={`choice-card ${value === option.value ? "chosen" : ""}`} key={option.value}><RadioGroupItem value={option.value} />{option.label}</label>)}</RadioGroup>;
}
