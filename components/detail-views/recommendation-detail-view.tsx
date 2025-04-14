"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Sparkles, ThumbsUp, ArrowRight } from "lucide-react"
import { DetailModal } from "@/components/ui/detail-modal"

interface RecommendationDetailProps {
  recommendation: {
    id: number
    title: string
    description: string
    longDescription?: string
    category: string
    icon: any
    image: string
    secondaryImage?: string
    location?: string
    recommendedTime?: string
    aiReasoning?: string
    features?: string[]
  }
  isOpen: boolean
  onClose: () => void
}

export function RecommendationDetailView({ recommendation, isOpen, onClose }: RecommendationDetailProps) {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleThumbsUp = () => {
    setShowThankYou(true)
    // In a real app, you would send feedback to your AI system here
  }

  return (
    <DetailModal isOpen={isOpen} onClose={onClose} title={recommendation.title}>
      <div className="space-y-6">
        <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.img
            src={recommendation.image}
            alt={recommendation.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
              <recommendation.icon className="h-3.5 w-3.5 mr-1" />
              {recommendation.category}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{recommendation.title}</h2>
              <p className="text-muted-foreground">{recommendation.longDescription || recommendation.description}</p>
            </div>

            {recommendation.features && (
              <div className="space-y-2">
                <h3 className="font-semibold">Highlights</h3>
                <ul className="space-y-1">
                  {recommendation.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-primary font-medium">{index + 1}</span>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recommendation.secondaryImage && (
              <div className="rounded-lg overflow-hidden h-[200px] mt-4">
                <img
                  src={recommendation.secondaryImage || "/placeholder.svg"}
                  alt={`${recommendation.title} secondary view`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="pt-4">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Add to My List
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">Details</h3>

              <div className="space-y-3">
                {recommendation.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Suggested Location</p>
                      <p className="text-sm text-muted-foreground">{recommendation.location}</p>
                    </div>
                  </div>
                )}

                {recommendation.recommendedTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Recommended Time</p>
                      <p className="text-sm text-muted-foreground">{recommendation.recommendedTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Why AI Recommended This</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                {recommendation.aiReasoning ||
                  "Based on your interests and preferences, our AI thinks you might enjoy this activity."}
              </p>

              <div className="pt-2">
                {!showThankYou ? (
                  <Button variant="outline" size="sm" className="w-full" onClick={handleThumbsUp}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    This recommendation is helpful
                  </Button>
                ) : (
                  <div className="text-center p-2 bg-primary/10 rounded-md text-sm">
                    Thanks for your feedback! We'll use it to improve future recommendations.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailModal>
  )
}
