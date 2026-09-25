import { env } from "cloudflare:workers";
import { z } from "zod";
import { eventTypes, guestRanges, priorities, vibes } from "@/lib/lead";
import { hasAllowedWriteOrigin } from "@/lib/request-origin";

const stateSchema = z.object({
  eventType: z.enum(eventTypes).optional(), eventDate: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")]).optional(), dateUnknown: z.boolean().optional(), guestCount: z.enum(guestRanges).optional(), venueStatus: z.enum(["selected", "need_venue", "deciding"]).optional(), vibe: z.enum(vibes).optional(), priorities: z.array(z.enum(priorities)).max(10).optional(), step: z.number().int().min(0).max(7).optional(),
}).strict();

async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}
function cookieToken(request: Request) { return /(?:^|; )mb_draft=([0-9a-f-]{36})(?:;|$)/.exec(request.headers.get("cookie") || "")?.[1]; }

export async function GET(request: Request) {
  const token = cookieToken(request);
  if (!token || !env.DB) return Response.json({ state: null });
  try {
    const row = await env.DB.prepare("SELECT state FROM event_drafts WHERE token_hash = ? AND expires_at > ? AND lead_id IS NULL")
      .bind(await hash(token), new Date().toISOString()).first<{ state: string }>();
    return Response.json({ state: row ? JSON.parse(row.state) : null });
  } catch (error) { console.error("Draft load failed", error); return Response.json({ error: "Saved answers are temporarily unavailable." }, { status: 503 }); }
}

export async function PUT(request: Request) {
  if (!hasAllowedWriteOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!env.DB) return Response.json({ error: "Saving is temporarily unavailable." }, { status: 503 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = stateSchema.safeParse(raw);
  if (!parsed.success) return Response.json({ error: "Invalid answers." }, { status: 400 });
  const token = cookieToken(request) || crypto.randomUUID();
  const now = new Date().toISOString();
  const expiry = new Date(Date.now() + 90 * 86400000).toISOString();
  try {
    await env.DB.prepare("INSERT INTO event_drafts (token_hash, state, created_at, updated_at, expires_at, lead_id) VALUES (?, ?, ?, ?, ?, NULL) ON CONFLICT(token_hash) DO UPDATE SET state = excluded.state, updated_at = excluded.updated_at, expires_at = excluded.expires_at")
      .bind(await hash(token), JSON.stringify(parsed.data), now, now, expiry).run();
    const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
    return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json", "set-cookie": `mb_draft=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=7776000${secure}` } });
  } catch (error) { console.error("Draft save failed", error); return Response.json({ error: "We couldn't save your answers." }, { status: 503 }); }
}
