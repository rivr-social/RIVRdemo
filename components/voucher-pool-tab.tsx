"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Gift, Clock, MapPin, Star, Plus, Filter, Heart, CheckCircle, Calendar, DollarSign, Users } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"
import { getVouchersByRingId, getVoucherClaimsByVoucherId } from "@/lib/mock-voucher-data"
import { VoucherCategory, VoucherStatus } from "@/lib/types"

interface VoucherPoolTabProps {
  ringId: string
}

export function VoucherPoolTab({ ringId }: VoucherPoolTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [newVoucherTitle, setNewVoucherTitle] = useState("")
  const [newVoucherDescription, setNewVoucherDescription] = useState("")
  const [newVoucherCategory, setNewVoucherCategory] = useState<VoucherCategory>(VoucherCategory.Service)
  const [newVoucherValue, setNewVoucherValue] = useState("")
  const [newVoucherTime, setNewVoucherTime] = useState("")
  const [newVoucherLocation, setNewVoucherLocation] = useState("")
  const [newVoucherMaxClaims, setNewVoucherMaxClaims] = useState("")

  const vouchers = getVouchersByRingId(ringId)
  const currentUser = mockUsers[0] // Assuming current user is Cameron

  // Filter vouchers
  const filteredVouchers = vouchers.filter((voucher) => {
    const categoryMatch = selectedCategory === "all" || voucher.category === selectedCategory
    const statusMatch = selectedStatus === "all" || voucher.status === selectedStatus
    return categoryMatch && statusMatch
  })

  // Statistics
  const totalVouchers = vouchers.length
  const availableVouchers = vouchers.filter((v) => v.status === VoucherStatus.Available).length
  const myVouchers = vouchers.filter((v) => v.offeredBy === currentUser.id).length
  const totalValue = vouchers.reduce((sum, v) => sum + (v.estimatedValue || 0), 0)

  const handleCreateVoucher = () => {
    if (!newVoucherTitle || !newVoucherDescription) return

    console.log("Creating voucher:", {
      title: newVoucherTitle,
      description: newVoucherDescription,
      category: newVoucherCategory,
      estimatedValue: newVoucherValue ? Number.parseInt(newVoucherValue) : undefined,
      timeCommitment: newVoucherTime,
      location: newVoucherLocation,
      maxClaims: newVoucherMaxClaims ? Number.parseInt(newVoucherMaxClaims) : 1,
    })

    // Reset form
    setNewVoucherTitle("")
    setNewVoucherDescription("")
    setNewVoucherCategory(VoucherCategory.Service)
    setNewVoucherValue("")
    setNewVoucherTime("")
    setNewVoucherLocation("")
    setNewVoucherMaxClaims("")
  }

  const handleClaimVoucher = (voucherId: string) => {
    console.log("Claiming voucher:", voucherId)
  }

  const getCategoryIcon = (category: VoucherCategory) => {
    switch (category) {
      case VoucherCategory.Service:
        return <Users className="h-4 w-4" />
      case VoucherCategory.Goods:
        return <Gift className="h-4 w-4" />
      case VoucherCategory.Skill:
        return <Star className="h-4 w-4" />
      case VoucherCategory.Experience:
        return <Heart className="h-4 w-4" />
      case VoucherCategory.Resource:
        return <DollarSign className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: VoucherCategory) => {
    switch (category) {
      case VoucherCategory.Service:
        return "bg-blue-100 text-blue-800"
      case VoucherCategory.Goods:
        return "bg-green-100 text-green-800"
      case VoucherCategory.Skill:
        return "bg-purple-100 text-purple-800"
      case VoucherCategory.Experience:
        return "bg-pink-100 text-pink-800"
      case VoucherCategory.Resource:
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: VoucherStatus) => {
    switch (status) {
      case VoucherStatus.Available:
        return "bg-green-100 text-green-800"
      case VoucherStatus.Claimed:
        return "bg-yellow-100 text-yellow-800"
      case VoucherStatus.Completed:
        return "bg-blue-100 text-blue-800"
      case VoucherStatus.Expired:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vouchers</p>
                <p className="text-2xl font-bold">{totalVouchers}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">{availableVouchers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">My Offers</p>
                <p className="text-2xl font-bold">{myVouchers}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Vouchers</TabsTrigger>
          <TabsTrigger value="my-offers">My Offers</TabsTrigger>
          <TabsTrigger value="my-claims">My Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Filters and Create Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value={VoucherCategory.Service}>Services</SelectItem>
                  <SelectItem value={VoucherCategory.Goods}>Goods</SelectItem>
                  <SelectItem value={VoucherCategory.Skill}>Skills</SelectItem>
                  <SelectItem value={VoucherCategory.Experience}>Experiences</SelectItem>
                  <SelectItem value={VoucherCategory.Resource}>Resources</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value={VoucherStatus.Available}>Available</SelectItem>
                  <SelectItem value={VoucherStatus.Claimed}>Claimed</SelectItem>
                  <SelectItem value={VoucherStatus.Completed}>Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Offer Voucher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Voucher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="voucher-title">Title</Label>
                    <Input
                      id="voucher-title"
                      value={newVoucherTitle}
                      onChange={(e) => setNewVoucherTitle(e.target.value)}
                      placeholder="What are you offering?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="voucher-description">Description</Label>
                    <Textarea
                      id="voucher-description"
                      value={newVoucherDescription}
                      onChange={(e) => setNewVoucherDescription(e.target.value)}
                      placeholder="Describe your offer in detail..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="voucher-category">Category</Label>
                    <Select
                      value={newVoucherCategory}
                      onValueChange={(value) => setNewVoucherCategory(value as VoucherCategory)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VoucherCategory.Service}>Service</SelectItem>
                        <SelectItem value={VoucherCategory.Goods}>Goods</SelectItem>
                        <SelectItem value={VoucherCategory.Skill}>Skill</SelectItem>
                        <SelectItem value={VoucherCategory.Experience}>Experience</SelectItem>
                        <SelectItem value={VoucherCategory.Resource}>Resource</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="voucher-value">Est. Value ($)</Label>
                      <Input
                        id="voucher-value"
                        type="number"
                        value={newVoucherValue}
                        onChange={(e) => setNewVoucherValue(e.target.value)}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="voucher-claims">Max Claims</Label>
                      <Input
                        id="voucher-claims"
                        type="number"
                        value={newVoucherMaxClaims}
                        onChange={(e) => setNewVoucherMaxClaims(e.target.value)}
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="voucher-time">Time Commitment</Label>
                    <Input
                      id="voucher-time"
                      value={newVoucherTime}
                      onChange={(e) => setNewVoucherTime(e.target.value)}
                      placeholder="2 hours"
                    />
                  </div>

                  <div>
                    <Label htmlFor="voucher-location">Location</Label>
                    <Input
                      id="voucher-location"
                      value={newVoucherLocation}
                      onChange={(e) => setNewVoucherLocation(e.target.value)}
                      placeholder="My place, your place, online..."
                    />
                  </div>

                  <Button onClick={handleCreateVoucher} className="w-full">
                    Create Voucher
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVouchers.map((voucher) => {
              const offerer = mockUsers.find((u) => u.id === voucher.offeredBy) || mockUsers[0]
              const claims = getVoucherClaimsByVoucherId(voucher.id)
              const isMyVoucher = voucher.offeredBy === currentUser.id

              return (
                <Card key={voucher.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(voucher.category)}
                        <Badge className={getCategoryColor(voucher.category)}>{voucher.category}</Badge>
                      </div>
                      <Badge className={getStatusColor(voucher.status)}>{voucher.status}</Badge>
                    </div>
                    <CardTitle className="text-lg">{voucher.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{voucher.description}</p>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={offerer.avatar || "/placeholder.svg"} alt={offerer.name} />
                        <AvatarFallback>{offerer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{offerer.name}</span>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      {voucher.estimatedValue && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>Est. value: ${voucher.estimatedValue}</span>
                        </div>
                      )}

                      {voucher.timeCommitment && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{voucher.timeCommitment}</span>
                        </div>
                      )}

                      {voucher.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{voucher.location}</span>
                        </div>
                      )}

                      {voucher.maxClaims && voucher.maxClaims > 1 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {voucher.currentClaims || 0}/{voucher.maxClaims} claimed
                          </span>
                        </div>
                      )}

                      {voucher.expiresAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Expires {new Date(voucher.expiresAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {!isMyVoucher && voucher.status === VoucherStatus.Available && (
                      <Button onClick={() => handleClaimVoucher(voucher.id)} className="w-full" size="sm">
                        Claim Voucher
                      </Button>
                    )}

                    {isMyVoucher && (
                      <div className="text-xs text-center text-muted-foreground">
                        Your voucher • {claims.length} claims
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredVouchers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No vouchers found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-offers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vouchers
              .filter((voucher) => voucher.offeredBy === currentUser.id)
              .map((voucher) => {
                const claims = getVoucherClaimsByVoucherId(voucher.id)

                return (
                  <Card key={voucher.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={getCategoryColor(voucher.category)}>{voucher.category}</Badge>
                        <Badge className={getStatusColor(voucher.status)}>{voucher.status}</Badge>
                      </div>
                      <CardTitle className="text-lg">{voucher.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{voucher.description}</p>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Claims: {claims.length}</span>
                        {voucher.estimatedValue && <span className="font-medium">${voucher.estimatedValue}</span>}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View Claims
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="my-claims" className="space-y-4">
          <div className="space-y-4">
            {vouchers
              .filter((voucher) => voucher.claimedBy === currentUser.id)
              .map((voucher) => {
                const offerer = mockUsers.find((u) => u.id === voucher.offeredBy) || mockUsers[0]

                return (
                  <Card key={voucher.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{voucher.title}</h3>
                            <Badge className={getStatusColor(voucher.status)}>{voucher.status}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{voucher.description}</p>

                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={offerer.avatar || "/placeholder.svg"} alt={offerer.name} />
                              <AvatarFallback>{offerer.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Offered by {offerer.name}</span>
                          </div>

                          {voucher.claimedAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Claimed on {new Date(voucher.claimedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                          {voucher.status === VoucherStatus.Completed && (
                            <Button variant="outline" size="sm">
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
