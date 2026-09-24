"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AudioLines, Clapperboard, Disc3, Heart, Lightbulb, Mic2, Music2, PartyPopper, Presentation, Sparkles, Spade, UsersRound, type LucideIcon } from "lucide-react";

interface ServiceFeature { title: string; description: string; icon: LucideIcon }
type ServiceCategory = "corporate" | "weddings" | "sweet-16s" | "private-parties";
interface ServiceTab { id: ServiceCategory; label: string; introduction: string; features: readonly ServiceFeature[] }

const serviceTabs: readonly ServiceTab[] = [
  {
    id: "corporate", label: "Corporate Events",
    introduction: "Production that makes every part of the program feel considered, from the first welcome to the final song.",
    features: [
      { title: "Casino Experiences", description: "Authentic tables including Blackjack, Roulette, and Craps, complete with professional dealers.", icon: Spade },
      { title: "Immersive Themes", description: "From elegant Black Tie Galas to vibrant Glow Parties, we provide the lighting and sound to match your vision.", icon: Sparkles },
      { title: "Interactive Entertainment", description: "Expert MCs that transition your event seamlessly from background cocktail ambiance to high-energy dance floors.", icon: Mic2 },
      { title: "Corporate Production", description: "Crystal-clear audio for awards banquets, retirement parties, and keynote presentations.", icon: Presentation },
    ],
  },
  {
    id: "weddings", label: "Weddings",
    introduction: "A soundtrack and setting shaped around the way you want your wedding to feel.",
    features: [
      { title: "Ceremony Sound", description: "Thoughtful music cues and clear audio for the words everyone came to hear.", icon: Heart },
      { title: "Reception DJ & MC", description: "Music and hosting that carry the evening from introductions through the last dance.", icon: Disc3 },
      { title: "Lighting & Atmosphere", description: "Lighting choices that move with the room, from dinner ambience to a lively dance floor.", icon: Lightbulb },
      { title: "Planning Coordination", description: "Collaborative music and timeline planning to help each moment flow naturally.", icon: Clapperboard },
    ],
  },
  {
    id: "sweet-16s", label: "Sweet 16s",
    introduction: "An entrance, a dance floor, and the music that makes the celebration unmistakably theirs.",
    features: [
      { title: "Grand Entrances", description: "Build anticipation with music, lighting, and an introduction made for the guest of honor.", icon: PartyPopper },
      { title: "DJ & MC", description: "A tailored mix and confident hosting that keep the evening moving.", icon: Music2 },
      { title: "Party Motivators", description: "Interactive dancers can help bring guests together on the dance floor.", icon: UsersRound },
      { title: "Dance Floor Lighting", description: "Lighting options that shift the energy as the celebration unfolds.", icon: Sparkles },
    ],
  },
  {
    id: "private-parties", label: "Private Parties",
    introduction: "Personal celebrations with music, hosting, and production suited to your guests and space.",
    features: [
      { title: "Custom Music", description: "A music direction built around your tastes and the guests you are bringing together.", icon: Music2 },
      { title: "Interactive MCs", description: "Hosting that sets the pace and invites guests into the celebration.", icon: Mic2 },
      { title: "Theme Parties", description: "Explore lighting and sound for themes ranging from black tie to glow parties.", icon: Lightbulb },
      { title: "Karaoke & Dancing", description: "Add participatory moments before the dance floor takes over.", icon: AudioLines },
    ],
  },
];

interface AdvancedFeatureCardProps { feature: ServiceFeature; index: number }
export function AdvancedFeatureCard({ feature, index }: AdvancedFeatureCardProps) {
  const Icon = feature.icon;
  return (
    <article className="group min-h-52 border border-black/5 bg-white/50 p-6 shadow-[0_16px_48px_rgba(16,27,42,0.035)] backdrop-blur-sm transition-[background,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_24px_56px_rgba(16,27,42,0.075)] md:p-8">
      <div className="flex items-start justify-between gap-4">
        <Icon aria-hidden="true" className="h-6 w-6 stroke-[1.35] text-[#a42b2e]" />
        <span className="text-[10px] font-semibold tracking-[.18em] text-[#9b9b93]">0{index + 1}</span>
      </div>
      <h3 className="mt-8 font-serif text-[clamp(1.65rem,2.4vw,2.2rem)] leading-tight tracking-[-.035em] text-[#101b2a]">{feature.title}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-[#596373]">{feature.description}</p>
    </article>
  );
}

export function ServiceDetailShowcase() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>(serviceTabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const active = serviceTabs.find((tab) => tab.id === activeTab) ?? serviceTabs[0];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight": case "ArrowDown": nextIndex = (index + 1) % serviceTabs.length; break;
      case "ArrowLeft": case "ArrowUp": nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = serviceTabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveTab(serviceTabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="mt-24 border-t border-[#d5cfc6] py-20 md:mt-32 md:py-28" aria-labelledby={`${baseId}-heading`}>
      <div className="shell">
        <p className="eyebrow text-[#a42b2e]">SERVICES IN DETAIL</p>
        <h2 id={`${baseId}-heading`} className="mt-4 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.02] tracking-[-.05em] text-[#101b2a]">Every event has its own rhythm.</h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(220px,0.35fr)_minmax(0,1fr)] lg:gap-16">
          <div role="tablist" aria-label="Event categories" className="flex overflow-x-auto border-b border-[#d5cfc6] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-l">
            {serviceTabs.map((tab, index) => {
              const selected = tab.id === activeTab;
              return (
                <button key={tab.id} ref={(node) => { tabRefs.current[index] = node; }} type="button" role="tab" id={`${baseId}-tab-${tab.id}`} aria-selected={selected} aria-controls={`${baseId}-panel`} tabIndex={selected ? 0 : -1} onClick={() => setActiveTab(tab.id)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={`relative shrink-0 cursor-pointer px-5 py-5 text-left text-sm transition-colors duration-300 lg:w-full lg:px-7 lg:py-6 ${selected ? "font-bold text-slate-900" : "text-slate-400 hover:text-slate-800"}`}>
                  {tab.label}
                  {selected && <motion.span layoutId={`${baseId}-service-indicator`} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#a42b2e] lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-[2px]" transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }} />}
                </button>
              );
            })}
          </div>
          <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active.id}`} tabIndex={0} className="min-w-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a42b2e]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }} transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}>
                <p className="max-w-2xl border-l border-[#b39670] pl-5 text-base leading-7 text-[#596373] md:text-lg">{active.introduction}</p>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">{active.features.map((feature, index) => <AdvancedFeatureCard key={feature.title} feature={feature} index={index} />)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
