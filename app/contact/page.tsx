import { PublicFooter, PublicHeader } from "@/components/public-shell";
import { AvailabilityForm } from "@/components/availability-form";
export const metadata = { title: "Contact MB Events", description: "Contact Michael Bryan Events about your celebration." };
export default function ContactPage() { return <><PublicHeader /><main className="form-page"><div className="shell"><p className="eyebrow">CONTACT MB EVENTS</p><h1>Let’s talk about<br /><em>your event.</em></h1><p className="page-intro">Prefer to speak directly? Call <a href="tel:+18556276863">855-MBSOUND</a> or email <a href="mailto:mike@mbeventsny.com">mike@mbeventsny.com</a>. You can also send your event details below.</p><AvailabilityForm source="contact" /></div></main><PublicFooter /></>; }
