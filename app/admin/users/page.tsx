"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, Mail, Shield, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock users for the admin interface
const mockUsers = [
  { 
    id: "user1", 
    name: "John Doe", 
    email: "john.doe@example.com",
    avatar: "/avatars/01.png", 
    role: "Community Member",
    status: "active",
    joinDate: "Jan 15, 2023",
    badgeCount: 5
  },
  { 
    id: "user2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com",
    avatar: "/avatars/02.png", 
    role: "Volunteer",
    status: "active",
    joinDate: "Feb 3, 2023",
    badgeCount: 3
  },
  { 
    id: "user3", 
    name: "Robert Johnson", 
    email: "robert.johnson@example.com",
    avatar: "/avatars/03.png", 
    role: "Project Lead",
    status: "active",
    joinDate: "Dec 10, 2022",
    badgeCount: 8
  },
  { 
    id: "user4", 
    name: "Emily Davis", 
    email: "emily.davis@example.com",
    avatar: "/avatars/04.png", 
    role: "Community Member",
    status: "inactive",
    joinDate: "Mar 22, 2023",
    badgeCount: 2
  },
  { 
    id: "user5", 
    name: "Michael Wilson", 
    email: "michael.wilson@example.com",
    avatar: "/avatars/05.png", 
    role: "Volunteer",
    status: "active",
    joinDate: "Apr 5, 2023",
    badgeCount: 4
  },
  { 
    id: "user6", 
    name: "Sarah Brown", 
    email: "sarah.brown@example.com",
    avatar: "/avatars/06.png", 
    role: "Community Member",
    status: "active",
    joinDate: "May 18, 2023",
    badgeCount: 1
  },
  { 
    id: "user7", 
    name: "David Miller", 
    email: "david.miller@example.com",
    avatar: "/avatars/07.png", 
    role: "Project Lead",
    status: "active",
    joinDate: "Jun 30, 2023",
    badgeCount: 7
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" } 
        : user
    ))
    
    const user = users.find(u => u.id === userId)
    const newStatus = user?.status === "active" ? "inactive" : "active"
    
    toast({
      title: `User ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `${user?.name} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    })
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">View and manage community members</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search users by name, email, or role..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {user.status === "active" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : null}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                  <Button 
                    variant={user.status === "active" ? "destructive" : "default"} 
                    size="sm"
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Role</p>
                  <p>{user.role}</p>
                </div>
                <div>
                  <p className="text-gray-500">Joined</p>
                  <p>{user.joinDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>{user.badgeCount} Badges</span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-1" />
                  Manage Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No users found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
