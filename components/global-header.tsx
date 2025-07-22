"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/top-bar"
import { usePathname } from "next/navigation"
import { useAppContext } from "@/contexts/app-context"

export function GlobalHeader() {
  const pathname = usePathname()
  const [showHeader, setShowHeader] = useState(true)
  const { state, setSelectedChapter } = useAppContext()

  useEffect(() => {
    setShowHeader(!pathname?.startsWith("/auth"))
  }, [pathname])

  const handleLocaleChange = (localeId: string) => {
    setSelectedChapter(localeId)
  }

  if (!showHeader) {
    return null
  }

  return <TopBar selectedChapter={state.selectedChapter} onChapterChange={handleLocaleChange} />
}
