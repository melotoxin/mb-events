import { PublicFooter, PublicHeader } from "@/components/public-shell";
import { AvailabilityForm } from "@/components/availability-form";
import { AvailabilityWebMCP } from "@/components/availability-webmcp";
export const metadata = { title: "Check My Date | MB Events", description: "Ask MB Events about your event date." };
export default function AvailabilityPage() { return <><PublicHeader /><main className="form-page availability-page"><div className="shell"><p className="eyebrow">CHECK MY DATE</p><h1>A great night begins<br /><em>with a date.</em></h1><p className="page-intro">Share the basics and an MB Event Specialist will follow up after checking availability.</p><AvailabilityForm /><AvailabilityWebMCP /></div></main><PublicFooter /></>; }
