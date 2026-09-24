CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`event_name` text NOT NULL,
	`source` text,
	`lead_id` text,
	`metadata` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_analytics_event_created_at` ON `analytics_events` (`event_name`,`created_at`);--> statement-breakpoint
CREATE TABLE `event_drafts` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`state` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`lead_id` text,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`stage` text DEFAULT 'new_lead' NOT NULL,
	`source` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`event_type` text NOT NULL,
	`event_date` text,
	`guest_count` text,
	`location` text,
	`venue_status` text,
	`vibe` text,
	`priorities` text DEFAULT '[]' NOT NULL,
	`contact_method` text DEFAULT 'either' NOT NULL,
	`campaign` text,
	`notes` text
);
--> statement-breakpoint
CREATE INDEX `idx_leads_created_at` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_leads_stage_created_at` ON `leads` (`stage`,`created_at`);