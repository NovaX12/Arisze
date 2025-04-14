"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Flame } from "lucide-react"
import { DiscussionDetailView } from "@/components/detail-views/discussion-detail-view"

// Update the posts array with more realistic images
const posts = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "alexj",
    },
    title: "Best Study Spots on Campus",
    content:
      "Just discovered the best study spots on campus! The library's third floor has these amazing private booths with power outlets and great WiFi. Anyone else have hidden gems to share?\n\nMy top 3 picks on campus:\n1️⃣ Library Rooftop: Best natural light, minimal noise.\n2️⃣ Café Nova: Quiet after 6 PM with great coffee.\n3️⃣ Student Lounge, 2nd Floor: Comfy chairs + good WiFi.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    ],
    commentsList: [
      {
        id: 101,
        author: {
          name: "Sarah Lee",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "sarahlee",
        },
        content:
          "Thanks for sharing! I'd add the Engineering Building courtyard to this list - it's quiet and has great outdoor seating.",
        timestamp: "1 hour ago",
        likes: 5,
      },
      {
        id: 102,
        author: {
          name: "Marcus Chen",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "mchen",
        },
        content: "Café Nova gets crowded during midterms though. Best to go early!",
        timestamp: "45 minutes ago",
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Samantha Lee",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "samlee",
    },
    title: "Top 5 Productivity Apps for Students",
    content:
      "I've been testing these productivity apps for the past month. Here's my top 5:\n\n1) Forest - Stay focused and plant virtual trees\n2) Notion - All-in-one workspace for notes and tasks\n3) Todoist - Simple but powerful to-do list\n4) Focus@Will - Music scientifically optimized for focus\n5) Pomodoro Timer - Work in focused sprints\n\nWhat apps do you use to stay productive?",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 15,
    shares: 7,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80",
    commentsList: [
      {
        id: 201,
        author: {
          name: "Jordan Taylor",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "jtaylor",
        },
        content: "I love Forest! It's helped me stay off my phone during study sessions.",
        timestamp: "4 hours ago",
        likes: 8,
      },
      {
        id: 202,
        author: {
          name: "Alex Johnson",
          avatar:
            "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "alexj",
        },
        content: "Great list! I'd add Anki for flashcards - it's been a lifesaver for memorization.",
        timestamp: "3 hours ago",
        likes: 6,
      },
      {
        id: 203,
        author: {
          name: "Priya Patel",
          avatar:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "priyap",
        },
        content: "Has anyone tried Focus@Will? Is it worth the subscription?",
        timestamp: "2 hours ago",
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    author: {
      name: "Marcus Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "mchen",
    },
    title: "Looking for Hackathon Teammates",
    content:
      "Looking for teammates for the upcoming hackathon! I'm focusing on AI solutions for student wellness. I need 2-3 people with skills in:\n\n- Frontend development (React)\n- UI/UX design\n- Machine learning/AI\n\nThe hackathon is next weekend (March 15-17). DM if interested!",
    timestamp: "1 day ago",
    likes: 18,
    comments: 12,
    shares: 5,
    trending: false,
    commentsList: [
      {
        id: 301,
        author: {
          name: "Olivia Smith",
          avatar:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
          username: "olivias",
        },
        content: "I'm interested! I have experience with React and Next.js. Will DM you.",
        timestamp: "20 hours ago",
        likes: 3,
      },
    ],
  },
]

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    username: string
  }
  title?: string
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  trending: boolean
  image?: string
  gallery?: string[]
  commentsList?: {
    id: number
    author: {
      name: string
      avatar: string
      username: string
    }
    content: string
    timestamp: string
    likes: number
  }[]
}

export default function CommunityFeed() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          What's <span className="gradient-text">Trending</span> in the Community
        </h2>
        <p className="text-muted-foreground">Stay updated with the latest discussions and insights</p>

        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border border-border/50 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                      {post.trending && (
                        <Badge variant="outline" className="ml-auto flex items-center gap-1 bg-primary/5">
                          <Flame className="h-3 w-3 text-primary" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <div className="mt-4">
                  {post.title && <h4 className="font-semibold">{post.title}</h4>}
                  <p className="mt-2">{post.content.substring(0, 200)}...</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/50 px-6 py-3">
                <div className="flex items-center justify-between w-full">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPost(post)}>
                    View Discussion
                  </Button>
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {selectedPost && (
        <DiscussionDetailView discussion={selectedPost} isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  )
}
