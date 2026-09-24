import { eventPages } from "@/lib/content";
import { Navigation } from "@/components/site-navigation";
export const metadata = { title: "Explore MB Events" };
export default function MenuPage() { return <main className="menu-page"><div className="shell"><div className="menu-heading"><a href="/">MB EVENTS</a><a href="/" aria-label="Close menu">✕</a></div><p className="eyebrow">EXPLORE THE EXPERIENCE</p><Navigation ariaLabel="Site menu" /><a className="button button-red" href="/availability">Check My Date ↗</a><p className="eyebrow">EVENTS</p><div className="menu-events">{eventPages.map(item => <a href={`/events/${item.slug}`} key={item.slug}>{item.title}</a>)}</div></div></main>; }
