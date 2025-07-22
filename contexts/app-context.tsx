"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AppState, AppContextType } from "@/lib/types"

const defaultState: AppState = {
  user: null,
  groups: [],
  events: [],
  posts: [],
  notifications: [],
  settings: {},
  selectedChapter: "all", // This will now represent localeId
  likedPosts: [],
  rsvpStatuses: {},
  joinedGroups: [],
  followedUsers: [],
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    // Load state from localStorage if available
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("appState")
      if (savedState) {
        try {
          return JSON.parse(savedState) as AppState
        } catch (e) {
          console.error("Failed to parse saved state:", e)
        }
      }
    }
    return defaultState
  })

  // Save state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("appState", JSON.stringify(state))
    }
  }, [state])

  // State update functions
  const setSelectedChapter = (chapterId: string) => {
    setState((prev) => ({ ...prev, selectedChapter: chapterId }))
  }

  const toggleLikePost = (postId: string) => {
    setState((prev) => {
      const likedPosts = prev.likedPosts.includes(postId)
        ? prev.likedPosts.filter((id) => id !== postId)
        : [...prev.likedPosts, postId]
      return { ...prev, likedPosts }
    })
  }

  const setRsvpStatus = (eventId: string, status: "going" | "maybe" | "none") => {
    setState((prev) => ({
      ...prev,
      rsvpStatuses: {
        ...prev.rsvpStatuses,
        [eventId]: status,
      },
    }))
  }

  const toggleJoinGroup = (groupId: string) => {
    setState((prev) => {
      const joinedGroups = prev.joinedGroups.includes(groupId)
        ? prev.joinedGroups.filter((id) => id !== groupId)
        : [...prev.joinedGroups, groupId]
      return { ...prev, joinedGroups }
    })
  }

  const toggleFollowUser = (userId: string) => {
    setState((prev) => {
      const followedUsers = prev.followedUsers.includes(userId)
        ? prev.followedUsers.filter((id) => id !== userId)
        : [...prev.followedUsers, userId]
      return { ...prev, followedUsers }
    })
  }

  // Additional methods to match AppContextType
  const dispatch = (action: any) => {
    // Placeholder dispatch function
    console.log("Dispatch action:", action)
  }

  const addGroup = (group: any) => {
    setState((prev) => ({ ...prev, groups: [...prev.groups, group] }))
  }

  const removeGroup = (id: string) => {
    setState((prev) => ({ ...prev, groups: prev.groups.filter(g => g.id !== id) }))
  }

  const addEvent = (event: any) => {
    setState((prev) => ({ ...prev, events: [...prev.events, event] }))
  }

  const removeEvent = (id: string) => {
    setState((prev) => ({ ...prev, events: prev.events.filter(e => e.id !== id) }))
  }

  const addPost = (post: any) => {
    setState((prev) => ({ ...prev, posts: [...prev.posts, post] }))
  }

  const removePost = (id: string) => {
    setState((prev) => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }))
  }

  // Context value
  const value: AppContextType = {
    state,
    setSelectedChapter,
    dispatch,
    addGroup,
    removeGroup,
    addEvent,
    removeEvent,
    addPost,
    removePost,
    toggleLikePost,
    setRsvpStatus,
    toggleJoinGroup,
    toggleFollowUser,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
