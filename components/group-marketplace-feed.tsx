"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmptyState } from "@/components/empty-state"
import { AddToMarketplaceForm } from "@/components/add-to-marketplace-form"
import { type GroupMarketplaceListing, TransactionType, type User } from "@/lib/types"
import { getResourceById, getSkillById } from "@/lib/mock-group-marketplace-data"
import { Gift, Clock, DollarSign, ShoppingBag, Bookmark, Share2, MessageSquare, Plus } from "lucide-react"

interface GroupMarketplaceFeedProps {
  listings: GroupMarketplaceListing[]
  getSeller: (id: string) => User
  groupId: string
  currentUserId: string
  onSave: (id: string) => void
  onContact: (id: string) => void
  onShare: (id: string) => void
}

export function GroupMarketplaceFeed({
  listings,
  getSeller,
  groupId,
  currentUserId,
  onSave,
  onContact,
  onShare,
}: GroupMarketplaceFeedProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter listings based on active tab
  const filteredListings =
    activeTab === "all" ? listings : listings.filter((listing) => listing.transactionType === activeTab)

  // Get transaction type badge
  const getTransactionBadge = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Gift:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <Gift className="h-3 w-3" />
            Gift
          </Badge>
        )
      case TransactionType.Borrow:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Borrow
          </Badge>
        )
      case TransactionType.Rent:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Rent
          </Badge>
        )
      case TransactionType.Sale:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            Sale
          </Badge>
        )
    }
  }

  // Get listing details based on type
  const getListingDetails = (listing: GroupMarketplaceListing) => {
    let details = ""

    if (listing.resourceId) {
      const resource = getResourceById(listing.resourceId)
      if (resource) {
        details += `Resource: ${resource.name}`
      }
    } else if (listing.skillId) {
      const skill = getSkillById(listing.skillId)
      if (skill) {
        details += `Skill: ${skill.name}`
      }
    }

    if (listing.transactionType === TransactionType.Rent || listing.transactionType === TransactionType.Sale) {
      details += details ? " • " : ""
      details += `$${listing.price}`

      if (listing.transactionType === TransactionType.Rent && listing.duration) {
        details += ` (${listing.duration})`
      }
    } else if (listing.transactionType === TransactionType.Borrow && listing.duration) {
      details += details ? " • " : ""
      details += listing.duration
    }

    return details
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Group Marketplace</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add to Marketplace</DialogTitle>
              <DialogDescription>
                Share your resources or skills with the group. Choose what you want to offer and how.
              </DialogDescription>
            </DialogHeader>
            <AddToMarketplaceForm
              groupId={groupId}
              userId={currentUserId}
              onSuccess={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            All
          </TabsTrigger>
          <TabsTrigger value={TransactionType.Gift} className="flex items-center gap-1">
            <Gift className="h-4 w-4" />
            Gift
          </TabsTrigger>
          <TabsTrigger value={TransactionType.Borrow} className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Borrow
          </TabsTrigger>
          <TabsTrigger value={TransactionType.Rent} className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Rent
          </TabsTrigger>
          <TabsTrigger value={TransactionType.Sale} className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Sale
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredListings.map((listing) => {
                const seller = getSeller(listing.sellerId)
                const isCurrentUserSeller = listing.sellerId === currentUserId

                return (
                  <Card key={listing.id} className="overflow-hidden">
                    {listing.images && listing.images.length > 0 && (
                      <div className="relative h-48 w-full">
                        <img
                          src={listing.images[0] || "/placeholder.svg"}
                          alt={listing.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2">{getTransactionBadge(listing.transactionType)}</div>
                      </div>
                    )}
                    <CardHeader className={listing.images && listing.images.length > 0 ? "pt-3" : "pt-6"}>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        {!listing.images || listing.images.length === 0 ? (
                          <div>{getTransactionBadge(listing.transactionType)}</div>
                        ) : null}
                      </div>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                          <AvatarFallback>{seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {seller.name} • {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm line-clamp-2 mb-2">{listing.description}</p>
                      <p className="text-sm font-medium text-muted-foreground">{getListingDetails(listing)}</p>
                      {listing.tags && listing.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {listing.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3 pb-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => onSave(listing.id)}>
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => onShare(listing.id)}>
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      {!isCurrentUserSeller && (
                        <Button variant="default" size="sm" className="h-8" onClick={() => onContact(listing.id)}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      )}
                      {isCurrentUserSeller && (
                        <Button variant="outline" size="sm" className="h-8">
                          Edit
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon={<ShoppingBag className="h-12 w-12 text-muted-foreground" />}
              title="No Listings Found"
              description={
                activeTab === "all"
                  ? "There are no marketplace listings in this group yet."
                  : `There are no ${activeTab} listings in this group yet.`
              }
              action={
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Listing
                </Button>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
