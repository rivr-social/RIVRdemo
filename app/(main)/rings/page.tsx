"use client"
import { useState } from "react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { RingFeed } from "@/components/ring-feed"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function RingsPage() {
  const [selectedChapter, setSelectedChapter] = useState("boulder")
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-2">
      <div className="flex justify-center mb-4">
        <LocaleSwitcher onLocaleChange={setSelectedChapter} selectedLocale={selectedChapter} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 flex justify-center">
          <div className="border-b-2 border-primary px-4 py-2">
            <span className="text-primary font-medium">Rings</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-2 pl-4 mb-6">
          <div className="flex-1">
            <input type="text" placeholder="Search ring name" className="bg-transparent w-full focus:outline-none" />
          </div>
        </div>

        <Link href="/rings/create" className="flex items-center gap-3 mb-6">
          <div className="bg-gray-100 rounded-full p-3">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-lg font-medium">Create a ring</span>
        </Link>

        <RingFeed />
      </div>
    </div>
  )
}
