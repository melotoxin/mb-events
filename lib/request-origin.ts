const siteOrigin = "https://mb-events.s-maazahmed28feb.chatgpt.site";
const vercelOrigin = "https://mbeventsny.vercel.app";

export function hasAllowedWriteOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestOrigin = new URL(request.url).origin;
  return origin === requestOrigin || (requestOrigin === siteOrigin && origin === vercelOrigin);
}
