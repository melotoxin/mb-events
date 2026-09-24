# MB Events PRD coverage

Source of truth: supplied **MB Events — Digital Event Experience Platform** PRD (77 numbered sections). This register tracks sections, not individual acceptance criteria. `Tested` means the present slice passed a local functional check; it does not mean the full platform is launch ready.

| Status | Sections |
|---|---:|
| Tested | 1 |
| In Progress | 22 |
| Future Phase | 4 |
| Not Started | 50 |

**Strict completed coverage: 1/77 = 1.3%.** The current release is an early Phase 0/1 slice. Do not count previews, empty states, or database scaffolding as finished product features.

| # | PRD requirement | Status | Evidence / remaining work |
|---:|---|---|---|
| 1 | PRODUCT VISION | In Progress | Phase 0/1 architecture and connected acquisition journey started. |
| 2 | CORE BUSINESS MODEL | In Progress | Core MB services represented using legacy site content; business metrics pending. |
| 3 | PLATFORM STRUCTURE | In Progress | Public platform structure exists; planner, invites, partners, and memories are future work. |
| 4 | HOMEPAGE | In Progress | Homepage built with first-party media, inquiry CTAs, real moments, and labelled future previews; several interactive modules pending. |
| 5 | START MY EVENT | In Progress | Seven-step builder submits a lead and saves anonymous answers in D1; account attachment and extended steps pending. |
| 6 | CHECK MY DATE | Tested | Short availability flow locally tested end to end against D1; MB follow-up operations still need configuration. |
| 7 | MB EXPERIENCE BUILDER | In Progress | Experience pages built; package administration and full service selection pending. |
| 8 | MB INVITES | Not Started | No implemented workflow yet. |
| 9 | INVITATION BUILDER | Not Started | No implemented workflow yet. |
| 10 | INVITATION THEMES | Not Started | No implemented workflow yet. |
| 11 | RSVP SYSTEM | Not Started | No implemented workflow yet. |
| 12 | +1 CONTROLS | Not Started | No implemented workflow yet. |
| 13 | GUEST LIST | Not Started | No implemented workflow yet. |
| 14 | GUEST COMMUNICATION | Not Started | No implemented workflow yet. |
| 15 | QR EVENT CHECK-IN | Not Started | No implemented workflow yet. |
| 16 | DIGITAL EVENT PASS | Not Started | No implemented workflow yet. |
| 17 | GUEST SONG REQUESTS | Not Started | No implemented workflow yet. |
| 18 | LIVE EVENT QR | Not Started | No implemented workflow yet. |
| 19 | MB MEMORIES | Not Started | No implemented workflow yet. |
| 20 | MEMORY DROP | Not Started | No implemented workflow yet. |
| 21 | MB PLANNER | Not Started | No implemented workflow yet. |
| 22 | SMART CHECKLISTS | Not Started | No implemented workflow yet. |
| 23 | COUNTDOWN | Not Started | No implemented workflow yet. |
| 24 | MB PLACES | In Progress | MB Places entry route built; verified venue records and discovery filters await MB data. |
| 25 | REAL MB EVENTS AT VENUES | Not Started | No implemented workflow yet. |
| 26 | VENUE TRANSFORMATION | Not Started | No implemented workflow yet. |
| 27 | SAVE VENUES | Not Started | No implemented workflow yet. |
| 28 | VENUE COMPARISON | Not Started | No implemented workflow yet. |
| 29 | VENUE LEAD GENERATION | Not Started | No implemented workflow yet. |
| 30 | MB PARTNERS | Not Started | No implemented workflow yet. |
| 31 | REQUEST MULTIPLE QUOTES | Not Started | No implemented workflow yet. |
| 32 | MB VERIFIED | Not Started | No implemented workflow yet. |
| 33 | CUSTOMER EVENT TEAM | Not Started | No implemented workflow yet. |
| 34 | EVENT TIMELINE | Not Started | No implemented workflow yet. |
| 35 | MUSIC CENTER | Not Started | No implemented workflow yet. |
| 36 | AI EVENT CONCIERGE | Not Started | No implemented workflow yet. |
| 37 | EVENT BLUEPRINT GENERATOR | Not Started | No implemented workflow yet. |
| 38 | BUDGET PLANNER | Not Started | No implemented workflow yet. |
| 39 | REAL EVENT STORIES | In Progress | Real MB photo gallery built; approved named stories and venue links pending. |
| 40 | QR REFERRAL LOOP | Not Started | No implemented workflow yet. |
| 41 | REFERRAL PROGRAM | Not Started | No implemented workflow yet. |
| 42 | REVIEW AUTOMATION | Not Started | No implemented workflow yet. |
| 43 | SOCIAL CONTENT ENGINE | Not Started | No implemented workflow yet. |
| 44 | EVENT PERFORMANCE DASHBOARD | Not Started | No implemented workflow yet. |
| 45 | CRM | In Progress | Lead stages, persistence, and restricted CRM list built; outbound workflows pending. |
| 46 | LEAD PROFILE | In Progress | Lead details, source, builder answers, contact, notes, and stage editing built; admin email configuration pending. |
| 47 | LEAD SCORING | Not Started | No implemented workflow yet. |
| 48 | AUTOMATION ENGINE | Not Started | No implemented workflow yet. |
| 49 | DIGITAL PROPOSALS | Not Started | No implemented workflow yet. |
| 50 | CONTRACTS | Not Started | No implemented workflow yet. |
| 51 | PAYMENTS | Not Started | No implemented workflow yet. |
| 52 | STAFF OPERATIONS | Not Started | No implemented workflow yet. |
| 53 | EVENT-DAY STAFF VIEW | Not Started | No implemented workflow yet. |
| 54 | EQUIPMENT CHECKLIST | Not Started | No implemented workflow yet. |
| 55 | VENUE INTELLIGENCE | Not Started | No implemented workflow yet. |
| 56 | VENDOR PORTAL — FUTURE | Future Phase | Scheduled for the phase named in the PRD; no functional claim in this release. |
| 57 | VENUE PORTAL — FUTURE | Future Phase | Scheduled for the phase named in the PRD; no functional claim in this release. |
| 58 | EVENT ANALYTICS | In Progress | Analytics event schema and lead-created event built; reporting UI pending. |
| 59 | ADMIN DASHBOARD | In Progress | Restricted lead dashboard built; broader operations dashboard pending. |
| 60 | ADMIN CONTENT MANAGEMENT | Not Started | No implemented workflow yet. |
| 61 | SEO STRUCTURE | In Progress | Unique event and experience pages with metadata built; local service and venue content pending. |
| 62 | LOCAL SEARCH | Not Started | No implemented workflow yet. |
| 63 | CUSTOMER ACCOUNT | Not Started | No implemented workflow yet. |
| 64 | MOBILE FIRST | In Progress | Mobile layouts and touch controls built; device matrix testing pending. |
| 65 | PWA — FUTURE | Future Phase | Scheduled for the phase named in the PRD; no functional claim in this release. |
| 66 | PRIVACY | In Progress | Anonymous draft token is HttpOnly and event PII is server-side; full host privacy controls pending. |
| 67 | SECURITY | In Progress | Server validation, same-origin write checks, admin email gate, and audit schema built; MFA, bot protection, backups, and monitoring pending. |
| 68 | USER ROLES | In Progress | Admin-only authorization skeleton built; customer, guest, staff, vendor roles pending. |
| 69 | CORE DATABASE OBJECTS | In Progress | Lead, draft, analytics, and admin audit tables created; remaining domain objects pending. |
| 70 | KEY EVENT LIFECYCLE | In Progress | Discovery → lead entry built; sales through referral lifecycle pending. |
| 71 | THE MOST IMPORTANT GROWTH LOOP | Not Started | No implemented workflow yet. |
| 72 | DESIGN DIRECTION | In Progress | Premium public visual system and calm CRM styling established; guest and planner styling pending. |
| 73 | DEVELOPMENT PHASE 1 — SELL | In Progress | Phase 1 underway. Acquisition flows work locally; proposals, contracts, deposits, and accounts pending. |
| 74 | DEVELOPMENT PHASE 2 — EXPERIENCE | Not Started | No implemented workflow yet. |
| 75 | DEVELOPMENT PHASE 3 — GROWTH LOOP | Not Started | No implemented workflow yet. |
| 76 | DEVELOPMENT PHASE 4 — PLATFORM | Future Phase | Scheduled for the phase named in the PRD; no functional claim in this release. |
| 77 | NORTH STAR | In Progress | North-star journey guides architecture; complete ecosystem not yet delivered. |

## Phase 0 and Phase 1 release ledger

- **Completed routes:** `/`, `/build`, `/availability`, `/experiences`, `/experiences/[slug]`, `/events/[type]`, `/real-events`, `/venues`, `/about`, `/contact`, `/menu`, `/admin/leads`, `/admin/leads/[id]`.
- **APIs:** `POST /api/leads`; `GET/PUT /api/drafts`; admin-only `PATCH /api/admin/leads/[id]`.
- **Database migrations:** `0000_cute_wolf_cub.sql` (leads, anonymous drafts, analytics events); `0001_magenta_gateway.sql` (admin audit).
- **Security controls present:** server-side Zod validation, prepared SQL, same-origin write checks, HttpOnly draft cookie, configured-email admin gate, audit row on lead edits. The full security checklist remains open.
- **Tests performed:** TypeScript, production build, local D1 migration application, HTTP render checks, valid and invalid lead submissions, draft save/resume, and restricted admin route check. Record exact outcomes before handoff.
- **Known limitations:** No production email/SMS delivery, live availability calendar, proposal/contract/payment processor, customer account, verified venue listings, invite/RSVP, planner, guest tools, or referrals. The private preview is not a public launch.
- **MB input needed:** approved admin email; current logo; original media and publication consent; venue/vendor data; approved packages/pricing; preferred payment, SMS, and email providers; availability workflow.
