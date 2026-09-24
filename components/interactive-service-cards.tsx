import { AdvancedCard } from "@/components/advanced-card";

type ServiceCard = {
  title: string;
  category: string;
  href: `/events/${string}`;
  image: `/media/${string}`;
  summary: string;
};

const services = [
  {
    title: "Weddings",
    category: "CEREMONY TO LAST DANCE",
    href: "/events/weddings",
    image: "/media/concept-cinematic-cold-sparks.webp",
    summary: "A celebration with its own rhythm.",
  },
  {
    title: "Corporate",
    category: "GALAS & GATHERINGS",
    href: "/events/corporate",
    image: "/media/concept-packed-concert-crowd.webp",
    summary: "An occasion worth remembering.",
  },
  {
    title: "Sweet 16",
    category: "A MILESTONE IN MOTION",
    href: "/events/sweet-16",
    image: "/media/concept-high-end-luxury-dancefloor.webp",
    summary: "Make the whole room feel it.",
  },
  {
    title: "Mitzvahs",
    category: "TRADITION & ENERGY",
    href: "/events/mitzvahs",
    image: "/media/concept-packed-concert-crowd.webp",
    summary: "Honor the moment. Fill the floor.",
  },
] as const satisfies readonly ServiceCard[];

export function InteractiveServiceCards() {
  return (
    <section className="bg-[#f4f0e8] py-20 md:py-28" aria-labelledby="services-heading">
      <div className="shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-[#a42b2e]">EVERY KIND OF CELEBRATION</p>
            <h2 id="services-heading" className="mt-3 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-.05em] text-[#101b2a]">
              Make it <em className="font-normal text-[#b2916a]">your moment.</em>
            </h2>
          </div>
          <a className="text-link" href="/build">Start planning ↗</a>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => <AdvancedCard key={service.href} href={service.href} title={service.title} description={service.summary} imageSrc={service.image} imageAlt="" eyebrow={`0${index + 1} / ${service.category}`} />)}
        </div>
        <p className="mt-4 text-xs text-[#596373]">Production images in these cards are illustrative concepts.</p>
      </div>
    </section>
  );
}
