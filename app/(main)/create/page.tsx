"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GroupType } from "@/lib/types"
import { CreateListingForm } from "@/components/create-listing-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePost } from "@/components/create-post"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, DollarSign, ImageIcon, Users, Building2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { chapters, mockGroups, mockRings, marketplaceListings } from "@/lib/mock-data"

// Update the component to include tabs for different creation types
export default function CreatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("post")

  // Handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    const parent = urlParams.get('parent')
    
    if (tab) {
      setActiveTab(tab)
    }
    if (parent) {
      setGroupParent(parent || "none")
    }
  }, [])

  // Event form state
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventPrice, setEventPrice] = useState("")
  const [selectedVenue, setSelectedVenue] = useState("none")
  const [venueStartTime, setVenueStartTime] = useState("")
  const [venueEndTime, setVenueEndTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Group form state
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [groupType, setGroupType] = useState("basic")
  const [legalWrapper, setLegalWrapper] = useState("llc")
  const [groupChapter, setGroupChapter] = useState("boulder")
  const [groupParent, setGroupParent] = useState("none")

  // Project form state
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectCategory, setProjectCategory] = useState("")
  const [projectDeadline, setProjectDeadline] = useState("")
  const [projectBudget, setProjectBudget] = useState("")
  const [projectGroup, setProjectGroup] = useState("")
  const [projectVenue, setProjectVenue] = useState("none")
  const [projectVenueStartTime, setProjectVenueStartTime] = useState("")
  const [projectVenueEndTime, setProjectVenueEndTime] = useState("")
  
  // Define the GroupFeature type
  type GroupFeature = {
    name: string;
    description: string;
  }

  // Define the GroupTypeFeatures type
  type GroupTypeFeatures = {
    [key: string]: GroupFeature[];
  }

  // Group type features mapping
  const groupTypeFeatures: GroupTypeFeatures = {
    basic: [
      { name: "About", description: "Group information" },
      { name: "Feed", description: "Discussion board" },
      { name: "Events", description: "Event scheduling" },
      { name: "Groups", description: "Connected groups" },
      { name: "Members", description: "Member directory" }
    ],
    org: [
      { name: "About", description: "Organization information" },
      { name: "Feed", description: "Discussion board" },
      { name: "Events", description: "Event management" },
      { name: "Marketplace", description: "Buy and sell items" },
      { name: "Jobs", description: "Employment opportunities" },
      { name: "Badges", description: "Recognition system" },
      { name: "Members", description: "Member directory" },
      { name: "Groups", description: "Subgroups" },
      { name: "Governance", description: "Decision-making" },
      { name: "Stake", description: "Resource investment" },
      { name: "Treasury", description: "Financial management" }
    ],
    ring: [
      { name: "Feed", description: "Community discussions" },
      { name: "Families", description: "Family groups" },
      { name: "Mutual Assets", description: "Shared community assets" },
      { name: "Voucher Pool", description: "Community credit system" },
      { name: "Treasury", description: "Shared financial resources" },
      { name: "Governance", description: "Community decision-making" },
      { name: "About", description: "Ring information" },
      { name: "Admins", description: "Management team" }
    ],
    family: [
      { name: "Feed", description: "Family conversations" },
      { name: "Members", description: "Family directory" },
      { name: "Treasury", description: "Shared finances" },
      { name: "Activity", description: "Recent actions" },
      { name: "About", description: "Family information" },
      { name: "Admins", description: "Family administrators" }
    ]
  }

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDescription || !eventDate || !eventTime || !eventLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Event created",
        description: "Your event has been created successfully.",
      })
      setIsSubmitting(false)
      router.push("/")
    }, 1000)
  }

  const handleCreateProject = () => {
    if (!projectTitle || !projectDescription || !projectCategory || !projectGroup) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project created",
        description: "Your project has been created successfully.",
      })
      setIsSubmitting(false)
      router.push("/projects")
    }, 1000)
  }

  const handleCreateGroup = () => {
    // Check which fields are required based on group type
    const needsLegalWrapper = groupType === "org" || groupType === "ring";
    
    if (!groupName || !groupDescription || !groupChapter || (needsLegalWrapper && !legalWrapper)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Group created",
        description: "Your group has been created successfully.",
      })
      setIsSubmitting(false)
      router.push("/groups")
    }, 1000)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create</h1>
      </div>

      <Tabs defaultValue="post" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="event">Event</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="group">Group</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="post" className="space-y-6">
          <CreatePost />
        </TabsContent>

        <TabsContent value="event" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create an Event</CardTitle>
              <CardDescription>Fill in the details to create a new event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="Enter event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe your event"
                  className="min-h-[100px]"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="event-date"
                      type="date"
                      className="pl-10"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="event-time"
                      type="time"
                      className="pl-10"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="event-location"
                    placeholder="Enter location"
                    className="pl-10"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Venue Booking Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <Label className="text-base font-medium">Venue Booking (Optional)</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="venue-select">Select Venue</Label>
                  <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a venue to book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No venue booking</SelectItem>
                      {marketplaceListings
                        .filter(listing => listing.isVenue && listing.venue)
                        .map((listing) => (
                          <SelectItem key={listing.id} value={listing.id}>
                            <div className="flex flex-col">
                              <span>{listing.venue?.name}</span>
                              <span className="text-sm text-gray-500">
                                ${listing.venue?.hourlyRate}/hour • Capacity: {listing.venue?.capacity}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVenue && selectedVenue !== "none" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue-start-time">Start Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="venue-start-time"
                          type="time"
                          className="pl-10"
                          value={venueStartTime}
                          onChange={(e) => setVenueStartTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue-end-time">End Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="venue-end-time"
                          type="time"
                          className="pl-10"
                          value={venueEndTime}
                          onChange={(e) => setVenueEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedVenue && selectedVenue !== "none" && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {(() => {
                      const venue = marketplaceListings.find(l => l.id === selectedVenue)?.venue
                      if (!venue) return null
                      
                      const startTime = venueStartTime ? new Date(`2000-01-01T${venueStartTime}`) : null
                      const endTime = venueEndTime ? new Date(`2000-01-01T${venueEndTime}`) : null
                      const hours = startTime && endTime ? 
                        Math.max(1, Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))) : 1
                      const totalCost = venue.hourlyRate * hours
                      
                      return (
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-900">Booking Summary</h4>
                          <div className="text-sm text-blue-800">
                            <p><strong>Venue:</strong> {venue.name}</p>
                            <p><strong>Location:</strong> {venue.location}</p>
                            <p><strong>Duration:</strong> {hours} hour{hours !== 1 ? 's' : ''}</p>
                            <p><strong>Total Cost:</strong> ${totalCost}</p>
                            {venue.amenities && venue.amenities.length > 0 && (
                              <p><strong>Amenities:</strong> {venue.amenities.join(', ')}</p>
                            )}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-price">Price (optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="event-price"
                    placeholder="0.00"
                    className="pl-10"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Event Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateEvent} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="project" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a Project</CardTitle>
              <CardDescription>Start a new community project with goals, timelines, and team collaboration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  placeholder="Enter project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project's goals and objectives"
                  className="min-h-[100px]"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-category">Category</Label>
                  <Select value={projectCategory} onValueChange={setProjectCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="arts-culture">Arts & Culture</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-group">Associated Group</Label>
                  <Select value={projectGroup} onValueChange={setProjectGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-deadline">Deadline (optional)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="project-deadline"
                      type="date"
                      className="pl-10"
                      value={projectDeadline}
                      onChange={(e) => setProjectDeadline(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-budget">Budget (optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="project-budget"
                      placeholder="0.00"
                      className="pl-10"
                      value={projectBudget}
                      onChange={(e) => setProjectBudget(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Project Venue Booking Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <Label className="text-base font-medium">Venue Booking for Events (Optional)</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-venue-select">Select Venue</Label>
                  <Select value={projectVenue} onValueChange={setProjectVenue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a venue for project events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No venue booking</SelectItem>
                      {marketplaceListings
                        .filter(listing => listing.isVenue && listing.venue)
                        .map((listing) => (
                          <SelectItem key={listing.id} value={listing.id}>
                            <div className="flex flex-col">
                              <span>{listing.venue?.name}</span>
                              <span className="text-sm text-gray-500">
                                ${listing.venue?.hourlyRate}/hour • Capacity: {listing.venue?.capacity}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {projectVenue && projectVenue !== "none" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-venue-start-time">Preferred Start Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="project-venue-start-time"
                          type="time"
                          className="pl-10"
                          value={projectVenueStartTime}
                          onChange={(e) => setProjectVenueStartTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-venue-end-time">Preferred End Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="project-venue-end-time"
                          type="time"
                          className="pl-10"
                          value={projectVenueEndTime}
                          onChange={(e) => setProjectVenueEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {projectVenue && projectVenue !== "none" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    {(() => {
                      const venue = marketplaceListings.find(l => l.id === projectVenue)?.venue
                      if (!venue) return null
                      
                      return (
                        <div className="space-y-2">
                          <h4 className="font-medium text-green-900">Project Venue Preference</h4>
                          <div className="text-sm text-green-800">
                            <p><strong>Venue:</strong> {venue.name}</p>
                            <p><strong>Location:</strong> {venue.location}</p>
                            <p><strong>Rate:</strong> ${venue.hourlyRate}/hour</p>
                            <p><strong>Capacity:</strong> {venue.capacity} people</p>
                            {venue.amenities && venue.amenities.length > 0 && (
                              <p><strong>Amenities:</strong> {venue.amenities.join(', ')}</p>
                            )}
                            <p className="mt-2 text-xs text-green-600">
                              This venue will be available for booking when creating project events
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateProject} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="group" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Create a Group
              </CardTitle>
              <CardDescription>Start a new community group with features that match your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-description">Description</Label>
                <Textarea
                  id="group-description"
                  placeholder="Describe your group's purpose and goals"
                  className="min-h-[100px]"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-type">Group Type</Label>
                  <Select value={groupType} onValueChange={setGroupType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="org">Org</SelectItem>
                      <SelectItem value="ring">Ring</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(groupType === "org" || groupType === "ring") && (
                  <div className="space-y-2">
                    <Label htmlFor="legal-wrapper">Legal Wrapper</Label>
                    <Select value={legalWrapper} onValueChange={setLegalWrapper}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select legal wrapper" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupType === "org" ? (
                          <>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="pbc">PBC</SelectItem>
                            <SelectItem value="lca">LCA</SelectItem>
                            <SelectItem value="cooperative">Cooperative</SelectItem>
                            <SelectItem value="c-corp">C-Corp</SelectItem>
                            <SelectItem value="s-corp">S-Corp</SelectItem>
                            <SelectItem value="nonprofit">Non-Profit</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="501c7">501(c)7</SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="unincorporated">Unincorporated Association</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Add a placeholder div when legal wrapper is not shown to maintain the grid layout */}
                {!(groupType === "org" || groupType === "ring") && <div></div>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-chapter">Chapter</Label>
                  <Select value={groupChapter} onValueChange={setGroupChapter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Only show Parent Group for Basic and Family types */}
                {(groupType === "basic" || groupType === "family" || groupType === "org") && (
                  <div className="space-y-2">
                    <Label htmlFor="group-parent">Parent Group {groupType !== "family" && "(Optional)"}</Label>
                    <Select
                      value={groupParent}
                      onValueChange={setGroupParent}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent group" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupType !== "family" && <SelectItem value="none">No parent group</SelectItem>}
                        {groupType === "family" 
                          ? mockRings.map((ring) => (
                              <SelectItem key={ring.id} value={ring.id}>
                                {ring.name} (Ring)
                              </SelectItem>
                            ))
                          : [
                              // Groups can have both rings and other groups as parents
                              ...mockRings.map((ring) => (
                                <SelectItem key={ring.id} value={ring.id}>
                                  {ring.name} (Ring)
                                </SelectItem>
                              )),
                              ...mockGroups
                                .filter((group) => {
                                  // Filter groups based on the selected group type
                                  switch (groupType) {
                                    case "basic":
                                      return group.type === GroupType.Basic;
                                    case "org":
                                      return group.type === GroupType.Group;
                                    default:
                                      return false;
                                  }
                                })
                                .map((group) => (
                                  <SelectItem key={group.id} value={group.id}>
                                    {group.name} (Group)
                                  </SelectItem>
                                ))
                            ]
                        }
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Add a placeholder div when parent group is not shown to maintain the grid layout */}
                {groupType === "ring" && <div></div>}
              </div>

              <div className="space-y-2">
                <Label>Group Features</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {groupTypeFeatures[groupType as keyof typeof groupTypeFeatures]?.map((feature: GroupFeature, index: number) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateGroup} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Group"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <CreateListingForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
