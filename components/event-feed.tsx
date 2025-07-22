"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/event-card"
import { projects, groups, users } from "@/lib/mock-data"
import { EmptyState } from "@/components/empty-state"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useAppContext } from "@/contexts/app-context"

interface EventFeedProps {
  events?: any[]
  query?: string
  chapterId?: string
  loading?: boolean
  getGroupName?: (groupId: string) => string
  getGroupId?: (groupId: string) => string
  getCreatorName?: (creatorId: string) => string
  getCreatorUsername?: (creatorId: string) => string
  onRsvpChange?: (eventId: string, status: "going" | "maybe" | "none") => void
  isEventAdmin?: (eventId: string) => boolean
  initialRsvpStatuses?: Record<string, "going" | "maybe" | "none">
}

// Default helper functions
const defaultGetGroupName = (groupId: string): string => {
  const group = groups.find((g) => g.id === groupId)
  return group ? group.name : "Unknown Group"
}

const defaultGetGroupId = (groupId: string): string => {
  return groupId
}

const defaultGetCreatorName = (creatorId: string): string => {
  const creator = users.find((u) => u.id === creatorId)
  return creator ? creator.name : "Unknown Creator"
}

const defaultGetCreatorUsername = (creatorId: string): string => {
  const creator = users.find((u) => u.id === creatorId)
  return creator ? creator.username : "unknown"
}

export function EventFeed({
  events: propEvents,
  query,
  chapterId,
  loading = false,
  getGroupName = defaultGetGroupName,
  getGroupId = defaultGetGroupId,
  getCreatorName = defaultGetCreatorName,
  getCreatorUsername = defaultGetCreatorUsername,
  onRsvpChange,
  isEventAdmin,
  initialRsvpStatuses = {},
}: EventFeedProps) {
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(loading)
  const { state } = useAppContext()

  // Use the chapterId from props if provided, otherwise use the one from AppContext
  const activeChapterId = chapterId || state.selectedChapter

  useEffect(() => {
    if (propEvents) {
      setEvents(propEvents)
      setIsLoading(false)
      return
    }

    // If no events are provided, fetch from mock data
    setIsLoading(true)
    setTimeout(() => {
      let filteredEvents = projects.filter((project) => project.type === "event")

      // Filter by chapter if activeChapterId is provided and not "all"
      if (activeChapterId && activeChapterId !== "all") {
        filteredEvents = filteredEvents.filter(
          (event) => event.chapterTags && event.chapterTags.includes(activeChapterId),
        )
      }

      // Filter by query if provided
      if (query) {
        const lowerQuery = query.toLowerCase()
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.name.toLowerCase().includes(lowerQuery) ||
            (event.description && event.description.toLowerCase().includes(lowerQuery)),
        )
      }

      setEvents(filteredEvents)
      setIsLoading(false)
    }, 500)
  }, [propEvents, query, activeChapterId])

  const handleRsvpChange = (eventId: string, status: "going" | "interested" | "none") => {
    if (onRsvpChange) {
      onRsvpChange(eventId, status)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title="No events found"
        description={
          activeChapterId !== "all"
            ? `There are no events in this chapter. Try selecting a different chapter.`
            : `There are no events matching your criteria.`
        }
        icon="calendar"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => {
        const group = groups.find((g) => g.id === event.organizer) || groups[0]
        const creator = users.find((u) => u.id === group?.members?.[0]) || users[0]

        return (
          <EventCard
            key={event.id}
            event={{
              id: event.id,
              name: event.name,
              description: event.description,
              location: event.location,
              timeframe: event.timeframe,
              image: event.image,
              price: event.price || 0,
              ticketsAvailable: event.price > 0,
            }}
            groupName={getGroupName(event.organizer || "")}
            groupId={getGroupId ? getGroupId(event.organizer || "") : undefined}
            creatorName={getCreatorName(event.id)}
            creatorUsername={getCreatorUsername ? getCreatorUsername(event.id) : undefined}
            initialRsvpStatus={initialRsvpStatuses[event.id] || "none"}
            onRsvpChange={(status) => handleRsvpChange(event.id, status)}
            isAdmin={isEventAdmin ? isEventAdmin(event.id) : false}
          />
        )
      })}
    </div>
  )
}
