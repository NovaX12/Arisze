"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Palette, ClubIcon as Football, BookOpen, ArrowRight } from "lucide-react"
import { RecommendationDetailView } from "@/components/detail-views/recommendation-detail-view"

// Mock data for AI recommendations
const initialRecommendations = [
  {
    id: 1,
    title: "Try a Digital Art Workshop",
    description: "Express your creativity with digital tools and learn new techniques from professional artists.",
    longDescription:
      "Express your creativity with digital tools and learn new techniques from professional artists. This workshop is perfect for beginners and those looking to enhance their digital art skills. You'll learn about color theory, composition, and various digital painting techniques using popular software like Procreate and Photoshop.",
    category: "Creative",
    icon: Palette,
    image: "/images/recommendations/digital-art.jpg",
    secondaryImage: "/images/recommendations/digital-art-examples.jpg",
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
  },
  {
    id: 2,
    title: "Join a Student Football Meetup",
    description: "Get active and meet new friends at the weekly casual football games at the university field.",
    longDescription:
      "Get active and meet new friends at the weekly casual football games at the university field. These informal meetups are perfect for all skill levels, from beginners to experienced players. It's a great way to stay fit, relieve stress, and build connections with fellow students in a fun, non-competitive environment.",
    category: "Active",
    icon: Football,
    image: "/images/recommendations/football-meetup.jpg",
    secondaryImage: "/images/recommendations/university-field.jpg",
    location: "University Sports Field",
    recommendedTime: "Afternoons - Perfect for physical activity",
    aiReasoning:
      "Your profile indicates you enjoy team sports and outdoor activities. This regular meetup offers both physical exercise and social interaction, which aligns with your wellness goals.",
    features: [
      "No experience or equipment needed",
      "Casual, friendly atmosphere",
      "Great cardio workout",
      "Make friends across different departments",
    ],
  },
  {
    id: 3,
    title: "Check out Study-Life Balance Tips",
    description: "Discover effective strategies to balance your academic responsibilities with leisure activities.",
    longDescription:
      "Discover effective strategies to balance your academic responsibilities with leisure activities. This comprehensive guide offers practical advice on time management, stress reduction, and prioritization techniques specifically designed for students. Learn how to maximize your productivity while still making time for hobbies, social activities, and self-care.",
    category: "Productive",
    icon: BookOpen,
    image: "/images/recommendations/study-tips.jpg",
    secondaryImage: "/images/recommendations/balanced-lifestyle.jpg",
    location: "Available online and at the Student Success Center",
    recommendedTime: "Beginning of semester - Best for establishing routines",
    aiReasoning:
      "Based on your course load and recent activity patterns, our AI detected potential signs of study-life imbalance. These resources can help you create a more sustainable routine.",
    features: [
      "Customizable schedule templates",
      "Stress management techniques",
      "Productivity app recommendations",
      "Expert advice from academic counselors",
    ],
  },
]

// Alternative recommendations for the refresh function
const alternativeRecommendations = [
  {
    id: 4,
    title: "Attend a Photography Walk",
    description: "Explore the campus with fellow photography enthusiasts and capture stunning images.",
    longDescription:
      "Explore the campus with fellow photography enthusiasts and capture stunning images during this guided photography walk. Led by experienced photographers, you'll learn composition techniques, lighting tips, and how to spot unique photo opportunities in familiar surroundings. This is perfect for beginners and experienced photographers alike.",
    category: "Creative",
    icon: Palette,
    image: "/images/recommendations/photography-walk.jpg",
    secondaryImage: "/images/recommendations/campus-photography.jpg",
    location: "Meeting at the University Fountain",
    recommendedTime: "Golden hour (early morning or late afternoon)",
    aiReasoning:
      "Your recent interest in visual content and outdoor activities suggests you might enjoy combining these interests through photography. This event offers both creative expression and social connection.",
    features: [
      "Professional photography tips and tricks",
      "Explore hidden campus spots",
      "All camera types welcome (including smartphones)",
      "Photo sharing session afterward",
    ],
  },
  {
    id: 5,
    title: "Try Rock Climbing at the Gym",
    description: "Challenge yourself with indoor rock climbing at the university sports center.",
    longDescription:
      "Challenge yourself with indoor rock climbing at the university sports center. The climbing wall offers routes for all skill levels, from complete beginners to experienced climbers. Instructors are available to provide guidance on technique, safety, and equipment. It's an excellent full-body workout that builds strength, flexibility, and problem-solving skills.",
    category: "Active",
    icon: Football,
    image: "/images/recommendations/rock-climbing.jpg",
    secondaryImage: "/images/recommendations/climbing-wall.jpg",
    location: "University Sports Center, Climbing Zone",
    recommendedTime: "Evenings - Less crowded",
    aiReasoning:
      "Based on your fitness goals and preference for novel experiences, rock climbing offers a challenging alternative to traditional workouts while developing both physical and mental skills.",
    features: [
      "All equipment provided",
      "Certified instructors on site",
      "Routes for all skill levels",
      "Great for building upper body strength",
    ],
  },
  {
    id: 6,
    title: "Join a Productivity Workshop",
    description: "Learn time management techniques and productivity hacks from expert speakers.",
    longDescription:
      "Learn time management techniques and productivity hacks from expert speakers in this interactive workshop. You'll discover evidence-based strategies to overcome procrastination, optimize your study environment, and use technology effectively. The workshop includes hands-on exercises to help you implement these techniques immediately.",
    category: "Productive",
    icon: BookOpen,
    image: "/images/recommendations/productivity-workshop.jpg",
    secondaryImage: "/images/recommendations/workshop-session.jpg",
    location: "Student Success Center, Workshop Room 3",
    recommendedTime: "Mid-semester - When workload typically increases",
    aiReasoning:
      "Your course schedule shows multiple deadlines approaching. This workshop can help you develop strategies to manage your workload more effectively during this busy period.",
    features: [
      "Interactive exercises and group discussions",
      "Take-home productivity planner",
      "Follow-up resources and support",
      "Certificate of completion",
    ],
  },
]

export default function AiRecommendations() {
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState<(typeof recommendations)[0] | null>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setRecommendations(
        recommendations === initialRecommendations ? alternativeRecommendations : initialRecommendations,
      )
      setIsRefreshing(false)
    }, 1000)
  }

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
      case "creative":
        return "/images/recommendations/creative-default.jpg"
      case "active":
        return "/images/recommendations/active-default.jpg"
      case "productive":
        return "/images/recommendations/productive-default.jpg"
      default:
        return "/images/recommendations/default.jpg"
    }
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              What Should You Do <span className="gradient-text">Today?</span>
            </h2>
            <p className="text-muted-foreground">Personalized recommendations based on your interests and schedule</p>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Suggestions
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
          key={recommendations[0].id} // Force re-render on recommendations change
        >
          {recommendations.map((recommendation) => (
            <motion.div key={recommendation.id} variants={item}>
              <Card className="overflow-hidden h-full border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden h-40">
                  <img
                    src={recommendation.image || getFallbackImage(recommendation.category)}
                    alt={`${recommendation.title} - ${recommendation.category} activity`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = getFallbackImage(recommendation.category)
                    }}
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
                <CardFooter className="p-5 pt-0">
                  <Button
                    variant="ghost"
                    className="w-full group/btn"
                    onClick={() => setSelectedRecommendation(recommendation)}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {selectedRecommendation && (
        <RecommendationDetailView
          recommendation={selectedRecommendation}
          isOpen={!!selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
        />
      )}
    </>
  )
}
