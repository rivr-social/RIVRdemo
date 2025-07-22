// components/top-bar.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, MessageSquare, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/locale-switcher" // Renamed
import { UserMenu } from "@/components/user-menu"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopBarProps {
  selectedLocale: string
  onLocaleChange: (localeId: string) => void
}

export function TopBar({ selectedLocale, onLocaleChange }: TopBarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { currentUser } = useUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/wordmark.png" alt="RIVR Wordmark" width={100} height={30} className="h-10 w-auto" />
        </Link>
        <div className="flex-1 ml-4 flex items-center">
          <LocaleSwitcher selectedLocale={selectedLocale} onLocaleChange={onLocaleChange} />
        </div>
        <div className="flex items-center gap-1 sm:gap-2 ml-2">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" size="icon" aria-label="Messages">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/create">
            <Button size="icon" aria-label="Create">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setUserMenuOpen(true)} className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
          <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
        </div>
      </div>
    </header>
  )
}
