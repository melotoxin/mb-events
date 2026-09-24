import { z } from "zod";

export const eventTypes = ["Wedding", "Sweet 16", "Quinceañera", "Bar Mitzvah", "Bat Mitzvah", "Birthday", "Corporate", "School Event", "Private Party", "Other"] as const;
export const guestRanges = ["1–50", "50–100", "100–150", "150–250", "250–500", "500+"] as const;
export const vibes = ["Modern Luxury", "Nightclub", "Elegant", "Romantic", "High Energy", "Glow", "Black & Gold", "Garden", "Minimal", "Custom", "The Nightclub", "Modern Elegance", "Traditional"] as const;
export const priorities = ["Music", "Lighting", "Big Entrance", "Dancing", "Photos", "Video", "Decor", "Guest Experience", "Venue", "Everything"] as const;

export const leadSchema = z.object({
  source: z.enum(["builder", "availability", "venue", "contact", "blueprint"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).refine((value) => value === "" || (value.length >= 7 && /^[+()\d.\s-]+$/.test(value)), "Enter a valid phone number"),
  eventType: z.enum(eventTypes),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  guestCount: z.enum(guestRanges).optional().nullable(),
  location: z.string().trim().max(160).optional().nullable(),
  venueStatus: z.enum(["selected", "need_venue", "deciding"]).optional().nullable(),
  vibe: z.enum(vibes).optional().nullable(),
  priorities: z.array(z.enum(priorities)).max(10).default([]),
  contactMethod: z.enum(["phone", "email", "either"]).default("either"),
  campaign: z.string().trim().max(120).optional().nullable(),
  website: z.string().max(0).optional(),
}).superRefine((lead, context) => {
  if (lead.source !== "blueprint" && !lead.phone) {
    context.addIssue({ code: "custom", path: ["phone"], message: "A phone number is required" });
  }
});

export type LeadInput = z.infer<typeof leadSchema>;
