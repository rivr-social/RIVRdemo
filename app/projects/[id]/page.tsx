"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { mockProjects, getJobsForProject, calculateProjectCompletion, calculateProjectPoints } from "@/lib/mock-projects-data"
import { mockJobShifts } from "@/lib/mock-job-shift-data"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params?.id as string
  const currentUserId = "user1" // In a real app, this would come from auth

  const [project, setProject] = useState<any | null>(null)
  const [projectJobs, setProjectJobs] = useState<any[]>([])
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // Find the project
    const foundProject = mockProjects.find((p) => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
      
      // Get jobs for this project
      const jobs = getJobsForProject(projectId).filter(Boolean)
      setProjectJobs(jobs)
    }
  }, [projectId])

  if (!project) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const completion = calculateProjectCompletion(project.id)
  const totalPoints = calculateProjectPoints(project.id)

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityBorderColor = (priority: string) => {
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
        return "text-green-600 bg-green-50"
      case "planning":
      case "in-progress":
        return "text-blue-600 bg-blue-50"
      case "completed":
        return "text-gray-600 bg-gray-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 pb-20">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      {/* Project Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getPriorityColor(project.priority)}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
            </Badge>
            <Badge className={getStatusColor(project.status)}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="h-5 w-5 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600">Jobs</p>
              <p className="font-medium">{projectJobs.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600">Team Leads</p>
              <p className="font-medium">{project.teamLeads.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="font-medium">{totalPoints}</p>
            </CardContent>
          </Card>
          {project.deadline && (
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Overall Progress</h3>
              <span className="text-sm text-gray-500">
                {completion}% complete
              </span>
            </div>
            <Progress value={completion} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({projectJobs.length})</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <div className="grid gap-6">
            {/* Project Description & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{project.longDescription || project.description}</p>
                  {project.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vision & Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.vision && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Vision</h4>
                      <p className="text-gray-700 text-sm">{project.vision}</p>
                    </div>
                  )}
                  {project.objectives && project.objectives.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Key Objectives</h4>
                      <ul className="space-y-1">
                        {project.objectives.slice(0, 3).map((objective, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                        {project.objectives.length > 3 && (
                          <li className="text-sm text-gray-500 italic">
                            +{project.objectives.length - 3} more objectives...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Project Domains/Departments */}
            {project.domains && project.domains.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Domains & Teams</CardTitle>
                  <p className="text-sm text-gray-600">Organized teams working on different aspects of the project</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.domains.map((domain) => (
                      <div key={domain.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{domain.icon}</span>
                          <div>
                            <h3 className="font-medium">{domain.name}</h3>
                            <p className="text-sm text-gray-600">{domain.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {/* Domain Leads */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Leads</h4>
                            <div className="flex flex-wrap gap-2">
                              {domain.leads.map((leadId) => (
                                <div key={leadId} className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={`/placeholder-user.jpg`} />
                                    <AvatarFallback className="text-xs">{leadId.slice(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">User {leadId}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Domain Members */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members ({domain.members.length})</h4>
                            <div className="flex flex-wrap gap-1">
                              {domain.members.slice(0, 4).map((memberId) => (
                                <Avatar key={memberId} className="h-6 w-6">
                                  <AvatarImage src={`/placeholder-user.jpg`} />
                                  <AvatarFallback className="text-xs">{memberId.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              ))}
                              {domain.members.length > 4 && (
                                <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{domain.members.length - 4}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Resources & Budget */}
            <div className="grid md:grid-cols-2 gap-6">
              {project.resources && project.resources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.resources.map((resource) => (
                        <div key={resource.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{resource.name}</p>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={resource.allocated ? "default" : "outline"}>
                              {resource.allocated ? "Allocated" : "Pending"}
                            </Badge>
                            {resource.amount && (
                              <p className="text-sm text-gray-600 mt-1">
                                {resource.amount} {resource.unit}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {project.milestones && project.milestones.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.milestones.slice(0, 4).map((milestone, index) => (
                        <div key={milestone.id} className="flex items-start gap-3">
                          <div className={`h-3 w-3 rounded-full mt-2 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-medium ${milestone.completed ? 'text-green-700' : 'text-gray-700'}`}>
                                  {milestone.title}
                                </p>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">
                                  {milestone.completed 
                                    ? `Completed ${new Date(milestone.completedDate || '').toLocaleDateString()}`
                                    : `Due ${new Date(milestone.targetDate).toLocaleDateString()}`
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Project Links & Contact */}
            {(project.website || (project.socialLinks && project.socialLinks.length > 0)) && (
              <Card>
                <CardHeader>
                  <CardTitle>Links & Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {project.website && (
                      <a 
                        href={project.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <span>🌐</span>
                        <span>Project Website</span>
                      </a>
                    )}
                    {project.socialLinks?.map((link) => (
                      <a 
                        key={link.platform}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <span>{link.platform === 'Instagram' ? '📷' : link.platform === 'Facebook' ? '📘' : '🐦'}</span>
                        <span>{link.platform}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Category</h3>
                    <p>{project.category}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Created</h3>
                    <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Last Updated</h3>
                    <p>{new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <p className="font-medium">Project Created</p>
                      <p className="text-sm text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="w-0.5 h-8 bg-gray-200 ml-5"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">●</span>
                    </div>
                    <div>
                      <p className="font-medium">Current Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}</p>
                      <p className="text-sm text-gray-500">{new Date(project.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="w-0.5 h-8 bg-gray-200 ml-5"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">○</span>
                    </div>
                    <div>
                      <p className="font-medium">Project Deadline</p>
                      <p className="text-sm text-gray-500">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <div className="grid gap-4">
            {projectJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No jobs have been created for this project yet.</p>
                  <Button className="mt-4">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Create First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              projectJobs.map((job) => {
                if (!job) return null;
                
                const completedTasks = job.tasks.filter((task: any) => task.completed).length;
                const totalTasks = job.tasks.length;
                const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                const isExpanded = expandedJobs[job.id] || false;
                
                return (
                  <Collapsible 
                    key={job.id} 
                    open={isExpanded} 
                    onOpenChange={() => toggleJobExpansion(job.id)}
                    className="w-full"
                  >
                    <Card className={`border-l-4 ${getPriorityBorderColor(job.priority)}`}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                <Badge className={getStatusColor(job.status)}>
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mt-1 line-clamp-2">{job.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center">
                                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{job.totalPoints} points</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Tasks</span>
                                <span>{completedTasks}/{totalTasks} completed</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Duration: {job.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>Team: {job.assignees.length}/{job.maxAssignees} assigned</span>
                              </div>
                              {job.deadline && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              {job.requiredBadges.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Required Skills:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {job.requiredBadges.map((badge: string) => (
                                      <Badge key={badge} variant="secondary" className="text-xs">
                                        {badge.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link href={`/jobs/${job.id}`}>
                              <Button>
                                View Job Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })
            )}
            
            <div className="flex justify-end mt-4">
              <Button>
                <Briefcase className="h-4 w-4 mr-2" />
                Add New Job
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="space-y-6">
            {/* Domain-based Team Organization */}
            {project.domains && project.domains.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Team Organization by Domain</h2>
                {project.domains.map((domain) => (
                  <Card key={domain.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{domain.icon}</span>
                        <div>
                          <CardTitle>{domain.name}</CardTitle>
                          <p className="text-sm text-gray-600">{domain.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Domain Leads */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Domain Leads</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {domain.leads.map((leadId) => (
                              <div key={leadId} className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50">
                                <Avatar>
                                  <AvatarImage src={`/placeholder-user.jpg`} />
                                  <AvatarFallback>{leadId.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">User {leadId}</p>
                                  <p className="text-sm text-blue-600">Domain Lead</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Domain Members */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Team Members ({domain.members.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {domain.members.map((memberId) => (
                              <div key={memberId} className="flex items-center gap-3 p-3 border rounded-lg">
                                <Avatar>
                                  <AvatarImage src={`/placeholder-user.jpg`} />
                                  <AvatarFallback>{memberId.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">User {memberId}</p>
                                  <p className="text-sm text-gray-500">Team Member</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Fallback to original team structure */
              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">Team Leads</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.teamLeads.map((leadId: string) => (
                          <div key={leadId} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user.jpg`} />
                              <AvatarFallback>{leadId.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">User {leadId}</p>
                              <p className="text-sm text-gray-500">Team Lead</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">Contributors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Get unique contributors from all jobs */}
                        {Array.from(new Set(projectJobs.flatMap(job => job?.assignees || []))).map((userId: string) => (
                          <div key={userId} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user.jpg`} />
                              <AvatarFallback>{userId.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">User {userId}</p>
                              <p className="text-sm text-gray-500">Contributor</p>
                            </div>
                          </div>
                        ))}
                        
                        {projectJobs.flatMap(job => job?.assignees || []).length === 0 && (
                          <p className="text-gray-500 col-span-3">No contributors assigned to jobs yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
