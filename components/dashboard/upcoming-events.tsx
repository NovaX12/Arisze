"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { EventDetailView } from "@/components/detail-views/event-detail-view"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Virtual Hackathon 2025",
    description: "Join teams from universities worldwide to build innovative solutions.",
    longDescription:
      "Join teams from universities worldwide to build innovative solutions in this exciting 48-hour virtual hackathon. Whether you're a coding expert or just starting out, this event welcomes participants of all skill levels. Form teams, tackle real-world challenges, and compete for amazing prizes while building your portfolio and network.",
    image: "/images/events/hackathon.jpg",
    gallery: [
      "/images/events/hackathon.jpg",
      "/images/events/coding-session.jpg",
      "/images/events/team-collaboration.jpg",
    ],
    date: "2025-03-25T17:00:00",
    time: "5:00 PM - 7:00 PM (Day 1 Kickoff)",
    location: "Online",
    category: "Academic",
    host: "Tech Innovation Club",
    hostTitle: "University Tech Organization",
    attendees: 120,
  },
  {
    id: 2,
    title: "Campus Music Festival",
    description: "Live performances from student bands and professional artists.",
    longDescription:
      "Experience an unforgettable night of music featuring performances from talented student bands and professional artists. This annual festival transforms the university amphitheater into a vibrant concert venue with multiple stages, food vendors, and interactive art installations. It's the perfect opportunity to discover new music and celebrate campus creativity.",
    image: "/images/events/music-festival.jpg",
    gallery: [
      "/images/events/music-festival.jpg",
      "/images/events/concert-stage.jpg",
      "/images/events/student-band.jpg",
    ],
    date: "2025-03-28T19:00:00",
    time: "7:00 PM - 11:00 PM",
    location: "University Amphitheater",
    category: "Social",
    host: "Student Arts Committee",
    hostTitle: "Campus Events Organizer",
    attendees: 350,
  },
  {
    id: 3,
    title: "Career Development Workshop",
    description: "Learn resume building, interview skills, and networking techniques.",
    longDescription:
      "Prepare for your future career with this comprehensive workshop covering essential job search skills. Professional career counselors will guide you through resume optimization, interview preparation, and effective networking strategies. You'll participate in mock interviews, receive personalized feedback, and learn how to leverage LinkedIn and other platforms for professional growth.",
    image: "/images/events/career-workshop.jpg",
    gallery: [
      "/images/events/career-workshop.jpg",
      "/images/events/resume-review.jpg",
      "/images/events/mock-interview.jpg",
    ],
    date: "2025-03-30T14:00:00",
    time: "2:00 PM - 4:30 PM",
    location: "Business Building, Room 204",
    category: "Workshops",
    host: "Career Services Center",
    hostTitle: "University Career Department",
    attendees: 45,
  },
  {
    id: 4,
    title: "Intramural Basketball Tournament",
    description: "Compete with teams from different departments in a friendly competition.",
    longDescription:
      "Show off your basketball skills in this exciting intramural tournament featuring teams from across campus. The competition is designed to be fun and inclusive, welcoming players of all skill levels. Form a team with friends or join as an individual to be placed on a team. Prizes will be awarded to winners, but the real goal is building community through friendly competition.",
    image: "/images/events/basketball.jpg",
    gallery: ["/images/events/basketball.jpg", "/images/events/tournament-game.jpg", "/images/events/team-huddle.jpg"],
    date: "2025-04-02T16:00:00",
    time: "4:00 PM - 8:00 PM",
    location: "University Sports Center",
    category: "Sports",
    host: "Campus Recreation",
    hostTitle: "Sports & Recreation Department",
    attendees: 80,
  },
]

const categories = ["All", "Workshops", "Sports", "Social", "Academic"]

export default function UpcomingEvents() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredEvents = events.filter((event) => {
    return selectedCategory === "All" || event.category === selectedCategory
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Function to get fallback image based on category
  const getFallbackImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "workshops":
        return "/images/events/workshop-default.jpg"
      case "sports":
        return "/images/events/sports-default.jpg"
      case "social":
        return "/images/events/social-default.jpg"
      case "academic":
        return "/images/events/academic-default.jpg"
      default:
        return "/images/events/event-default.jpg"
    }
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Don't Miss These <span className="gradient-text">Events!</span>
            </h2>
            <p className="text-muted-foreground">Upcoming activities tailored to your interests</p>
          </div>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="All" className="mt-0">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
              key={selectedCategory} // Force re-render on category change
            >
              {filteredEvents.map((event) => (
                <motion.div key={event.id} variants={item}>
                  <Card className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 group hover:translate-y-[-4px]">
                    <div className="relative overflow-hidden h-32">
                      <img
                        src={event.image || getFallbackImage(event.category)}
                        alt={`${event.title} - ${event.category} event`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = getFallbackImage(event.category)
                        }}
                      />
                      <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                        {event.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{formatTime(event.date)}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full mt-3 group/btn" onClick={() => setSelectedEvent(event)}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button>
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {selectedEvent && (
        <EventDetailView event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  )
}
