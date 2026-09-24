"use client";
import { useState } from "react";
import { leadStages, stageLabel } from "@/lib/lead-stages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdvancedButton } from "@/components/advanced-button";
export function LeadEditor({ id, initialStage, initialNotes }: { id: string; initialStage: string; initialNotes: string }) {
  const [stage, setStage] = useState(initialStage); const [notes, setNotes] = useState(initialNotes); const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
  async function save() { setBusy(true); setStatus(""); try { const r = await fetch(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ stage, notes }) }); if (!r.ok) throw new Error("Could not save changes."); setStatus("Changes saved."); } catch { setStatus("Could not save changes."); } finally { setBusy(false); } }
  return <div className="lead-editor"><h2>Manage lead</h2><label id="stage-label">CRM stage</label><Select value={stage} onValueChange={setStage}><SelectTrigger aria-labelledby="stage-label" className="mb-select"><SelectValue /></SelectTrigger><SelectContent>{leadStages.map(value => <SelectItem value={value} key={value}>{stageLabel(value)}</SelectItem>)}</SelectContent></Select><label htmlFor="lead-notes">Internal notes</label><Textarea id="lead-notes" maxLength={5000} value={notes} onChange={e => setNotes(e.target.value)} /><AdvancedButton disabled={busy} onClick={save}>{busy ? "Saving…" : "Save lead"}</AdvancedButton><p role="status">{status}</p></div>;
}
