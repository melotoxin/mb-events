import { env } from "cloudflare:workers";
import { z } from "zod";
import { getAdminEmail, leadStages } from "@/lib/admin";
const schema = z.object({ stage: z.enum(leadStages), notes: z.string().max(5000) }).strict();
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const email = await getAdminEmail();
  if (!email) return Response.json({ error: "Forbidden" }, { status: 403 });
  const db = env.DB;
  if (!db) return Response.json({ error: "Database unavailable" }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return Response.json({ error: "Invalid lead" }, { status: 400 });
  let raw: unknown; try { raw = await request.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  const parsed = schema.safeParse(raw); if (!parsed.success) return Response.json({ error: "Invalid details" }, { status: 400 });
  try {
    const previous = await db.prepare("SELECT stage, notes FROM leads WHERE id = ?").bind(id).first<{ stage: string; notes: string | null }>();
    if (!previous) return Response.json({ error: "Lead not found" }, { status: 404 });
    const now = new Date().toISOString();
    await db.batch([
      db.prepare("UPDATE leads SET stage = ?, notes = ?, updated_at = ? WHERE id = ?").bind(parsed.data.stage, parsed.data.notes, now, id),
      db.prepare("INSERT INTO admin_audit (id, created_at, actor_email, action, subject_id, before_value, after_value) VALUES (?, ?, ?, 'lead_updated', ?, ?, ?)").bind(crypto.randomUUID(), now, email, id, JSON.stringify(previous), JSON.stringify(parsed.data)),
    ]);
    return Response.json({ ok: true });
  } catch (error) { console.error("Lead update failed", error); return Response.json({ error: "Update unavailable" }, { status: 503 }); }
}
