"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Users, ArrowRight } from "lucide-react"
import { DetailModal } from "@/components/ui/detail-modal"

interface EventDetailProps {
  event: {
    id: number
    title: string
    description: string
    longDescription?: string
    image: string
    date: string
    time?: string
    location: string
    category: string
    host?: string
    hostTitle?: string
    attendees: number
    gallery?: string[]
  }
  isOpen: boolean
  onClose: () => void
}

export function EventDetailView({ event, isOpen, onClose }: EventDetailProps) {
  const [selectedImage, setSelectedImage] = useState(event.image)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return ""
    return timeString
  }

  // If there's no gallery, create one with the main image
  const gallery = event.gallery || [event.image]

  return (
    <DetailModal isOpen={isOpen} onClose={onClose} title={event.title}>
      <div className="space-y-6">
        <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] group">
          <motion.img
            src={selectedImage}
            alt={event.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground">{event.category}</Badge>
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {gallery.map((img, index) => (
              <div
                key={index}
                className={`relative rounded-md overflow-hidden h-16 w-16 cursor-pointer transition-all duration-300 ${
                  selectedImage === img ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-muted-foreground">{event.longDescription || event.description}</p>
            </div>

            {event.host && (
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{event.host}</p>
                  <p className="text-sm text-muted-foreground">{event.hostTitle || "Event Host"}</p>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">Event Details</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">{formatTime(event.time)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-sm text-muted-foreground">{event.attendees} people attending</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Add to Calendar</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  Google
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Outlook
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Apple
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Yahoo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailModal>
  )
}
