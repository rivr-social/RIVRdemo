"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Users, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import Link from "next/link"
import { groups as mockGroups, users as mockUsers, mockRings, mockFamilies } from "@/lib/mock-data"
import { GroupType, type Ring, type Family, type User, type FlowPass } from "@/lib/types"

interface Group {
  id: string
  name: string
  description: string
  members: string[]
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
  flowPasses?: FlowPass[] // Flow passes for automatic discounts
}

interface GroupFeedProps {
  groups?: (Group | Ring | Family)[]
  getMembers?: (memberIds: string[]) => User[]
  onJoinGroup?: (groupId: string) => void
  initialJoinedGroups?: string[]
  maxGroups?: number
  query?: string
  chapterId?: string
  includeAllTypes?: boolean // New prop to include all group types
}

export function GroupFeed({
  groups,
  getMembers,
  onJoinGroup,
  initialJoinedGroups = [],
  maxGroups,
  query = "",
  chapterId = "all",
  includeAllTypes = false,
}: GroupFeedProps) {
  const [joinedGroups, setJoinedGroups] = useState<string[]>(initialJoinedGroups)
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])

  // If groups is not provided, use mock data
  useEffect(() => {
    let groupsToUse = groups || []

    // If includeAllTypes is true and no groups provided, combine all types
    if (includeAllTypes && !groups) {
      groupsToUse = [...mockGroups, ...mockRings, ...mockFamilies]
    } else if (!groups) {
      groupsToUse = mockGroups
    }

    // Filter by query if provided
    if (query) {
      const lowerQuery = query.toLowerCase()
      groupsToUse = groupsToUse.filter(
        (group) =>
          group.name.toLowerCase().includes(lowerQuery) || group.description.toLowerCase().includes(lowerQuery),
      )
    }

    // Filter by chapter if provided and not "all"
    if (chapterId && chapterId !== "all") {
      groupsToUse = groupsToUse.filter((group) => group.chapterTags?.includes(chapterId))
    }

    // Apply maxGroups limit if provided
    if (maxGroups) {
      groupsToUse = groupsToUse.slice(0, maxGroups)
    }

    setFilteredGroups(groupsToUse)
  }, [groups, query, chapterId, maxGroups, includeAllTypes])

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

  return (
    <div className="space-y-4 mt-4">
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

        return (
          <Card key={group.id} className="border shadow-sm">
            <CardHeader className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-gray-200">
                    <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                    <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>
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
                      {group.flowPasses?.some(pass => pass.isActive && pass.type === "percentage" && pass.value === 10) && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Percent className="h-3 w-3" />
                            <span>Flow Pass</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <TypeIcon 
                    type={
                      group.type === GroupType.Ring ? "ring" :
                      group.type === GroupType.Family ? "family" :
                      group.type === GroupType.Basic ? "basic" :
                      "org"
                    } 
                    size={18} 
                    className="mr-2" 
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
                  {group.type === GroupType.Family && group.parentRingId && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      in {mockRings.find((r) => r.id === group.parentRingId)?.name || "Ring"}
                    </span>
                  )}
                  {group.type === GroupType.Ring && group.families && (
                    <span className="ml-2 text-xs text-muted-foreground">{group.families.length} families</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 bg-white">
              <p className="text-muted-foreground mb-4">{group.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-group" />
                  <span>{group.location?.city || group.chapterTags?.[0] || "Location not specified"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-group" />
                  <span>{memberCount} members</span>
                </div>
                {group.flowPasses?.some(pass => pass.isActive && pass.type === "percentage" && pass.value === 10) && (
                  <div className="flex items-center text-sm text-green-600">
                    <Percent className="h-4 w-4 mr-2 text-green-600" />
                    <span>10% off for members from same locale</span>
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
              <Button
                variant="secondary"
                onClick={() => handleJoinGroup(group.id)}
              >
                {isJoined ? "Joined" : "Join Group"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}

      {filteredGroups.length === 0 && <div className="text-center py-8 text-muted-foreground">No groups found</div>}
    </div>
  )
}
