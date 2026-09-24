import { PublicFooter, PublicHeader } from "@/components/public-shell";
import { EventBuilder } from "@/components/event-builder";
export const metadata = { title: "Build My Event | MB Events", description: "Tell MB Events about the celebration you are imagining." };
export default function BuildPage() { return <><PublicHeader /><main className="form-page"><div className="shell"><p className="eyebrow">START MY EVENT</p><h1>Let’s build something<br /><em>unforgettable.</em></h1><p className="page-intro">A few details now give us a better place to begin. Your answers are saved as you go.</p><EventBuilder /></div></main><PublicFooter /></>; }
