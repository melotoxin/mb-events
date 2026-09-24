import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { getAdminEmail, stageLabel } from "@/lib/admin";
import { LeadEditor } from "@/components/lead-editor";
export const dynamic = "force-dynamic";
export const metadata = { title: "Lead Profile | MB Admin", robots: { index: false, follow: false } };
type Lead = { id: string; created_at: string; stage: string; source: string; name: string; email: string; phone: string; event_type: string; event_date: string | null; guest_count: string | null; location: string | null; venue_status: string | null; vibe: string | null; priorities: string; contact_method: string; notes: string | null };
export default async function LeadProfile({ params }: { params: Promise<{ id: string }> }) {
  const email = await getAdminEmail();
  if (!email) return <main className="admin-denied"><h1>Access restricted</h1><p>This lead profile is available only to the configured MB administrator.</p></main>;
  const db = env.DB;
  if (!db) return <main className="admin-denied"><h1>Lead unavailable</h1><p>The lead database is not configured.</p></main>;
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  let lead: Lead | null = null;
  try { lead = await db.prepare("SELECT id, created_at, stage, source, name, email, phone, event_type, event_date, guest_count, location, venue_status, vibe, priorities, contact_method, notes FROM leads WHERE id = ?").bind(id).first<Lead>(); } catch (error) { console.error("Lead profile failed", error); return <main className="admin-denied"><h1>Lead unavailable</h1><p>Please try again.</p></main>; }
  if (!lead) notFound();
  return <main className="admin-page"><div className="admin-shell"><a href="/admin/leads">← All leads</a><header><div><p>LEAD PROFILE / {lead.source.toUpperCase()}</p><h1>{lead.name}</h1></div><span>{stageLabel(lead.stage)}</span></header><div className="lead-profile-grid"><section><h2>Event details</h2><dl><dt>Event</dt><dd>{lead.event_type}</dd><dt>Date</dt><dd>{lead.event_date || "Not decided"}</dd><dt>Guests</dt><dd>{lead.guest_count || "Not supplied"}</dd><dt>Location</dt><dd>{lead.location || "Not supplied"}</dd><dt>Venue</dt><dd>{lead.venue_status || "Not supplied"}</dd><dt>Vibe</dt><dd>{lead.vibe || "Not supplied"}</dd><dt>Priorities</dt><dd>{JSON.parse(lead.priorities).join(", ") || "Not supplied"}</dd></dl></section><section><h2>Contact</h2><p><a href={`mailto:${lead.email}`}>{lead.email}</a><br />{lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "Phone not supplied"}</p><p>Prefers: {lead.contact_method}<br />Received: {new Date(lead.created_at).toLocaleString("en-US")}</p><LeadEditor id={lead.id} initialStage={lead.stage} initialNotes={lead.notes || ""} /></section></div></div></main>;
}
