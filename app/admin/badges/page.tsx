"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Plus, X, Check, User } from "lucide-react"
import { mockUserBadges, getUserBadges, mockBadges as allBadges } from "@/lib/mock-user-badges"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

// Mock users for the admin interface
const mockUsers = [
  { id: "user1", name: "John Doe", avatar: "/avatars/01.png", role: "Community Member" },
  { id: "user2", name: "Jane Smith", avatar: "/avatars/02.png", role: "Volunteer" },
  { id: "user3", name: "Robert Johnson", avatar: "/avatars/03.png", role: "Project Lead" },
  { id: "user4", name: "Emily Davis", avatar: "/avatars/04.png", role: "Community Member" },
  { id: "user5", name: "Michael Wilson", avatar: "/avatars/05.png", role: "Volunteer" },
]

export default function AdminBadgesPage() {
  const [activeTab, setActiveTab] = useState("manage")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [userBadges, setUserBadges] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBadge, setNewBadge] = useState({
    name: "",
    description: "",
    icon: "🛡️",
    level: "beginner"
  })

  useEffect(() => {
    if (selectedUser) {
      const badges = getUserBadges(selectedUser)
      setUserBadges(badges)
    }
  }, [selectedUser])

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
  }

  const handleAddBadge = (badgeId: string) => {
    if (!selectedUser) return
    
    // In a real app, this would make an API call
    // For now, we'll just show a success message
    toast({
      title: "Badge assigned",
      description: `Badge has been assigned to ${mockUsers.find(u => u.id === selectedUser)?.name}`,
    })
  }

  const handleRemoveBadge = (badgeId: string) => {
    if (!selectedUser) return
    
    // In a real app, this would make an API call
    // For now, we'll just show a success message
    toast({
      title: "Badge removed",
      description: `Badge has been removed from ${mockUsers.find(u => u.id === selectedUser)?.name}`,
    })
  }

  const handleCreateBadge = () => {
    // In a real app, this would make an API call to create a new badge
    toast({
      title: "Badge created",
      description: `New badge "${newBadge.name}" has been created`,
    })
    setIsDialogOpen(false)
    setNewBadge({
      name: "",
      description: "",
      icon: "🛡️",
      level: "beginner"
    })
  }

  const getBadgeLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "expert":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Badge Management</h1>
          <p className="text-gray-600">Assign and manage user badges</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Badge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Badge</DialogTitle>
              <DialogDescription>
                Add a new badge that can be assigned to users
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="badge-icon" className="text-right">
                  Icon
                </Label>
                <Input
                  id="badge-icon"
                  value={newBadge.icon}
                  onChange={(e) => setNewBadge({...newBadge, icon: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="badge-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="badge-name"
                  value={newBadge.name}
                  onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="badge-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="badge-description"
                  value={newBadge.description}
                  onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="badge-level" className="text-right">
                  Level
                </Label>
                <Select 
                  value={newBadge.level} 
                  onValueChange={(value) => setNewBadge({...newBadge, level: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateBadge}>Create Badge</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage">Manage User Badges</TabsTrigger>
          <TabsTrigger value="all">All Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  {mockUsers.map((user) => (
                    <div 
                      key={user.id}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${selectedUser === user.id ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      onClick={() => handleUserSelect(user.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {selectedUser ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {mockUsers.find(u => u.id === selectedUser)?.name}'s Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Current Badges</h3>
                      <div className="flex flex-wrap gap-2">
                        {userBadges.map((badge) => (
                          <Badge key={badge.id} className={`flex items-center gap-1 px-3 py-1 ${getBadgeLevelColor(badge.level)}`}>
                            <span>{badge.icon}</span>
                            <span>{badge.name}</span>
                            <button 
                              className="ml-1 rounded-full hover:bg-white/20 p-0.5"
                              onClick={() => handleRemoveBadge(badge.id)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {userBadges.length === 0 && (
                          <p className="text-sm text-gray-500">No badges assigned yet</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Available Badges</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {allBadges
                          .filter(badge => !userBadges.some(ub => ub.id === badge.id))
                          .map((badge) => (
                            <div key={badge.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-2">
                                <div className="text-xl">{badge.icon}</div>
                                <div>
                                  <p className="font-medium">{badge.name}</p>
                                  <Badge className={getBadgeLevelColor(badge.level)}>
                                    {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => handleAddBadge(badge.id)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Select a user to manage their badges</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map((badge) => (
              <Card key={badge.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <Badge className={`mt-2 ${getBadgeLevelColor(badge.level)}`}>
                      {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
