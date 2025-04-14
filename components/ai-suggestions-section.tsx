"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for AI suggestions
const mockSuggestions = [
  {
    id: 1,
    title: "Campus Movie Night",
    description: "Join fellow students for a screening of the latest blockbuster at the Student Union.",
    tags: ["Social", "Entertainment", "Evening"],
  },
  {
    id: 2,
    title: "Study Group - Computer Science",
    description: "Weekly study session for CS students working on algorithms and data structures.",
    tags: ["Academic", "Networking", "Afternoon"],
  },
  {
    id: 3,
    title: "Yoga in the Park",
    description: "Relax and recharge with an outdoor yoga session led by certified instructors.",
    tags: ["Wellness", "Outdoor", "Morning"],
  },
]

export default function AiSuggestionsSection() {
  const [interests, setInterests] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([])

  const handleGenerateSuggestions = () => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            <span className="gradient-text">AI-Powered</span> Suggestions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized activity recommendations based on your interests and preferences.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Enter your interests (e.g., sports, art, music, technology)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerateSuggestions}
              disabled={isLoading || !interests.trim()}
              className="whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="overflow-hidden border border-border/50 hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{suggestion.title}</h3>
                    <p className="text-muted-foreground mb-4">{suggestion.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg border-border/50">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Enter your interests and click "Generate Suggestions" to get personalized activity recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
