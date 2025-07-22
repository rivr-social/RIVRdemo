"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Wrench, Laptop, Home, Zap, Package, Plus, Calendar, MapPin, User, AlertCircle } from "lucide-react"
import { MutualAsset, AssetCategory, AssetStatus } from "@/lib/types"
import { mockUsers, mockMutualAssets } from "@/lib/mock-data"

interface MutualAssetsTabProps {
  ringId: string
  assets?: MutualAsset[]
}

const categoryIcons = {
  [AssetCategory.Vehicle]: Car,
  [AssetCategory.Tool]: Wrench,
  [AssetCategory.Equipment]: Package,
  [AssetCategory.Property]: Home,
  [AssetCategory.Technology]: Laptop,
  [AssetCategory.Other]: Package,
}

const statusColors = {
  [AssetStatus.Available]: "bg-green-100 text-green-800",
  [AssetStatus.InUse]: "bg-blue-100 text-blue-800",
  [AssetStatus.Maintenance]: "bg-yellow-100 text-yellow-800",
  [AssetStatus.Reserved]: "bg-purple-100 text-purple-800",
}

export function MutualAssetsTab({ ringId, assets }: MutualAssetsTabProps) {
  // Use mock data filtered by ringId if no assets provided
  const ringAssets = assets || mockMutualAssets.filter(asset => asset.ringId === ringId)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  // Filter assets based on search and filters
  const filteredAssets = ringAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || asset.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getUser = (userId: string) => {
    return mockUsers.find(user => user.id === userId) || mockUsers[0]
  }

  const getStatusText = (status: AssetStatus) => {
    switch (status) {
      case AssetStatus.Available:
        return "Available"
      case AssetStatus.InUse:
        return "In Use"
      case AssetStatus.Maintenance:
        return "Maintenance"
      case AssetStatus.Reserved:
        return "Reserved"
    }
  }

  const getCategoryText = (category: AssetCategory) => {
    switch (category) {
      case AssetCategory.Vehicle:
        return "Vehicle"
      case AssetCategory.Tool:
        return "Tool"
      case AssetCategory.Equipment:
        return "Equipment"
      case AssetCategory.Property:
        return "Property"
      case AssetCategory.Technology:
        return "Technology"
      case AssetCategory.Other:
        return "Other"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Mutual Assets</h2>
          <p className="text-sm text-muted-foreground">
            Shared resources owned by the ring that members can use
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(AssetCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {getCategoryText(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.values(AssetStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {getStatusText(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assets found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {ringAssets.length === 0 
                ? "This ring doesn't have any mutual assets yet. Add the first one to get started!"
                : "No assets match your current filters. Try adjusting your search or filters."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => {
            const owner = getUser(asset.ownedBy)
            const currentUser = asset.currentUserId ? getUser(asset.currentUserId) : null
            const CategoryIcon = categoryIcons[asset.category]

            return (
              <Card key={asset.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                    </div>
                    <Badge className={statusColors[asset.status]}>
                      {getStatusText(asset.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {asset.description}
                  </p>

                  {asset.images && asset.images.length > 0 && (
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src={asset.images[0]}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Owned by:</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={owner.avatar} alt={owner.name} />
                          <AvatarFallback className="text-xs">{owner.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{owner.name}</span>
                      </div>
                    </div>

                    {asset.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span>{asset.location}</span>
                      </div>
                    )}

                    {currentUser && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">In use by:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            <AvatarFallback className="text-xs">{currentUser.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{currentUser.name}</span>
                        </div>
                      </div>
                    )}

                    {asset.value && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-medium">${asset.value.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {asset.tags && asset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {asset.restrictions && asset.restrictions.length > 0 && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">Restrictions:</span>
                        <ul className="list-disc list-inside text-xs mt-1">
                          {asset.restrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {asset.status === AssetStatus.Available ? (
                      <>
                        <Button size="sm" className="flex-1">
                          {asset.bookingRequired ? "Book" : "Use"}
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}