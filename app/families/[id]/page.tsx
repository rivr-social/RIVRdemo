"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Globe, Mail, Phone } from "lucide-react"
import { mockFamilies, mockRings, mockUsers, posts as mockPosts, projects } from "@/lib/mock-data"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import { GroupType } from "@/lib/types"
import { PeopleFeed } from "@/components/people-feed"
import { PostFeed } from "@/components/post-feed"
import Link from "next/link"
import { FamilyTreasuryTab } from "@/components/family-treasury-tab"
import { FamilyActivityTab } from "@/components/family-activity-tab"

interface FamilyProfilePageProps {
  params: {
    id: string
  }
}

export default function FamilyProfilePage({ params }: FamilyProfilePageProps) {
  const [isJoined, setIsJoined] = useState(false)

  const family = mockFamilies.find((f) => f.id === params.id)

  if (!family) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Family Not Found</h1>
          <p className="text-muted-foreground">The family you're looking for doesn't exist.</p>
          <Link href="/families" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Families
          </Link>
        </div>
      </div>
    )
  }

  const parentRing = mockRings.find((ring) => ring.id === family.parentRingId)
  const members = family.members?.map((id) => mockUsers.find((user) => user.id === id)).filter(Boolean) || []
  const admins = family.adminIds?.map((id) => mockUsers.find((user) => user.id === id)).filter(Boolean) || []

  // Filter content for this family
  const familyPosts = mockPosts.filter((post) => post.groupTags?.includes(params.id))
  const familyEvents = projects.filter((project) => project.type === "event" && project.groupTags?.includes(params.id))

  // Helper functions
  const getUser = (userId: string) => {
    return mockUsers.find((user) => user.id === userId) || mockUsers[0]
  }

  const getGroup = (groupId: string) => {
    return mockFamilies.find((family) => family.id === groupId) || mockFamilies[0]
  }

  const getEventCreator = (eventId: string) => {
    return mockUsers[Math.floor(Math.random() * mockUsers.length)]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/families" className="text-primary hover:underline mr-4">
            ← Back to Families
          </Link>
          {parentRing && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Part of </span>
              <Link href={`/rings/${parentRing.id}`} className="text-primary hover:underline ml-1">
                {parentRing.name}
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-32 w-32 border-4 border-family">
            <AvatarImage src={family.image || "/placeholder.svg"} alt={family.name} />
            <AvatarFallback className="text-2xl">{family.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{family.name}</h1>
              <TypeIcon type={GroupType.Family} size={24} />
              <TypeBadge type={GroupType.Family} />
            </div>

            <p className="text-muted-foreground mb-4">{family.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{members.length} members</span>
              </div>
              {family.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{family.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Founded {new Date(family.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsJoined(!isJoined)}
                className={isJoined ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : ""}
              >
                {isJoined ? "Joined" : "Join Family"}
              </Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <PostFeed
            posts={familyPosts}
            events={familyEvents}
            groups={[]}
            getUser={getUser}
            getGroup={getGroup}
            getEventCreator={getEventCreator}
            onLike={(postId) => console.log("Liked post:", postId)}
            onComment={(postId) => console.log("Commented on post:", postId)}
            onShare={(postId) => console.log("Shared post:", postId)}
            onThank={(postId) => console.log("Thanked post:", postId)}
            onRsvp={(eventId, status) => console.log(`RSVP ${status} for event ${eventId}`)}
            includeAllTypes={true}
          />
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Family Members</h2>
            <Button>Invite Member</Button>
          </div>
          <PeopleFeed users={members} maxUsers={20} />
        </TabsContent>

        <TabsContent value="treasury" className="space-y-4">
          <FamilyTreasuryTab familyId={family.id} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <FamilyActivityTab familyId={family.id} />
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {family.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parentRing && (
                <div>
                  <h3 className="font-semibold mb-2">Parent Ring</h3>
                  <Link href={`/rings/${parentRing.id}`} className="text-primary hover:underline">
                    {parentRing.name}
                  </Link>
                </div>
              )}

              {family.mission && (
                <div>
                  <h3 className="font-semibold mb-2">Mission</h3>
                  <p className="text-muted-foreground">{family.mission}</p>
                </div>
              )}

              {family.history && (
                <div>
                  <h3 className="font-semibold mb-2">History</h3>
                  <p className="text-muted-foreground">{family.history}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {family.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a
                      href={family.website}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </div>
                )}

                {family.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${family.email}`} className="text-primary hover:underline">
                      {family.email}
                    </a>
                  </div>
                )}

                {family.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${family.phone}`} className="text-primary hover:underline">
                      {family.phone}
                    </a>
                  </div>
                )}
              </div>

              {family.tags && family.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {family.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                      <AvatarFallback>{admin.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{admin.name}</h3>
                      <p className="text-sm text-muted-foreground">@{admin.username}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
