"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { JobListing } from "@/lib/mock-job-data"

interface CreateJobModalProps {
  groupId: string
  currentUserId: string
  trigger: React.ReactNode
  onJobCreated: (job: JobListing) => void
}

export function CreateJobModal({ groupId, currentUserId, trigger, onJobCreated }: CreateJobModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "volunteer" as "job" | "task" | "volunteer",
    compensationType: "volunteer" as "paid" | "volunteer" | "trade" | "points",
    compensationAmount: "",
    locationType: "in-person" as "remote" | "in-person" | "hybrid",
    locationAddress: "",
    locationCity: "",
    timeCommitmentType: "one-time" as "one-time" | "recurring" | "ongoing",
    duration: "",
    schedule: "",
    urgency: "medium" as "low" | "medium" | "high",
    deadline: "",
  })
  const [requirements, setRequirements] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newJob: JobListing = {
      id: `job_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      compensation: {
        type: formData.compensationType,
        ...(formData.compensationType === "paid" && {
          amount: Number.parseInt(formData.compensationAmount),
          currency: "USD",
        }),
        ...(formData.compensationType === "points" && {
          points: Number.parseInt(formData.compensationAmount),
        }),
        ...(formData.compensationType === "trade" && {
          amount: Number.parseInt(formData.compensationAmount),
          currency: "USD",
        }),
      },
      location: {
        type: formData.locationType,
        ...(formData.locationType !== "remote" && {
          address: formData.locationAddress,
          city: formData.locationCity,
        }),
      },
      timeCommitment: {
        type: formData.timeCommitmentType,
        duration: formData.duration,
        schedule: formData.schedule,
      },
      requirements: requirements.length > 0 ? requirements : undefined,
      skills: skills.length > 0 ? skills : undefined,
      postedBy: currentUserId,
      groupId,
      createdAt: new Date().toISOString(),
      deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
      status: "open",
      applicants: [],
      urgency: formData.urgency,
      tags: skills.slice(0, 3), // Use first 3 skills as tags
    }

    onJobCreated(newJob)
    setOpen(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      type: "volunteer",
      compensationType: "volunteer",
      compensationAmount: "",
      locationType: "in-person",
      locationAddress: "",
      locationCity: "",
      timeCommitmentType: "one-time",
      duration: "",
      schedule: "",
      urgency: "medium",
      deadline: "",
    })
    setRequirements([])
    setSkills([])
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeRequirement = (requirement: string) => {
    setRequirements(requirements.filter((r) => r !== requirement))
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>Create a job posting for your group members to see and apply to.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Community Garden Coordinator"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the job responsibilities, goals, and what you're looking for..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Administrative">Administrative</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Job Type *</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value: "job" | "task" | "volunteer") => setFormData({ ...formData, type: value })}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="job" id="job" />
                    <Label htmlFor="job">Paid Job</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="task" id="task" />
                    <Label htmlFor="task">Task</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="volunteer" id="volunteer" />
                    <Label htmlFor="volunteer">Volunteer</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <Label>Compensation</Label>
            <RadioGroup
              value={formData.compensationType}
              onValueChange={(value: "paid" | "volunteer" | "trade" | "points") =>
                setFormData({ ...formData, compensationType: value })
              }
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paid">Paid ($)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="volunteer" id="volunteer-comp" />
                <Label htmlFor="volunteer-comp">Volunteer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="trade" id="trade" />
                <Label htmlFor="trade">Trade/Barter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="points" id="points" />
                <Label htmlFor="points">Points</Label>
              </div>
            </RadioGroup>

            {(formData.compensationType === "paid" ||
              formData.compensationType === "trade" ||
              formData.compensationType === "points") && (
              <div>
                <Label htmlFor="amount">
                  {formData.compensationType === "paid"
                    ? "Amount ($)"
                    : formData.compensationType === "points"
                      ? "Points"
                      : "Trade Value ($)"}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.compensationAmount}
                  onChange={(e) => setFormData({ ...formData, compensationAmount: e.target.value })}
                  placeholder={formData.compensationType === "points" ? "50" : "500"}
                />
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-4">
            <Label>Location</Label>
            <RadioGroup
              value={formData.locationType}
              onValueChange={(value: "remote" | "in-person" | "hybrid") =>
                setFormData({ ...formData, locationType: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person">In Person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
            </RadioGroup>

            {formData.locationType !== "remote" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.locationAddress}
                    onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.locationCity}
                    onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                    placeholder="Boulder, CO"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Time Commitment */}
          <div className="space-y-4">
            <Label>Time Commitment</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Type</Label>
                <Select
                  value={formData.timeCommitmentType}
                  onValueChange={(value: "one-time" | "recurring" | "ongoing") =>
                    setFormData({ ...formData, timeCommitmentType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="4 hours/week"
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="Saturdays 9am-1pm"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <Label>Requirements</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" onClick={addRequirement} variant="outline">
                Add
              </Button>
            </div>
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {requirements.map((req) => (
                  <Badge key={req} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeRequirement(req)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <Label>Required Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="urgency">Urgency</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, urgency: value })}
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
            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
