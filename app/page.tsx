import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { QuickAvailability } from "@/components/quick-availability";
import { LandingFaq } from "@/components/landing-faq";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { PublicFooter } from "@/components/public-shell";
import { Navigation } from "@/components/site-navigation";
import { InteractiveServiceCards } from "@/components/interactive-service-cards";
import { VenueLookbookCarousel } from "@/components/venue-lookbook-carousel";
import { ClientPortalTeaser } from "@/components/client-portal-teaser";
import { experiences, gallery } from "@/lib/content";

const eventTypes = ["Weddings", "Sweet 16s", "Quinceañeras", "Mitzvahs", "Corporate", "Private events"];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" role="img" aria-label="Illustrative luxury event with dramatic lighting" />
        <HeroVideo />
        <div className="hero-shade" />
        <header className="site-header shell">
          <a href="/" className="brand" aria-label="MB Events home"><span className="brand-monogram">MB</span><span className="brand-name">MICHAEL BRYAN<br />EVENTS</span></a>
          <Navigation className="desktop-nav" ariaLabel="Primary navigation" />
          <div className="header-actions"><a className="date-link" href="/availability">Check my date <span aria-hidden="true">↗</span></a><a className="menu-link" href="/menu" aria-label="Open menu"><span>MENU</span><span className="menu-bars">☰</span></a></div>
        </header>
        <div className="hero-content shell">
          <div className="hero-rule"><span>MICHAEL BRYAN EVENTS</span><span>NEW YORK · LONG ISLAND · BEYOND</span></div>
          <p className="eyebrow hero-eyebrow">ENTERTAINMENT, PLANNING & EVERYTHING IN BETWEEN</p>
          <h1>Your event<br /><em>starts here.</em></h1>
          <p className="hero-intro">The music. The atmosphere. The moments everyone remembers. Start planning a celebration that feels entirely yours.</p>
          <div className="hero-ctas"><a className="button button-red" href="/availability">Check my date <span aria-hidden="true">↗</span></a><a className="button button-outline" href="/build">Build my event</a></div>
          <div className="hero-bottom"><p>THE RIGHT ENERGY FOR EVERY OCCASION</p><ul>{eventTypes.map((type) => <li key={type}>{type}</li>)}</ul></div>
        </div>
        <div className="hero-side-label">01 / THE BEGINNING</div>
      </section>
      <section className="quick-section shell"><div className="quick-head"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Have a date in mind?</h2></div><p>Dates for prime weekends fill up to 12 months in advance. Enter your date to check team availability.</p></div><QuickAvailability /></section>
      <div className="service-strip" aria-label="MB service areas"><div className="shell"><span>DJ & MC ENTERTAINMENT</span><span>SOUND & LIGHTING</span><span>EVENT PLANNING</span><span>PHOTO EXPERIENCES</span><span>CASINO & KARAOKE</span></div></div>
      <section className="intro-section shell"><p className="eyebrow">THE MB APPROACH</p><div className="intro-grid"><h2>More than a great party.<br /><em>A whole experience.</em></h2><div><p>Every unforgettable event begins with a feeling. We bring together entertainment, production, and thoughtful planning to help that feeling take shape.</p><a className="text-link" href="/build">Tell us what you’re imagining <span aria-hidden="true">↗</span></a></div></div></section>
      <InteractiveServiceCards />
      <section className="story-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">REAL MB MOMENTS</p><h2>The room, <em>transformed.</em></h2></div><a className="text-link" href="/real-events">Explore real moments ↗</a></div><div className="story-grid">{gallery.slice(0,3).map(item => <a href="/real-events" key={item.image}><Image src={item.image} alt={item.alt} width={900} height={650} loading="lazy" /><span>{item.label} ↗</span></a>)}</div></div></section>
      <section className="home-experiences shell"><div className="section-heading"><div><p className="eyebrow">MB EXPERIENCES</p><h2>Choose the <em>feeling.</em></h2></div><a className="text-link" href="/experiences">See all experiences ↗</a></div><div className="home-experience-grid">{experiences.map((item,index) => <a href={`/experiences/${item.slug}`} key={item.slug}><small>0{index+1} / {item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p><ul>{item.features.slice(0,3).map(feature => <li key={feature}>{feature}</li>)}</ul><b>Explore ↗</b></a>)}</div></section>
      <VenueLookbookCarousel />
      <ClientPortalTeaser />
      <TestimonialCarousel />
      <section className="start-section"><div className="shell start-grid"><div><p className="eyebrow">YOUR EVENT, YOUR WAY</p><h2>Let’s make it<br /><em>unforgettable.</em></h2><p>Tell us what you are celebrating, when, and the kind of night you want. We’ll take it from there.</p><div className="section-ctas"><a className="button button-red" href="/availability">Check my date <span aria-hidden="true">↗</span></a><a className="text-link" href="/build">Build my event <span aria-hidden="true">→</span></a></div></div><div className="start-image relative" role="img" aria-label="Illustrative luxury dancefloor with concert-grade lighting"><span className="absolute bottom-3 left-3 bg-[#101b2a]/85 px-3 py-2 text-[.6rem] font-bold uppercase tracking-[.12em] text-white">Illustrative production concept</span></div></div></section>
      <LandingFaq />
      <PublicFooter />
    </main>
  );
}
