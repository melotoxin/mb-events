"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eventTypes, guestRanges } from "@/lib/lead";
export function QuickAvailability() {
  const router = useRouter();
  const [eventType, setEventType] = useState(""); const [date, setDate] = useState(""); const [guests, setGuests] = useState(""); const [location, setLocation] = useState("");
  return <form className="quick-form" onSubmit={e => { e.preventDefault(); const p = new URLSearchParams({ eventType, eventDate: date, guestCount: guests, location }); router.push(`/availability?${p}`); }}><div><label id="quick-type">Event type</label><Select value={eventType} onValueChange={setEventType}><SelectTrigger aria-labelledby="quick-type" className="mb-select"><SelectValue placeholder="Choose an occasion" /></SelectTrigger><SelectContent>{eventTypes.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}</SelectContent></Select></div><label>Date<Input className="mb-input" type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e => setDate(e.target.value)} /></label><div><label id="quick-guests">Guests</label><Select value={guests} onValueChange={setGuests}><SelectTrigger aria-labelledby="quick-guests" className="mb-select"><SelectValue placeholder="Approx. count" /></SelectTrigger><SelectContent>{guestRanges.map(range => <SelectItem value={range} key={range}>{range}</SelectItem>)}</SelectContent></Select></div><label>Location<Input className="mb-input" placeholder="Town or ZIP" maxLength={160} value={location} onChange={e => setLocation(e.target.value)} /></label><button className="button button-red" type="submit">Check my date ↗</button></form>;
}
