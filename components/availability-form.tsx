"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eventTypes, guestRanges } from "@/lib/lead";

export function AvailabilityForm() {
  const [form, setForm] = useState({ eventDate: "", eventType: "", location: "", guestCount: "", name: "", phone: "", email: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => { const p = new URLSearchParams(window.location.search); const timer = window.setTimeout(() => setForm(old => ({ ...old, eventDate: p.get("eventDate") || "", eventType: p.get("eventType") || "", guestCount: p.get("guestCount") || "", location: p.get("location") || "" })), 0); const done = () => setDone(true); window.addEventListener("mb:availability-submitted", done); return () => { window.clearTimeout(timer); window.removeEventListener("mb:availability-submitted", done); }; }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!form.eventType || !form.guestCount) { setError("Please choose an event type and guest count."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, source: "availability", priorities: [], contactMethod: "either", website: "" }) });
      const result = await r.json() as { error?: string };
      if (!r.ok) throw new Error(result.error || "Please check your details.");
      setDone(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); } finally { setBusy(false); }
  }
  if (done) return <div className="form-card success-card" role="status"><p className="eyebrow">REQUEST RECEIVED</p><h2>We’re checking your date.</h2><p>An MB Event Specialist will contact you shortly. Availability is confirmed only after speaking with our team.</p><Link className="button button-red" href="/">Explore MB Events →</Link></div>;
  return <form className="form-card availability-form" onSubmit={submit}><div className="field-grid">
    <label>Event date<Input className="mb-input" required type="date" min={new Date().toISOString().slice(0, 10)} value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} /></label>
    <div className="field-label"><label id="event-type-label">Event type</label><Select value={form.eventType} onValueChange={eventType => setForm({ ...form, eventType })}><SelectTrigger className="mb-select" aria-labelledby="event-type-label"><SelectValue placeholder="Select an event" /></SelectTrigger><SelectContent>{eventTypes.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}</SelectContent></Select></div>
    <label>Approximate location<Input className="mb-input" required maxLength={160} placeholder="Town, city, or ZIP" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></label>
    <div className="field-label"><label id="guest-count-label">Guest count</label><Select value={form.guestCount} onValueChange={guestCount => setForm({ ...form, guestCount })}><SelectTrigger className="mb-select" aria-labelledby="guest-count-label"><SelectValue placeholder="Approximate number" /></SelectTrigger><SelectContent>{guestRanges.map(range => <SelectItem value={range} key={range}>{range}</SelectItem>)}</SelectContent></Select></div>
    <label>Full name<Input className="mb-input" required minLength={2} maxLength={120} autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
    <label>Phone<Input className="mb-input" required type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
    <label>Email<Input className="mb-input" required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
  </div><p className="form-note">We’ll use your details only to follow up about this event.</p>{error && <p className="form-error" role="alert">{error}</p>}<button disabled={busy} className="button button-red" type="submit">{busy ? "Sending…" : "Check availability"}<span aria-hidden="true">↗</span></button></form>;
}
