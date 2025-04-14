import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import EventsSection from "@/components/events-section"
import CommunitySection from "@/components/community-section"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturesSection />
      <EventsSection />
      <CommunitySection />
    </div>
  )
}
