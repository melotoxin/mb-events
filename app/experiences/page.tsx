import { PublicFooter, PublicHeader } from "@/components/public-shell";
import { AdvancedCard } from "@/components/advanced-card";
import { ServiceDetailShowcase } from "@/components/service-detail-showcase";
import { experiences } from "@/lib/content";
export const metadata = { title: "Experiences | MB Events", description: "Explore event entertainment and production directions with MB Events." };
export default function ExperiencesPage() {
  return <>
    <PublicHeader />
    <main className="editorial-page" style={{ paddingBottom: 0 }}>
      <div className="shell">
        <p className="eyebrow">MB EXPERIENCES</p>
        <h1>Set the feeling.<br /><em>We’ll build the night.</em></h1>
        <p className="page-intro">These are starting points for your event. Your MB proposal will confirm the exact services and production details. Production imagery is illustrative.</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experiences.map((experience) => <AdvancedCard key={experience.slug} href={`/experiences/${experience.slug}`} title={experience.title} description={experience.description} imageSrc={experience.image} imageAlt="" eyebrow={experience.eyebrow} features={experience.features.slice(0, 3)} />)}
        </div>
      </div>
      <ServiceDetailShowcase />
    </main>
    <PublicFooter />
  </>;
}
