"use client"

import { useState, useEffect } from "react"
import { User, Group, Ring, Family, OfferingType, PostType } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Users,
  Award,
  MessageSquare,
  Heart,
  Clock,
  Bookmark,
  Building2,
  Network,
  Home,
} from "lucide-react"
import { users, posts, projects, groups, thanks, mockRings, mockFamilies, marketplaceListings, mockOfferings } from "@/lib/mock-data"
import { PostFeed } from "@/components/post-feed"
import { EventFeed } from "@/components/event-feed"
import { GroupFeed } from "@/components/group-feed"
import { ProfileGroupFeed } from "@/components/profile-group-feed"
import { TagDisplay } from "@/components/tag-display"
import { ProfileCalendar } from "@/components/profile-calendar"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { OfferingsTab } from "@/components/offerings-tab"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState("about")
  const { toast } = useToast()
  const router = useRouter()
  
  // Find the user by username
  const user = users.find((u) => u.username === params.username)
  
  // If user not found, show error
  if (!user) {
    useEffect(() => {
      toast({
        title: "User not found",
        description: "The requested user profile could not be found.",
        variant: "destructive",
      })
      router.push("/")
    }, [])
    
    return (
      <div className="container max-w-6xl py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground">The requested user profile could not be found.</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  // Filter posts by this user
  const userPosts = posts.filter((post) => post.author.id === user.id)
  
  // Filter events this user is organizing
  const userEvents = projects.filter((event) => event.organizer?.id === user.id)
  
  // Filter groups this user is a member of
  const userGroups = groups.filter((group) => group.members?.includes(user.id))
  
  // Filter offerings by this user
  const userOfferings = mockOfferings.filter((offering) => offering.createdBy === user.id)

  return (
    <div className="container max-w-6xl py-6">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={user.avatar || "/placeholder-user.jpg"}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                Message
              </Button>
              <Button>
                Connect
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>{user.followers || 0}</strong> followers
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>{user.following || 0}</strong> following
              </span>
            </div>
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
          </div>

          <p className="text-sm">{user.bio || "No bio provided."}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 md:w-fit">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="offerings">Offerings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
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
                    {user.bio || "No bio provided."}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-col space-y-4">
                      {(user.skills || []).map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{skill}</span>
                        </div>
                      ))}
                      {(user.skills || []).length === 0 && (
                        <p className="text-sm text-muted-foreground">No skills listed.</p>
                      )}
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
                  {(user.chapterTags || []).length === 0 && (
                    <p className="text-sm text-muted-foreground">No chapters listed.</p>
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
                    {user.location && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <div className="text-sm text-muted-foreground">{user.location}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">{user.joinDate || "January 2023"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Languages</p>
                        <p className="text-sm text-muted-foreground">English, Spanish</p>
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a href="#" className="text-blue-600 hover:underline block">
                      Twitter
                    </a>
                    <a href="#" className="text-blue-600 hover:underline block">
                      LinkedIn
                    </a>
                  </div>
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
                        <p className="text-sm text-muted-foreground">{user.geneKeys || "25.3 / 46.6 / 11.2"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">Human Design</p>
                        <p className="text-sm text-muted-foreground">{user.humanDesign || "Manifesting Generator 3/5"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">Western Astrology</p>
                        <p className="text-sm text-muted-foreground">{user.westernAstrology || "Libra Sun, Gemini Moon, Sagittarius Rising"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">Vedic Astrology</p>
                        <p className="text-sm text-muted-foreground">{user.vedicAstrology || "Virgo Sun, Taurus Moon"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">OCEAN</p>
                        <p className="text-sm text-muted-foreground">{user.ocean || "O: 78%, C: 65%, E: 82%, A: 90%, N: 45%"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">Myers-Briggs</p>
                        <p className="text-sm text-muted-foreground">{user.myersBriggs || "ENFP"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-full">
                        <p className="text-sm font-medium">Enneagram</p>
                        <p className="text-sm text-muted-foreground">{user.enneagram || "7w6"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          <PostFeed posts={userPosts} />
          {userPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <EventFeed events={userEvents} />
          {userEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <ProfileGroupFeed groups={userGroups} />
          {userGroups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Not a member of any groups yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="offerings" className="mt-6">
          <OfferingsTab offerings={userOfferings} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <ProfileCalendar events={userEvents} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        {i % 3 === 0 ? (
                          <Heart className="h-4 w-4 text-primary" />
                        ) : i % 3 === 1 ? (
                          <MessageSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Clock className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">
                          {i % 3 === 0
                            ? "Liked a post by Jane Smith"
                            : i % 3 === 1
                            ? "Commented on an event: Community Garden Meetup"
                            : "RSVP'd to an event: Neighborhood Cleanup"}
                        </p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
