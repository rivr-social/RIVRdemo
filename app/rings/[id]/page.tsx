"use client"

import { useState } from "react"
import React from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Globe, Mail, Phone, DollarSign, Heart, Shield, FileText, Coins, Handshake, Gift, Package } from "lucide-react"
import { mockRings, mockFamilies, mockUsers, posts as mockPosts, projects, mockJointVentures, mockGroups } from "@/lib/mock-data"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import { GroupType } from "@/lib/types"
import { FamilyFeed } from "@/components/family-feed"
import { PostFeed } from "@/components/post-feed"
import { GovernanceTab } from "@/components/governance-tab"
import { VoucherPoolTab } from "@/components/voucher-pool-tab"
import Link from "next/link"
import { RingTreasuryTab } from "@/components/ring-treasury-tab"
import { MutualAssetsTab } from "@/components/mutual-assets-tab"

interface RingProfilePageProps {
  params: {
    id: string
  }
}

export default function RingProfilePage({ params }: RingProfilePageProps) {
  const [isJoined, setIsJoined] = useState(false)
  const router = useRouter()
  
  // Access params directly for now, but add a comment about the warning
  // In a future version of Next.js, we'll need to use React.use(params)
  const ringId = params.id
  
  const ring = mockRings.find((r) => r.id === ringId)

  if (!ring) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ring Not Found</h1>
          <p className="text-muted-foreground">The ring you're looking for doesn't exist.</p>
          <Link href="/rings" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Rings
          </Link>
        </div>
      </div>
    )
  }

  const ringFamilies = mockFamilies.filter((family) => family.parentRingId === ring.id)
  const totalMembers = ringFamilies.reduce((total, family) => total + (family.members?.length || 0), 0)
  const admins = ring.adminIds?.map((id) => mockUsers.find((user) => user.id === id)).filter(Boolean) || []

  // Filter content for this ring
  const ringPosts = mockPosts.filter((post) => post.groupTags?.includes(ringId))
  const ringEvents = projects.filter((project) => project.type === "event" && project.groupTags?.includes(ringId))

  // Helper functions
  const getUser = (userId: string) => {
    return mockUsers.find((user) => user.id === userId) || mockUsers[0]
  }

  const getGroup = (groupId: string) => {
    return mockRings.find((ring) => ring.id === groupId) || mockRings[0]
  }

  const getEventCreator = (eventId: string) => {
    return mockUsers[Math.floor(Math.random() * mockUsers.length)]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/rings" className="text-primary hover:underline mr-4">
            ← Back to Rings
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-32 w-32 border-4 border-ring">
            <AvatarImage src={ring.image || "/placeholder.svg"} alt={ring.name} />
            <AvatarFallback className="text-2xl">{ring.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{ring.name}</h1>
              <TypeIcon type={GroupType.Ring} size={24} />
              <TypeBadge type={GroupType.Ring} />
            </div>

            <p className="text-muted-foreground mb-4">{ring.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {totalMembers} members across {ringFamilies.length} families
                </span>
              </div>
              {ring.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{ring.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Founded {new Date(ring.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/rings/${ring.id}/docs`)}
                className={isJoined ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : ""}
              >
                {isJoined ? "Joined" : "Join Ring"}
              </Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="families">Families</TabsTrigger>
          <TabsTrigger value="assets">Mutual Assets</TabsTrigger>
          <TabsTrigger value="vouchers">Voucher Pool</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="joint-ventures">Joint Ventures</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <PostFeed posts={ringPosts} />
        </TabsContent>

        <TabsContent value="families" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Families in this Ring</h2>
            <Button>Create Family</Button>
          </div>
          <FamilyFeed families={ringFamilies} maxFamilies={20} />
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <MutualAssetsTab ringId={ring.id} />
        </TabsContent>

        <TabsContent value="vouchers" className="space-y-4">
          <VoucherPoolTab ringId={ring.id} />
        </TabsContent>

        <TabsContent value="treasury" className="space-y-4">
          <RingTreasuryTab ringId={ring.id} />
        </TabsContent>

        <TabsContent value="joint-ventures" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Joint Venture Organizations</h2>
            <Button>Propose New Venture</Button>
          </div>
          
          <div className="grid gap-6">
            {/* Active Joint Venture Businesses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Handshake className="h-5 w-5 mr-2" />
                  Operating Businesses
                </CardTitle>
                <p className="text-sm text-gray-600">Full organizations with projects, products, and profit flows</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJointVentures
                    .filter(venture => venture.parentRings.includes(ring.id))
                    .map((venture) => {
                      const ventureOrg = mockGroups.find(org => org.id === venture.orgId)
                      return (
                        <div key={venture.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={ventureOrg?.avatar} />
                                <AvatarFallback>{venture.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium text-lg">{venture.name}</h3>
                                <p className="text-sm text-gray-600">{venture.industry} • {venture.businessModel}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge 
                                variant="secondary" 
                                className={
                                  venture.status === "profitable" ? "bg-green-100 text-green-800" :
                                  venture.status === "active" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {venture.status.charAt(0).toUpperCase() + venture.status.slice(1)}
                              </Badge>
                              {venture.netProfit && (
                                <span className="text-sm font-medium text-green-600">
                                  +${venture.netProfit.toLocaleString()}/mo profit
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4">{venture.description}</p>
                          
                          {/* Financial Summary */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded">
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Monthly Revenue</p>
                              <p className="font-medium">${venture.monthlyRevenue?.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Monthly Expenses</p>
                              <p className="font-medium">${venture.monthlyExpenses?.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Net Profit</p>
                              <p className="font-medium text-green-600">${venture.netProfit?.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Ring Flow</p>
                              <p className="font-medium text-blue-600">${venture.flowVolume?.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Ownership Structure */}
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Ownership Distribution</p>
                            <div className="flex gap-2">
                              {venture.ownershipShares.map((share) => {
                                const ownerRing = mockRings.find(r => r.id === share.ringId)
                                return (
                                  <div key={share.ringId} className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded">
                                    <span className="font-medium">{ownerRing?.name || share.ringId}</span>
                                    <span className="text-gray-600">{share.percentage}%</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span className="text-gray-500">Founded: {new Date(venture.foundedDate).getFullYear()}</span>
                              <span className="text-gray-500">Members: {ventureOrg?.memberCount}</span>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/groups/${venture.orgId}`}>
                                <Button variant="outline" size="sm">View Organization</Button>
                              </Link>
                              <Button size="sm">Financial Details</Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Venture Proposals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Pending Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-dashed rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">Community Tool Library Network</h3>
                        <p className="text-sm text-gray-600">Proposed by: Community Makers Ring</p>
                      </div>
                      <Badge variant="outline">Under Review</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Inter-ring tool sharing network with standardized borrowing system and maintenance protocols.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">Interested rings: 6</span>
                        <span className="text-gray-500">Est. investment: $25,000</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button size="sm">Join Interest</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-dashed rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">Mutual Aid Emergency Fund</h3>
                        <p className="text-sm text-gray-600">Proposed by: Solidarity Circle Ring</p>
                      </div>
                      <Badge variant="outline">Under Review</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Cross-ring emergency assistance fund for urgent community needs and crisis response.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">Interested rings: 8</span>
                        <span className="text-gray-500">Est. investment: $50,000</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button size="sm">Join Interest</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venture Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Joint Venture Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Core Principles</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                      <li>Mutual benefit and shared ownership</li>
                      <li>Democratic decision-making across all participating rings</li>
                      <li>Transparent financial management and reporting</li>
                      <li>Alignment with each ring's values and mission</li>
                      <li>Equitable resource contribution and benefit sharing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Proposal Process</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-medium mb-1">1. Submit Proposal</div>
                        <div className="text-gray-600">Ring submits detailed venture proposal with goals, timeline, and resource requirements</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-medium mb-1">2. Community Review</div>
                        <div className="text-gray-600">All rings review proposal and express interest or concerns through governance process</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-medium mb-1">3. Collaborative Planning</div>
                        <div className="text-gray-600">Interested rings work together to refine proposal and establish partnership terms</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <GovernanceTab groupId={ring.id} />
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main About Content */}
            <div className="col-span-2 space-y-6">
              {/* Ring Philosophy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Ring Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{ring.description || "No description provided."}</p>

                    {/* Mission Statement */}
                    {ring.mission && (
                      <>
                        <h3 className="text-lg font-semibold mt-4">Our Mission</h3>
                        <p>{ring.mission}</p>
                      </>
                    )}

                    {/* Mutual Aid Principles */}
                    <h3 className="text-lg font-semibold mt-4">Mutual Aid Principles</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Solidarity not charity - we support each other as equals</li>
                      <li>Direct action - we meet each other's needs directly</li>
                      <li>Political education - we learn and grow together</li>
                      <li>Resource sharing - what we have, we share</li>
                      <li>Community care - we look after one another</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Sharing Framework */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Handshake className="h-5 w-5 mr-2" />
                    Resource Sharing Framework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-medium">Treasury Pool</h4>
                        <p className="text-sm text-muted-foreground">Shared financial resources</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-medium">Mutual Assets</h4>
                        <p className="text-sm text-muted-foreground">Collectively owned tools & resources</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Gift className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h4 className="font-medium">Voucher Pool</h4>
                        <p className="text-sm text-muted-foreground">Skills & services exchange</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">How It Works</h4>
                      <p className="text-sm text-muted-foreground">
                        Members contribute resources according to their ability and access them according to their need. 
                        Resource allocation is decided democratically by member families, with consideration for emergency 
                        needs and long-term sustainability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Core Documents */}
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
                        <h4 className="font-medium text-sm">Community Documents</h4>
                        <div className="space-y-1">
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Heart className="h-4 w-4 mr-2" />
                            Mutual Aid Charter
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Handshake className="h-4 w-4 mr-2" />
                            Resource Sharing Agreement
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Users className="h-4 w-4 mr-2" />
                            Community Guidelines
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Shield className="h-4 w-4 mr-2" />
                            Conflict Resolution Process
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Economic Documents</h4>
                        <div className="space-y-1">
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Treasury Protocols
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Package className="h-4 w-4 mr-2" />
                            Asset Pooling Agreement
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Coins className="h-4 w-4 mr-2" />
                            Member Contribution Guidelines
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                            <Gift className="h-4 w-4 mr-2" />
                            Voucher System Rules
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Documents available to all ring members. Contact ring stewards for access.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ring Stewardship */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Ring Stewardship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Ring Stewards */}
                    <div>
                      <h4 className="font-medium mb-3">Ring Stewards</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {admins.slice(0, 4).map((admin, index) => (
                          <div key={admin.id} className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={admin.avatar} alt={admin.name} />
                              <AvatarFallback>{admin.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{admin.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {index === 0 ? "Lead Steward" : index === 1 ? "Treasury Steward" : index === 2 ? "Asset Coordinator" : "Community Facilitator"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Family Representatives */}
                    <div>
                      <h4 className="font-medium mb-3">Family Representatives</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ringFamilies.slice(0, 4).map((family) => {
                          const familyRep = mockUsers.find(user => family.members?.includes(user.id)) || mockUsers[0]
                          return (
                            <div key={family.id} className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={familyRep.avatar} alt={familyRep.name} />
                                <AvatarFallback>{familyRep.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{familyRep.name}</p>
                                <p className="text-xs text-muted-foreground">Rep for {family.name}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ring History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Ring History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="min-w-[100px] font-medium">Founded</div>
                      <div>{new Date(ring.createdAt).toLocaleDateString()}</div>
                    </div>
                    {ring.history && (
                      <div>
                        <h3 className="font-medium mb-2">Our Story</h3>
                        <p>{ring.history}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium mb-2">Milestones</h3>
                      <div className="space-y-2">
                        <div className="flex">
                          <div className="min-w-[100px] text-muted-foreground">{new Date(ring.createdAt).toLocaleDateString()}</div>
                          <div>Ring established with mutual aid principles</div>
                        </div>
                        {ring.milestones?.map((milestone, index) => (
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ring Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Ring Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Families</span>
                      <span className="font-medium">{ringFamilies.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Members</span>
                      <span className="font-medium">{totalMembers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assets Shared</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Vouchers</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ring.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={ring.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {ring.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {ring.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${ring.email}`} className="text-sm hover:underline">
                        {ring.email}
                      </a>
                    </div>
                  )}
                  {ring.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${ring.phone}`} className="text-sm hover:underline">
                        {ring.phone}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ring.tags && ring.tags.length > 0 ? (
                      ring.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No focus areas added</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ring Administrators</CardTitle>
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
