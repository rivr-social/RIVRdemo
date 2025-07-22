"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Plus, X, AlertCircle } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  estimatedTime: number
  points: number
  required: boolean
}

interface JobShift {
  id: string
  title: string
  description: string
  groupId: string
  createdBy: string
  location: string
  startTime: string
  endTime: string
  duration: string
  category: string
  priority: "low" | "medium" | "high"
  maxAssignees: number
  totalPoints: number
  tasks: Task[]
  skills: string[]
  status: "open" | "in-progress" | "completed" | "cancelled"
  assignees: string[]
  createdAt: string
}

interface CreateJobShiftModalProps {
  groupId: string
  currentUserId: string
  trigger: React.ReactNode
  onJobShiftCreated: (jobShift: JobShift) => void
}

export function CreateJobShiftModal({ groupId, currentUserId, trigger, onJobShiftCreated }: CreateJobShiftModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    category: "",
    priority: "medium" as "low" | "medium" | "high",
    maxAssignees: 1,
  })
  const [tasks, setTasks] = useState<Task[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [currentTask, setCurrentTask] = useState({
    name: "",
    description: "",
    estimatedTime: 30,
    points: 10,
    required: true,
  })

  const addTask = () => {
    if (currentTask.name.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...currentTask,
      }
      setTasks([...tasks, newTask])
      setCurrentTask({
        name: "",
        description: "",
        estimatedTime: 30,
        points: 10,
        required: true,
      })
    }
  }

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`)
      const end = new Date(`2000-01-01T${formData.endTime}`)
      const diffMs = end.getTime() - start.getTime()
      const diffHours = diffMs / (1000 * 60 * 60)
      return diffHours > 0 ? `${diffHours} hours` : ""
    }
    return ""
  }

  const calculateTotalPoints = () => {
    return tasks.reduce((total, task) => total + task.points, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim() || tasks.length === 0) {
      return
    }

    const jobShift: JobShift = {
      id: `job-shift-${Date.now()}`,
      ...formData,
      groupId,
      createdBy: currentUserId,
      duration: calculateDuration(),
      totalPoints: calculateTotalPoints(),
      tasks,
      skills,
      status: "open",
      assignees: [],
      createdAt: new Date().toISOString(),
    }

    onJobShiftCreated(jobShift)
    setOpen(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      category: "",
      priority: "medium",
      maxAssignees: 1,
    })
    setTasks([])
    setSkills([])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Job Shift</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Shift Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Community Garden Maintenance"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this job shift involves..."
              rows={3}
              required
            />
          </div>

          {/* Time and Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Community Center"
              />
            </div>
          </div>

          {/* Priority and Max Assignees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAssignees">Max Assignees</Label>
              <Input
                id="maxAssignees"
                type="number"
                min="1"
                max="20"
                value={formData.maxAssignees}
                onChange={(e) => setFormData({ ...formData, maxAssignees: Number.parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <Separator />

          {/* Tasks Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tasks *</h3>

            {/* Add Task Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskName">Task Name</Label>
                    <Input
                      id="taskName"
                      value={currentTask.name}
                      onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                      placeholder="e.g., Weed flower beds"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskPoints">Points</Label>
                    <Input
                      id="taskPoints"
                      type="number"
                      min="1"
                      value={currentTask.points}
                      onChange={(e) => setCurrentTask({ ...currentTask, points: Number.parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskDescription">Task Description</Label>
                  <Textarea
                    id="taskDescription"
                    value={currentTask.description}
                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    placeholder="Describe what this task involves..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskTime">Estimated Time (minutes)</Label>
                    <Input
                      id="taskTime"
                      type="number"
                      min="5"
                      step="5"
                      value={currentTask.estimatedTime}
                      onChange={(e) =>
                        setCurrentTask({ ...currentTask, estimatedTime: Number.parseInt(e.target.value) || 30 })
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addTask} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            {tasks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Tasks ({tasks.length})</h4>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium">{task.name}</h5>
                              <Badge variant="outline">{task.points} pts</Badge>
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.estimatedTime}min
                              </Badge>
                            </div>
                            {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeTask(task.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Skills</h3>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                    {skill}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {(formData.title || tasks.length > 0) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{calculateDuration() || "Not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.maxAssignees} max</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(formData.priority)}>
                      {formData.priority === "high" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {formData.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{calculateTotalPoints()} total points</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title.trim() || !formData.description.trim() || tasks.length === 0}
            >
              Create Job Shift
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
