"use client"
import { useState } from "react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { users } from "@/lib/mock-data"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PeoplePage() {
  const [selectedChapter, setSelectedChapter] = useState("boulder")
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-2">
      <div className="flex justify-center mb-4">
        <LocaleSwitcher onLocaleChange={setSelectedChapter} selectedLocale={selectedChapter} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 flex justify-center">
          <div className="border-b-2 border-primary px-4 py-2">
            <span className="text-primary font-medium">People</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Link href={`/profile/${user.username}`} key={user.id} className="flex items-center gap-4 py-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">Boulder, CO</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
