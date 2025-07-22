import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { chapters } from "./mock-data"
import type { Chapter } from "./types"

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date for display
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  return dateObj.toLocaleDateString("en-US", options || defaultOptions)
}

/**
 * Formats a time for display
 */
export function formatTime(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }

  return dateObj.toLocaleTimeString("en-US", options || defaultOptions)
}

/**
 * Gets a chapter by ID
 */
export function getChapter(chapterId: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === chapterId)
}

/**
 * Gets a chapter name by ID
 */
export function getChapterName(chapterId: string): string {
  const chapter = getChapter(chapterId)
  return chapter ? chapter.name : chapterId
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

/**
 * Generates initials from a name
 */
export function getInitials(name: string): string {
  if (!name) return "??"

  const parts = name.split(" ")
  if (parts.length === 1) return name.substring(0, 2).toUpperCase()

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Filters an array of items by chapter
 */
export function filterByChapter<T extends { chapterTags: string[] }>(items: T[], selectedChapter: string): T[] {
  if (selectedChapter === "all") return items
  return items.filter((item) => item.chapterTags.includes(selectedChapter))
}
