"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TypeBadge } from "@/components/type-badge"
import { TypeIcon } from "@/components/type-icon"
import Link from "next/link"
import type { User } from "@/lib/types"

interface PeopleFeedProps {
  people?: User[]
  query?: string
  chapterId?: string
  onConnect?: (personId: string) => void
  initialConnections?: string[]
  maxPeople?: number
}

export function PeopleFeed({
  people = [],
  query,
  chapterId,
  onConnect,
  initialConnections = [],
  maxPeople,
}: PeopleFeedProps) {
  const [connections, setConnections] = useState<string[]>(initialConnections)

  // Apply maxPeople limit if provided
  const displayPeople = maxPeople ? people.slice(0, maxPeople) : people

  const handleConnect = (personId: string) => {
    const newConnections = connections.includes(personId)
      ? connections.filter((id) => id !== personId)
      : [...connections, personId]

    setConnections(newConnections)

    if (onConnect) {
      onConnect(personId)
    }
  }

  return (
    <div className="space-y-4 mt-4">
      {displayPeople.length > 0 ? (
        displayPeople.map((person) => {
          const isConnected = connections.includes(person.id)

          return (
            <Card key={person.id} className="border shadow-sm">
              <CardHeader className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-gray-200">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/profile/${person.username}`} className="text-xl font-bold hover:underline">
                        {person.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">@{person.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TypeIcon type="person" size={18} className="mr-2" />
                    <TypeBadge type="person" showIcon={false} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 bg-white">
                <p className="text-muted-foreground mb-4">{person.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-person" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="h-4 w-4 mr-2 text-person" />
                    <span>{person.points} points</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {person.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100 border-gray-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end bg-gray-50">
                <Button
                  onClick={() => handleConnect(person.id)}
                  className={isConnected ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : ""}
                >
                  {isConnected ? "Connected" : "Connect"}
                </Button>
              </CardFooter>
            </Card>
          )
        })
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {query ? `No people found matching "${query}"` : "No people found"}
        </div>
      )}
    </div>
  )
}
