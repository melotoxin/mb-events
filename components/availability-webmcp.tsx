"use client";
import { useEffect } from "react";
import { eventTypes, guestRanges } from "@/lib/lead";

type Tool = { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => Promise<unknown> };
type Context = { registerTool: (tool: Tool, options: { signal: AbortSignal }) => void | Promise<void> };

export function AvailabilityWebMCP() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: Context }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "submit_availability_inquiry",
      title: "Submit a date inquiry",
      description: "Send an event date inquiry to MB Events. This creates a lead and asks MB to check the date; it does not confirm availability.",
      inputSchema: { type: "object", properties: { eventDate: { type: "string", format: "date" }, eventType: { type: "string", enum: [...eventTypes] }, location: { type: "string" }, guestCount: { type: "string", enum: [...guestRanges] }, name: { type: "string" }, phone: { type: "string" }, email: { type: "string", format: "email" } }, required: ["eventDate", "eventType", "location", "guestCount", "name", "phone", "email"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Inquiry details are required.");
        const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...input, source: "availability", priorities: [], contactMethod: "either", website: "" }) });
        const result = await response.json() as { error?: string; leadId?: string };
        if (!response.ok) throw new Error(result.error || "Inquiry could not be submitted.");
        window.dispatchEvent(new Event("mb:availability-submitted"));
        return { status: "received", leadId: result.leadId, availabilityConfirmed: false };
      },
    }, { signal: lifecycle.signal })).catch(error => console.error("WebMCP registration failed", error));
    return () => lifecycle.abort();
  }, []);
  return null;
}
