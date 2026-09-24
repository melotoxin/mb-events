import { Camera, Music2, Video } from "lucide-react";
import { Navigation } from "@/components/site-navigation";
import { AdvancedButton } from "@/components/advanced-button";

const socialProfiles = [
  { label: "Instagram", host: "instagram.com", href: process.env.NEXT_PUBLIC_MB_INSTAGRAM_URL || "", Icon: Camera },
  { label: "TikTok", host: "tiktok.com", href: process.env.NEXT_PUBLIC_MB_TIKTOK_URL || "", Icon: Music2 },
  { label: "Vimeo", host: "vimeo.com", href: process.env.NEXT_PUBLIC_MB_VIMEO_URL || "", Icon: Video },
].filter(({ href, host }) => {
  try {
    const url = new URL(href);
    return url.protocol === "https:" && [host, `www.${host}`].includes(url.hostname) && url.pathname.length > 1;
  } catch {
    return false;
  }
});

export function PublicHeader() {
  return <header className="inner-header"><div className="shell inner-header-row"><a className="inner-brand" href="/"><span className="brand-monogram">MB</span><span>MICHAEL BRYAN<br />EVENTS</span></a><Navigation ariaLabel="Main navigation" /><AdvancedButton href="/availability" size="compact" arrow="up-right" className="inner-date">Check My Date</AdvancedButton><a className="inner-menu" href="/menu" aria-label="Open menu">Menu <span aria-hidden="true">☰</span></a></div></header>;
}

export function PublicFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><a className="footer-brand" href="/">MB EVENTS</a><div className="footer-contact"><a href="tel:+18556276863">855-MBSOUND</a><a href="mailto:mike@mbeventsny.com">MIKE@MBEVENTSNY.COM</a></div><span className="footer-location">Wantagh, New York</span>{socialProfiles.length > 0 ? <nav className="footer-social" aria-label="Social media">{socialProfiles.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`MB Events on ${label}`} title={label}><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></a>)}</nav> : null}</div></footer>;
}
