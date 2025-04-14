"use client"

import { useEffect, useState, useContext, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BackgroundAnimationContext } from "@/context/background-animation-context"

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const { animationKey } = useContext(BackgroundAnimationContext)
  const floatingElementsRef = useRef(null)

  // Generate random positions for floating elements
  const generateRandomPositions = () => {
    return Array(6)
      .fill(0)
      .map(() => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        yMovement: Math.random() * 30 - 15,
        xMovement: Math.random() * 30 - 15,
        duration: Math.random() * 5 + 3,
      }))
  }

  const [floatingElements] = useState(() => generateRandomPositions())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden" ref={floatingElementsRef}>
        {floatingElements.map((element, i) => (
          <motion.div
            key={`${i}-${animationKey}`}
            className="absolute rounded-full bg-arisze-blue/20 dark:bg-arisze-blue/10"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              y: [0, element.yMovement],
              x: [0, element.xMovement],
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: element.duration,
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block"
            >
              Plan. Connect. Enjoy –
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="block gradient-text"
            >
              The Ultimate Student Hub!
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Explore events, connect with students, and discover new opportunities tailored for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group relative overflow-hidden" asChild>
              <Link href="/events">
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Explore Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="group relative overflow-hidden" asChild>
              <Link href="/dashboard">
                <span className="relative z-10 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
