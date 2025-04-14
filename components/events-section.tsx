"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Campus Tech Meetup",
    description: "Network with tech enthusiasts and learn about the latest innovations.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-15T18:00:00",
    location: "Student Union Building",
    category: "Networking",
    attendees: 42,
  },
  {
    id: 2,
    title: "Basketball Tournament",
    description: "Join the annual inter-university basketball competition.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-18T14:00:00",
    location: "University Sports Center",
    category: "Sports",
    attendees: 78,
  },
  {
    id: 3,
    title: "Art & Design Workshop",
    description: "Learn creative techniques from professional artists and designers.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-20T10:00:00",
    location: "Arts Building, Room 302",
    category: "Workshops",
    attendees: 25,
  },
  {
    id: 4,
    title: "Student Mixer Party",
    description: "Meet new friends and enjoy music, games, and refreshments.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-22T20:00:00",
    location: "The Campus Lounge",
    category: "Social",
    attendees: 120,
  },
]

const categories = ["All", "Workshops", "Sports", "Social", "Networking"]
const timeframes = ["All", "Today", "This Week", "This Month"]

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTimeframe, setSelectedTimeframe] = useState("All")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
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
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory

    // For simplicity, we're not implementing actual date filtering in this demo
    // In a real app, you would compare the event date with the current date
    const timeframeMatch = true

    return categoryMatch && timeframeMatch
  })

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What's Happening <span className="gradient-text">Near You</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming events and activities happening around your campus.
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Filter by Category:</h3>
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Filter by Date:</h3>
                <TabsList>
                  {timeframes.map((timeframe) => (
                    <TabsTrigger key={timeframe} value={timeframe} onClick={() => setSelectedTimeframe(timeframe)}>
                      {timeframe}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <TabsContent value="All" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden border border-border/50 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <Badge className="mb-2">{event.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatTime(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" className="w-full">
                        RSVP
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">
          <Button size="lg">View All Events</Button>
        </div>
      </div>
    </section>
  )
}
