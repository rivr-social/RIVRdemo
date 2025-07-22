"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, Crown, Shield, Star, Building2 } from "lucide-react"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import Link from "next/link"
import { groups as mockGroups, users as mockUsers, mockRings, mockFamilies } from "@/lib/mock-data"
import { GroupType, type Ring, type Family, type User } from "@/lib/types"

interface Group {
  id: string
  name: string
  description: string
  members: string[]
  adminIds?: string[]
  creatorId?: string
  avatar?: string
  location?: {
    lat: number
    lng: number
    city?: string
  }
  chapterTags?: string[]
  groupTags?: string[]
  type?: GroupType
  parentRingId?: string // For families
  families?: string[] // For rings
  createdAt?: string
}

interface ProfileGroupFeedProps {
  groups?: (Group | Ring | Family)[]
  currentUserId: string
  getMembers?: (memberIds: string[]) => User[]
  onJoinGroup?: (groupId: string) => void
  initialJoinedGroups?: string[]
  maxGroups?: number
}

export function ProfileGroupFeed({
  groups,
  currentUserId,
  getMembers,
  onJoinGroup,
  initialJoinedGroups = [],
  maxGroups,
}: ProfileGroupFeedProps) {
  const [joinedGroups, setJoinedGroups] = useState<string[]>(initialJoinedGroups)
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])

  // If groups is not provided, use mock data
  useEffect(() => {
    let groupsToUse = groups || mockGroups

    // Apply maxGroups limit if provided
    if (maxGroups) {
      groupsToUse = groupsToUse.slice(0, maxGroups)
    }

    setFilteredGroups(groupsToUse)
  }, [groups, maxGroups])

  const handleJoinGroup = (groupId: string) => {
    const newJoinedGroups = joinedGroups.includes(groupId)
      ? joinedGroups.filter((id) => id !== groupId)
      : [...joinedGroups, groupId]

    setJoinedGroups(newJoinedGroups)

    if (onJoinGroup) {
      onJoinGroup(groupId)
    }
  }

  // Default getMembers function if not provided
  const defaultGetMembers = (memberIds: string[]) => {
    return memberIds.map((id) => {
      const user = mockUsers.find((u) => u.id === id)
      return (
        user || {
          id,
          name: "Unknown User",
          username: "unknown",
        }
      )
    })
  }

  const getMembersFunction = getMembers || defaultGetMembers

  // Get user's role in a group
  const getUserRole = (group: Group | Ring | Family) => {
    if (group.creatorId === currentUserId) {
      return { role: "Founder", icon: Crown, color: "text-yellow-600", bgColor: "bg-yellow-100" }
    }
    if (group.adminIds?.includes(currentUserId)) {
      return { role: "Admin", icon: Shield, color: "text-purple-600", bgColor: "bg-purple-100" }
    }
    if (group.members?.includes(currentUserId)) {
      return { role: "Member", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" }
    }
    return { role: "Not a Member", icon: Users, color: "text-gray-600", bgColor: "bg-gray-100" }
  }

  // Get user's contributions and involvement
  const getUserInvolvement = (group: Group | Ring | Family) => {
    // This would be calculated from actual data in a real app
    // For now, we'll simulate some metrics
    const isActive = Math.random() > 0.5
    const contributionLevel = Math.floor(Math.random() * 100) + 1
    const joinDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const monthsActive = Math.floor((new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
    
    return {
      isActive,
      contributionLevel,
      joinDate,
      monthsActive: Math.max(1, monthsActive),
      pointsEarned: Math.floor(Math.random() * 500) + 50,
      eventsAttended: Math.floor(Math.random() * 20) + 1,
    }
  }

  return (
    <div className="space-y-6 mt-4">
      {filteredGroups.map((group) => {
        const memberCount =
          group.type === GroupType.Ring
            ? group.families?.reduce((total, familyId) => {
                const family = mockFamilies.find((f) => f.id === familyId)
                return total + (family?.members?.length || 0)
              }, 0) || 0
            : group.members?.length || 0
        const memberAvatars = getMembersFunction((group.members || []).slice(0, 3))
        const isJoined = joinedGroups.includes(group.id)
        const userRole = getUserRole(group)
        const userInvolvement = getUserInvolvement(group)
        const RoleIcon = userRole.icon

        return (
          <Card key={group.id} className="border shadow-sm">
            <CardHeader className="p-4 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14 border-2 border-gray-200">
                    <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                    <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        href={
                          group.type === GroupType.Ring
                            ? `/rings/${group.id}`
                            : group.type === GroupType.Family
                              ? `/families/${group.id}`
                              : `/groups/${group.id}`
                        }
                        className="text-xl font-bold hover:underline"
                      >
                        {group.name}
                      </Link>
                      <TypeIcon 
                        type={
                          group.type === GroupType.Ring ? "ring" :
                          group.type === GroupType.Family ? "family" :
                          group.type === GroupType.Basic ? "basic" :
                          "org"
                        } 
                        size={16} 
                        className="text-gray-500" 
                      />
                      <TypeBadge 
                        type={
                          group.type === GroupType.Ring ? "ring" :
                          group.type === GroupType.Family ? "family" :
                          group.type === GroupType.Basic ? "basic" :
                          "org"
                        } 
                        showIcon={false} 
                      />
                    </div>
                    
                    {/* User Role Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="secondary" 
                        className={`${userRole.bgColor} ${userRole.color} border-0`}
                      >
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {userRole.role}
                      </Badge>
                      {userInvolvement.isActive && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Star className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    Member for {userInvolvement.monthsActive} month{userInvolvement.monthsActive !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-400">
                    Since {userInvolvement.joinDate.toLocaleDateString([], { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-0 bg-white">
              <p className="text-muted-foreground mb-4">{group.description}</p>
              
              {/* User Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{userInvolvement.pointsEarned}</div>
                  <div className="text-xs text-gray-500">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{userInvolvement.eventsAttended}</div>
                  <div className="text-xs text-gray-500">Events Attended</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{userInvolvement.contributionLevel}%</div>
                  <div className="text-xs text-gray-500">Contribution</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {group.adminIds?.includes(currentUserId) ? 'Yes' : 'No'}
                  </div>
                  <div className="text-xs text-gray-500">Leadership Role</div>
                </div>
              </div>

              {/* Group Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-group" />
                  <span>{group.location?.city || group.chapterTags?.[0] || "Location not specified"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-group" />
                  <span>{memberCount} members</span>
                </div>
                {group.type === GroupType.Family && group.parentRingId && (
                  <div className="flex items-center text-sm">
                    <Building2 className="h-4 w-4 mr-2 text-group" />
                    <span>Part of {mockRings.find((r) => r.id === group.parentRingId)?.name || "Ring"}</span>
                  </div>
                )}
                {group.createdAt && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-group" />
                    <span>Established {new Date(group.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-between items-center bg-gray-50">
              <div className="flex -space-x-2">
                {memberAvatars.map((member, i) => (
                  <Avatar key={i} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
                {memberCount > 3 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium border-2 border-white">
                    +{memberCount - 3}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Link
                  href={
                    group.type === GroupType.Ring
                      ? `/rings/${group.id}`
                      : group.type === GroupType.Family
                        ? `/families/${group.id}`
                        : `/groups/${group.id}`
                  }
                >
                  <Button variant="outline" size="sm">
                    View Group
                  </Button>
                </Link>
                {userRole.role !== "Not a Member" && (
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Manage
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        )
      })}

      {filteredGroups.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No groups found</div>
      )}
    </div>
  )
}