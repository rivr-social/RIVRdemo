"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Settings,
  Users,
  Calendar,
  LinkIcon,
  Vote,
  PieChart,
  Info,
  MessageSquare,
  MapPin,
  Globe,
  Mail,
  Phone,
  FileText,
  Shield,
  ShoppingBag,
  DollarSign,
  Briefcase,
  Bell,
  Check,
  UserPlus,
  Percent
} from "lucide-react"
import { FlowPassModal } from "@/components/flow-pass-modal"
import { mockGroups, mockUsers, mockEvents, posts as mockPosts, bookClubPosts } from "@/lib/mock-data"
import { Group, GroupType, Post, User } from "@/lib/types"
import { mockGroupMarketplaceListings } from "@/lib/mock-group-marketplace-data"
import { PostFeed } from "@/components/post-feed"
import { EventFeed } from "@/components/event-feed"
import { PeopleFeed } from "@/components/people-feed"
import { GroupAdminManager } from "@/components/group-admin-manager"
import { GroupRelationships } from "@/components/group-relationships"
import { GroupMarketplaceFeed } from "@/components/group-marketplace-feed"
import { GovernanceTab } from "@/components/governance-tab"
import { StakeTab } from "@/components/stake-tab"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TreasuryTab } from "@/components/treasury-tab"
import { JobBoardTab } from "@/components/job-board-tab"
import { BadgesTab } from "@/components/badges-tab"


export default function GroupPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about") // Changed default to "about"
  const [isJoined, setIsJoined] = useState(false)
  const [flowPassModalOpen, setFlowPassModalOpen] = useState(false)
  const [isBasicMember, setIsBasicMember] = useState(false) // Mock state for basic membership

  // Mock current user - in a real app, this would come from authentication
  const currentUserId = "user1"
  const currentUser = mockUsers.find((user) => user.id === currentUserId)

  // Get group ID from URL params
  const groupId = params?.id as string

  // Find the group from mock data
  const group = mockGroups.find((g) => g.id === groupId)

  // Check if current user is admin or creator
  const isAdmin = group?.adminIds?.includes(currentUserId) || group?.creatorId === currentUserId

  // Get group members
  const groupMembers =
    group?.members?.map((memberId) => mockUsers.find((user) => user.id === memberId)).filter(Boolean) || []

  // Get group events
  const groupEvents = mockEvents.filter((event) => event.groupId === groupId)

  // Get group posts
  const allPosts = groupId === "group0" ? [...mockPosts, ...bookClubPosts] : mockPosts
  const groupPosts = allPosts.filter((post) => post.groupId === groupId || post.groupTags?.includes(groupId))

  // Get group marketplace listings
  const groupMarketplaceListings = mockGroupMarketplaceListings.filter((listing) => listing.groupId === groupId)

  // Get group admins
  const groupAdmins = group?.adminIds ? groupMembers.filter((member) => group.adminIds?.includes(member?.id || "")) : []

  // Get group creator
  const groupCreator = mockUsers.find((user) => user.id === group?.creatorId)

  // Group stats
  const stats = {
    members: group?.members?.length || 0,
    posts: groupPosts.length,
    events: groupEvents.length,
    founded: group?.createdAt ? new Date(group.createdAt).toLocaleDateString() : "Unknown",
    location: group?.location || "Global",
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!group) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Group Not Found"
          description="The group you're looking for doesn't exist or has been removed."
          action={{
            label: "Browse Groups",
            onClick: () => router.push("/groups")
          }}
        />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 pb-20">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="relative mb-6">
        <div
          className="h-40 rounded-t-lg bg-gradient-to-r"
          style={{
            backgroundColor: group.color || "#4f46e5",
            backgroundImage: group.coverImage ? `url(${group.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-6">
          <div
            className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg"
            style={{ backgroundColor: group.color || "#4f46e5" }}
          >
            <div
              className="w-full h-full rounded-xl bg-white flex items-center justify-center text-2xl font-bold"
              style={{ color: group.color || "#4f46e5" }}
            >
              {group.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="absolute bottom-0 right-0 mb-2 mr-2">
            <Button size="sm" variant="secondary" onClick={() => router.push(`/groups/${groupId}/edit`)}>
              <Settings className="mr-2 h-4 w-4" />
              Edit Group
            </Button>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            {group.flowPasses?.some(pass => pass.isActive && pass.type === "percentage" && pass.value === 10) && (
              <Button 
                onClick={() => setFlowPassModalOpen(true)}
                variant="secondary"
                size="sm"
                className="ml-2 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
              >
                <Percent className="mr-1 h-4 w-4" />
                Flow Pass: 10% Off
              </Button>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{group.members?.length || 0} members</p>
          {group.flowPasses?.some(pass => pass.isActive && pass.type === "percentage" && pass.value === 10) && (
            <p className="text-xs text-green-600 mt-1">
              Basic members from the same locale get 10% off marketplace offerings
            </p>
          )}
        </div>
        
        {/* Flow Pass Modal */}
        {group.flowPasses?.some(pass => pass.isActive && pass.type === "percentage" && pass.value === 10) && (
          <FlowPassModal
            open={flowPassModalOpen}
            onClose={() => setFlowPassModalOpen(false)}
            groupName={group.name}
            isBasicMember={isBasicMember}
            onEngageFlowPass={() => {
              console.log('Flow Pass engaged for', group.name);
              // In a real app, this would call an API to activate the Flow Pass
            }}
            onJoinBasic={() => {
              console.log('Joining Basic membership');
              // In a real app, this would redirect to membership signup
              setIsBasicMember(true); // For demo purposes
            }}
          />
        )}
        <div className="flex gap-2">
          {/* Notification settings button */}
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => console.log('Notification settings clicked')}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          
          {/* Join/Leave button that changes state after joining */}
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => {
              // Toggle join status
              setIsJoined(!isJoined);
              console.log(isJoined ? 'Leaving group' : 'Joining group');
              // In a real app, this would call an API to join/leave the group
              // and then update the state
            }}
          >
            {isJoined ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Joined
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Join
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        {group.type === GroupType.Basic ? (
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="about" className="flex items-center justify-center">
              <Info className="mr-2 h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="feed">
              <MessageSquare className="mr-2 h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center justify-center">
              <LinkIcon className="mr-2 h-4 w-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
          </TabsList>
        ) : (
          <TabsList className="grid grid-cols-12 mb-8">
            <TabsTrigger value="about" className="flex items-center justify-center">
              <Info className="mr-2 h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="feed">
              <MessageSquare className="mr-2 h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center justify-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Market
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center justify-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center justify-center">
              <Shield className="mr-2 h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center justify-center">
              <LinkIcon className="mr-2 h-4 w-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center justify-center">
              <Vote className="mr-2 h-4 w-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="stake" className="flex items-center justify-center">
              <PieChart className="mr-2 h-4 w-4" />
              Stake
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="treasury" className="flex items-center justify-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Treasury
              </TabsTrigger>
            )}
          </TabsList>
        )}

        <TabsContent value="about" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main About Content */}
            <div className="col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    About This Group
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{group.description || "No description provided."}</p>

                    {/* Mission Statement */}
                    {group.mission && (
                      <>
                        <h3 className="text-lg font-semibold mt-4">Our Mission</h3>
                        <p>{group.mission}</p>
                      </>
                    )}

                    {/* Group Rules */}
                    <h3 className="text-lg font-semibold mt-4">Group Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Be respectful and considerate of all members</li>
                      <li>Share relevant content and resources</li>
                      <li>Collaborate and support fellow members</li>
                      <li>Follow community standards and local laws</li>
                      {group.rules?.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Core Documents - Only show for non-basic groups */}
              {group.type !== GroupType.Basic && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Core Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Foundational Documents</h4>
                          <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Mission Statement
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Vision Statement
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Manifesto
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Whitepaper
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Litepaper
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Governance Documents</h4>
                          <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Articles of Incorporation
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Bylaws
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <Briefcase className="h-4 w-4 mr-2" />
                              Operating Agreement
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2" onClick={() => router.push(`/groups/${groupId}/docs`)}>
                              <Users className="h-4 w-4 mr-2" />
                              Member-Class Agreements
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Documents available to members only. Contact administrators for access.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Leadership */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Leadership & Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Board of Directors */}
                    <div>
                      <h4 className="font-medium mb-3">Board of Directors</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {groupAdmins.slice(0, 4).map((admin) => (
                          <div key={admin?.id} className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={admin?.avatar} alt={admin?.name} />
                              <AvatarFallback>{admin?.name?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{admin?.name}</p>
                              <p className="text-xs text-muted-foreground">Board Member</p>
                            </div>
                          </div>
                        ))}
                        {groupCreator && (
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={groupCreator.avatar} alt={groupCreator.name} />
                              <AvatarFallback>{groupCreator.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{groupCreator.name}</p>
                              <p className="text-xs text-muted-foreground">Founder & Chairman</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Management Team */}
                    <div>
                      <h4 className="font-medium mb-3">Management Team</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {groupAdmins.slice(0, 3).map((admin, index) => (
                          <div key={admin?.id} className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={admin?.avatar} alt={admin?.name} />
                              <AvatarFallback>{admin?.name?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{admin?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {index === 0 ? "Chief Executive" : index === 1 ? "Chief Operations" : "Chief Technology"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="min-w-[100px] font-medium">Founded</div>
                      <div>{stats.founded}</div>
                    </div>
                    {group.history && (
                      <div>
                        <h3 className="font-medium mb-2">Our Story</h3>
                        <p>{group.history}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium mb-2">Milestones</h3>
                      <div className="space-y-2">
                        <div className="flex">
                          <div className="min-w-[100px] text-muted-foreground">{stats.founded}</div>
                          <div>Group founded by {groupCreator?.name || "Unknown"}</div>
                        </div>
                        {group.milestones?.map((milestone, index) => (
                          <div key={index} className="flex">
                            <div className="min-w-[100px] text-muted-foreground">{milestone.date}</div>
                            <div>{milestone.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              {group.location && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>{group.location}</p>
                      {group.meetingLocation && (
                        <div className="mt-2">
                          <h3 className="font-medium">Meeting Location</h3>
                          <p>{group.meetingLocation}</p>
                        </div>
                      )}
                      {/* Map placeholder */}
                      <div className="mt-4 h-[200px] bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Map view</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Group Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">{stats.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posts</span>
                      <span className="font-medium">{stats.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Events</span>
                      <span className="font-medium">{stats.events}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-medium">{stats.founded}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.tags && group.tags.length > 0 ? (
                      group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No tags added</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={group.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {group.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {group.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${group.email}`} className="text-sm hover:underline">
                        {group.email}
                      </a>
                    </div>
                  )}
                  {group.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${group.phone}`} className="text-sm hover:underline">
                        {group.phone}
                      </a>
                    </div>
                  )}
                  {!group.website && !group.email && !group.phone && (
                    <p className="text-muted-foreground text-sm">No contact information provided</p>
                  )}
                </CardContent>
              </Card>

              {/* Admins */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Admins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-3">
                      {groupCreator && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={groupCreator.avatar || "/placeholder.svg"} alt={groupCreator.name} />
                              <AvatarFallback>{groupCreator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{groupCreator.name}</div>
                              <div className="text-xs text-muted-foreground">Creator</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            Message
                          </Button>
                        </div>
                      )}

                      {groupAdmins.map(
                        (admin) =>
                          admin &&
                          admin.id !== group.creatorId && (
                            <div key={admin.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                                  <AvatarFallback>{admin.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{admin.name}</div>
                                  <div className="text-xs text-muted-foreground">Admin</div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                Message
                              </Button>
                            </div>
                          ),
                      )}

                      {groupAdmins.length === 0 && !groupCreator && (
                        <p className="text-muted-foreground text-sm">No admins found</p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4">
          <PostFeed posts={groupPosts} />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {groupEvents.length > 0 ? (
            <EventFeed events={groupEvents} />
          ) : (
            <EmptyState
              icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
              title="No Events"
              description="This group hasn't scheduled any events yet."
              action={isAdmin ? {
                label: "Create Event",
                onClick: () => router.push("/events/create")
              } : undefined}
            />
          )}
        </TabsContent>

        {group.type !== GroupType.Basic && (
          <>
            <TabsContent value="marketplace" className="space-y-4">
              <GroupMarketplaceFeed
                listings={groupMarketplaceListings}
                getSeller={(id) => mockUsers.find((user) => user.id === id) || mockUsers[0]}
                groupId={groupId}
                currentUserId={currentUserId}
                onSave={(id) => console.log("Save listing", id)}
                onContact={(id) => console.log("Contact about listing", id)}
                onShare={(id) => console.log("Share listing", id)}
              />
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <JobBoardTab groupId={groupId} currentUserId={currentUserId} />
            </TabsContent>

            <TabsContent value="badges" className="space-y-4">
              <BadgesTab groupId={groupId} currentUserId={currentUserId} isAdmin={isAdmin} />
            </TabsContent>

            
              
            <TabsContent value="members" className="space-y-4">
              {isAdmin && (
                <GroupAdminManager
                  groupId={group.id}
                  members={(group.members || []).filter(Boolean)}
                  admins={group.adminIds || []}
                  creator={group.creatorId || ""}
                  onAdminChange={(newAdmins) => console.log("Admin change:", newAdmins)}
                />
              )}

              {groupMembers.length > 0 ? (
                <PeopleFeed people={groupMembers.filter(Boolean) as User[]} />
              ) : (
                <EmptyState
                  icon={<Users className="h-12 w-12 text-muted-foreground" />}
                  title="No Members"
                  description="This group doesn't have any members yet."
                />
              )}
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <GroupRelationships group={group} allGroups={mockGroups} isAdmin={isAdmin} currentUserId={currentUserId} />
            </TabsContent>

            <TabsContent value="governance" className="space-y-4">
              <GovernanceTab groupId={groupId} />
            </TabsContent>

            <TabsContent value="stake" className="space-y-4">
              <StakeTab groupId={groupId} />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="treasury" className="space-y-4">
                <TreasuryTab groupId={groupId} />
              </TabsContent>
            )}
          </>
        )}
      </Tabs>
    </div>
  )
}
