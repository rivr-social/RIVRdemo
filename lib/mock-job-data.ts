export interface JobListing {
  id: string
  title: string
  description: string
  category: string
  type: "job" | "task" | "volunteer"
  compensation?: {
    type: "paid" | "volunteer" | "trade" | "points"
    amount?: number
    currency?: string
    points?: number
  }
  location?: {
    type: "remote" | "in-person" | "hybrid"
    address?: string
    city?: string
  }
  timeCommitment: {
    type: "one-time" | "recurring" | "ongoing"
    duration?: string
    schedule?: string
  }
  requirements?: string[]
  skills?: string[]
  postedBy: string
  groupId: string
  createdAt: string
  deadline?: string
  status: "open" | "in-progress" | "completed" | "cancelled"
  applicants?: string[]
  assignedTo?: string
  tags?: string[]
  urgency: "low" | "medium" | "high"
}

export const mockJobListings: JobListing[] = [
  {
    id: "job1",
    title: "Community Garden Coordinator",
    description:
      "Help coordinate weekly garden maintenance and organize volunteer workdays. Perfect for someone passionate about sustainable agriculture and community building.",
    category: "Environment",
    type: "volunteer",
    compensation: {
      type: "points",
      points: 50,
    },
    location: {
      type: "in-person",
      address: "123 Garden St",
      city: "Boulder, CO",
    },
    timeCommitment: {
      type: "recurring",
      duration: "4 hours/week",
      schedule: "Saturdays 9am-1pm",
    },
    requirements: ["Must be available on weekends", "Physical ability to do garden work"],
    skills: ["gardening", "coordination", "community organizing"],
    postedBy: "user1",
    groupId: "group1",
    createdAt: "2024-07-10T10:00:00Z",
    deadline: "2024-08-01T23:59:59Z",
    status: "open",
    applicants: ["user2", "user3"],
    tags: ["gardening", "environment", "coordination"],
    urgency: "medium",
  },
  {
    id: "job2",
    title: "Website Developer",
    description:
      "Build a simple website for our climate action group to showcase our projects and events. Looking for someone with React/Next.js experience.",
    category: "Technology",
    type: "job",
    compensation: {
      type: "paid",
      amount: 800,
      currency: "USD",
    },
    location: {
      type: "remote",
    },
    timeCommitment: {
      type: "one-time",
      duration: "2-3 weeks",
    },
    requirements: ["Portfolio of previous work", "Experience with React"],
    skills: ["web development", "React", "Next.js", "design"],
    postedBy: "user1",
    groupId: "group1",
    createdAt: "2024-07-12T14:30:00Z",
    deadline: "2024-07-25T23:59:59Z",
    status: "open",
    applicants: ["user2"],
    tags: ["web development", "technology", "freelance"],
    urgency: "high",
  },
  {
    id: "job3",
    title: "Event Photography",
    description:
      "Capture photos at our upcoming community dinner event. We need someone to document the evening and create content for social media.",
    category: "Creative",
    type: "task",
    compensation: {
      type: "trade",
      amount: 100,
      currency: "USD",
    },
    location: {
      type: "in-person",
      address: "789 Food St",
      city: "Los Angeles, CA",
    },
    timeCommitment: {
      type: "one-time",
      duration: "3 hours",
      schedule: "August 15th, 5-8pm",
    },
    requirements: ["Own camera equipment", "Portfolio of event photography"],
    skills: ["photography", "social media", "event documentation"],
    postedBy: "user3",
    groupId: "group3",
    createdAt: "2024-07-14T09:15:00Z",
    deadline: "2024-08-10T23:59:59Z",
    status: "open",
    applicants: ["user4"],
    tags: ["photography", "events", "creative"],
    urgency: "medium",
  },
  {
    id: "job4",
    title: "Social Media Manager",
    description:
      "Manage our group's social media presence across Instagram, Twitter, and Facebook. Create engaging content about our food justice initiatives.",
    category: "Marketing",
    type: "volunteer",
    compensation: {
      type: "points",
      points: 30,
    },
    location: {
      type: "remote",
    },
    timeCommitment: {
      type: "ongoing",
      duration: "5 hours/week",
    },
    requirements: ["Experience with social media platforms", "Understanding of food justice issues"],
    skills: ["social media", "content creation", "marketing", "writing"],
    postedBy: "user4",
    groupId: "group2",
    createdAt: "2024-07-11T16:45:00Z",
    status: "in-progress",
    assignedTo: "u5",
    tags: ["social media", "marketing", "ongoing"],
    urgency: "low",
  },
  {
    id: "job5",
    title: "Grant Writing Assistant",
    description:
      "Help research and write grant applications for our housing advocacy work. Experience with nonprofit grant writing preferred.",
    category: "Administrative",
    type: "volunteer",
    compensation: {
      type: "points",
      points: 75,
    },
    location: {
      type: "hybrid",
      city: "New York, NY",
    },
    timeCommitment: {
      type: "one-time",
      duration: "20 hours over 2 weeks",
    },
    requirements: ["Strong writing skills", "Research experience"],
    skills: ["grant writing", "research", "nonprofit experience"],
    postedBy: "user3",
    groupId: "group3",
    createdAt: "2024-07-13T11:20:00Z",
    deadline: "2024-07-30T23:59:59Z",
    status: "open",
    applicants: ["u5"],
    tags: ["grant writing", "administrative", "nonprofit"],
    urgency: "high",
  },
]
