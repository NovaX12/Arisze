"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Sparkles, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardHero() {
  const [isMounted, setIsMounted] = useState(false)
  const userName = "Alex" // This would come from user authentication in a real app

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render animations until client-side
  if (!isMounted) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>
        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Welcome Back, <span className="gradient-text">{userName}!</span>
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground">
              Let's plan your day, explore events, and stay connected!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/events">
                  <Calendar className="mr-2 h-5 w-5" />
                  Find Events
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/recommendations">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI Recommendations
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join Discussions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
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
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Welcome Back, <span className="gradient-text">{userName}!</span>
          </h1>

          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Let's plan your day, explore events, and stay connected!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" className="group relative overflow-hidden" asChild>
              <Link href="/events">
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Find Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="group relative overflow-hidden" asChild>
              <Link href="/recommendations">
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI Recommendations
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="group relative overflow-hidden" asChild>
              <Link href="/dashboard">
                <span className="relative z-10 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join Discussions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
