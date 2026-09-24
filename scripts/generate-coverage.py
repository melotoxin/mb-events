"""Generate a traceable section-level coverage register for the supplied PRD."""
from pathlib import Path
import re
import sys

source = Path(sys.argv[1]).read_text(encoding="utf-8-sig")
root = Path(__file__).resolve().parents[1]
headings = {}
for line in source.splitlines():
    match = re.fullmatch(r"(\d{1,2})\.\s+(.+)", line.strip())
    if match:
        number = int(match.group(1))
        if 1 <= number <= 77 and number not in headings:
            headings[number] = match.group(2).strip()
assert len(headings) == 77, f"Expected 77 PRD sections, got {len(headings)}"

progress = {
    1: "Phase 0/1 architecture and connected acquisition journey started.",
    2: "Core MB services represented using legacy site content; business metrics pending.",
    3: "Public platform structure exists; planner, invites, partners, and memories are future work.",
    4: "Homepage built with first-party media, inquiry CTAs, real moments, and labelled future previews; several interactive modules pending.",
    5: "Seven-step builder submits a lead and saves anonymous answers in D1; account attachment and extended steps pending.",
    6: "Short availability flow locally tested end to end against D1; MB follow-up operations still need configuration.",
    7: "Experience pages built; package administration and full service selection pending.",
    24: "MB Places entry route built; verified venue records and discovery filters await MB data.",
    39: "Real MB photo gallery built; approved named stories and venue links pending.",
    45: "Lead stages, persistence, and restricted CRM list built; outbound workflows pending.",
    46: "Lead details, source, builder answers, contact, notes, and stage editing built; admin email configuration pending.",
    58: "Analytics event schema and lead-created event built; reporting UI pending.",
    59: "Restricted lead dashboard built; broader operations dashboard pending.",
    61: "Unique event and experience pages with metadata built; local service and venue content pending.",
    64: "Mobile layouts and touch controls built; device matrix testing pending.",
    66: "Anonymous draft token is HttpOnly and event PII is server-side; full host privacy controls pending.",
    67: "Server validation, same-origin write checks, admin email gate, and audit schema built; MFA, bot protection, backups, and monitoring pending.",
    68: "Admin-only authorization skeleton built; customer, guest, staff, vendor roles pending.",
    69: "Lead, draft, analytics, and admin audit tables created; remaining domain objects pending.",
    70: "Discovery → lead entry built; sales through referral lifecycle pending.",
    72: "Premium public visual system and calm CRM styling established; guest and planner styling pending.",
    73: "Phase 1 underway. Acquisition flows work locally; proposals, contracts, deposits, and accounts pending.",
    77: "North-star journey guides architecture; complete ecosystem not yet delivered.",
}
tested = {6}
future = {56, 57, 65, 76}
lines = ["# MB Events PRD coverage", "", "Source of truth: supplied **MB Events — Digital Event Experience Platform** PRD (77 numbered sections). This register tracks sections, not individual acceptance criteria. `Tested` means the present slice passed a local functional check; it does not mean the full platform is launch ready.", "", "| Status | Sections |", "|---|---:|", f"| Tested | {len(tested)} |", f"| In Progress | {len(progress)-len(tested)} |", f"| Future Phase | {len(future)} |", f"| Not Started | {77-len(progress)-len(future)} |", "", f"**Strict completed coverage: {len(tested)}/77 = {len(tested)/77:.1%}.** The current release is an early Phase 0/1 slice. Do not count previews, empty states, or database scaffolding as finished product features.", "", "| # | PRD requirement | Status | Evidence / remaining work |", "|---:|---|---|---|"]
for number in range(1, 78):
    status = "Tested" if number in tested else "In Progress" if number in progress else "Future Phase" if number in future else "Not Started"
    note = progress.get(number, "Scheduled for the phase named in the PRD; no functional claim in this release." if number in future else "No implemented workflow yet.")
    lines.append(f"| {number} | {headings[number]} | {status} | {note} |")
lines += ["", "## Phase 0 and Phase 1 release ledger", "", "- **Completed routes:** `/`, `/build`, `/availability`, `/experiences`, `/experiences/[slug]`, `/events/[type]`, `/real-events`, `/venues`, `/about`, `/contact`, `/menu`, `/admin/leads`, `/admin/leads/[id]`.", "- **APIs:** `POST /api/leads`; `GET/PUT /api/drafts`; admin-only `PATCH /api/admin/leads/[id]`.", "- **Database migrations:** `0000_cute_wolf_cub.sql` (leads, anonymous drafts, analytics events); `0001_magenta_gateway.sql` (admin audit).", "- **Security controls present:** server-side Zod validation, prepared SQL, same-origin write checks, HttpOnly draft cookie, configured-email admin gate, audit row on lead edits. The full security checklist remains open.", "- **Tests performed:** TypeScript, production build, local D1 migration application, HTTP render checks, valid and invalid lead submissions, draft save/resume, and restricted admin route check. Record exact outcomes before handoff.", "- **Known limitations:** No production email/SMS delivery, live availability calendar, proposal/contract/payment processor, customer account, verified venue listings, invite/RSVP, planner, guest tools, or referrals. The private preview is not a public launch.", "- **MB input needed:** approved admin email; current logo; original media and publication consent; venue/vendor data; approved packages/pricing; preferred payment, SMS, and email providers; availability workflow.", ""]
(root / "docs" / "prd-coverage.md").write_text("\n".join(lines), encoding="utf-8")
print("Wrote coverage for", len(headings), "sections")
