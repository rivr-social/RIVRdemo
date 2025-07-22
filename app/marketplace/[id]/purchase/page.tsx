"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, ArrowRight, CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { marketplaceListings, users } from "@/lib/mock-data"

export default function MarketplaceItemPurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()

  // Find the listing by ID
  const listing = marketplaceListings.find((listing) => listing.id === resolvedParams.id) || marketplaceListings[0]

  // Get the seller
  const seller = users.find((user) => user.id === listing.sellerId) || users[0]

  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const totalPrice = listing.price * quantity
  const serviceFee = listing.type === "product" ? Math.round(totalPrice * 0.05) : 0
  const finalTotal = totalPrice + serviceFee

  const handleCheckout = () => {
    setIsProcessing(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/marketplace/${params.id}/confirmed`)
    }, 1500)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br flex flex-col md:flex-row"
      style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)" }}
    >
      {/* Left side - Item image */}
      <div className="w-full md:w-2/5 p-6 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={listing.images?.[0] || "/placeholder.svg?height=600&width=600&query=product"}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side - Purchase form */}
      <div className="w-full md:w-3/5 bg-white p-8 md:p-12 min-h-screen overflow-y-auto">
        <div className="max-w-2xl">
          <Button variant="ghost" className="mb-6 -ml-2 flex items-center" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to item
          </Button>

          {/* Item header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-muted-foreground">{listing.description}</p>

            <div className="flex items-center mt-4">
              <Image
                src={seller.avatar || "/placeholder.svg"}
                alt={seller.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <span className="text-sm">Sold by {seller.name}</span>
            </div>
          </div>

          {/* Purchase options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>

            {listing.type === "product" && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Quantity</h4>
                      <p className="text-sm text-muted-foreground">How many would you like?</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {listing.type === "service" && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div>
                    <h4 className="font-medium text-lg">Service Booking</h4>
                    <p className="text-sm text-muted-foreground">
                      You're booking this service at ${listing.price}/hr for {quantity} hour{quantity > 1 ? "s" : ""}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "card" | "wallet")}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit or Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  ONE Local Wallet
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Order summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>
                  {listing.title}{" "}
                  {listing.type === "product" ? `(${quantity})` : `(${quantity} hr${quantity > 1 ? "s" : ""})`}
                </span>
                <span>${(listing.price * quantity).toFixed(2)}</span>
              </div>

              {listing.type === "product" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="sticky bottom-0 bg-white pt-4 border-t">
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90"
            >
              {isProcessing ? "Processing..." : "Complete Purchase"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
