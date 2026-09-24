import Link from "next/link";

export function PublicHeader() {
  return <header className="inner-header"><div className="shell inner-header-row"><Link className="inner-brand" href="/"><span className="brand-monogram">MB</span><span>MICHAEL BRYAN<br />EVENTS</span></Link><nav aria-label="Main navigation"><Link href="/build">Build an event</Link><Link href="/experiences">Experiences</Link><Link href="/venues">Venues</Link><Link href="/real-events">Real events</Link><Link href="/about">About</Link></nav><Link className="inner-date" href="/availability">Check my date ↗</Link></div></header>;
}

export function PublicFooter() {
  return <footer className="site-footer"><div className="shell"><Link href="/">MB EVENTS</Link><a href="tel:+18556276863">855-MBSOUND</a><a href="mailto:mike@mbeventsny.com">mike@mbeventsny.com</a><span>Wantagh, New York</span></div></footer>;
}
