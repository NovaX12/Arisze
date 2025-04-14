"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Sparkles, Users, Rocket, Flag, ArrowRight } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Timeline data
const timelineItems = [
  {
    year: "2023",
    title: "Concept & Research",
    description: "Initial idea formation and market research with student focus groups.",
    icon: Sparkles,
  },
  {
    year: "2024",
    title: "Platform Development",
    description: "Building the core platform with focus on events, resources, and community.",
    icon: Rocket,
  },
  {
    year: "2025",
    title: "Official Launch",
    description: "Arisze launches across multiple university campuses with thousands of early adopters.",
    icon: Flag,
  },
  {
    year: "2026",
    title: "AI Integration",
    description: "Advanced personalization features and AI-powered recommendations.",
    icon: Target,
  },
  {
    year: "2027",
    title: "Global Expansion",
    description: "Expanding to international universities and adding multilingual support.",
    icon: Users,
  },
]

export default function AboutPage() {
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
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              About <span className="gradient-text">Arisze</span>
            </h1>
            <p className="text-xl font-medium gradient-text mb-6">Empowering Student Life – Plan, Connect, and Grow</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Arisze is a comprehensive platform designed specifically for students to discover events, connect with
              peers, and make the most of their campus experience. We combine AI-powered recommendations with
              community-driven content to create a personalized hub for student life.
            </p>
            <Button size="lg" className="mt-8 group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Mission */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group">
                    <Target className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower students with tools and resources that enhance their campus experience, foster meaningful
                    connections, and help them discover activities aligned with their interests.
                  </p>
                  <img
                    src="/images/mission.jpg"
                    alt="Students collaborating on campus, representing our mission to empower student experiences"
                    className="mt-6 rounded-lg w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group">
                    <Rocket className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the definitive social platform for student life, expanding beyond campus boundaries to
                    connect students globally while providing personalized experiences.
                  </p>
                  <img
                    src="/images/vision.jpg"
                    alt="Global network of students connected digitally, representing our vision for global student connectivity"
                    className="mt-6 rounded-lg w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Values */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group">
                    <Heart className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Values</h3>
                  <p className="text-muted-foreground">
                    We believe in connectivity, personalization, and student empowerment. Our platform is built on
                    principles of inclusivity, privacy, and creating genuine value for students.
                  </p>
                  <img
                    src="/images/values.jpg"
                    alt="Diverse group of students working together, representing our values of inclusivity and empowerment"
                    className="mt-6 rounded-lg w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* History & Future Roadmap */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to reality – the past, present, and future of Arisze.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>

            {/* Timeline items */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative z-10"
            >
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} relative`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-arisze-blue to-arisze-purple"></div>

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="bg-card border border-border/50 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-2 rounded-full bg-primary/10 ${index % 2 === 0 ? "order-last ml-auto" : ""}`}
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className={`text-xl font-bold ${index % 2 === 0 ? "mr-auto" : ""}`}>{item.title}</h3>
                      </div>
                      <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
