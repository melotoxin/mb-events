# MB Events architecture direction

## Current vertical slice

The current Site runs on a Cloudflare-compatible Next.js/Vinext worker. D1 stores `leads`, `event_drafts`, `analytics_events`, and `admin_audit`; public media is local and optimized. Visitors can begin an event, save answers anonymously in D1 under a hashed HttpOnly cookie token, submit a lead, and ask MB to check a date. Admin access is denied unless a signed-in email matches `MB_ADMIN_EMAIL`. Every lead edit is audited.

The PRD proposed PostgreSQL and Prisma as a starting point. This first deployment uses the Sites D1/Drizzle stack. The domain boundaries below are intended to stay portable if scale or operational needs later favor PostgreSQL. Payment, messaging, signing, and media providers are not selected yet; the UI does not imply they are live.

## Lifecycle and ownership boundaries

1. **Discovery and lead:** public content, builder answers, availability requests, referral attribution. `leads` is the authoritative inquiry record.
2. **Sales:** consultation, proposal, contract, deposit, and stage transitions. Only stage and notes exist now; proposal/contract/payment tables and provider adapters remain future work.
3. **Booked event:** a distinct `events` record, not merely a converted lead, should own planner tasks, team, timeline, music, payments, and documents. Activation must require verified booking status.
4. **Invitation and guests:** invitation configuration, guest groups, allocations, RSVP records, communications consent, check-in, and song requests should be event scoped. Host permissions must be enforced server-side.
5. **Event day and memories:** the same `/e/[eventSlug]` destination changes phase while preserving one URL. Guest uploads require moderation, consent metadata, and private media storage.
6. **Growth:** reviews, referral codes, and lead attribution connect a past event to a future lead without exposing private guest data.

## Planned domain records

`users`, `memberships`, `events`, `event_types`, `services`, `packages`, `venues`, `vendors`, `partners`, `staff_assignments`, `proposals`, `contracts`, `payment_schedules`, `payments`, `tasks`, `timeline_items`, `music_preferences`, `invitation_templates`, `invitations`, `guest_groups`, `guests`, `rsvps`, `messages`, `song_requests`, `check_ins`, `media_assets`, `memories`, `referrals`, `reviews`, `equipment_templates`, `venue_notes`, and `automation_rules` are planned. Add tables with migration and authorization tests as each workflow is implemented; the presence of a table alone is not a completed feature.

## Access model

Current: anonymous visitor can submit inquiries and use an unguessable draft cookie; configured admin can read and edit leads. Future: client/host, guest, assigned staff, sales, coordinator, manager, and admin roles need event-scoped permissions. Vendor and venue portals require separate partner memberships. A guest must never infer another guest's private details from an event URL. Consent for operational messages and marketing must be stored separately.

## Provider boundaries

Integrations should implement separate interfaces for availability, email, SMS, payment, e-signature, maps, and media storage. The lead API currently persists the inquiry only; it does not claim to email, text, check an external calendar, charge a card, or issue a contract. Provider selection, keys, webhook verification, retries, and operational monitoring are prerequisites for those later flows.

## Release gates

- MB confirms media publication rights, approved logo, factual claims, package details, and venue/vendor data.
- MB designates an admin email and tests lead handling in the private preview.
- Email/SMS provider, calendar process, and consent language are approved before public inquiries.
- Public release requires abuse protection, privacy policy, retention rules, backup/restore drill, error monitoring, accessibility review, and a complete mobile device matrix.
