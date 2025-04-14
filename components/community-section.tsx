"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, Share2, Send } from "lucide-react"

// Mock data for community posts
const posts = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "alexj",
    },
    content:
      "Just finished my final project for Computer Science! Anyone else working on something cool this semester?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    author: {
      name: "Samantha Lee",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "samlee",
    },
    content:
      "The campus coffee shop is having a 2-for-1 special this week! Perfect for those late-night study sessions. #StudentLife",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 12,
    shares: 7,
  },
  {
    id: 3,
    author: {
      name: "Marcus Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      username: "mchen",
    },
    content:
      "Looking for teammates for the upcoming hackathon! I'm focusing on AI solutions for student wellness. DM if interested!",
    timestamp: "1 day ago",
    likes: 18,
    comments: 15,
    shares: 5,
  },
]

export default function CommunitySection() {
  const [newPost, setNewPost] = useState("")

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("New post:", newPost)
    setNewPost("")
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Join the <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and stay updated on campus life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* New post form */}
          <Card className="mb-8 border border-border/50">
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4 resize-none"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newPost.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Community posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="border border-border/50 hover:shadow-sm transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="mt-4">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t border-border/50 px-6 py-3">
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
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View More Posts
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
