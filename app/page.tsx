import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { QuickAvailability } from "@/components/quick-availability";
import { eventPages, experiences, gallery } from "@/lib/content";

const eventTypes = ["Weddings", "Sweet 16s", "Quinceañeras", "Mitzvahs", "Corporate", "Private events"];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" role="img" aria-label="Real MB Events ballroom with dramatic red lighting and a DJ setup" />
        <HeroVideo />
        <div className="hero-shade" />
        <header className="site-header shell">
          <Link href="/" className="brand" aria-label="MB Events home"><span className="brand-monogram">MB</span><span className="brand-name">MICHAEL BRYAN<br />EVENTS</span></Link>
          <nav className="desktop-nav" aria-label="Primary navigation"><Link href="/build">Plan</Link><Link href="/experiences">Experiences</Link><Link href="/venues">Venues</Link><Link href="/real-events">Real events</Link><Link href="/about">About</Link></nav>
          <div className="header-actions"><Link className="date-link" href="/availability">Check my date <span aria-hidden="true">↗</span></Link><Link className="menu-link" href="/menu" aria-label="Open menu"><span>MENU</span><span className="menu-bars">☰</span></Link></div>
        </header>
        <div className="hero-content shell">
          <div className="hero-rule"><span>MICHAEL BRYAN EVENTS</span><span>NEW YORK · LONG ISLAND · BEYOND</span></div>
          <p className="eyebrow hero-eyebrow">ENTERTAINMENT, PLANNING & EVERYTHING IN BETWEEN</p>
          <h1>Your event<br /><em>starts here.</em></h1>
          <p className="hero-intro">The music. The atmosphere. The moments everyone remembers. Start planning a celebration that feels entirely yours.</p>
          <div className="hero-ctas"><Link className="button button-red" href="/build">Build my event <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/availability">Check my date</Link></div>
          <div className="hero-bottom"><p>THE RIGHT ENERGY FOR EVERY OCCASION</p><ul>{eventTypes.map((type) => <li key={type}>{type}</li>)}</ul></div>
        </div>
        <div className="hero-side-label">01 / THE BEGINNING</div>
      </section>
      <section className="quick-section shell"><div className="quick-head"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Have a date in mind?</h2></div><p>We’ll review your details and follow up. Availability is never promised until MB confirms it.</p></div><QuickAvailability /></section>
      <div className="service-strip" aria-label="MB service areas"><div className="shell"><span>DJ & MC ENTERTAINMENT</span><span>SOUND & LIGHTING</span><span>EVENT PLANNING</span><span>PHOTO EXPERIENCES</span><span>CASINO & KARAOKE</span></div></div>
      <section className="intro-section shell"><p className="eyebrow">THE MB APPROACH</p><div className="intro-grid"><h2>More than a great party.<br /><em>A whole experience.</em></h2><div><p>Every unforgettable event begins with a feeling. We bring together entertainment, production, and thoughtful planning to help that feeling take shape.</p><Link className="text-link" href="/build">Tell us what you’re imagining <span aria-hidden="true">↗</span></Link></div></div></section>
      <section className="occasions-section shell"><div className="section-heading"><div><p className="eyebrow">EVERY KIND OF CELEBRATION</p><h2>Make it <em>your moment.</em></h2></div><Link className="text-link" href="/build">Start planning ↗</Link></div><div className="occasion-grid">{eventPages.slice(0,6).map(item => <Link href={`/events/${item.slug}`} key={item.slug}><Image src={item.image} alt="" width={800} height={600} loading="lazy" /><span>{item.title} ↗</span></Link>)}</div></section>
      <section className="story-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">REAL MB MOMENTS</p><h2>The room, <em>transformed.</em></h2></div><Link className="text-link" href="/real-events">Explore real moments ↗</Link></div><div className="story-grid">{gallery.slice(0,3).map(item => <Link href="/real-events" key={item.image}><Image src={item.image} alt={item.alt} width={900} height={650} loading="lazy" /><span>{item.label} ↗</span></Link>)}</div><p className="story-note">Photography from the existing MB Events gallery. Event and venue details will be added after verification.</p></div></section>
      <section className="home-experiences shell"><div className="section-heading"><div><p className="eyebrow">MB EXPERIENCES</p><h2>Choose the <em>feeling.</em></h2></div><Link className="text-link" href="/experiences">See all experiences ↗</Link></div><div className="home-experience-grid">{experiences.map((item,index) => <Link href={`/experiences/${item.slug}`} key={item.slug}><small>0{index+1} / {item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p><b>Explore ↗</b></Link>)}</div></section>
      <section className="places-preview"><div className="shell places-grid"><div className="places-image" role="img" aria-label="Event ballroom with MB lighting and production" /><div><p className="eyebrow">MB PLACES</p><h2>Find the room.<br /><em>Make it yours.</em></h2><p>Looking for a venue? Tell us what your celebration needs. Verified venue profiles are being prepared for the new MB Places directory.</p><Link className="button button-red" href="/venues">Explore MB Places ↗</Link></div></div></section>
      <section className="future-preview shell"><p className="eyebrow">THE CONNECTED EVENT JOURNEY</p><h2>One event.<br /><em>One place for it all.</em></h2><p>MB is building a connected home for invitations, guests, planning, and memories. These customer tools are in development.</p><div className="future-grid"><div><span>01 / PLAN</span><h3>Your MB planner</h3><p>Tasks, music, timing, and important details together.</p></div><div><span>02 / INVITE</span><h3>Invitations & guests</h3><p>One event destination from invitation to RSVP.</p></div><div><span>03 / REMEMBER</span><h3>The moments after</h3><p>Bring everyone back for event memories.</p></div></div></section>
      <section className="quote-section"><div className="shell"><p className="eyebrow">WORDS FROM AN MB CLIENT</p><blockquote>“MB really came through for my daughter’s Quinceañera.”</blockquote><p>Brian & Rachel M. · Muttontown, NY</p><a href="https://www.mbeventsny.com/reviews" target="_blank" rel="noopener noreferrer" className="text-link">Read more on MB’s existing site ↗</a></div></section>
      <section className="start-section"><div className="shell start-grid"><div><p className="eyebrow">YOUR EVENT, YOUR WAY</p><h2>Let’s make it<br /><em>unforgettable.</em></h2><p>Tell us what you are celebrating, when, and the kind of night you want. We’ll take it from there.</p><div className="section-ctas"><Link className="button button-red" href="/build">Build my event <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/availability">Just checking a date? <span aria-hidden="true">→</span></Link></div></div><div className="start-image" role="img" aria-label="DJ production at a real MB event" /></div></section>
      <footer className="site-footer"><div className="shell"><span>MB EVENTS</span><a href="tel:+18556276863">855-MBSOUND</a><a href="mailto:mike@mbeventsny.com">mike@mbeventsny.com</a><span>Wantagh, New York</span></div></footer>
    </main>
  );
}
