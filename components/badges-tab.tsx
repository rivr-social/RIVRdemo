"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Award, Users, CheckCircle, Star, Leaf, Wrench, Target } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

// Mock badge data
const mockBadges = [
  {
    id: "badge1",
    name: "Plant Steward",
    description: "Certified to care for community plants and gardens",
    icon: "🌱",
    color: "#22c55e",
    category: "Environmental",
    requirements: ["Complete plant care training", "Maintain 5 plants for 30 days", "Pass plant knowledge quiz"],
    holders: ["user1", "user2", "user3"],
    jobsUnlocked: ["Water Plants", "Garden Maintenance", "Plant Health Monitoring"],
    createdAt: "2024-01-15",
    issuedBy: "user1",
  },
  {
    id: "badge2",
    name: "Event Coordinator",
    description: "Qualified to organize and manage community events",
    icon: "🎉",
    color: "#3b82f6",
    category: "Leadership",
    requirements: ["Organize 2 successful events", "Complete event planning course", "Get 3 positive reviews"],
    holders: ["user2", "user4"],
    jobsUnlocked: ["Event Planning", "Venue Management", "Community Outreach"],
    createdAt: "2024-01-20",
    issuedBy: "user1",
  },
  {
    id: "badge3",
    name: "Solar Installer",
    description: "Certified to install and maintain solar panels",
    icon: "☀️",
    color: "#f59e0b",
    category: "Technical",
    requirements: ["Complete solar installation training", "Pass safety certification", "Install 3 systems"],
    holders: ["user3", "user5"],
    jobsUnlocked: ["Solar Panel Installation", "System Maintenance", "Energy Audits"],
    createdAt: "2024-02-01",
    issuedBy: "user1",
  },
  {
    id: "badge4",
    name: "Community Organizer",
    description: "Experienced in mobilizing community members",
    icon: "📢",
    color: "#8b5cf6",
    category: "Leadership",
    requirements: ["Lead 5 community meetings", "Recruit 20 new members", "Complete organizing workshop"],
    holders: ["user1", "user4", "user6"],
    jobsUnlocked: ["Campaign Management", "Member Recruitment", "Meeting Facilitation"],
    createdAt: "2024-02-10",
    issuedBy: "user2",
  },
  {
    id: "badge5",
    name: "Bike Mechanic",
    description: "Skilled in bicycle repair and maintenance",
    icon: "🔧",
    color: "#ef4444",
    category: "Technical",
    requirements: ["Complete bike repair course", "Fix 10 bikes", "Pass mechanical assessment"],
    holders: ["user5", "user7"],
    jobsUnlocked: ["Bike Repair", "Maintenance Workshops", "Tool Management"],
    createdAt: "2024-02-15",
    issuedBy: "user3",
  },
]

interface BadgesTabProps {
  groupId: string
  currentUserId: string
  isAdmin: boolean
}

export function BadgesTab({ groupId, currentUserId, isAdmin }: BadgesTabProps) {
  const [activeTab, setActiveTab] = useState("available")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Filter badges for this group (in a real app, this would be based on groupId)
  const groupBadges = mockBadges

  // Get user's badges
  const userBadges = groupBadges.filter((badge) => badge.holders.includes(currentUserId))

  // Get available badges (not yet earned)
  const availableBadges = groupBadges.filter((badge) => !badge.holders.includes(currentUserId))

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Environmental":
        return <Leaf className="h-4 w-4" />
      case "Leadership":
        return <Users className="h-4 w-4" />
      case "Technical":
        return <Wrench className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const BadgeCard = ({ badge, isEarned = false }: { badge: any; isEarned?: boolean }) => (
    <Card className={`transition-all hover:shadow-md ${isEarned ? "border-green-200 bg-green-50" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: badge.color + "20" }}
            >
              {badge.icon}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {badge.name}
                {isEarned && <CheckCircle className="h-5 w-5 text-green-600" />}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getCategoryIcon(badge.category)}
                <span className="text-sm text-muted-foreground">{badge.category}</span>
              </div>
            </div>
          </div>
          <Badge variant={isEarned ? "default" : "secondary"} className="text-xs">
            {badge.holders.length} holders
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{badge.description}</p>

        {/* Requirements */}
        <div>
          <h4 className="font-medium text-sm mb-2">Requirements:</h4>
          <ul className="space-y-1">
            {badge.requirements.map((req: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Jobs Unlocked */}
        <div>
          <h4 className="font-medium text-sm mb-2">Jobs Unlocked:</h4>
          <div className="flex flex-wrap gap-1">
            {badge.jobsUnlocked.map((job: string) => (
              <Badge key={job} variant="outline" className="text-xs">
                {job}
              </Badge>
            ))}
          </div>
        </div>

        {/* Badge Holders */}
        <div>
          <h4 className="font-medium text-sm mb-2">Badge Holders:</h4>
          <div className="flex -space-x-2">
            {badge.holders.slice(0, 5).map((holderId: string) => {
              const holder = mockUsers.find((u) => u.id === holderId)
              return (
                <Avatar key={holderId} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={holder?.avatar || "/placeholder.svg"} alt={holder?.name} />
                  <AvatarFallback className="text-xs">{holder?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )
            })}
            {badge.holders.length > 5 && (
              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium">+{badge.holders.length - 5}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isEarned ? (
            <Button variant="outline" size="sm" className="w-full" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              Earned
            </Button>
          ) : (
            <Button variant="default" size="sm" className="w-full">
              <Target className="mr-2 h-4 w-4" />
              Work Towards Badge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Group Badges</h2>
          <p className="text-muted-foreground">Earn badges to unlock job opportunities and show your skills</p>
        </div>
        {isAdmin && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Badge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Badge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="badge-name">Badge Name</Label>
                    <Input id="badge-name" placeholder="e.g., Plant Steward" />
                  </div>
                  <div>
                    <Label htmlFor="badge-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="badge-description">Description</Label>
                  <Textarea id="badge-description" placeholder="Describe what this badge represents..." />
                </div>
                <div>
                  <Label>Requirements</Label>
                  <div className="space-y-2 mt-2">
                    <Input placeholder="Requirement 1" />
                    <Input placeholder="Requirement 2" />
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Requirement
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateModalOpen(false)}>Create Badge</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Badges</p>
                <p className="text-2xl font-bold">{groupBadges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Your Badges</p>
                <p className="text-2xl font-bold">{userBadges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold">{availableBadges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Progress</p>
                <p className="text-2xl font-bold">{Math.round((userBadges.length / groupBadges.length) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="available">Available Badges</TabsTrigger>
          <TabsTrigger value="earned">My Badges ({userBadges.length})</TabsTrigger>
          <TabsTrigger value="all">All Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {availableBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All Badges Earned!</h3>
                <p className="text-muted-foreground">
                  Congratulations! You've earned all available badges in this group.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="earned" className="space-y-4">
          {userBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} isEarned={true} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Badges Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start working towards your first badge to unlock job opportunities!
                </p>
                <Button onClick={() => setActiveTab("available")}>
                  <Target className="mr-2 h-4 w-4" />
                  Browse Available Badges
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} isEarned={badge.holders.includes(currentUserId)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
