"use client"

import { useState, type KeyboardEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, X, Heart, HandHeart, Gift, Link as LinkIcon, Sailboat } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-context"
import { PostType, OfferingType } from "@/lib/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockOfferings } from "@/lib/mock-data"

interface CreatePostProps {
  eventId?: string
  groupId?: string
  onPostCreated?: (post: any) => void
}

export function CreatePost({ eventId, groupId, onPostCreated }: CreatePostProps) {
  const { toast } = useToast()
  const { currentUser } = useUser()
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [postType, setPostType] = useState<PostType>(PostType.Social)
  const [isLiveInvitation, setIsLiveInvitation] = useState(false)
  const [linkedOfferingId, setLinkedOfferingId] = useState<string | null>(null)

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleCancel = () => {
    setIsExpanded(false)
    setContent("")
    setSelectedImage(null)
    setPostType(PostType.Social)
    setIsLiveInvitation(false)
  }

  const handleImageSelect = () => {
    // Simulate file selection
    const mockImageUrl = "/abstract-colorful-shapes.png"
    setSelectedImage(mockImageUrl)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  const handleSubmit = () => {
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newPost = {
        id: `post-${Date.now()}`,
        author: currentUser?.id,
        content,
        postType,
        isLiveInvitation: postType === PostType.Social && isLiveInvitation,
        linkedOfferingId,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        images: selectedImage ? [selectedImage] : [],
        eventId,
        groupId,
        chapterTags: [],
      }
      
      onPostCreated?.(newPost)
      handleCancel()
      setIsSubmitting(false)
      toast({ title: "Post created successfully!" })
    }, 500)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  return (
    <Card className="border shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder={`What's on your mind, ${currentUser?.name}?`}
              className={`resize-none transition-all duration-300 ${isExpanded ? "min-h-[120px]" : "min-h-[40px]"}`}
            />
            {isExpanded && (
              <div className="space-y-3 mt-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant={postType === PostType.Social ? 'default' : 'outline'} size="sm" onClick={() => setPostType(PostType.Social)}>Social</Button>
                  <Button variant={postType === PostType.Offer ? 'default' : 'outline'} size="sm" onClick={() => setPostType(PostType.Offer)}><Gift className="h-4 w-4 mr-2" />Offer</Button>
                  <Button variant={postType === PostType.Request ? 'default' : 'outline'} size="sm" onClick={() => setPostType(PostType.Request)}><HandHeart className="h-4 w-4 mr-2" />Request</Button>
                  <Button variant={postType === PostType.Gratitude ? 'default' : 'outline'} size="sm" onClick={() => setPostType(PostType.Gratitude)}><Heart className="h-4 w-4 mr-2" />Gratitude</Button>
                </div>
                {postType === PostType.Social && (
                    <div className="flex items-center space-x-2">
                        <Switch id="live-invitation" checked={isLiveInvitation} onCheckedChange={setIsLiveInvitation} />
                        <Label htmlFor="live-invitation" className="flex items-center gap-2 text-sm"><Sailboat className="h-4 w-4"/> Mark as Live Invitation</Label>
                    </div>
                )}
                {(postType === PostType.Offer || postType === PostType.Request) && (
                    <div className="space-y-2">
                        <Label htmlFor="linked-offering">Link an Offering (optional)</Label>
                        <Select value={linkedOfferingId || "none"} onValueChange={(value) => setLinkedOfferingId(value === "none" ? null : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an offering to link..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No offering</SelectItem>
                                {mockOfferings
                                    .filter(offering => offering.createdBy === currentUser?.id)
                                    .map((offering) => (
                                        <SelectItem key={offering.id} value={offering.id}>
                                            {offering.title} ({offering.type})
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        {linkedOfferingId && (
                            <p className="text-xs text-muted-foreground">
                                This post will be linked to your offering and can include custom pricing or discounts.
                            </p>
                        )}
                    </div>
                )}
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="icon" onClick={() => alert("Image upload UI not implemented yet.")}>
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
                    <Button size="sm" onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
