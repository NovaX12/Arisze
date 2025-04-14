"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  Brain,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Users,
  Palette,
  Dumbbell,
  BookOpen,
  Music,
  Coffee,
  Film,
  ChevronRight,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import { RecommendationDetailView } from "@/components/detail-views/recommendation-detail-view"

// Mock data for AI recommendations
const allRecommendations = [
  {
    id: 1,
    title: "Digital Art Workshop",
    description: "Express your creativity with digital tools and learn new techniques from professional artists.",
    longDescription:
      "Express your creativity with digital tools and learn new techniques from professional artists. This workshop is perfect for beginners and those looking to enhance their digital art skills. You'll learn about color theory, composition, and various digital painting techniques using popular software like Procreate and Photoshop.",
    category: "Creative",
    icon: Palette,
    image: "/placeholder.svg?height=200&width=400&text=Digital+Art+Workshop",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Digital+Art+Examples",
    location: "Creative Hub, Room 205",
    recommendedTime: "Weekends - Best for focused learning",
    aiReasoning:
      "Based on your interest in visual arts and previous engagement with creative content, this workshop aligns perfectly with your creative pursuits while offering a social learning environment.",
    features: [
      "Hands-on experience with professional digital art tools",
      "Small group sessions for personalized attention",
      "Take home your digital creations",
      "Network with other artists and creators",
    ],
    mood: "Creative",
    timeOfDay: "Afternoon",
    popularity: 85,
  },
  {
    id: 2,
    title: "Campus Running Club",
    description: "Join fellow students for morning runs around the scenic university campus trails.",
    longDescription:
      "Start your day energized by joining our campus running club. We meet three times a week for group runs around the beautiful university trails. All fitness levels are welcome - we have different pace groups to accommodate everyone from beginners to experienced runners.",
    category: "Active",
    icon: Dumbbell,
    image: "/placeholder.svg?height=200&width=400&text=Campus+Running+Club",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Running+Trails",
    location: "Meet at University Sports Center",
    recommendedTime: "Mornings - Perfect for starting your day with energy",
    aiReasoning:
      "Your profile indicates you enjoy outdoor activities and have mentioned wanting to improve your fitness routine. Morning exercise has also been shown to improve focus for your afternoon classes.",
    features: [
      "Guided routes with varying difficulty levels",
      "Supportive community for all fitness levels",
      "Track your progress with our group app",
      "Regular social events for club members",
    ],
    mood: "Energetic",
    timeOfDay: "Morning",
    popularity: 72,
  },
  {
    id: 3,
    title: "Silent Reading Café",
    description: "A dedicated quiet space where you can enjoy reading while sipping premium coffee.",
    longDescription:
      "Escape the noise and distractions at our Silent Reading Café. This unique space combines the cozy atmosphere of a café with the quiet focus of a library. Bring your own book or borrow from our collection, and enjoy premium coffee and snacks while you read in peaceful surroundings.",
    category: "Relaxing",
    icon: BookOpen,
    image: "/placeholder.svg?height=200&width=400&text=Silent+Reading+Café",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Reading+Space",
    location: "University Library, West Wing",
    recommendedTime: "Afternoons or evenings - When you need a peaceful break",
    aiReasoning:
      "Your course load suggests you might benefit from dedicated quiet time. Your reading history and coffee shop check-ins indicate this would be an ideal environment for you to recharge.",
    features: [
      "Noise-cancelling architecture and comfortable seating",
      "Premium coffee and tea selection",
      "Curated book collection available to borrow",
      "Weekly book discussions (optional)",
    ],
    mood: "Relaxing",
    timeOfDay: "Evening",
    popularity: 90,
  },
  {
    id: 4,
    title: "Jazz Night at Student Union",
    description: "Weekly live jazz performances featuring student musicians and occasional guest artists.",
    longDescription:
      "Unwind with the smooth sounds of jazz at our weekly music night. Student musicians showcase their talent alongside occasional guest performers from the local jazz scene. The relaxed atmosphere makes it perfect for socializing or simply enjoying quality music after a busy day of classes.",
    category: "Entertainment",
    icon: Music,
    image: "/placeholder.svg?height=200&width=400&text=Jazz+Night",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Live+Music",
    location: "Student Union Lounge",
    recommendedTime: "Thursday evenings - Perfect way to start the weekend early",
    aiReasoning:
      "Your music preferences include jazz and you've attended similar events in the past. This offers both entertainment and networking opportunities with fellow music enthusiasts.",
    features: [
      "Free entry with student ID",
      "Relaxed lounge seating",
      "Specialty mocktails and snacks available",
      "Open mic segment for aspiring performers",
    ],
    mood: "Social",
    timeOfDay: "Evening",
    popularity: 78,
  },
  {
    id: 5,
    title: "International Film Club",
    description: "Weekly screenings of acclaimed international films followed by thoughtful discussions.",
    longDescription:
      "Expand your cultural horizons with our International Film Club. Each week, we screen an acclaimed film from around the world, followed by a facilitated discussion about its themes, cultural context, and cinematic techniques. It's a great way to discover new perspectives and connect with fellow film enthusiasts.",
    category: "Entertainment",
    icon: Film,
    image: "/placeholder.svg?height=200&width=400&text=Film+Club",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Film+Discussion",
    location: "Media Arts Building, Screening Room 103",
    recommendedTime: "Tuesday evenings - Mid-week cultural escape",
    aiReasoning:
      "Your course selections in humanities and previous interest in cultural events suggest you would appreciate the intellectual and social aspects of this activity.",
    features: [
      "Curated selection of award-winning international films",
      "Expert-led discussions after each screening",
      "Comfortable theater seating with great acoustics",
      "Occasional special events with filmmakers",
    ],
    mood: "Intellectual",
    timeOfDay: "Evening",
    popularity: 65,
  },
  {
    id: 6,
    title: "Campus Coffee Crawl",
    description: "Guided tour of the best coffee spots on and around campus with tasting sessions.",
    longDescription:
      "Discover the hidden gems of campus coffee culture with our guided Coffee Crawl. Visit five unique coffee shops, learn about different brewing methods, and sample specialty drinks at each location. Our knowledgeable guide will share insights about coffee origins, roasting techniques, and how to identify flavor notes.",
    category: "Social",
    icon: Coffee,
    image: "/placeholder.svg?height=200&width=400&text=Coffee+Crawl",
    secondaryImage: "/placeholder.svg?height=200&width=400&text=Coffee+Tasting",
    location: "Starts at University Main Gate",
    recommendedTime: "Saturday mornings - When you're refreshed and ready to explore",
    aiReasoning:
      "Your frequent coffee shop check-ins and social media posts about coffee suggest this would be a perfect match for your interests while providing a social activity.",
    features: [
      "Tastings at 5 unique coffee establishments",
      "Learn about different brewing methods",
      "Meet fellow coffee enthusiasts",
      "10% discount card for future visits to participating cafés",
    ],
    mood: "Social",
    timeOfDay: "Morning",
    popularity: 82,
  },
]

// Trending activities
const trendingActivities = [
  {
    id: 101,
    title: "Sunset Yoga on the Quad",
    category: "Wellness",
    popularity: 95,
    image: "/placeholder.svg?height=200&width=400&text=Sunset+Yoga",
  },
  {
    id: 102,
    title: "Board Game Night",
    category: "Social",
    popularity: 88,
    image: "/placeholder.svg?height=200&width=400&text=Board+Game+Night",
  },
  {
    id: 103,
    title: "Campus Photography Walk",
    category: "Creative",
    popularity: 82,
    image: "/placeholder.svg?height=200&width=400&text=Photography+Walk",
  },
  {
    id: 104,
    title: "Coding Bootcamp Weekend",
    category: "Academic",
    popularity: 79,
    image: "/placeholder.svg?height=200&width=400&text=Coding+Bootcamp",
  },
  {
    id: 105,
    title: "Farmers Market Trip",
    category: "Lifestyle",
    popularity: 76,
    image: "/placeholder.svg?height=200&width=400&text=Farmers+Market",
  },
]

// Interest categories
const interestCategories = [
  { id: "sports", label: "Sports & Fitness", icon: Dumbbell },
  { id: "arts", label: "Arts & Creativity", icon: Palette },
  { id: "reading", label: "Reading & Learning", icon: BookOpen },
  { id: "music", label: "Music & Concerts", icon: Music },
  { id: "social", label: "Social Activities", icon: Users },
  { id: "entertainment", label: "Movies & Entertainment", icon: Film },
]

// Mood options
const moodOptions = ["Relaxing", "Energetic", "Social", "Productive", "Creative", "Intellectual"]

// Time of day options
const timeOptions = ["Morning", "Afternoon", "Evening", "Any time"]

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string>("Any mood")
  const [selectedTime, setSelectedTime] = useState<string>("Any time")
  const [energyLevel, setEnergyLevel] = useState<number[]>([50])
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendations, setRecommendations] = useState<typeof allRecommendations>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState<(typeof allRecommendations)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("personalized")
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const handleGenerateRecommendations = () => {
    setIsGenerating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Filter recommendations based on user preferences
      // In a real app, this would be done by an AI model
      let filtered = [...allRecommendations]

      // Filter by mood if selected
      if (selectedMood !== "Any mood") {
        filtered = filtered.filter((rec) => rec.mood === selectedMood)
      }

      // Filter by time if selected
      if (selectedTime !== "Any time") {
        filtered = filtered.filter((rec) => rec.timeOfDay === selectedTime)
      }

      // If no filters match or no recommendations found, return all
      if (
        filtered.length === 0 ||
        (selectedMood === "Any mood" && selectedTime === "Any time" && selectedInterests.length === 0)
      ) {
        filtered = allRecommendations
      }

      // Sort by a combination of match score and popularity
      filtered.sort((a, b) => b.popularity - a.popularity)

      // Take top 3 or all if less than 3
      const topRecommendations = filtered.slice(0, 3)

      setRecommendations(topRecommendations)
      setIsGenerating(false)
    }, 2000)
  }

  const filteredTrending = trendingActivities.filter(
    (activity) =>
      searchQuery === "" ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
    return null
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
              <span className="block">Smart Suggestions for</span>
              <span className="block gradient-text">Smarter Leisure!</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Let AI help you find the perfect activity based on your interests, mood, and schedule.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={() =>
                  document.getElementById("recommendations-section")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Recommendations
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16" id="recommendations-section">
        <div className="container">
          <Tabs defaultValue="personalized" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                <TabsTrigger value="personalized" className="px-4 py-2">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Personalized For You</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="px-4 py-2">
                  <ChevronRight className="mr-2 h-4 w-4" />
                  <span className={isMobile ? "sr-only" : ""}>Trending Activities</span>
                </TabsTrigger>
              </TabsList>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  className="pl-10 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="personalized" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Preferences Panel */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-6 space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Your Preferences</h2>
                      </div>

                      {/* Interests */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4">What are you interested in?</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {interestCategories.map((interest) => (
                            <div
                              key={interest.id}
                              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                                selectedInterests.includes(interest.id)
                                  ? "border-primary/50 bg-primary/10"
                                  : "border-border hover:border-primary/30 hover:bg-primary/5"
                              }`}
                              onClick={() => handleInterestToggle(interest.id)}
                            >
                              <div
                                className={`p-1 rounded-full ${
                                  selectedInterests.includes(interest.id)
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <interest.icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">{interest.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Mood */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4">What's your mood today?</h3>
                        <Select value={selectedMood} onValueChange={setSelectedMood}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Any mood">Any mood</SelectItem>
                            {moodOptions.map((mood) => (
                              <SelectItem key={mood} value={mood}>
                                {mood}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Time */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4">When do you want to do something?</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Any time", ...timeOptions].map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => setSelectedTime(time)}
                              className={`text-xs px-3 py-1 h-auto ${
                                selectedTime === time ? "" : "hover:bg-primary/5"
                              }`}
                              size="sm"
                            >
                              {time === "Morning" && <Clock className="mr-1 h-3 w-3" />}
                              {time === "Afternoon" && <Clock className="mr-1 h-3 w-3" />}
                              {time === "Evening" && <Clock className="mr-1 h-3 w-3" />}
                              {time === "Any time" && <Clock className="mr-1 h-3 w-3" />}
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Energy Level */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4">Energy level</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low energy (relaxing)</span>
                            <span>High energy (active)</span>
                          </div>
                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            value={energyLevel}
                            onValueChange={setEnergyLevel}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                        <Button
                          size="lg"
                          className="group relative overflow-hidden w-full"
                          onClick={handleGenerateRecommendations}
                          disabled={isGenerating}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isGenerating ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate My Plan
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2">
                  {recommendations.length > 0 ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Your Personalized Recommendations</h2>
                      </div>

                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        {recommendations.map((recommendation) => (
                          <motion.div key={recommendation.id} variants={item}>
                            <Card className="overflow-hidden h-full border border-border/50 hover:shadow-lg transition-all duration-300 group">
                              <div className="relative overflow-hidden h-40">
                                <img
                                  src={recommendation.image || "/placeholder.svg"}
                                  alt={recommendation.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                                  <recommendation.icon className="h-3.5 w-3.5 mr-1" />
                                  {recommendation.category}
                                </Badge>
                              </div>
                              <CardContent className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{recommendation.title}</h3>
                                <p className="text-muted-foreground">{recommendation.description}</p>
                              </CardContent>
                              <CardFooter className="p-5 pt-0 flex justify-between">
                                <Button
                                  variant="ghost"
                                  className="group/btn"
                                  onClick={() => setSelectedRecommendation(recommendation)}
                                >
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="icon" className="h-9 w-9">
                                    <ThumbsUp className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="icon" className="h-9 w-9">
                                    <ThumbsDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                      <div className="p-4 rounded-full bg-primary/10 mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Ready for personalized recommendations?</h3>
                      <p className="text-muted-foreground max-w-md mb-6">
                        Set your preferences and click "Generate My Plan" to get AI-powered activity suggestions
                        tailored just for you.
                      </p>
                      <Button
                        onClick={handleGenerateRecommendations}
                        disabled={isGenerating}
                        className="group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          {isGenerating ? "Generating..." : "Generate Now"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">What's Popular Among Students</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrending.length > 0 ? (
                    filteredTrending.map((activity) => (
                      <Card
                        key={activity.id}
                        className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 h-full"
                      >
                        <div className="relative h-40">
                          <img
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                            {activity.category}
                          </Badge>
                          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1 text-primary" />
                            {activity.popularity}% popularity
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{activity.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 w-full justify-start p-0 hover:bg-transparent hover:text-primary"
                            onClick={() =>
                              alert(
                                `You clicked on ${activity.title}. This feature will be implemented in a future update.`,
                              )
                            }
                          >
                            <span className="flex items-center">
                              Learn more
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No trending activities match your search.</p>
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recommendation Detail Modal */}
      {selectedRecommendation && (
        <RecommendationDetailView
          recommendation={selectedRecommendation}
          isOpen={!!selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
        />
      )}
    </div>
  )
}
