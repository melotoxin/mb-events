"use client";

import { motion, useReducedMotion } from "motion/react";

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
  const reducedMotion = useReducedMotion();

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
          {services.map((service, index) => (
            <motion.a
              key={service.href}
              href={service.href}
              initial="rest"
              animate="rest"
              whileHover={reducedMotion ? undefined : "hover"}
              whileFocus="hover"
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              variants={{ rest: { y: 0 }, hover: { y: reducedMotion ? 0 : -5 } }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="group relative isolate flex min-h-[21rem] flex-col justify-end overflow-hidden bg-[#142137] p-7 text-white outline-offset-4 md:min-h-[26rem]"
              aria-label={`Explore ${service.title} experiences`}
            >
              <motion.div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: `url('${service.image}')` }}
                variants={{ rest: { opacity: 0, scale: 1.08 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#081321]/95 via-[#101b2a]/65 to-[#101b2a]/20" aria-hidden="true" />
              <span className="mb-auto text-[.65rem] font-bold tracking-[.18em] text-[#d8b787]">0{index + 1} / {service.category}</span>
              <h3 className="font-serif text-[clamp(2rem,3vw,3.2rem)] leading-none tracking-[-.04em]">{service.title}</h3>
              <p className="mt-3 max-w-56 text-sm leading-relaxed text-white/80">{service.summary}</p>
              <span className="mt-7 inline-flex w-fit items-center border border-white/75 px-4 py-3 text-[.62rem] font-bold uppercase tracking-[.15em] opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                Explore experience <span className="ml-5" aria-hidden="true">↗</span>
              </span>
            </motion.a>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#596373]">Production images in these cards are illustrative concepts.</p>
      </div>
    </section>
  );
}
