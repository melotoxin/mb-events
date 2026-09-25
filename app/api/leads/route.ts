import { env } from "cloudflare:workers";
import { hasAllowedWriteOrigin } from "@/lib/request-origin";
import { leadSchema } from "@/lib/lead";

export async function POST(request: Request) {
  if (!hasAllowedWriteOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return Response.json({ error: "Please check your details.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const input = parsed.data;
  if (input.eventDate && input.eventDate < new Date().toISOString().slice(0, 10)) return Response.json({ error: "Please choose a future date." }, { status: 400 });
  if (!env.DB) return Response.json({ error: "Inquiries are temporarily unavailable. Please call 855-MBSOUND." }, { status: 503 });
  try {
    const existing = await env.DB.prepare("SELECT id FROM leads WHERE lower(email) = ? AND source = ? AND created_at > ? LIMIT 1")
      .bind(input.email.toLowerCase(), input.source, new Date(Date.now() - 120000).toISOString()).first<{ id: string }>();
    if (existing) return Response.json({ ok: true, leadId: existing.id });
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO leads (id, created_at, updated_at, stage, source, name, email, phone, event_type, event_date, guest_count, location, venue_status, vibe, priorities, contact_method, campaign, notes) VALUES (?, ?, ?, 'new_lead', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)")
        .bind(id, now, now, input.source, input.name, input.email.toLowerCase(), input.phone, input.eventType, input.eventDate || null, input.guestCount || null, input.location || null, input.venueStatus || null, input.vibe || null, JSON.stringify(input.priorities), input.contactMethod, input.campaign || null),
      env.DB.prepare("INSERT INTO analytics_events (id, created_at, event_name, source, lead_id, metadata) VALUES (?, ?, 'lead_created', ?, ?, '{}')")
        .bind(crypto.randomUUID(), now, input.source, id),
    ]);
    if (input.source === "builder") {
      const token = /(?:^|; )mb_draft=([0-9a-f-]{36})(?:;|$)/.exec(request.headers.get("cookie") || "")?.[1];
      if (token) {
        try {
          const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
          const key = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
          await env.DB.prepare("UPDATE event_drafts SET lead_id = ?, updated_at = ? WHERE token_hash = ?").bind(id, now, key).run();
        } catch (error) { console.error("Draft association failed", error); }
      }
    }
    return Response.json({ ok: true, leadId: id }, { status: 201 });
  } catch (error) {
    console.error("Lead persistence failed", error);
    return Response.json({ error: "We couldn't save your inquiry. Please try again or call 855-MBSOUND." }, { status: 503 });
  }
}
