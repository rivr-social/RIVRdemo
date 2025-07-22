"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import Link from "next/link"
import { mockFamilies, mockRings, users as mockUsers } from "@/lib/mock-data"
import type { Family, Ring, User } from "@/lib/types"

interface FamilyFeedProps {
  families?: Family[]
  rings?: Ring[]
  getMembers?: (memberIds: string[]) => User[]
  onJoinFamily?: (familyId: string) => void
  initialJoinedFamilies?: string[]
  maxFamilies?: number
  query?: string
  chapterId?: string
  ringId?: string
}

export function FamilyFeed({
  families,
  rings,
  getMembers,
  onJoinFamily,
  initialJoinedFamilies = [],
  maxFamilies,
  query = "",
  chapterId = "all",
  ringId,
}: FamilyFeedProps) {
  const [joinedFamilies, setJoinedFamilies] = useState<string[]>(initialJoinedFamilies)
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([])

  // If families is not provided, use mock data
  useEffect(() => {
    let familiesToUse = families || mockFamilies

    // Filter by ring if provided
    if (ringId) {
      familiesToUse = familiesToUse.filter((family) => family.parentRingId === ringId)
    }

    // Filter by query if provided
    if (query) {
      const lowerQuery = query.toLowerCase()
      familiesToUse = familiesToUse.filter(
        (family) =>
          family.name.toLowerCase().includes(lowerQuery) || family.description.toLowerCase().includes(lowerQuery),
      )
    }

    // Filter by chapter if provided and not "all"
    if (chapterId && chapterId !== "all") {
      familiesToUse = familiesToUse.filter((family) => family.chapterTags?.includes(chapterId))
    }

    // Apply maxFamilies limit if provided
    if (maxFamilies) {
      familiesToUse = familiesToUse.slice(0, maxFamilies)
    }

    setFilteredFamilies(familiesToUse)
  }, [families, query, chapterId, maxFamilies, ringId])

  const handleJoinFamily = (familyId: string) => {
    const newJoinedFamilies = joinedFamilies.includes(familyId)
      ? joinedFamilies.filter((id) => id !== familyId)
      : [...joinedFamilies, familyId]

    setJoinedFamilies(newJoinedFamilies)

    if (onJoinFamily) {
      onJoinFamily(familyId)
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

  // Get ring name for a family
  const getRingName = (parentRingId: string) => {
    const ringsToUse = rings || mockRings
    const ring = ringsToUse.find((r) => r.id === parentRingId)
    return ring?.name || "Unknown Ring"
  }

  return (
    <div className="space-y-4 mt-4">
      {filteredFamilies.map((family) => {
        const memberCount = family.members?.length || 0
        const memberAvatars = getMembersFunction(family.members?.slice(0, 3) || [])
        const isJoined = joinedFamilies.includes(family.id)
        const ringName = getRingName(family.parentRingId)

        return (
          <Card key={family.id} className="border shadow-sm">
            <CardHeader className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-gray-200">
                    <AvatarImage src={family.image || "/placeholder.svg"} alt={family.name} />
                    <AvatarFallback>{family.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/families/${family.id}`} className="text-xl font-bold hover:underline">
                      {family.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Part of{" "}
                      <Link href={`/rings/${family.parentRingId}`} className="text-purple-600 hover:underline">
                        {ringName}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TypeIcon type="family" size={18} className="mr-2" />
                  <TypeBadge type="family" showIcon={false} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 bg-white">
              <p className="text-muted-foreground mb-4">{family.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                  <span>{family.chapterTags?.[0] || "Location not specified"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-orange-600" />
                  <span>{memberCount} members</span>
                </div>
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
                className={
                  isJoined ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-orange-600 hover:bg-orange-700"
                }
                onClick={() => handleJoinFamily(family.id)}
              >
                {isJoined ? "Joined" : "Join Family"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}

      {filteredFamilies.length === 0 && <div className="text-center py-8 text-muted-foreground">No families found</div>}
    </div>
  )
}
