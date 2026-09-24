CREATE TABLE `admin_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`actor_email` text NOT NULL,
	`action` text NOT NULL,
	`subject_id` text NOT NULL,
	`before_value` text,
	`after_value` text
);
--> statement-breakpoint
CREATE INDEX `idx_admin_audit_subject_created_at` ON `admin_audit` (`subject_id`,`created_at`);