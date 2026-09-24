import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { QuickAvailability } from "@/components/quick-availability";
import { LandingFaq } from "@/components/landing-faq";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { PublicFooter } from "@/components/public-shell";
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
          <div className="hero-ctas"><Link className="button button-red" href="/availability">Check my date <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/build">Build my event</Link></div>
          <div className="hero-bottom"><p>THE RIGHT ENERGY FOR EVERY OCCASION</p><ul>{eventTypes.map((type) => <li key={type}>{type}</li>)}</ul></div>
        </div>
        <div className="hero-side-label">01 / THE BEGINNING</div>
      </section>
      <section className="quick-section shell"><div className="quick-head"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Have a date in mind?</h2></div><p>Dates for prime weekends fill up to 12 months in advance. Enter your date to check team availability.</p></div><QuickAvailability /></section>
      <div className="service-strip" aria-label="MB service areas"><div className="shell"><span>DJ & MC ENTERTAINMENT</span><span>SOUND & LIGHTING</span><span>EVENT PLANNING</span><span>PHOTO EXPERIENCES</span><span>CASINO & KARAOKE</span></div></div>
      <section className="intro-section shell"><p className="eyebrow">THE MB APPROACH</p><div className="intro-grid"><h2>More than a great party.<br /><em>A whole experience.</em></h2><div><p>Every unforgettable event begins with a feeling. We bring together entertainment, production, and thoughtful planning to help that feeling take shape.</p><Link className="text-link" href="/build">Tell us what you’re imagining <span aria-hidden="true">↗</span></Link></div></div></section>
      <section className="occasions-section shell"><div className="section-heading"><div><p className="eyebrow">EVERY KIND OF CELEBRATION</p><h2>Make it <em>your moment.</em></h2></div><Link className="text-link" href="/build">Start planning ↗</Link></div><div className="occasion-grid">{eventPages.slice(0,6).map(item => <Link href={`/events/${item.slug}`} key={item.slug}><Image src={item.image} alt="" width={800} height={600} loading="lazy" /><span>{item.title} ↗</span></Link>)}</div></section>
      <section className="story-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">REAL MB MOMENTS</p><h2>The room, <em>transformed.</em></h2></div><Link className="text-link" href="/real-events">Explore real moments ↗</Link></div><div className="story-grid">{gallery.slice(0,3).map(item => <Link href="/real-events" key={item.image}><Image src={item.image} alt={item.alt} width={900} height={650} loading="lazy" /><span>{item.label} ↗</span></Link>)}</div></div></section>
      <section className="home-experiences shell"><div className="section-heading"><div><p className="eyebrow">MB EXPERIENCES</p><h2>Choose the <em>feeling.</em></h2></div><Link className="text-link" href="/experiences">See all experiences ↗</Link></div><div className="home-experience-grid">{experiences.map((item,index) => <Link href={`/experiences/${item.slug}`} key={item.slug}><small>0{index+1} / {item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p><ul>{item.features.slice(0,3).map(feature => <li key={feature}>{feature}</li>)}</ul><b>Explore ↗</b></Link>)}</div></section>
      <section className="places-preview"><div className="shell places-grid"><div className="places-image" role="img" aria-label="Event ballroom with MB lighting and production" /><div><p className="eyebrow">MB PLACES</p><h2>Find the room.<br /><em>Make it yours.</em></h2><p>Looking for a venue? Share your date, guest count, location, and the atmosphere you have in mind. MB can help you explore spaces that suit your celebration.</p><Link className="button button-red" href="/venues">Get venue guidance ↗</Link></div></div></section>
      <section className="future-preview shell"><p className="eyebrow">STRESS-FREE COORDINATION</p><h2>One event.<br /><em>One clear plan.</em></h2><p>Stress-Free Coordination: Every MB client receives access to our proprietary digital timeline and music curation portal.</p><div className="future-grid"><div><span>01 / PLAN</span><h3>A timeline with purpose</h3><p>Keep the key moments and event flow in view.</p></div><div><span>02 / CURATE</span><h3>Music that feels like you</h3><p>Share the songs, styles, and moments that matter.</p></div><div><span>03 / COORDINATE</span><h3>Details in one place</h3><p>Help the MB team shape a celebration that moves beautifully.</p></div></div></section>
      <TestimonialCarousel />
      <section className="start-section"><div className="shell start-grid"><div><p className="eyebrow">YOUR EVENT, YOUR WAY</p><h2>Let’s make it<br /><em>unforgettable.</em></h2><p>Tell us what you are celebrating, when, and the kind of night you want. We’ll take it from there.</p><div className="section-ctas"><Link className="button button-red" href="/availability">Check my date <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/build">Build my event <span aria-hidden="true">→</span></Link></div></div><div className="start-image" role="img" aria-label="Guests dancing beneath MB production lighting at a real event" /></div></section>
      <LandingFaq />
      <PublicFooter />
    </main>
  );
}
