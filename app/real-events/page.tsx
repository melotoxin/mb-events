import Link from "next/link";
import Image from "next/image";
import { PublicFooter, PublicHeader } from "@/components/public-shell";
import { gallery } from "@/lib/content";
export const metadata = { title: "Real Event Moments | MB Events", description: "Photography from real Michael Bryan Events celebrations and productions." };
export default function RealEventsPage() { return <><PublicHeader /><main className="editorial-page gallery-page"><div className="shell"><p className="eyebrow">REAL MB MOMENTS</p><h1>Every room tells<br /><em>a story.</em></h1><p className="page-intro">Explore moments from MB celebrations: full dance floors, thoughtful production, and the energy that makes a night memorable.</p><div className="gallery-grid">{gallery.map(item => <figure key={item.image}><Image src={item.image} alt={item.alt} width={900} height={600} loading="lazy" /><figcaption>{item.label}</figcaption></figure>)}</div><div className="gallery-cta"><h2>Make your own moment.</h2><Link className="button button-red" href="/build">Build my event ↗</Link></div></div></main><PublicFooter /></>; }
