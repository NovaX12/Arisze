"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Share2, MessageSquare, ArrowRight } from "lucide-react"

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  showShareOptions?: boolean
  showComments?: boolean
  showRelatedContent?: boolean
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  children,
  showShareOptions = true,
  showComments = true,
  showRelatedContent = true,
}: DetailModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">{children}</div>

        {(showShareOptions || showComments || showRelatedContent) && (
          <div className="border-t p-6 space-y-6">
            {showShareOptions && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Share</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="group">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share on Arisze
                    <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                  </Button>
                  <Button variant="outline" size="sm" className="group">
                    Share on Social Media
                    <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue/20 to-arisze-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                  </Button>
                </div>
              </div>
            )}

            {showComments && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Comments</h3>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Be the first to comment on this!</p>
                  <Button variant="outline" className="mt-2">
                    Add Comment
                  </Button>
                </div>
              </div>
            )}

            {showRelatedContent && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Related Content</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3 hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <h4 className="font-medium group-hover:text-primary transition-colors">Similar Events Near You</h4>
                    <p className="text-sm text-muted-foreground mb-2">Discover more activities like this one</p>
                    <div className="flex items-center text-sm text-primary">
                      <span>View events</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <h4 className="font-medium group-hover:text-primary transition-colors">Trending Discussions</h4>
                    <p className="text-sm text-muted-foreground mb-2">Join conversations about this topic</p>
                    <div className="flex items-center text-sm text-primary">
                      <span>View discussions</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
