"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, Flame } from "lucide-react"
import { DetailModal } from "@/components/ui/detail-modal"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
}

interface DiscussionDetailProps {
  discussion: {
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
    commentsList?: Comment[]
  }
  isOpen: boolean
  onClose: () => void
}

export function DiscussionDetailView({ discussion, isOpen, onClose }: DiscussionDetailProps) {
  const [newComment, setNewComment] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [localComments, setLocalComments] = useState<Comment[]>(discussion.commentsList || [])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=You",
        username: "you",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    }

    setLocalComments([...localComments, newCommentObj])
    setNewComment("")
    setShowCommentForm(false)
  }

  // Format content with line breaks and links
  const formatContent = (content: string) => {
    // Replace URLs with clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const withLinks = content.replace(
      urlRegex,
      '<a href="$1" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    // Replace line breaks with <br> tags
    return withLinks.replace(/\n/g, "<br />")
  }

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title={discussion.title || "Discussion"}
      showComments={false} // We'll handle comments ourselves
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{discussion.author.name}</h3>
              <span className="text-sm text-muted-foreground">@{discussion.author.username}</span>
              {discussion.trending && (
                <Badge variant="outline" className="ml-auto flex items-center gap-1 bg-primary/5">
                  <Flame className="h-3 w-3 text-primary" />
                  Trending
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{discussion.timestamp}</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: formatContent(discussion.content) }} />
        </div>

        {discussion.image && (
          <div className="rounded-lg overflow-hidden">
            <img src={discussion.image || "/placeholder.svg"} alt="Discussion image" className="w-full object-cover" />
          </div>
        )}

        {discussion.gallery && discussion.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {discussion.gallery.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-[120px]">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 border-t border-b py-3">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            <span>{discussion.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowCommentForm(!showCommentForm)}>
            <MessageSquare className="h-4 w-4" />
            <span>{discussion.comments + localComments.length}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span>{discussion.shares}</span>
          </Button>
        </div>

        {showCommentForm && (
          <div className="space-y-3">
            <Textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCommentForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold">Comments ({discussion.comments + localComments.length})</h3>

          {localComments.length > 0 ? (
            <div className="space-y-4">
              {localComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Be the first to comment on this discussion!</p>
              <Button variant="outline" className="mt-2" onClick={() => setShowCommentForm(true)}>
                Add Comment
              </Button>
            </div>
          )}
        </div>
      </div>
    </DetailModal>
  )
}
