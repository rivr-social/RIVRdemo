"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Users, Star, Calendar, Plus, Search, ChevronDown, ChevronUp, Briefcase, Shield, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateJobShiftModal } from "./create-job-shift-modal"
import { mockJobShifts } from "@/lib/mock-job-shift-data"
import { mockProjects, getJobsForProject, calculateProjectCompletion, calculateProjectPoints } from "@/lib/mock-projects-data"
import { userHasRequiredBadges, getUserBadges } from "@/lib/mock-user-badges"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface JobBoardTabProps {
  groupId: string
  currentUserId?: string
}

export function JobBoardTab({ groupId, currentUserId = "user1" }: JobBoardTabProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])

  // Get projects for this group
  const groupProjects = mockProjects.filter((project) => project.groupId === groupId)
  
  // Apply filters to projects
  const filteredProjects = groupProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })
  
  // Toggle project expansion
  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
  }

  const handleApply = (e: React.MouseEvent, jobId: string, requiredBadges: string[]) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Check if user has required badges
    if (requiredBadges.length > 0 && !userHasRequiredBadges(currentUserId, requiredBadges)) {
      alert("You don't have the required badges to claim this job.")
      return
    }
    
    setAppliedJobs((prev) => [...prev, jobId])
    console.log("Applied to job:", jobId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "open":
        return "text-green-600 bg-green-100"
      case "planning":
      case "in-progress":
        return "text-blue-600 bg-blue-100"
      case "completed":
        return "text-gray-600 bg-gray-100"
      case "cancelled":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const categories = [...new Set(groupProjects.map((project) => project.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects & Jobs</h2>
          <p className="text-gray-600">Find projects and jobs to contribute and earn points</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
            <Briefcase className="h-4 w-4 mr-2" />
            New Job
          </Button>
          <Button onClick={() => console.log("Create project")}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Project Cards */}
      <div className="grid gap-4">
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No projects found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => {
            const completion = calculateProjectCompletion(project.id);
            const totalPoints = calculateProjectPoints(project.id);
            const isExpanded = expandedProjects[project.id] || false;
            const projectJobs = getJobsForProject(project.id);
            
            return (
              <Collapsible 
                key={project.id} 
                open={isExpanded} 
                onOpenChange={() => toggleProjectExpansion(project.id)}
                className="w-full"
              >
                <Card className={`border-l-4 ${getPriorityColor(project.priority)}`}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Link href={`/projects/${project.id}`} className="hover:underline">
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                            </Link>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center">
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </div>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{totalPoints} total points</span>
                        </div>
                        {project.deadline && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>{completion}%</span>
                          </div>
                          <Progress value={completion} className="h-2" />
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm" className="text-xs">
                            View Project Details
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-md font-semibold mb-2">Jobs in this Project</h3>
                        {projectJobs.length === 0 ? (
                          <p className="text-gray-500 text-sm">No jobs have been created for this project yet.</p>
                        ) : (
                          <div className="space-y-3">
                            {projectJobs.map((job) => {
                              if (!job) return null;
                              
                              const completedTasks = job.tasks.filter((task) => task.completed).length;
                              const totalTasks = job.tasks.length;
                              const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                              const isAssigned = job.assignees.includes(currentUserId);
                              const hasApplied = appliedJobs.includes(job.id);
                              const canApply = job.status === "open" && job.assignees.length < job.maxAssignees && !isAssigned && !hasApplied;
                              
                              return (
                                <Link key={job.id} href={`/jobs/${job.id}`}>
                                  <Card className="border hover:shadow-sm transition-shadow cursor-pointer">
                                    <CardHeader className="py-3">
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <CardTitle className="text-md">{job.title}</CardTitle>
                                        </div>
                                        <Badge className={getStatusColor(job.status)}>
                                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </Badge>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="py-2">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="h-3 w-3" />
                                            <span>{job.location}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="h-3 w-3" />
                                            <span>{job.assignees.length}/{job.maxAssignees} assigned</span>
                                          </div>
                                          {job.requiredBadges.length > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Shield className="h-3 w-3" />
                                              <span>Requires: {job.requiredBadges.map(badge => (
                                                <Badge key={badge} variant="outline" className="text-xs mr-1">
                                                  {badge}
                                                </Badge>
                                              ))}</span>
                                            </div>
                                          )}
                                        </div>
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2 text-sm">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            <span className="font-medium">{job.totalPoints} points</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span>Tasks:</span>
                                            <span>{completedTasks}/{totalTasks} completed</span>
                                          </div>
                                          <Progress value={progress} className="h-1" />
                                        </div>
                                      </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 pb-3">
                                      <div className="flex justify-end w-full">
                                        {canApply && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={(e) => handleApply(e, job.id, job.requiredBadges)}
                                                  disabled={job.requiredBadges.length > 0 && !userHasRequiredBadges(currentUserId, job.requiredBadges)}
                                                >
                                                  Apply
                                                </Button>
                                              </TooltipTrigger>
                                              {job.requiredBadges.length > 0 && !userHasRequiredBadges(currentUserId, job.requiredBadges) && (
                                                <TooltipContent>
                                                  <p>You need one of these badges: {job.requiredBadges.join(", ")}</p>
                                                </TooltipContent>
                                              )}
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                        {hasApplied && (
                                          <Badge variant="secondary">
                                            Application Submitted
                                          </Badge>
                                        )}
                                        {isAssigned && (
                                          <Badge variant="default" className="bg-green-600">
                                            You're Assigned
                                          </Badge>
                                        )}
                                      </div>
                                    </CardFooter>
                                  </Card>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => console.log(`Add job to project ${project.id}`)}>
                          <Plus className="h-3 w-3 mr-1" /> Add Job
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })
        )}
      </div>

      {/* Create Job Modal */}
      <CreateJobShiftModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        groupId={groupId}
        createdBy={currentUserId}
      />
      
      {/* TODO: Add Create Project Modal */}
    </div>
  )
}
