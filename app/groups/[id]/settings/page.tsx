"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings, UserPlus, Bell } from "lucide-react"
import { mockGroups, mockUsers } from "@/lib/mock-data"
import { GroupJoinSettings } from "@/components/group-join-settings"
import { GroupNotificationSettings } from "@/components/group-notification-settings"
import { JoinRequestsManager } from "@/components/join-requests-manager"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"
import {
  type Group,
  type GroupNotificationSettings as NotificationSettingsType,
  type JoinRequest,
  NotificationType,
} from "@/lib/types"

// Mock join requests data
const mockJoinRequests: JoinRequest[] = [
  {
    id: "request1",
    userId: "user3",
    groupId: "group1",
    status: "pending",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    answers: [
      {
        questionId: "q1",
        answer: "I'm interested in sustainable urban development and want to connect with like-minded individuals.",
      },
      { questionId: "q2", answer: "I have experience in community organizing and urban planning." },
    ],
  },
  {
    id: "request2",
    userId: "user4",
    groupId: "group1",
    status: "approved",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    reviewedBy: "user1",
    reviewedAt: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    adminNotes: "Active in the community, good fit for the group.",
  },
  {
    id: "request3",
    userId: "user5",
    groupId: "group1",
    status: "rejected",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    reviewedBy: "user1",
    reviewedAt: new Date(Date.now() - 86400000 * 6).toISOString(), // 6 days ago
    adminNotes: "Profile doesn't align with group focus.",
  },
  {
    id: "request4",
    userId: "user6",
    groupId: "group1",
    status: "pending",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    answers: [
      { questionId: "q1", answer: "I'm a local business owner looking to get involved in community initiatives." },
      { questionId: "q2", answer: "I have skills in marketing and event organization." },
    ],
  },
]

// Default notification settings
const defaultNotificationSettings: NotificationSettingsType = {
  posts: [NotificationType.Native],
  events: [NotificationType.Native, NotificationType.Email],
  marketplace: [NotificationType.Native],
  governance: [NotificationType.Native, NotificationType.Email],
  memberUpdates: [NotificationType.Native],
}

export default function GroupSettingsPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("join")
  const [group, setGroup] = useState<Group | null>(null)
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([])
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettingsType>(defaultNotificationSettings)

  // Mock current user - in a real app, this would come from authentication
  const currentUserId = "user1"
  const currentUser = mockUsers.find((user) => user.id === currentUserId)

  // Get group ID from URL params
  const groupId = params?.id as string

  useEffect(() => {
    // Simulate loading group data
    const timer = setTimeout(() => {
      const foundGroup = mockGroups.find((g) => g.id === groupId)

      if (foundGroup) {
        // Add join settings if they don't exist
        if (!foundGroup.joinSettings) {
          foundGroup.joinSettings = {
            joinType: "public",
            questions: [],
          }
        }

        // Add default notification settings if they don't exist
        if (!foundGroup.defaultNotificationSettings) {
          foundGroup.defaultNotificationSettings = defaultNotificationSettings
        }

        setGroup(foundGroup)

        // Filter join requests for this group
        const groupRequests = mockJoinRequests.filter((request) => request.groupId === groupId)
        setJoinRequests(groupRequests)

        // Set user's notification settings
        setNotificationSettings(defaultNotificationSettings)
      }

      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [groupId])

  // Check if current user is admin or creator
  const isAdmin = group?.adminIds?.includes(currentUserId) || group?.creatorId === currentUserId

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!group) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Group Not Found"
          description="The group you're looking for doesn't exist or has been removed."
          action={<Button onClick={() => router.push("/groups")}>Browse Groups</Button>}
        />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Access Denied"
          description="You don't have permission to access this page."
          action={<Button onClick={() => router.push(`/groups/${groupId}`)}>Back to Group</Button>}
        />
      </div>
    )
  }

  const handleSaveJoinSettings = (settings: Group["joinSettings"]) => {
    // In a real app, this would update the database
    console.log("Saving join settings:", settings)
    setGroup({
      ...group,
      joinSettings: settings,
    })
  }

  const handleSaveNotificationSettings = (settings: NotificationSettingsType) => {
    // In a real app, this would update the database
    console.log("Saving notification settings:", settings)
    setNotificationSettings(settings)
  }

  const handleApproveRequest = (requestId: string, notes?: string) => {
    // In a real app, this would update the database
    console.log("Approving request:", requestId, notes)
    setJoinRequests(
      joinRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "approved",
              adminNotes: notes,
              reviewedBy: currentUserId,
              reviewedAt: new Date().toISOString(),
            }
          : request,
      ),
    )
  }

  const handleRejectRequest = (requestId: string, notes?: string) => {
    // In a real app, this would update the database
    console.log("Rejecting request:", requestId, notes)
    setJoinRequests(
      joinRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "rejected",
              adminNotes: notes,
              reviewedBy: currentUserId,
              reviewedAt: new Date().toISOString(),
            }
          : request,
      ),
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{group.name} Settings</h1>
        </div>
        <Button onClick={() => router.push(`/groups/${groupId}`)}>View Group</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="join" className="flex items-center justify-center">
            <UserPlus className="mr-2 h-4 w-4" />
            Join Settings
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center justify-center">
            <Settings className="mr-2 h-4 w-4" />
            Join Requests
            {joinRequests.filter((r) => r.status === "pending").length > 0 && (
              <span className="ml-2 bg-amber-500 text-white text-xs rounded-full px-2 py-0.5">
                {joinRequests.filter((r) => r.status === "pending").length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="join" className="space-y-6">
          <GroupJoinSettings group={group} onSave={handleSaveJoinSettings} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <GroupNotificationSettings
            groupId={group.id}
            userId={currentUserId}
            settings={notificationSettings}
            onSave={handleSaveNotificationSettings}
          />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <JoinRequestsManager
            groupId={group.id}
            requests={joinRequests}
            getUser={(userId) => mockUsers.find((user) => user.id === userId)}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
