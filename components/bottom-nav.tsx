"use client"

import { Home, Map, User, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/", icon: Home, active: pathname === "/" },
    { name: "Explore", href: "/explore", icon: Search, active: pathname === "/explore" },
    { name: "Map", href: "/map", icon: Map, active: pathname === "/map" },
    { name: "Profile", href: "/profile", icon: User, active: pathname.startsWith("/profile") },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
              item.active ? "text-primary font-medium" : "text-muted-foreground hover:text-primary",
            )}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="sr-only">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
