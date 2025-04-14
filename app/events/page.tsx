"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  Plus,
  ChevronRight,
  Tag,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EventDetailView } from "@/components/detail-views/event-detail-view"
import { Checkbox } from "@/components/ui/checkbox"

// Default placeholder image for events without images
const DEFAULT_EVENT_IMAGE = "/placeholder.svg?height=200&width=400&text=Event"

// Update the events array with more realistic images and ensure all events have images
const events = [
  {
    id: 1,
    title: "Campus Tech Meetup",
    description: "Network with tech enthusiasts and learn about the latest innovations.",
    longDescription:
      "Join us for an exciting evening of networking, learning, and collaboration with fellow tech enthusiasts. Industry professionals will share insights on the latest innovations and emerging technologies. Perfect for students interested in technology careers or simply passionate about tech.",
    image:
      "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-15T18:00:00",
    time: "6:00 PM - 8:00 PM",
    location: "Student Union Building",
    category: "Networking",
    attendees: 42,
    featured: true,
    host: "Tech Innovation Club",
    hostTitle: "University Tech Organization",
    tags: ["Technology", "Career", "Networking"],
    gallery: [
      "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 2,
    title: "Basketball Tournament",
    description: "Join the annual inter-university basketball competition.",
    longDescription:
      "Compete in our annual inter-university basketball tournament! Teams from various departments and neighboring universities will battle it out on the court. Whether you're a player or a spectator, come enjoy the competitive spirit and cheer for your favorite team.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-18T14:00:00",
    time: "2:00 PM - 6:00 PM",
    location: "University Sports Center",
    category: "Sports",
    attendees: 78,
    featured: true,
    host: "University Athletics Department",
    hostTitle: "Sports & Recreation",
    tags: ["Sports", "Competition", "Team"],
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 3,
    title: "Art & Design Workshop",
    description: "Learn creative techniques from professional artists and designers.",
    longDescription:
      "Expand your creative horizons with our comprehensive Art & Design Workshop. Professional artists and designers will guide you through various techniques and principles. All materials provided - just bring your creativity and enthusiasm!",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-20T10:00:00",
    time: "10:00 AM - 1:00 PM",
    location: "Arts Building, Room 302",
    category: "Workshops",
    attendees: 25,
    featured: false,
    host: "Student Arts Society",
    hostTitle: "Creative Arts Department",
    tags: ["Art", "Design", "Creative"],
    gallery: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 4,
    title: "Student Mixer Party",
    description: "Meet new friends and enjoy music, games, and refreshments.",
    longDescription:
      "Kick off the semester with our legendary Student Mixer Party! This is your chance to meet fellow students from all departments, enjoy great music, participate in fun games, and indulge in delicious refreshments. A perfect opportunity to expand your social circle!",
    image:
      "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-22T20:00:00",
    time: "8:00 PM - 12:00 AM",
    location: "The Campus Lounge",
    category: "Social",
    attendees: 120,
    featured: true,
    host: "Student Union",
    hostTitle: "Campus Life Committee",
    tags: ["Social", "Party", "Networking"],
    gallery: [
      "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 5,
    title: "Career Development Workshop",
    description: "Learn resume building, interview skills, and networking techniques.",
    longDescription:
      "Prepare for your future career with this comprehensive workshop covering essential job search skills. Professional career counselors will guide you through resume optimization, interview preparation, and effective networking strategies.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-25T14:00:00",
    time: "2:00 PM - 4:30 PM",
    location: "Business Building, Room 204",
    category: "Workshops",
    attendees: 45,
    featured: false,
    host: "Career Services Center",
    hostTitle: "University Career Department",
    tags: ["Career", "Professional", "Skills"],
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 6,
    title: "Campus Music Festival",
    description: "Live performances from student bands and professional artists.",
    longDescription:
      "Experience an unforgettable night of music featuring performances from talented student bands and professional artists. This annual festival transforms the university amphitheater into a vibrant concert venue with multiple stages.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-04-28T19:00:00",
    time: "7:00 PM - 11:00 PM",
    location: "University Amphitheater",
    category: "Entertainment",
    attendees: 350,
    featured: true,
    host: "Student Arts Committee",
    hostTitle: "Campus Events Organizer",
    tags: ["Music", "Entertainment", "Festival"],
    gallery: [
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 7,
    title: "Coding Bootcamp Weekend",
    description: "Intensive coding workshop for beginners and intermediate programmers.",
    longDescription:
      "Jump-start your programming skills with our weekend coding bootcamp. Learn from experienced developers and work on real projects. Perfect for beginners or those looking to level up their coding abilities.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-05-03T09:00:00",
    time: "9:00 AM - 5:00 PM (Sat & Sun)",
    location: "Computer Science Building",
    category: "Workshops",
    attendees: 40,
    featured: false,
    host: "Code Club",
    hostTitle: "Student Programming Organization",
    tags: ["Coding", "Technology", "Skills"],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
  {
    id: 8,
    title: "Farmers Market Trip",
    description: "Group outing to the local farmers market for fresh produce and artisanal goods.",
    longDescription:
      "Join us for a fun group trip to the local farmers market! We'll explore fresh produce stands, artisanal food vendors, and local crafts. Transportation provided from campus - just bring your shopping bags!",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    date: "2025-05-10T10:00:00",
    time: "10:00 AM - 1:00 PM",
    location: "Downtown Farmers Market (Transport from Student Center)",
    category: "Social",
    attendees: 25,
    featured: false,
    host: "Sustainable Living Club",
    hostTitle: "Student Environmental Group",
    tags: ["Food", "Shopping", "Sustainability"],
    gallery: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
  },
]

const categories = ["All", "Workshops", "Sports", "Social", "Networking", "Entertainment", "Academic"]
const timeframes = ["All", "Today", "This Week", "This Month"]
const locations = ["All", "Campus", "Online", "Nearby"]

// Extract all unique tags from events
const allTags = Array.from(new Set(events.flatMap((event) => event.tags || [])))

export default function EventsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTimeframe, setSelectedTimeframe] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [featuredEvents, setFeaturedEvents] = useState(events.filter((event) => event.featured))
  const [showTagsFilter, setShowTagsFilter] = useState(false)

  // Format functions
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }, [])

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Filter events when search or filters change
  useEffect(() => {
    if (!mounted) return

    const filtered = events.filter((event) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      // Category filter
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory

      // Date filter
      let matchesTimeframe = true
      const eventDate = new Date(event.date)
      const today = new Date()

      if (selectedTimeframe === "Today") {
        matchesTimeframe =
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
      } else if (selectedTimeframe === "This Week") {
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        matchesTimeframe = eventDate >= weekStart && eventDate <= weekEnd
      } else if (selectedTimeframe === "This Month") {
        matchesTimeframe = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
      }

      // Location filter
      const matchesLocation =
        selectedLocation === "All" ||
        (selectedLocation === "Online" && event.location.includes("Online")) ||
        (selectedLocation === "Campus" && !event.location.includes("Online")) ||
        (selectedLocation === "Nearby" && event.location.includes("Nearby"))

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 || (event.tags && selectedTags.every((tag) => event.tags.includes(tag)))

      return matchesSearch && matchesCategory && matchesTimeframe && matchesLocation && matchesTags
    })

    setFilteredEvents(filtered)
  }, [searchQuery, selectedCategory, selectedTimeframe, selectedLocation, selectedTags, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
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

  // Don't render animations until client-side
  if (!mounted) {
    return (
      <div className="flex flex-col w-full">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>
          <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Discover, Attend, Enjoy –</span>
                <span className="block gradient-text">Stay Connected!</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
                Explore upcoming student events and activities, tailored just for you.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg">Find Events</Button>
                <Button size="lg" variant="outline">
                  Add My Event
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Trending</span> This Week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Loading placeholders */}
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border border-border/50">
                  <div className="h-48 bg-muted/50 animate-pulse"></div>
                  <CardContent className="p-5">
                    <div className="h-6 w-3/4 bg-muted/50 animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-muted/50 animate-pulse mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 bg-muted/50 animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-muted/50 animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-muted/50 animate-pulse"></div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <div className="h-10 w-full bg-muted/50 animate-pulse"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient and animated elements */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-arisze-blue/20 dark:bg-arisze-blue/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Discover, Attend, Enjoy –</span>
              <span className="block gradient-text">Stay Connected!</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Explore upcoming student events and activities, tailored just for you.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={() => document.getElementById("event-listings")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative z-10 flex items-center">
                  Find Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>

              <Button size="lg" variant="outline" className="group" onClick={() => setShowSubmitForm(true)}>
                <Plus className="mr-2 h-5 w-5" />
                Add My Event
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              <span className="gradient-text">Trending</span> This Week
            </h2>
            <Button variant="ghost" className="group">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <motion.div key={event.id} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <Card className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.image || DEFAULT_EVENT_IMAGE}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">{event.category}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.time || formatTime(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full group/btn" onClick={() => setSelectedEvent(event)}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Filters & Search */}
      <section className="py-10" id="event-listings">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">All Events</h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-[130px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="When" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((timeframe) => (
                      <SelectItem key={timeframe} value={timeframe}>
                        {timeframe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[130px]">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Where" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tags filter */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowTagsFilter(!showTagsFilter)}
              className="mb-4 flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              Filter by Tags
              {showTagsFilter ? (
                <ChevronRight className="h-4 w-4 rotate-90 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform" />
              )}
            </Button>

            {showTagsFilter && (
              <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-md mb-4">
                {allTags.map((tag) => (
                  <div key={tag} className="flex items-center">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                      className="mr-2"
                    />
                    <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div
                key="results"
                variants={container}
                initial="hidden"
                animate="show"
                className={
                  viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                }
              >
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 h-full group">
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={event.image || DEFAULT_EVENT_IMAGE}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                            {event.category}
                          </Badge>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.time || formatTime(event.date)}</span>
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
                          {event.tags && event.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {event.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-5 pt-0">
                          <Button className="w-full group/btn" onClick={() => setSelectedEvent(event)}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Card className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative overflow-hidden md:w-1/3 h-48 md:h-auto">
                            <img
                              src={event.image || DEFAULT_EVENT_IMAGE}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                              {event.category}
                            </Badge>
                          </div>
                          <div className="flex flex-col p-5 md:w-2/3">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-muted-foreground mb-4">{event.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.time || formatTime(event.date)}</span>
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
                            {event.tags && event.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-4">
                                {event.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="mt-auto">
                              <Button onClick={() => setSelectedEvent(event)} className="group/btn">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed rounded-lg"
              >
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSelectedTimeframe("All")
                    setSelectedLocation("All")
                    setSelectedTags([])
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Event Submission Form */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Submit Your Event</h2>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowSubmitForm(false)}>
                    &times;
                  </Button>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Event submitted successfully! It will be reviewed by our team.")
                    setShowSubmitForm(false)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Time</Label>
                      <Input id="event-time" type="time" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="Enter event location" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c !== "All")
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" placeholder="Describe your event" rows={4} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-image">Upload Image</Label>
                    <Input id="event-image" type="file" accept="image/*" />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => setShowSubmitForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="group relative overflow-hidden">
                      <span className="relative z-10">Add My Event</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailView event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
