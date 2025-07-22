// app/(main)/layout.tsx
"use client"

import type React from "react"
import { BottomNav } from "@/components/bottom-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      <BottomNav />
    </div>
  )
}
