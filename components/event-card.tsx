"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Globe, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface EventCardProps {
  event: {
    id: string
    name: string
    description: string
    location: {
      address: string
    }
    timeframe: {
      start: string
      end: string
    }
    image: string
    price?: number
    ticketsAvailable?: boolean
    type?: string
  }
  groupName: string
  groupId?: string
  creatorName: string
  creatorUsername?: string
  initialRsvpStatus?: "going" | "interested" | "none"
  onRsvpChange?: (status: "going" | "interested" | "none") => void
  linkToEvent?: boolean
  isAdmin?: boolean
}

export function EventCard({
  event,
  groupName,
  groupId,
  creatorName,
  creatorUsername,
  initialRsvpStatus = "none",
  onRsvpChange,
  linkToEvent = true,
  isAdmin = false,
}: EventCardProps) {
  const [rsvpStatus, setRsvpStatus] = useState(initialRsvpStatus)
  const router = useRouter()

  const eventDate = event.timeframe?.start ? new Date(event.timeframe.start) : new Date()
  const endDate = event.timeframe?.end ? new Date(event.timeframe.end) : new Date()

  const handleRsvp = (status: "going" | "interested" | "none") => {
    const newStatus = status === rsvpStatus ? "none" : status
    setRsvpStatus(newStatus)
    if (onRsvpChange) {
      onRsvpChange(newStatus)
    }
  }

  const handleCardClick = () => {
    if (linkToEvent) {
      router.push(`/events/${event.id}`)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/events/${event.id}/edit`)
  }

  // Determine if tickets are available
  const hasTickets = event.ticketsAvailable !== false && event.price !== undefined && event.price > 0

  return (
    <Card
      className="overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-48">
        <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-transparent" />

        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-primary" />
          <span className="text-xs font-medium">{format(eventDate, "MMM d")}</span>
        </div>

        {isAdmin && (
          <div className="absolute top-2 right-2 bg-primary/90 text-white backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
            <span className="text-xs font-medium">Admin</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-bold line-clamp-1">
          {linkToEvent ? (
            <Link href={`/events/${event.id}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
              {event.name}
            </Link>
          ) : (
            event.name
          )}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>{format(eventDate, "EEE, MMM d · h:mm a")}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Globe className="h-3.5 w-3.5 mr-1" />
          <span>Zoom</span>
        </div>

        <div className="mt-2">
          {groupId ? (
            <Link
              href={`/groups/${groupId}`}
              className="text-sm font-medium hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {groupName}
            </Link>
          ) : (
            <p className="text-sm font-medium">{groupName}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2 gap-2">
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/events/${event.id}/tickets`)
          }}
        >
          Register
        </Button>

        {isAdmin && (
          <Button variant="outline" className="flex-none" onClick={handleEditClick}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
