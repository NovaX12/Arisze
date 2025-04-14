"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">Arisze</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The ultimate student hub for planning leisure activities, connecting with peers, and discovering new
              opportunities.
            </p>
            <div className="flex gap-4 mt-6">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Instagram"
                className="hover:text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="https://www.instagram.com/kxthxnn/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="hover:text-primary hover:bg-primary/10"
                asChild
              >
                <Link
                  href="https://www.linkedin.com/in/kathan-chauhan-800b30236/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Events & Activities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest events and features.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert("Thank you for subscribing to our newsletter!")
                const input = e.currentTarget.querySelector("input")
                if (input) input.value = ""
              }}
            >
              <div className="flex gap-2">
                <Input placeholder="Your email" className="max-w-[220px]" required type="email" />
                <Button type="submit" size="icon" className="hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-6 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Arisze. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
