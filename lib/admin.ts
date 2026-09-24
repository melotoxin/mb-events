import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
export { leadStages, stageLabel } from "@/lib/lead-stages";

export async function getAdminEmail() {
  const user = await getChatGPTUser();
  const allowed = (env as unknown as { MB_ADMIN_EMAIL?: string }).MB_ADMIN_EMAIL?.trim().toLowerCase();
  if (!user || !allowed || user.email.toLowerCase() !== allowed) return null;
  return user.email;
}
