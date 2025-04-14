"use client"

import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  LayoutDashboard,
  Calendar,
  Sparkles,
  Menu,
  Settings,
  LogOut,
  Bell,
  Info,
  Mail,
  MessageCircle,
} from "lucide-react"
import { BackgroundAnimationContext } from "@/context/background-animation-context"

// Update the navItems array with correct redirects
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events & Activities", href: "/events", icon: Calendar },
  { name: "AI Recommendations", href: "/gallery", icon: Sparkles },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const { triggerAnimation } = useContext(BackgroundAnimationContext)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Don't render anything until client-side
  if (!isMounted) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => triggerAnimation()}>
            <span className="text-2xl font-bold gradient-text">Arisze</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 transition-colors duration-300"
            onClick={() => alert("Notifications will be implemented in a future update.")}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex hover:bg-primary/10 transition-colors duration-300"
            onClick={() => setShowChat(!showChat)}
            aria-label="Live Chat"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Live Chat</span>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-primary/10 transition-colors duration-300"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="User"
                  />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Johnson</p>
                  <p className="text-xs leading-none text-muted-foreground">alex.johnson@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex cursor-pointer items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex cursor-pointer items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert("Logout functionality will be implemented in a future update.")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium p-3 rounded-md transition-colors duration-300 ${
                      isActive(item.href) ? "bg-primary/10 text-primary" : "hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowChat(!showChat)}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Live Chat Support
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Live Chat Window */}
      {showChat && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-background rounded-lg shadow-lg border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Live Chat Support</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowChat(false)}>
              &times;
            </Button>
          </div>
          <div className="h-64 p-4 overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Hello! How can I help you today?</p>
                <span className="text-xs text-muted-foreground mt-1">Support Agent • Just now</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
