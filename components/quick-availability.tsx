"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eventTypes, guestRanges } from "@/lib/lead";
import { AdvancedButton } from "@/components/advanced-button";
export function QuickAvailability() {
  const [eventType, setEventType] = useState(""); const [date, setDate] = useState(""); const [guests, setGuests] = useState(""); const [location, setLocation] = useState("");
  return <form className="quick-form" action="/availability" method="get"><input type="hidden" name="eventType" value={eventType} /><input type="hidden" name="guestCount" value={guests} /><div><label id="quick-type">Event type</label><Select value={eventType} onValueChange={setEventType}><SelectTrigger aria-labelledby="quick-type" className="mb-select"><SelectValue placeholder="Choose an occasion" /></SelectTrigger><SelectContent>{eventTypes.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}</SelectContent></Select></div><label>Date<Input className="mb-input" type="date" name="eventDate" min={new Date().toISOString().slice(0,10)} value={date} onChange={e => setDate(e.target.value)} /></label><div><label id="quick-guests">Guests</label><Select value={guests} onValueChange={setGuests}><SelectTrigger aria-labelledby="quick-guests" className="mb-select"><SelectValue placeholder="Approx. count" /></SelectTrigger><SelectContent>{guestRanges.map(range => <SelectItem value={range} key={range}>{range}</SelectItem>)}</SelectContent></Select></div><label>Location<Input className="mb-input" name="location" placeholder="Town or ZIP" maxLength={160} value={location} onChange={e => setLocation(e.target.value)} /></label><AdvancedButton type="submit" arrow="up-right">Check my date</AdvancedButton></form>;
}
