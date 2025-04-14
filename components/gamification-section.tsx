import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Zap, Target, Flame, Users, Calendar, MessageSquare, BookOpen } from "lucide-react"

// Mock data for badges
const badges = [
  { id: 1, name: "Social Butterfly", icon: Users, description: "Connected with 10+ students", unlocked: true },
  { id: 2, name: "Event Explorer", icon: Calendar, description: "Attended 5 different events", unlocked: true },
  { id: 3, name: "Content Creator", icon: MessageSquare, description: "Created 10 forum posts", unlocked: false },
  { id: 4, name: "Resource Guru", icon: BookOpen, description: "Accessed 20 resources", unlocked: false },
]

// Mock data for leaderboard
const leaderboard = [
  { id: 1, name: "Alex Johnson", points: 1250, rank: 1 },
  { id: 2, name: "Samantha Lee", points: 980, rank: 2 },
  { id: 3, name: "Marcus Chen", points: 875, rank: 3 },
  { id: 4, name: "Olivia Smith", points: 720, rank: 4 },
  { id: 5, name: "Jamal Wilson", points: 650, rank: 5 },
]

export default function GamificationSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Stay Active, <span className="gradient-text">Earn Rewards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your engagement, earn badges, and compete with fellow students.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress & Badges */}
          <div className="space-y-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Level 3: Engaged Student</span>
                      <span className="text-sm text-muted-foreground">450/500 XP</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-background/50">
                      <Flame className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">12</span>
                      <span className="text-sm text-muted-foreground">Day Streak</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-background/50">
                      <Zap className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">1,250</span>
                      <span className="text-sm text-muted-foreground">Total Points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        badge.unlocked ? "border-primary/20 bg-primary/5" : "border-muted/20 bg-muted/5 opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          badge.unlocked ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        <badge.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{badge.name}</h4>
                          {badge.unlocked && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Student Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      student.rank === 1
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-card hover:bg-accent/50 transition-colors"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          student.rank === 1
                            ? "bg-primary text-primary-foreground"
                            : student.rank === 2
                              ? "bg-secondary/80 text-secondary-foreground"
                              : student.rank === 3
                                ? "bg-secondary/60 text-secondary-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {student.rank}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <Badge variant={student.rank === 1 ? "default" : "outline"}>{student.points} pts</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                      8
                    </div>
                    <span className="font-medium">Your Rank</span>
                  </div>
                  <Badge>580 pts</Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">To next rank</span>
                    <span className="text-xs text-muted-foreground">70 pts needed</span>
                  </div>
                  <Progress value={42} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
