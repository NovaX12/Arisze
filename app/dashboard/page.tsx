import DashboardHero from "@/components/dashboard/dashboard-hero"
import AiRecommendations from "@/components/dashboard/ai-recommendations"
import UpcomingEvents from "@/components/dashboard/upcoming-events"
import CommunityFeed from "@/components/dashboard/community-feed"
import GamificationProgress from "@/components/dashboard/gamification-progress"

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full">
      <DashboardHero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <AiRecommendations />
        <UpcomingEvents />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CommunityFeed />
          <GamificationProgress />
        </div>
      </div>
    </div>
  )
}
