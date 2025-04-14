"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Zap, Target, Flame, Calendar, MessageSquare, Users } from "lucide-react"

// Mock data for badges
const badges = [
  {
    id: 1,
    name: "Event Explorer",
    description: "Attended 5 different events",
    icon: Calendar,
    unlocked: true,
  },
  {
    id: 2,
    name: "Top Contributor",
    description: "Created 10 forum posts",
    icon: MessageSquare,
    unlocked: true,
  },
  {
    id: 3,
    name: "Social Butterfly",
    description: "Connected with 10+ students",
    icon: Users,
    unlocked: true,
  },
]

export default function GamificationProgress() {
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

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Your Arisze <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground">Track your engagement and rewards</p>
        </div>
      </div>

      <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card className="border border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Level 2: Active Participant</span>
                    <span className="text-sm text-muted-foreground">450/500 XP</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">50 XP needed to reach Level 3: Engaged Student</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <Flame className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">5</span>
                    <span className="text-sm text-muted-foreground">Day Streak</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">1,250</span>
                    <span className="text-sm text-muted-foreground">Total Points</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center p-3 rounded-lg border border-primary/20 bg-primary/5 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-full bg-primary/20 text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      <badge.icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <h4 className="text-sm font-medium">{badge.name}</h4>
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-medium">Next Badge: Resource Guru</span>
                  </div>
                  <Badge variant="outline">3/5 Complete</Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
