"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MessageCircle, Share2, Bookmark, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { marketplaceListings, users } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"

export default function MarketplaceItemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)

  // Find the listing by ID
  const listing = marketplaceListings.find((listing) => listing.id === resolvedParams.id) || marketplaceListings[0]

  // Get the seller
  const seller = users.find((user) => user.id === listing.sellerId) || users[0]

  // Format the date
  const listedDate = new Date(listing.createdAt)
  const listedTimeAgo = formatDistanceToNow(listedDate, { addSuffix: true })

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log("Sharing listing:", listing.id)
  }

  const handleContact = () => {
    // In a real app, this would open a message dialog
    console.log("Contacting about listing:", listing.id)
  }

  const handleBuy = () => {
    router.push(`/marketplace/${params.id}/purchase`)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 pb-20">
      <Button variant="ghost" className="mb-4 -ml-2 flex items-center" onClick={() => router.back()}>
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to marketplace
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image
              src={listing.images?.[0] || "/placeholder.svg?height=600&width=600&query=product"}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>

          {listing.images && listing.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${listing.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column - Details */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              <Badge variant={listing.type === "product" ? "default" : "secondary"} className="text-sm">
                {listing.type === "product" ? "Product" : "Service"}
              </Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${listing.price}
              {listing.type === "service" && "/hr"}
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Listed {listedTimeAgo}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{listing.location}</span>
          </div>

          {listing.type === "product" && listing.condition && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Condition</h3>
              <p className="font-medium">{listing.condition}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1">{listing.description}</p>
          </div>

          {listing.category && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <Badge variant="outline" className="mt-1">
                {listing.category}
              </Badge>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Seller</h3>
            <Link href={`/profile/${seller.username}`} className="flex items-center">
              <Image
                src={seller.avatar || "/placeholder.svg"}
                alt={seller.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-muted-foreground">Member since {new Date(seller.joinedAt).getFullYear()}</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={handleBuy} size="lg" className="w-full">
              {listing.type === "product" ? "Buy Now" : "Book Service"}
            </Button>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" onClick={handleContact} className="flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" onClick={handleSave} className={isSaved ? "text-primary" : ""}>
                <Bookmark className="h-4 w-4 mr-2" />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
