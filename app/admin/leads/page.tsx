import { env } from "cloudflare:workers";
import { getAdminEmail, stageLabel } from "@/lib/admin";
export const dynamic = "force-dynamic";
export const metadata = { title: "Leads | MB Admin", robots: { index: false, follow: false } };
type Row = { id: string; created_at: string; stage: string; source: string; name: string; event_type: string; event_date: string | null; guest_count: string | null };
export default async function AdminLeads() {
  const email = await getAdminEmail();
  if (!email) return <main className="admin-denied"><h1>Access restricted</h1><p>This lead dashboard is available only to the configured MB administrator.</p><a href="/">Return to site</a></main>;
  const db = env.DB;
  if (!db) return <main className="admin-denied"><h1>Leads unavailable</h1><p>The lead database is not configured.</p></main>;
  let rows: Row[] = [];
  let unavailable = false;
  try { rows = (await db.prepare("SELECT id, created_at, stage, source, name, event_type, event_date, guest_count FROM leads ORDER BY created_at DESC LIMIT 100").all<Row>()).results; } catch (error) { console.error("Lead list failed", error); unavailable = true; }
  return <main className="admin-page"><div className="admin-shell"><header><div><p>MB EVENTS / ADMIN</p><h1>Leads</h1></div><a href="/">View website ↗</a></header>{unavailable ? <p className="admin-alert">Leads are temporarily unavailable. Please try again.</p> : rows.length ? <div className="admin-table-wrap"><table><thead><tr><th>Received</th><th>Name</th><th>Event</th><th>Date</th><th>Guests</th><th>Source</th><th>Stage</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td>{new Date(row.created_at).toLocaleDateString("en-US")}</td><td><a href={`/admin/leads/${row.id}`}>{row.name}</a></td><td>{row.event_type}</td><td>{row.event_date || "Undecided"}</td><td>{row.guest_count || "—"}</td><td>{row.source}</td><td>{stageLabel(row.stage)}</td></tr>)}</tbody></table></div> : <div className="admin-empty"><h2>No leads yet</h2><p>New Build My Event and Check My Date inquiries will appear here.</p></div>}</div></main>;
}
