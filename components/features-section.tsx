import { Calendar, Bot, BookOpen, Users, Trophy, Moon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Event Planning",
    description: "Discover & schedule student-friendly activities.",
    icon: Calendar,
  },
  {
    title: "AI Recommendations",
    description: "Personalized leisure & networking suggestions.",
    icon: Bot,
  },
  {
    title: "Resource Hub",
    description: "Blogs, guides, and video content for students.",
    icon: BookOpen,
  },
  {
    title: "Student Community",
    description: "Forums for discussions, reviews, and event-sharing.",
    icon: Users,
  },
  {
    title: "Gamification",
    description: "Earn points, unlock badges, and track engagement.",
    icon: Trophy,
  },
  {
    title: "Dark Mode",
    description: "Choose between light and dark themes.",
    icon: Moon,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Join <span className="gradient-text">Arisze</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover all the ways Arisze can enhance your student experience and help you make the most of your leisure
            time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
