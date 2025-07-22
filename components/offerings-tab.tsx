"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Plus, Search, Filter, Heart, MessageSquare, 
  MapPin, Calendar, Clock, Star, DollarSign,
  Gift, HandHeart, Briefcase, Car, Building2,
  Wrench, Ticket, Database, Package
} from "lucide-react"
import { OfferingType, Post, PostType } from "@/lib/types"

interface OfferingsTabProps {
  userPosts: Post[]
  userMatches: any[]
  onCreatePost: () => void
}

export function OfferingsTab({ 
  userPosts, 
  userMatches, 
  onCreatePost 
}: OfferingsTabProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter functions
  const filterItems = (items: Post[], includeTypeFilter = true) => {
    return items.filter(item => {
      const matchesSearch = (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                           (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                           (item.content?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      const matchesType = !includeTypeFilter || typeFilter === "all" || item.offeringType === typeFilter
      return matchesSearch && matchesType
    })
  }

  // Filter posts by type
  const offeringPosts = userPosts.filter(post => post.postType === PostType.Offer)
  const requestPosts = userPosts.filter(post => post.postType === PostType.Request)
  
  const filteredOfferings = filterItems(offeringPosts, false)
  const filteredOffers = filterItems(offeringPosts)
  const filteredRequests = filterItems(requestPosts)
  const filteredMatches = filterItems(userMatches)

  // Get offerings by specific types
  const resourceOfferings = offeringPosts.filter(post => post.offeringType === OfferingType.Product || post.offeringType === OfferingType.Resource)
  const skillOfferings = offeringPosts.filter(post => post.offeringType === OfferingType.Skill || post.offeringType === OfferingType.Service)
  const venueOfferings = offeringPosts.filter(post => post.offeringType === OfferingType.Ticket) // Venues could be ticket-based
  const tripOfferings = offeringPosts.filter(post => post.offeringType === OfferingType.Trip)

  const getTypeIcon = (type: OfferingType) => {
    switch (type) {
      case OfferingType.Skill: return <Briefcase className="h-4 w-4" />
      case OfferingType.Service: return <Wrench className="h-4 w-4" />
      case OfferingType.Product: return <Package className="h-4 w-4" />
      case OfferingType.Resource: return <Gift className="h-4 w-4" />
      case OfferingType.Trip: return <Car className="h-4 w-4" />
      case OfferingType.Ticket: return <Ticket className="h-4 w-4" />
      case OfferingType.Voucher: return <Heart className="h-4 w-4" />
      case OfferingType.Data: return <Database className="h-4 w-4" />
      default: return <Gift className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: OfferingType) => {
    switch (type) {
      case OfferingType.Skill: return "bg-blue-100 text-blue-800"
      case OfferingType.Service: return "bg-green-100 text-green-800"
      case OfferingType.Product: return "bg-purple-100 text-purple-800"
      case OfferingType.Resource: return "bg-orange-100 text-orange-800"
      case OfferingType.Trip: return "bg-yellow-100 text-yellow-800"
      case OfferingType.Ticket: return "bg-pink-100 text-pink-800"
      case OfferingType.Voucher: return "bg-red-100 text-red-800"
      case OfferingType.Data: return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const renderOfferingCard = (post: Post) => (
    <Card key={post.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              {getTypeIcon(post.offeringType || OfferingType.Service)}
              {post.title || post.content.substring(0, 30)}
            </CardTitle>
            <Badge className={`mt-1 text-xs ${getTypeColor(post.offeringType || OfferingType.Service)}`}>
              {post.offeringType || 'Service'}
            </Badge>
          </div>
          {post.basePrice && (
            <div className="text-right">
              <span className="text-lg font-bold text-primary">
                ${post.basePrice}
              </span>
              <p className="text-xs text-muted-foreground">{post.currency}</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {post.description || post.content}
        </p>
        {post.offeringType === OfferingType.Voucher && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Thanks Value:</span>
              <Badge variant="outline">{post.thanksValue} points</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{post.timeValue}%</span>
              </div>
              <div className="flex justify-between">
                <span>Skill:</span>
                <span>{post.skillValue}%</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span>{post.difficultyValue}%</span>
              </div>
              <div className="flex justify-between">
                <span>Resource:</span>
                <span>{post.resourceValue}%</span>
              </div>
            </div>
          </div>
        )}
        {post.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className={`text-xs px-2 py-1 rounded-full ${
            post.isActive !== false 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {post.isActive !== false ? 'Active' : 'Inactive'}
          </span>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Using a single unified card rendering function for all post types

  const renderMatchCard = (match: any) => (
    <Card key={match.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Potential Match
            </CardTitle>
            <Badge variant="outline" className="mt-1 text-xs">
              {match.matchScore}% match
            </Badge>
          </div>
          <Badge variant="default" className="text-xs bg-purple-600">
            New Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          Found a potential match between your offer and request
        </p>
        <div className="space-y-2 mb-3">
          <div className="text-xs">
            <span className="font-medium">Common interests:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {match.commonTags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {new Date(match.createdAt).toLocaleDateString()}
          </div>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            View Match
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderEmptyState = (title: string, description: string, actionText: string) => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Plus className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-center mb-4">
          {description}
        </p>
        <Button onClick={onCreatePost}>
          <Plus className="h-4 w-4 mr-2" />
          {actionText}
        </Button>
      </CardContent>
    </Card>
  )

  const hasFilterableContent = activeTab === "offers" || activeTab === "requests" || activeTab === "matches"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Offerings</h3>
        <Button onClick={onCreatePost}>
          <Plus className="h-4 w-4 mr-2" />
          Create Offering
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search offerings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {hasFilterableContent && (
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(OfferingType).map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type)}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="trips">Trips</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOfferings.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No offerings yet",
              "Create your first offering to share your skills, resources, or services with the community",
              "Create Your First Offering"
            )
          )}
        </TabsContent>

        <TabsContent value="offers" className="mt-6">
          {filteredOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOffers.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No active offers",
              "Create an offering and make it available to the community",
              "Create Offer"
            )
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No requests posted",
              "Post a request to let the community know what you're looking for",
              "Create Request"
            )
          )}
        </TabsContent>

        <TabsContent value="matches" className="mt-6">
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMatches.map(renderMatchCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create more offerings and requests to find potential matches in the community
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          {resourceOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourceOfferings.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No resources shared",
              "Share your tools, equipment, or products with the community",
              "Add Resource"
            )
          )}
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          {skillOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillOfferings.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No skills offered",
              "Share your expertise and services to help community members",
              "Add Skill"
            )
          )}
        </TabsContent>

        <TabsContent value="venues" className="mt-6">
          {venueOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venueOfferings.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No venues available",
              "Share your spaces or venues for community events and gatherings",
              "Add Venue"
            )
          )}
        </TabsContent>

        <TabsContent value="trips" className="mt-6">
          {tripOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tripOfferings.map(renderOfferingCard)}
            </div>
          ) : (
            renderEmptyState(
              "No trips planned",
              "Offer transportation or organize group trips for the community",
              "Plan Trip"
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}