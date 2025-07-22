"use client"

import { useState } from "react"
import type { MarketplaceListing } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MarketplaceFeedProps {
  listings: MarketplaceListing[]
  getSeller: (sellerId: string) => any
  onSave: (listingId: string) => void
  onContact: (listingId: string) => void
  onShare: (listingId: string) => void
  savedListings?: string[]
}

export function MarketplaceFeed({
  listings,
  getSeller,
  onSave,
  onContact,
  onShare,
  savedListings = [],
}: MarketplaceFeedProps) {
  const [filter, setFilter] = useState<"all" | "products" | "services">("all")
  const router = useRouter()

  const filteredListings = listings.filter((listing) => {
    if (filter === "all") return true
    if (filter === "products") return listing.type === "product"
    if (filter === "services") return listing.type === "service"
    return true
  })

  const handleCardClick = (id: string) => {
    router.push(`/marketplace/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant={filter === "products" ? "default" : "outline"} size="sm" onClick={() => setFilter("products")}>
          Products
        </Button>
        <Button variant={filter === "services" ? "default" : "outline"} size="sm" onClick={() => setFilter("services")}>
          Services
        </Button>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No listings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.map((listing) => {
            const seller = getSeller(listing.sellerId)
            const isSaved = savedListings.includes(listing.id)

            return (
              <Card
                key={listing.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(listing.id)}
              >
                <div className="relative h-48 w-full">
                  {listing.images && listing.images.length > 0 ? (
                    <Image
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                  <Badge
                    className="absolute top-2 right-2"
                    variant={listing.type === "product" ? "default" : "secondary"}
                  >
                    {listing.type === "product" ? "Product" : "Service"}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                      <p className="text-xl font-bold">
                        ${listing.price}
                        {listing.type === "service" && "/hr"}
                      </p>
                    </div>
                    <Badge variant="outline">{listing.category}</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{listing.description}</p>

                  <div className="flex items-center mt-3 text-sm text-muted-foreground">
                    <Link
                      href={`/profile/${seller.username}`}
                      className="flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={seller.avatar || "/placeholder.svg"}
                        alt={seller.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <span>{seller.name}</span>
                    </Link>
                    <span className="mx-2">•</span>
                    <span>{listing.location}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onContact(listing.id)
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSave(listing.id)
                      }}
                      className={isSaved ? "text-primary" : ""}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onShare(listing.id)
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
