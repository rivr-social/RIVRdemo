"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { marketplaceListings, users } from "@/lib/mock-data"

export default function MarketplaceItemConfirmedPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()

  // Find the listing by ID
  const listing = marketplaceListings.find((listing) => listing.id === resolvedParams.id) || marketplaceListings[0]

  // Get the seller
  const seller = users.find((user) => user.id === listing.sellerId) || users[0]

  // Generate a random order number
  const orderNumber = `OL-${Math.floor(100000 + Math.random() * 900000)}`

  const handleContactSeller = () => {
    // In a real app, this would navigate to a messaging interface
    console.log("Contacting seller:", seller.id)
  }

  const handleViewPurchases = () => {
    router.push("/profile/purchases")
  }

  const handleBackToMarketplace = () => {
    router.push("/")
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2">Purchase Successful!</h1>
      <p className="text-muted-foreground mb-8">
        {listing.type === "product"
          ? "Your order has been confirmed and is being processed."
          : "Your service booking has been confirmed."}
      </p>

      <div className="bg-muted p-6 rounded-lg mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-20 h-20 rounded-md overflow-hidden mr-4">
            <Image
              src={listing.images?.[0] || "/placeholder.svg?height=200&width=200&query=product"}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-lg">{listing.title}</h2>
            <p className="text-muted-foreground">${listing.price}</p>
          </div>
        </div>

        <div className="border-t pt-4 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={handleContactSeller} variant="outline" className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact {seller.name}
        </Button>

        <Button onClick={handleViewPurchases} variant="outline" className="w-full">
          View My Purchases
        </Button>

        <Button onClick={handleBackToMarketplace} className="w-full">
          Back to Marketplace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
