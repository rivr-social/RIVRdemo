"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, ChevronLeft } from "lucide-react"
import { GiveModule } from "@/components/give-module"
import { posts, users } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { FollowButton } from "@/components/follow-button"
import { CommentFeed } from "@/components/comment-feed"

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [liked, setLiked] = useState(false)

  // Find post by ID
  const post = posts.find((p) => p.id === resolvedParams.id) || posts[0]

  // Get author
  const author = users.find((u) => u.id === post.author) || users[0]

  // Format date
  const formattedDate = new Date(post.timestamp).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="overflow-hidden border shadow-sm mb-6">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Link href={`/profile/${author.username}`}>
                  <Avatar className="h-12 w-12 hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                    <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href={`/profile/${author.username}`} className="font-medium hover:underline">
                    {author.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <FollowButton objectId={post.id} objectType="post" size="sm" />
            </div>
            <p className="mb-3 text-lg">{post.content}</p>
          </div>

          {post.images && post.images.length > 0 && (
            <div className="relative w-full h-96">
              <Image src={post.images[0] || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 border-t flex flex-col">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.likes + (liked ? 1 : 0)} likes</span>
              <span>•</span>
              <span className="font-medium">{post.comments} comments</span>
            </div>
          </div>

          <div className="grid grid-cols-4 w-full border-t border-b py-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none h-12 ${liked ? "text-primary" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 mr-2 ${liked ? "fill-primary" : ""}`} />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none h-12 text-muted-foreground"
              onClick={() => document.getElementById("comment-input")?.focus()}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Comment
            </Button>
            <GiveModule
              recipientId={author.id}
              recipientName={author.name}
              recipientAvatar={author.avatar}
              context="post"
              contextId={post.id}
              triggerButton={
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-none h-12 text-muted-foreground"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Thank
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none h-12 text-muted-foreground"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
              }}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Comments section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentFeed postId={resolvedParams.id} />
      </div>
    </div>
  )
}
