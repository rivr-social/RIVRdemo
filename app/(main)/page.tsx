"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostFeed } from "@/components/post-feed"
import { GroupFeed } from "@/components/group-feed"
import { PeopleFeed } from "@/components/people-feed"
import { EventFeed } from "@/components/event-feed"
import { TopBar } from "@/components/top-bar"
import { posts, users, groups, projects, chapters as locales, marketplaceListings, mockRings, mockFamilies } from "@/lib/mock-data"
import type { Group, Ring, Family } from "@/lib/types"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MarketplaceFeed } from "@/components/marketplace-feed"

export default function Home() {
  const router = useRouter()
  const [selectedLocale, setSelectedLocale] = useState("all")
  const [activeTab, setActiveTab] = useState("posts")

  // Load selected chapter from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("selectedLocale") || localStorage.getItem("selectedChapter")
    if (savedLocale) {
      setSelectedLocale(savedLocale)
    }
  }, [])

  // Save selected chapter to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedLocale", selectedLocale)
  }, [selectedLocale])

  const handleLocaleChange = (localeId: string) => {
    console.log("Changing locale to:", localeId)
    setSelectedLocale(localeId)
  }

  const handleCreatePost = () => {
    router.push("/create")
  }

  // Filter posts by selected locale
  const filteredPosts = selectedLocale === "all" 
    ? posts 
    : posts.filter((post) => post.tags?.includes(selectedLocale) || post.groupTags?.includes(selectedLocale));

  // Filter events by selected locale
  const filteredEvents = projects.filter((project) => 
    project.type === "event" && (selectedLocale === "all" || project.chapterTags?.includes(selectedLocale))
  );

  // Filter groups by selected locale
  const filteredGroups = groups.filter((group) => 
    selectedLocale === "all" || group.tags?.includes(selectedLocale)
  );

  // Filter users by selected locale
  const filteredPeople = users.filter((user) => 
    selectedLocale === "all" || user.groupTags?.includes(selectedLocale)
  );

  // Filter marketplace by selected locale
  const filteredMarketplace = marketplaceListings.filter((listing) => 
    selectedLocale === "all" || listing.tags?.includes(selectedLocale)
  );

  // Get current chapter name
  const currentLocaleName =
    selectedLocale === "all" ? "All Locales" : locales.find((l) => l.id === selectedLocale)?.name || "All Locales"

  // Helper functions for components
  const getUser = (userId: string) => {
    return users.find((user) => user.id === userId) || users[0]
  }

  const getGroup = (groupId: string) => {
    return groups.find((group) => group.id === groupId) || groups[0]
  }

  const getGroupName = (groupId: string) => {
    const group = getGroup(groupId)
    return group.name
  }

  const getGroupId = (groupId: string) => {
    return groupId
  }

  const getEventCreator = (eventId: string) => {
    // In a real app, this would look up the actual creator
    // For now, just return a random user
    return users[Math.floor(Math.random() * users.length)]
  }

  const getCreatorName = (eventId: string) => {
    const creator = getEventCreator(eventId)
    return creator.name
  }

  const getCreatorUsername = (eventId: string) => {
    const creator = getEventCreator(eventId)
    return creator.username
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 pb-20">
      <TopBar selectedLocale={selectedLocale} onLocaleChange={handleLocaleChange} />
      <div className="mb-4">
        <h2 className="text-xl font-bold">{currentLocaleName}</h2>
      </div>

      {/* Post input box */}
      <div className="mb-6 p-4">
        <div className="flex gap-3">
          <Image
            src="/cameron-profile.png"
            alt="Your profile"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <Input
            placeholder="What's happening in your community?"
            className="bg-muted border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base cursor-pointer"
            onClick={handleCreatePost}
            readOnly
          />
        </div>
      </div>

      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-0">
          <PostFeed
            posts={filteredPosts}
            events={[]}
            groups={[]}
            getUser={(userId) => users.find((user) => user.id === userId) || users[0]}
            getGroup={(groupId) => groups.find((group) => group.id === groupId) || groups[0]}
            onLike={(postId) => console.log(`Liked post ${postId}`)}
            onComment={(postId) => console.log(`Commented on post ${postId}`)}
            onShare={(postId) => console.log(`Shared post ${postId}`)}
            onRsvp={(eventId, status) => console.log(`RSVP ${status} for event ${eventId}`)}
            includeAllTypes={false}
          />
        </TabsContent>
        <TabsContent value="events" className="mt-0">
          <EventFeed
            events={filteredEvents}
            getGroupName={getGroupName}
            getGroupId={getGroupId}
            getCreatorName={getCreatorName}
            getCreatorUsername={getCreatorUsername}
            onRsvpChange={(eventId, status) => console.log(`RSVP ${status} for event ${eventId}`)}
          />
        </TabsContent>
        <TabsContent value="groups" className="mt-0">
          <GroupFeed
            groups={filteredGroups}
            onJoinGroup={(groupId: string) => console.log(`Joined group ${groupId}`)}
            chapterId={selectedLocale}
            includeAllTypes={true}
          />
        </TabsContent>
        <TabsContent value="people" className="mt-0">
          <PeopleFeed people={filteredPeople} onConnect={(userId: string) => console.log(`Connected with user ${userId}`)} />
        </TabsContent>
        <TabsContent value="marketplace" className="mt-0">
          <MarketplaceFeed
            listings={filteredMarketplace}
            getSeller={(sellerId) => users.find((user) => user.id === sellerId) || users[0]}
            onSave={(listingId) => console.log(`Saved listing ${listingId}`)}
            onContact={(listingId) => console.log(`Contacting about listing ${listingId}`)}
            onShare={(listingId) => console.log(`Shared listing ${listingId}`)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
