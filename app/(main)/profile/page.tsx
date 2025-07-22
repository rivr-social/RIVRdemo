"use client"

import { useState, useRef, useEffect } from "react"
import { User, Group, Ring, Family, OfferingType, PostType } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Users,
  Award,
  Edit2,
  Check,
  X,
  Camera,
  Plus,
  MessageSquare,
  Heart,
  Clock,
  Bookmark,
  Settings,
  Wallet,
  Building2,
  Network,
  Home,
} from "lucide-react"
import { users, posts, projects, groups, thanks, mockRings, mockFamilies, marketplaceListings, mockOfferings, mockOffers, mockRequests, mockMatches } from "@/lib/mock-data"
import { mockJobShifts } from "@/lib/mock-job-shift-data"
import { mockTreasuryData } from "@/lib/mock-treasury-data"
// Define group type string locally
type GroupTypeString = "basic" | "organization" | "ring" | "family"
import { PostFeed } from "@/components/post-feed"
import { EventFeed } from "@/components/event-feed"
import { GroupFeed } from "@/components/group-feed"
import { ProfileGroupFeed } from "@/components/profile-group-feed"
import { TagDisplay } from "@/components/tag-display"
import { ProfileCalendar } from "@/components/profile-calendar"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreateOfferingModal } from "@/components/create-offering-modal"
import { OfferingsTab } from "@/components/offerings-tab"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")
  const [isEditing, setIsEditing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [showCreateOffering, setShowCreateOffering] = useState(false)
  const [userOfferings, setUserOfferings] = useState(mockOfferings)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['about', 'posts', 'calendar', 'groups', 'marketplace'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const user = users[0]

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || "",
    skills: user.skills || [],
    chapterTags: user.chapterTags || [],
    groupTags: user.groupTags || [],
    location: "Boulder, Colorado",
    coverPhoto: "/boulder-landscape.png",
  })

  const userPosts = posts.filter((post) => {
    if (typeof post.author === 'string') {
      return post.author === user.id
    } else if (typeof post.author === 'object' && post.author !== null) {
      return (post.author as any).id === user.id
    }
    return false
  })

  const userShifts = mockJobShifts.filter((shift) => {
    return shift.assignees?.includes(user.id) || false
  })

  const userServices = marketplaceListings
    .filter(listing => listing.type === 'service' && (listing.seller as any)?.id === user.id)
    .map(service => ({
      ...service,
      bookedDates: (service as any).serviceDetails?.bookingDates || []
    }))

  // Get user events (events where user is admin, organizer, or has shifts)
  const userEvents = projects.filter((event) => {
    // Check if user is admin or organizer
    if (typeof event.organizer === 'object' && (event.organizer as any)?.id === user.id) return true
    if (typeof event.organizer === 'string' && event.organizer === user.id) return true
    if (Array.isArray(event.admins) && event.admins.includes(user.id)) return true
    
    // Check if user has shifts for this event
    return userShifts.some(shift => {
      // Check if shift has eventId or projectId that matches event id
      return (shift as any).eventId === event.id || (shift as any).projectId === event.id
    })
  })

  const userGroups = groups.filter((group) => Array.isArray(group.members) && group.members.includes(user.id))

  const userThanks = thanks.filter((thank) => thank.to === user.id)
  const totalThanksPoints = userThanks.reduce((sum, thank) => sum + thank.points, 0)

  // Filter user's offers, requests, and matches
  const userOffers = mockOffers.filter(offer => offer.userId === user.id)
  const userRequests = mockRequests.filter(request => request.userId === user.id)
  const userMatches = mockMatches.filter(match => 
    match.offerUserId === user.id || match.requestUserId === user.id
  )

  const userGroupBalances: {
    rings: any[],
    families: any[],
    orgs: any[]
  } = {
    rings: [],
    families: [],
    orgs: []
  }

  const userRings = mockRings.filter(ring => Array.isArray(ring.members) && ring.members.includes(user.id))
  userRings.forEach(ring => {
    const treasuryData = mockTreasuryData.rings[ring.id as keyof typeof mockTreasuryData.rings]
    if (treasuryData) {
      const userRatio: any = treasuryData.memberRatios.find(ratio => 
        ratio.userId === user.id || ratio.userId === user.id.replace('user', 'user-')
      )
      userGroupBalances.rings.push({
        groupName: ring.name,
        groupId: ring.id,
        balance: treasuryData.balance,
        totalContributed: userRatio?.totalContributed || 0,
        type: 'ring'
      } as any)
    }
  })

  const userFamilies = mockFamilies.filter(family => Array.isArray(family.members) && family.members.includes(user.id))
  userFamilies.forEach(family => {
    const treasuryData = mockTreasuryData.families[family.id as keyof typeof mockTreasuryData.families]
    if (treasuryData) {
      const userRatio: any = treasuryData.memberRatios.find(ratio => 
        ratio.userId === user.id || ratio.userId === user.id.replace('user', 'user-')
      )
      userGroupBalances.families.push({
        groupName: family.name,
        groupId: family.id,
        balance: treasuryData.balance,
        totalContributed: userRatio?.totalContributed || 0,
        type: 'family'
      } as any)
    }
  })

  const userOrgs = groups.filter((group) => group.members?.includes(user.id))
  userOrgs.forEach(org => {
    const simulatedBalance = Math.floor(Math.random() * 1000) + 100
    userGroupBalances.orgs.push({
      groupName: org.name,
      groupId: org.id,
      balance: simulatedBalance,
      totalContributed: Math.floor(simulatedBalance * 0.7),
      type: 'org'
    } as any)
  })

  const totalGroupBalance = [
    ...userGroupBalances.rings,
    ...userGroupBalances.families,
    ...userGroupBalances.orgs
  ].reduce((sum, group) => sum + (group?.balance || 0), 0)

  const getUser = (userId: string): User => {
    return (
      users.find((u) => u.id === userId) || {
        id: userId,
        name: "Unknown User",
        username: "unknown",
        avatar: "/placeholder-user.jpg",
        bio: "",
        skills: [],
        points: 0,
        chapterTags: [],
        groupTags: [],
        followers: [],
        following: []
      }
    ) as User
  }

  const getGroup = (groupId: string): Group => {
    return (
      groups.find((g) => g.id === groupId) || {
        id: groupId,
        name: "Unknown Group",
        description: "",
        members: [],
        inventory: [],
        avatar: "/placeholder-group.jpg",
        chapterTags: [],
        groupTags: [],
        image: "/placeholder-group.jpg",
        memberCount: 0,
        type: "basic" as GroupTypeString,
        createdAt: new Date().toISOString()
      }
    ) as Group
  }

  const getMembers = (memberIds: string[]): User[] => {
    return memberIds.map((id) => getUser(id))
  }

  const getEventCreator = (eventId: string): User => {
    const event = projects.find((p) => p.id === eventId)
    if (!event) return getUser('unknown')
    return typeof event.organizer === 'object' ? (event.organizer as User) : getUser(event.organizer as string)
  }

  const isEventAdmin = (eventId: string): boolean => {
    const event = projects.find((p) => p.id === eventId)
    if (!event) return false
    
    // Check if user is in admins array
    const isInAdmins = Array.isArray(event.admins) && event.admins.includes(user.id)
    
    // Check if user is the organizer (handle both string and object cases)
    const isOrganizer = typeof event.organizer === 'object' 
      ? (event.organizer as any)?.id === user.id 
      : event.organizer === user.id
    return Boolean(isInAdmins || isOrganizer)
  }

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleComment = (postId: string) => {
    console.log(`Comment on post: ${postId}`)
  }

  const handleShare = (postId: string) => {
    console.log(`Share post: ${postId}`)
  }

  const handleThank = (postId: string) => {
    console.log(`Thank for post: ${postId}`)
  }

  const handleRsvp = (eventId: string, status: "going" | "maybe" | "none") => {
    console.log(`RSVP for event ${eventId}: ${status}`)
  }

  const handleJoinGroup = (groupId: string) => {
    console.log(`Join group: ${groupId}`)
  }

  const handleCreateOffering = (newOffering: any) => {
    setUserOfferings([...userOfferings, newOffering])
  }

  const handleEditToggle = () => {
    if (isEditing) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    // We can't actually update the user object in this demo
    // Just log what would be updated
    console.log('Would update user profile:', {
      name: formData.name,
      bio: formData.bio || '',
      skills: formData.skills || [],
    })
    setIsEditing(false)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.KeyboardEvent<HTMLInputElement> | { target: { value: string }, key?: string }) => {
    if (!e.key || e.key === "Enter") {
      const skill = (e.target as HTMLInputElement).value
      if (skill && !formData.skills?.includes(skill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...(prev.skills || []), skill],
        }))
      }
      if (e.target) (e.target as HTMLInputElement).value = ""
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => s !== skill),
    }))
  }

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toast({
      title: "Photo uploaded",
      description: "Your profile photo has been updated.",
    })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Update URL without full page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('tab', value)
      window.history.pushState({}, '', url)
    }
  }

  return (
    <div className="pb-20">
      {/* Cover photo area */}
      <div
        className="h-48 md:h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${formData.coverPhoto})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        {isEditing && (
          <Button variant="secondary" size="sm" className="absolute bottom-4 right-4 bg-white/80 hover:bg-white">
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        )}
      </div>

      {/* Profile info */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto relative">
        <div className="flex justify-end absolute right-4 md:right-8 top-4">
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={handleEditToggle}
            className="shadow-sm"
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
          {isEditing && (
            <Button variant="outline" size="sm" onClick={handleSaveProfile} className="ml-2 shadow-sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>

        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div
              className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md cursor-pointer"
              onClick={handleProfilePhotoClick}
            >
              <img
                src={user.avatar || "/placeholder.svg?height=128&width=128"}
                alt={user.name}
                className="h-full w-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="mt-4 md:mt-0 flex-1">
            {isEditing ? (
              <Input
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-2xl font-bold h-auto text-lg md:text-2xl py-1 px-2 mb-1"
              />
            ) : (
              <h1 className="text-2xl font-bold">{formData.name}</h1>
            )}
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.location}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{user.points} points</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userEvents.length} upcoming events</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userGroups.length} groups</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {formData.bio.length > 150 ? `${formData.bio.substring(0, 150)}...` : formData.bio}
              {formData.bio.length > 150 && (
                <button className="text-primary ml-1 hover:underline" onClick={() => setActiveTab("about")}>
                  See more
                </button>
              )}
            </p>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-rose-500" />
                      <span className="text-sm">Likes received</span>
                    </div>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="text-sm">Hours contributed</span>
                    </div>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-emerald-500" />
                      <span className="text-sm">Thanks received</span>
                    </div>
                    <span className="font-medium">{totalThanksPoints}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/profile/settings">
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} defaultValue="about" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 md:grid-cols-9 md:w-fit">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="offerings">Offerings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {isEditing ? (
                        <Textarea
                          value={formData.bio || ""}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          className="min-h-[100px]"
                        />
                      ) : (
                        formData.bio || ""
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        {isEditing && (
                          <div className="flex items-center w-full">
                            <Input
                              id="new-skill"
                              placeholder="Add skill..."
                              className="h-8 mr-2"
                              onKeyDown={handleSkillsChange}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const input = document.getElementById("new-skill") as HTMLInputElement
                                handleSkillsChange({ key: "Enter", target: input } as any)
                                input.value = ""
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-4">
                        {(formData.skills || []).map((skill, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span>{skill}</span>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chapters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TagDisplay tags={user.chapterTags || []} type="chapter" maxDisplay={10} />
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Manage Chapters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          {isEditing ? (
                            <Input
                              name="location"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <div className="text-sm text-muted-foreground">{formData.location}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Member Since</p>
                          <p className="text-sm text-muted-foreground">January 2023</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Languages</p>
                          {isEditing ? (
                            <Input name="languages" defaultValue="English, Spanish" className="mt-1" />
                          ) : (
                            <p className="text-sm text-muted-foreground">English, Spanish</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["Community Building", "Sustainability", "Urban Gardening", "Music", "Technology"].map(
                        (interest, i) => (
                          <Badge key={i} variant="outline">
                            {interest}
                          </Badge>
                        ),
                      )}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Interest
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input defaultValue="https://twitter.com/username" className="mb-2" />
                        <Input defaultValue="https://linkedin.com/in/username" className="mb-2" />
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <a href="#" className="text-blue-600 hover:underline block">
                          Twitter
                        </a>
                        <a href="#" className="text-blue-600 hover:underline block">
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Persona</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Gene Keys</p>
                          {isEditing ? (
                            <Input
                              name="geneKeys"
                              value={formData.geneKeys || "25.3 / 46.6 / 11.2"}
                              onChange={(e) => handleInputChange("geneKeys", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">25.3 / 46.6 / 11.2</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Human Design</p>
                          {isEditing ? (
                            <Input
                              name="humanDesign"
                              value={formData.humanDesign || "Manifesting Generator 3/5"}
                              onChange={(e) => handleInputChange("humanDesign", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">Manifesting Generator 3/5</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Western Astrology</p>
                          {isEditing ? (
                            <Input
                              name="westernAstrology"
                              value={formData.westernAstrology || "Libra Sun, Gemini Moon, Sagittarius Rising"}
                              onChange={(e) => handleInputChange("westernAstrology", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">Libra Sun, Gemini Moon, Sagittarius Rising</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Vedic Astrology</p>
                          {isEditing ? (
                            <Input
                              name="vedicAstrology"
                              value={formData.vedicAstrology || "Virgo Sun, Taurus Moon"}
                              onChange={(e) => handleInputChange("vedicAstrology", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">Virgo Sun, Taurus Moon</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">OCEAN</p>
                          {isEditing ? (
                            <Input
                              name="ocean"
                              value={formData.ocean || "O: 78%, C: 65%, E: 82%, A: 90%, N: 45%"}
                              onChange={(e) => handleInputChange("ocean", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">O: 78%, C: 65%, E: 82%, A: 90%, N: 45%</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Myers-Briggs</p>
                          {isEditing ? (
                            <Input
                              name="myersBriggs"
                              value={formData.myersBriggs || "ENFP"}
                              onChange={(e) => handleInputChange("myersBriggs", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">ENFP</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-full">
                          <p className="text-sm font-medium">Enneagram</p>
                          {isEditing ? (
                            <Input
                              name="enneagram"
                              value={formData.enneagram || "7w6"}
                              onChange={(e) => handleInputChange("enneagram", e.target.value)}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">7w6</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            {userPosts.length > 0 ? (
              <PostFeed
                posts={userPosts}
                getUser={getUser}
                getGroup={getGroup}
                getEventCreator={getEventCreator}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onThank={handleThank}
                initialLikedPosts={likedPosts}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't created any posts yet</p>
                  <Button>Create Your First Post</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            {userEvents.length > 0 ? (
              <EventFeed
                events={userEvents}
                getGroupName={(id) => getGroup(id).name}
                getGroupId={(id) => id}
                getCreatorName={() => user.name}
                getCreatorUsername={() => user.username}
                onRsvpChange={handleRsvp}
                isEventAdmin={isEventAdmin}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You're not attending any upcoming events</p>
                  <Button>Browse Events</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            {userGroups.length > 0 ? (
              <ProfileGroupFeed 
                groups={userGroups as any[]} 
                currentUserId={user.id}
                getMembers={(ids: string[]) => getMembers(ids)} 
                onJoinGroup={handleJoinGroup} 
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">You're not a member of any groups yet</p>
                  <Button>Discover Groups</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="offerings" className="mt-6">
            <OfferingsTab
              userPosts={posts.filter(post => post.author.id === user.id)}
              userMatches={userMatches}
              onCreatePost={() => setShowCreateOffering(true)}
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <ProfileCalendar 
              userShifts={userShifts} 
              userEvents={userEvents as any[]} 
              userServices={userServices}
              currentUserId={user.id}
            />
          </TabsContent>

          <TabsContent value="wallet" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2" />
                    Digital Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Personal Balance</p>
                        <p className="text-sm text-muted-foreground">Available funds</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${(user.points || 125).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">USD</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Group Balances</p>
                        <p className="text-sm text-muted-foreground">Available from groups</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${totalGroupBalance.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">USD</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Thanks Received</p>
                        <p className="text-sm text-muted-foreground">Community gratitude</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{totalThanksPoints}</p>
                        <p className="text-xs text-muted-foreground">THX</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1">
                        Send Money
                      </Button>
                      <Button variant="outline" className="flex-1">
                        History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Balances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {userGroupBalances.rings.map((ring, index) => (
                      <div key={`ring-${index}`} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <Network className="h-4 w-4 mr-2 text-purple-600" />
                          <div className="text-sm text-muted-foreground">
                            <p className="font-semibold">{(ring as any).groupName}</p>
                            <p className="text-xs">${(ring as any).balance.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${(ring as any).balance.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Available</p>
                        </div>
                      </div>
                    ))}
                    
                    {userGroupBalances.families.map((familyItem, index) => (
                      <div key={`family-${index}`} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-orange-600" />
                          <div className="text-sm text-muted-foreground">
                            <p className="font-semibold">{(familyItem as any).groupName}</p>
                            <p className="text-xs text-muted-foreground">Family</p>
                            <p className="text-xs">${(familyItem as any).balance.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${(familyItem as any).balance.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Available</p>
                        </div>
                      </div>
                    ))}
                    
                    {userGroupBalances.orgs.map((org, index) => (
                      <div key={`org-${index}`} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-yellow-600" />
                          <div className="text-sm text-muted-foreground">
                            <p className="font-semibold">{(org as any).groupName}</p>
                            <p className="text-xs text-muted-foreground">{(org as any).type === 'basic' ? 'Basic Group' : 'Organization'}</p>
                            <p className="text-xs">${(org as any).balance.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${(org as any).balance.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Available</p>
                        </div>
                      </div>
                    ))}
                    
                    {[...userGroupBalances.rings, ...userGroupBalances.families, ...userGroupBalances.orgs].length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No group balances available</p>
                        <p className="text-sm mt-1">Join groups to see shared balances</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You haven't saved any content yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  When you save posts, events, or resources, they'll appear here for easy access.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                    <div>
                      <p>
                        You joined the group <span className="font-medium">Boulder Community Garden</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p>
                        You RSVP'd to <span className="font-medium">Community Cleanup Day</span>
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-2 w-2 mt-2 rounded-full bg-amber-500"></div>
                    <div>
                      <p>
                        You received a thank you from <span className="font-medium">Jane Cooper</span>
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p>
                        You earned the <span className="font-medium">First Contribution</span> badge
                      </p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateOfferingModal
        open={showCreateOffering}
        onClose={() => setShowCreateOffering(false)}
        onCreated={handleCreateOffering}
      />
    </div>
  )
}
