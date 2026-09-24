import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  stage: text("stage").notNull().default("new_lead"),
  source: text("source").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date"),
  guestCount: text("guest_count"),
  location: text("location"),
  venueStatus: text("venue_status"),
  vibe: text("vibe"),
  priorities: text("priorities", { mode: "json" }).$type<string[]>().notNull().default([]),
  contactMethod: text("contact_method").notNull().default("either"),
  campaign: text("campaign"),
  notes: text("notes"),
}, (table) => [index("idx_leads_created_at").on(table.createdAt), index("idx_leads_stage_created_at").on(table.stage, table.createdAt)]);

export const eventDrafts = sqliteTable("event_drafts", {
  tokenHash: text("token_hash").primaryKey(),
  state: text("state", { mode: "json" }).$type<Record<string, unknown>>().notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  expiresAt: text("expires_at").notNull(),
  leadId: text("lead_id").references(() => leads.id),
});

export const analyticsEvents = sqliteTable("analytics_events", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  eventName: text("event_name").notNull(),
  source: text("source"),
  leadId: text("lead_id").references(() => leads.id),
  metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>().notNull().default({}),
}, (table) => [index("idx_analytics_event_created_at").on(table.eventName, table.createdAt)]);

export const adminAudit = sqliteTable("admin_audit", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  actorEmail: text("actor_email").notNull(),
  action: text("action").notNull(),
  subjectId: text("subject_id").notNull(),
  beforeValue: text("before_value"),
  afterValue: text("after_value"),
}, (table) => [index("idx_admin_audit_subject_created_at").on(table.subjectId, table.createdAt)]);
