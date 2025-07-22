"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, AlertCircle, Clock, Star, User } from "lucide-react"
import Link from "next/link"
import { mockJobShifts } from "@/lib/mock-job-shift-data"
import { mockProjects } from "@/lib/mock-projects-data"
import { toast } from "@/components/ui/use-toast"

export default function AdminTasksPage() {
  const [activeTab, setActiveTab] = useState("awaiting")
  const [tasksAwaitingApproval, setTasksAwaitingApproval] = useState<any[]>([])
  const [recentlyApproved, setRecentlyApproved] = useState<any[]>([])
  const [recentlyRejected, setRecentlyRejected] = useState<any[]>([])

  useEffect(() => {
    // Get all tasks awaiting approval
    const awaitingTasks: any[] = []
    const approvedTasks: any[] = []
    const rejectedTasks: any[] = []

    mockJobShifts.forEach(job => {
      job.tasks.forEach(task => {
        if (task.assignedTo) {
          const taskWithDetails = {
            ...task,
            jobId: job.id,
            jobTitle: job.title,
            assigneeName: getAssigneeName(task.assignedTo),
            assigneeAvatar: getAssigneeAvatar(task.assignedTo),
            projectId: getProjectIdForJob(job.id),
            projectTitle: getProjectTitleForJob(job.id)
          }

          if (task.status === "awaiting_approval") {
            awaitingTasks.push(taskWithDetails)
          } else if (task.status === "completed" && task.assignedTo) {
            approvedTasks.push(taskWithDetails)
          } else if (task.status === "rejected" && task.assignedTo) {
            rejectedTasks.push(taskWithDetails)
          }
        }
      })
    })

    setTasksAwaitingApproval(awaitingTasks)
    setRecentlyApproved(approvedTasks.slice(0, 10)) // Show only the 10 most recent
    setRecentlyRejected(rejectedTasks.slice(0, 10)) // Show only the 10 most recent
  }, [])

  const getAssigneeName = (userId: string) => {
    const mockUsers = {
      "user1": "John Doe",
      "user2": "Jane Smith",
      "user3": "Robert Johnson",
      "user4": "Emily Davis",
      "user5": "Michael Wilson",
      "user6": "Sarah Brown",
      "user7": "David Miller",
      "user8": "Lisa Garcia",
      "user9": "Thomas Anderson",
      "user10": "Jennifer Martinez",
      "user11": "James Taylor"
    }
    return mockUsers[userId as keyof typeof mockUsers] || "Unknown User"
  }

  const getAssigneeAvatar = (userId: string) => {
    const userNumber = userId.replace("user", "")
    const num = parseInt(userNumber)
    return num <= 10 ? `/avatars/${num.toString().padStart(2, '0')}.png` : "/avatars/01.png"
  }

  const getProjectIdForJob = (jobId: string) => {
    const project = mockProjects.find(p => p.jobs && p.jobs.includes(jobId))
    return project ? project.id : null
  }

  const getProjectTitleForJob = (jobId: string) => {
    const project = mockProjects.find(p => p.jobs && p.jobs.includes(jobId))
    return project ? project.title : "No Project"
  }

  const handleApproveTask = (taskId: string, jobId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Task approved",
      description: "The task has been marked as completed",
    })
    
    // Update local state to reflect the change
    setTasksAwaitingApproval(prev => prev.filter(task => !(task.id === taskId && task.jobId === jobId)))
  }

  const handleRejectTask = (taskId: string, jobId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Task rejected",
      description: "The task has been rejected and returned to the assignee",
    })
    
    // Update local state to reflect the change
    setTasksAwaitingApproval(prev => prev.filter(task => !(task.id === taskId && task.jobId === jobId)))
  }

  const renderTaskCard = (task: any, showActions: boolean = false) => {
    return (
      <Card key={`${task.jobId}-${task.id}`} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={task.assigneeAvatar} alt={task.assigneeName} />
                <AvatarFallback>{task.assigneeName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{task.assigneeName}</p>
                <p className="text-xs text-gray-600">Submitted for approval</p>
              </div>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Awaiting Approval
            </Badge>
          </div>
          
          <div className="mb-3">
            <h3 className="font-medium text-lg">{task.name}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <p className="text-xs text-gray-500">Job</p>
              <Link href={`/jobs/${task.jobId}`} className="text-sm text-blue-600 hover:underline">
                {task.jobTitle}
              </Link>
            </div>
            <div>
              <p className="text-xs text-gray-500">Project</p>
              {task.projectId ? (
                <Link href={`/projects/${task.projectId}`} className="text-sm text-blue-600 hover:underline">
                  {task.projectTitle}
                </Link>
              ) : (
                <span className="text-sm">No Project</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{task.points} points</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{task.estimatedTime}</span>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleRejectTask(task.id, task.jobId)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveTask(task.id, task.jobId)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Approval Dashboard</h1>
          <p className="text-gray-600">Review and manage tasks awaiting approval</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{tasksAwaitingApproval.length} Tasks Awaiting Approval</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="awaiting">Awaiting Approval</TabsTrigger>
          <TabsTrigger value="approved">Recently Approved</TabsTrigger>
          <TabsTrigger value="rejected">Recently Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="awaiting" className="space-y-4">
          {tasksAwaitingApproval.length > 0 ? (
            tasksAwaitingApproval.map(task => renderTaskCard(task, true))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                <p className="text-gray-600">No tasks awaiting approval</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {recentlyApproved.length > 0 ? (
            recentlyApproved.map(task => (
              <Card key={`${task.jobId}-${task.id}`} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={task.assigneeAvatar} alt={task.assigneeName} />
                        <AvatarFallback>{task.assigneeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{task.assigneeName}</p>
                        <p className="text-xs text-gray-600">Task completed</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="font-medium text-lg">{task.name}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{task.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{task.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No recently approved tasks</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {recentlyRejected.length > 0 ? (
            recentlyRejected.map(task => (
              <Card key={`${task.jobId}-${task.id}`} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={task.assigneeAvatar} alt={task.assigneeName} />
                        <AvatarFallback>{task.assigneeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{task.assigneeName}</p>
                        <p className="text-xs text-gray-600">Task rejected</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="font-medium text-lg">{task.name}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{task.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{task.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No recently rejected tasks</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
