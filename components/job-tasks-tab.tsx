"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Clock, Star, User, Play, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import type { JobShift, Task } from "@/lib/mock-job-shift-data"
import { userHasRequiredBadges } from "@/lib/mock-user-badges"

interface JobTasksTabProps {
  job: JobShift
  currentUserId: string
  onTaskUpdate: (updatedJob: JobShift) => void
}

export function JobTasksTab({ job, currentUserId, onTaskUpdate }: JobTasksTabProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  
  // Check if current user is an admin (creator of the job shift)
  const isAdmin = job.createdBy === currentUserId

  const getTaskIcon = (task: Task) => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in_progress':
        return <Play className="h-4 w-4 text-blue-500" />
      case 'awaiting_approval':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'not_started':
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getTaskStatusBadge = (task: Task) => {
    switch (task.status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'awaiting_approval':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Awaiting Approval</Badge>
      case 'not_started':
      default:
        return <Badge variant="outline">Not Started</Badge>
    }
  }

  const handleTaskToggle = (taskId: string) => {
    const task = job.tasks.find((t) => t.id === taskId)
    if (!task) return
    
    // Check if task has a required badge and if user has it
    if (task.requiredBadge && !userHasRequiredBadges(currentUserId, [task.requiredBadge])) {
      alert(`You need the ${task.requiredBadge} badge to complete this task.`)
      return
    }

    const updatedTasks = job.tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            // If task is not completed, mark as awaiting approval
            // If task is already awaiting approval, don't change it
            status: t.status === 'awaiting_approval' 
              ? 'awaiting_approval' 
              : !t.completed ? 'awaiting_approval' : 'not_started',
            completed: t.status === 'awaiting_approval' ? t.completed : !t.completed,
            assignedTo: !t.completed || t.status === 'awaiting_approval' ? currentUserId : undefined,
          }
        : t,
    )

    const updatedJob = { ...job, tasks: updatedTasks }
    onTaskUpdate(updatedJob)
  }

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }
  
  // Function to handle task approval or rejection by admin
  const handleTaskApproval = (taskId: string, approved: boolean) => {
    const updatedJob = { ...job }
    const taskIndex = updatedJob.tasks.findIndex((t) => t.id === taskId)
    
    if (taskIndex !== -1) {
      if (approved) {
        updatedJob.tasks[taskIndex].status = 'completed'
        updatedJob.tasks[taskIndex].completed = true
      } else {
        updatedJob.tasks[taskIndex].status = 'rejected'
        updatedJob.tasks[taskIndex].completed = false
      }
      onTaskUpdate(updatedJob)
    }
  }

  const completedTasks = job.tasks.filter((task) => task.completed).length
  const totalTasks = job.tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const myTasks = job.tasks.filter((task) => task.assignedTo === currentUserId)
  const availableTasks = job.tasks.filter((task) => !task.assignedTo && !task.completed)
  const otherTasks = job.tasks.filter((task) => task.assignedTo && task.assignedTo !== currentUserId)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Overall Completion</span>
            <span className="text-sm font-medium">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* My Tasks */}
      {myTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md">My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {myTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleTaskToggle(task.id)}
                      disabled={task.status === 'awaiting_approval'}
                      title={task.status === 'awaiting_approval' ? 'Task is awaiting approval' : 'Toggle task completion'}
                    >
                      {getTaskIcon(task)}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={task.completed ? "line-through text-gray-500" : ""}>{task.name}</p>
                        {getTaskStatusBadge(task)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{task.points}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime}</span>
                        </div>
                        {task.requiredBadge && (
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">{task.requiredBadge}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Admin approval buttons */}
                  {isAdmin && task.status === 'awaiting_approval' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                        onClick={() => handleTaskApproval(task.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                        onClick={() => handleTaskApproval(task.id, false)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Available Tasks */}
      {availableTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Available Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {availableTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleTaskToggle(task.id)}
                      disabled={task.requiredBadge && !userHasRequiredBadges(currentUserId, [task.requiredBadge])}
                      title={task.requiredBadge && !userHasRequiredBadges(currentUserId, [task.requiredBadge]) ? 
                        `Requires ${task.requiredBadge} badge` : 'Claim this task'}
                    >
                      {getTaskIcon(task)}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{task.name}</p>
                        {getTaskStatusBadge(task)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{task.points}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime}</span>
                        </div>
                        {task.requiredBadge && (
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${!userHasRequiredBadges(currentUserId, [task.requiredBadge]) ? 'bg-red-50 text-red-700' : ''}`}
                            >
                              {task.requiredBadge}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Other Team Members' Tasks */}
      {otherTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Team Tasks ({otherTasks.length})</h3>
          <div className="space-y-3">
            {otherTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-purple-300 bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    ) : (
                      <Circle className="h-5 w-5 text-purple-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          {task.assignedTo}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {task.points} points
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {task.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTasks.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""} selected
              </span>
              <Button onClick={() => console.log("Claiming tasks:", selectedTasks)}>Claim Selected Tasks</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
