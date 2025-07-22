"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Home,
  ShoppingCart,
  Heart,
} from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

interface FamilyActivityTabProps {
  familyId: string
}

// Mock family activity data
const mockFamilyActivities = [
  {
    id: "activity-1",
    type: "member_joined",
    userId: "user-2",
    timestamp: "2024-01-15T10:30:00Z",
    metadata: {
      memberName: "Sarah Johnson",
    },
  },
  {
    id: "activity-2",
    type: "treasury_deposit",
    userId: "user-1",
    timestamp: "2024-01-14T16:45:00Z",
    metadata: {
      amount: 500,
      purpose: "Monthly contribution",
    },
  },
  {
    id: "activity-3",
    type: "treasury_withdrawal",
    userId: "user-3",
    timestamp: "2024-01-14T12:20:00Z",
    metadata: {
      amount: 120,
      purpose: "Groceries for the week",
    },
  },
  {
    id: "activity-4",
    type: "event_created",
    userId: "user-2",
    timestamp: "2024-01-13T19:15:00Z",
    metadata: {
      eventName: "Family Game Night",
      eventDate: "2024-01-20",
    },
  },
  {
    id: "activity-5",
    type: "post_shared",
    userId: "user-4",
    timestamp: "2024-01-13T14:30:00Z",
    metadata: {
      postTitle: "New family recipe to try!",
    },
  },
  {
    id: "activity-6",
    type: "treasury_withdrawal",
    userId: "user-1",
    timestamp: "2024-01-12T09:45:00Z",
    metadata: {
      amount: 80,
      purpose: "Utilities payment",
    },
  },
  {
    id: "activity-7",
    type: "member_milestone",
    userId: "user-3",
    timestamp: "2024-01-11T20:00:00Z",
    metadata: {
      milestone: "1 year in family",
      memberName: "Mike Chen",
    },
  },
  {
    id: "activity-8",
    type: "treasury_deposit",
    userId: "user-4",
    timestamp: "2024-01-10T11:30:00Z",
    metadata: {
      amount: 300,
      purpose: "Emergency fund contribution",
    },
  },
]

export function FamilyActivityTab({ familyId }: FamilyActivityTabProps) {
  const getActivityIcon = (type: string, metadata?: any) => {
    switch (type) {
      case "member_joined":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "treasury_deposit":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "treasury_withdrawal":
        if (metadata?.purpose?.toLowerCase().includes("groceries")) {
          return <ShoppingCart className="h-4 w-4 text-blue-600" />
        }
        if (metadata?.purpose?.toLowerCase().includes("utilities")) {
          return <Home className="h-4 w-4 text-orange-600" />
        }
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "event_created":
        return <Calendar className="h-4 w-4 text-purple-600" />
      case "post_shared":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "member_milestone":
        return <Heart className="h-4 w-4 text-pink-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "member_joined":
        return "bg-green-100 text-green-800"
      case "treasury_deposit":
        return "bg-green-100 text-green-800"
      case "treasury_withdrawal":
        return "bg-blue-100 text-blue-800"
      case "event_created":
        return "bg-purple-100 text-purple-800"
      case "post_shared":
        return "bg-blue-100 text-blue-800"
      case "member_milestone":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityDescription = (activity: any) => {
    const user = mockUsers.find((u) => u.id === activity.userId) || mockUsers[0]

    switch (activity.type) {
      case "member_joined":
        return `${activity.metadata.memberName} joined the family`
      case "treasury_deposit":
        return `${user.name} added $${activity.metadata.amount.toLocaleString()} to family treasury`
      case "treasury_withdrawal":
        return `${user.name} spent $${activity.metadata.amount.toLocaleString()} on ${activity.metadata.purpose}`
      case "event_created":
        return `${user.name} created "${activity.metadata.eventName}" for ${new Date(activity.metadata.eventDate).toLocaleDateString()}`
      case "post_shared":
        return `${user.name} shared: "${activity.metadata.postTitle}"`
      case "member_milestone":
        return `${activity.metadata.memberName} reached ${activity.metadata.milestone}!`
      default:
        return `${user.name} performed an action`
    }
  }

  // Calculate activity summary
  const activitySummary = mockFamilyActivities.reduce(
    (acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalDeposits = mockFamilyActivities
    .filter((a) => a.type === "treasury_deposit")
    .reduce((sum, a) => sum + (a.metadata?.amount || 0), 0)

  const totalWithdrawals = mockFamilyActivities
    .filter((a) => a.type === "treasury_withdrawal")
    .reduce((sum, a) => sum + (a.metadata?.amount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Deposits</p>
                <p className="text-lg font-bold">${totalDeposits.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Expenses</p>
                <p className="text-lg font-bold">${totalWithdrawals.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Events</p>
                <p className="text-lg font-bold">{activitySummary.event_created || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Posts</p>
                <p className="text-lg font-bold">{activitySummary.post_shared || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Family Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFamilyActivities.map((activity) => {
              const user = mockUsers.find((u) => u.id === activity.userId) || mockUsers[0]
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {getActivityIcon(activity.type, activity.metadata)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-xs">{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Badge className={getActivityColor(activity.type)}>{activity.type.replace("_", " ")}</Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">{getActivityDescription(activity)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
