import { mockJobShifts } from "./mock-job-shift-data";
import { mockGroups } from "./mock-data";

export interface ProjectDomain {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  leads: string[]; // User IDs
  members: string[]; // User IDs
  subgroupId?: string; // Optional reference to a subgroup
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface ProjectResource {
  id: string;
  name: string;
  description: string;
  type: "budget" | "equipment" | "space" | "other";
  allocated: boolean;
  amount?: number;
  unit?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  vision?: string;
  objectives?: string[];
  groupId: string;
  createdBy: string;
  category: string;
  status: "planning" | "active" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  jobs: string[]; // References to job IDs
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  totalPoints?: number;
  completionPercentage?: number;
  tags: string[];
  teamLeads: string[];
  domains?: ProjectDomain[]; // Organized subgroups/departments
  milestones?: ProjectMilestone[];
  resources?: ProjectResource[];
  location?: string;
  budget?: number;
  website?: string;
  socialLinks?: { platform: string; url: string }[];
}

export const mockProjects: Project[] = [
  {
    id: "project1",
    title: "Community Garden Revitalization",
    description: "A comprehensive project to revitalize and expand our community garden with new plants, irrigation systems, and educational signage.",
    longDescription: "Our community garden has been a cornerstone of neighborhood sustainability for over 5 years. This revitalization project aims to expand our growing capacity by 40%, implement water-efficient irrigation systems, and create educational spaces for workshops and community learning.",
    vision: "To create a thriving, sustainable community space that provides fresh food, environmental education, and brings neighbors together through shared gardening experiences.",
    objectives: [
      "Install drip irrigation system to reduce water usage by 30%",
      "Add 20 new raised beds for expanded growing capacity",
      "Create educational signage for plant identification and growing tips",
      "Build a composting demonstration area",
      "Establish a tool library and storage shed"
    ],
    groupId: "group1",
    createdBy: "user1",
    category: "Environment",
    status: "active",
    priority: "high",
    jobs: ["shift1", "shift2", "shift3"],
    createdAt: "2023-04-10T08:00:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
    deadline: "2023-08-30T23:59:59Z",
    tags: ["garden", "community", "sustainability"],
    teamLeads: ["user1", "user3"],
    location: "Pachamama Farm, Boulder, CO",
    budget: 15000,
    website: "https://communitygarden.local",
    domains: [
      {
        id: "planning",
        name: "Planning & Design",
        description: "Project planning, design, and coordination",
        color: "bg-blue-100 text-blue-800",
        icon: "📋",
        leads: ["user1"],
        members: ["user1", "user2"],
        subgroupId: "subgroup5" // Community Events Planning
      },
      {
        id: "construction",
        name: "Construction & Installation",
        description: "Physical construction, bed building, and irrigation installation",
        color: "bg-orange-100 text-orange-800",
        icon: "🔨",
        leads: ["user3"],
        members: ["user3", "user4", "u5"]
      },
      {
        id: "education",
        name: "Education & Outreach",
        description: "Creating educational materials and community engagement",
        color: "bg-green-100 text-green-800",
        icon: "🌱",
        leads: ["user2"],
        members: ["user2", "user4"],
        subgroupId: "subgroup5" // Community Events Planning
      },
      {
        id: "maintenance",
        name: "Garden Team & Events",
        description: "Garden maintenance, workdays, and community engagement events",
        color: "bg-green-100 text-green-800",
        icon: "🌿",
        leads: ["user1", "user3"],
        members: ["user1", "user3", "u5"],
        subgroupId: "subgroup7" // Community Garden Team
      },
      {
        id: "logistics",
        name: "Venue & Logistics",
        description: "Managing event venues, equipment, and logistics coordination",
        color: "bg-purple-100 text-purple-800",
        icon: "📦",
        leads: ["user2"],
        members: ["user2", "user4", "u5"],
        subgroupId: "subgroup6" // Venue & Logistics Coordination
      }
    ],
    milestones: [
      {
        id: "m1",
        title: "Design Phase Complete",
        description: "Finalize garden layout and irrigation design",
        targetDate: "2023-05-15T00:00:00Z",
        completed: true,
        completedDate: "2023-05-12T00:00:00Z"
      },
      {
        id: "m2",
        title: "Materials Procurement",
        description: "Purchase all materials and tools needed",
        targetDate: "2023-06-01T00:00:00Z",
        completed: true,
        completedDate: "2023-05-28T00:00:00Z"
      },
      {
        id: "m3",
        title: "Irrigation Installation",
        description: "Complete installation of drip irrigation system",
        targetDate: "2023-06-30T00:00:00Z",
        completed: false
      },
      {
        id: "m4",
        title: "Bed Construction",
        description: "Build all 20 new raised beds",
        targetDate: "2023-07-15T00:00:00Z",
        completed: false
      }
    ],
    resources: [
      {
        id: "r1",
        name: "Project Budget",
        description: "Total allocated budget for the project",
        type: "budget",
        allocated: true,
        amount: 15000,
        unit: "USD"
      },
      {
        id: "r2",
        name: "Tool Shed Space",
        description: "Dedicated storage space for tools and materials",
        type: "space",
        allocated: true
      },
      {
        id: "r3",
        name: "Irrigation Equipment",
        description: "Drip irrigation system and timers",
        type: "equipment",
        allocated: true,
        amount: 3500,
        unit: "USD"
      }
    ],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/communitygarden" },
      { platform: "Facebook", url: "https://facebook.com/communitygarden" }
    ]
  },
  {
    id: "project2",
    title: "Community Outreach Program",
    description: "Developing and implementing a comprehensive outreach program to engage more community members in our activities and initiatives.",
    groupId: "group1",
    createdBy: "user2",
    category: "Community",
    status: "planning",
    priority: "medium",
    jobs: ["shift4", "shift5"],
    createdAt: "2023-05-01T10:15:00Z",
    updatedAt: "2023-05-10T16:45:00Z",
    deadline: "2023-09-15T23:59:59Z",
    tags: ["outreach", "community", "engagement"],
    teamLeads: ["user2"]
  },
  {
    id: "project3",
    title: "Community Cooperative Restaurant",
    description: "Launching a community-owned restaurant that serves locally-sourced food and provides job training opportunities.",
    longDescription: "This cooperative restaurant will serve as both a community gathering space and a training ground for culinary skills. All ingredients will be locally sourced, with a focus on supporting local farmers and sustainable practices.",
    vision: "To create a sustainable, community-owned dining establishment that nourishes both body and community while providing meaningful employment and training opportunities.",
    objectives: [
      "Open a 50-seat restaurant with full kitchen facilities",
      "Source 80% of ingredients from local farms within 50 miles",
      "Provide culinary training for 20 community members annually",
      "Achieve profitability within 18 months",
      "Create 15 permanent jobs for community members"
    ],
    groupId: "group2",
    createdBy: "user3",
    category: "Business",
    status: "active",
    priority: "high",
    jobs: ["shift6", "shift7", "shift8"],
    createdAt: "2023-03-15T09:30:00Z",
    updatedAt: "2023-06-01T14:20:00Z",
    deadline: "2024-01-15T23:59:59Z",
    tags: ["restaurant", "cooperative", "local-food", "training"],
    teamLeads: ["user3", "user4"],
    location: "Downtown Community Center, 123 Main Street",
    budget: 75000,
    website: "https://cooprestaurant.local",
    domains: [
      {
        id: "kitchen",
        name: "Kitchen Operations",
        description: "Back-of-house operations, food prep, and cooking",
        color: "bg-red-100 text-red-800",
        icon: "👨‍🍳",
        leads: ["user3"],
        members: ["user3", "user1", "u5"]
      },
      {
        id: "foh",
        name: "Front of House",
        description: "Customer service, dining room management, and hospitality",
        color: "bg-blue-100 text-blue-800",
        icon: "🍽️",
        leads: ["user4"],
        members: ["user4", "user2"]
      },
      {
        id: "promotions",
        name: "Marketing & Promotions",
        description: "Social media, community outreach, and promotional events",
        color: "bg-green-100 text-green-800",
        icon: "📢",
        leads: ["user2"],
        members: ["user2", "user4"]
      },
      {
        id: "sourcing",
        name: "Local Sourcing",
        description: "Supplier relationships, inventory management, and procurement",
        color: "bg-yellow-100 text-yellow-800",
        icon: "🚚",
        leads: ["user1"],
        members: ["user1", "u5"]
      },
      {
        id: "training",
        name: "Training & Development",
        description: "Staff training, skill development, and community education",
        color: "bg-purple-100 text-purple-800",
        icon: "🎓",
        leads: ["u5"],
        members: ["u5", "user3", "user4"]
      }
    ],
    milestones: [
      {
        id: "rm1",
        title: "Space Secured",
        description: "Lease signed and space renovation begun",
        targetDate: "2023-04-01T00:00:00Z",
        completed: true,
        completedDate: "2023-03-28T00:00:00Z"
      },
      {
        id: "rm2",
        title: "Kitchen Equipment Installed",
        description: "All major kitchen equipment purchased and installed",
        targetDate: "2023-07-01T00:00:00Z",
        completed: false
      },
      {
        id: "rm3",
        title: "Staff Hired & Trained",
        description: "Core team hired and initial training completed",
        targetDate: "2023-09-15T00:00:00Z",
        completed: false
      },
      {
        id: "rm4",
        title: "Soft Opening",
        description: "Limited service trial run for community feedback",
        targetDate: "2023-11-01T00:00:00Z",
        completed: false
      }
    ],
    resources: [
      {
        id: "rr1",
        name: "Startup Capital",
        description: "Initial funding for equipment and operations",
        type: "budget",
        allocated: true,
        amount: 75000,
        unit: "USD"
      },
      {
        id: "rr2",
        name: "Restaurant Space",
        description: "2,000 sq ft restaurant space with kitchen",
        type: "space",
        allocated: true
      },
      {
        id: "rr3",
        name: "Commercial Kitchen Equipment",
        description: "Professional grade cooking and food prep equipment",
        type: "equipment",
        allocated: false,
        amount: 25000,
        unit: "USD"
      }
    ],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/cooprestaurant" },
      { platform: "Facebook", url: "https://facebook.com/cooprestaurant" },
      { platform: "Twitter", url: "https://twitter.com/cooprestaurant" }
    ]
  },
  {
    id: "project4",
    title: "Digital Transformation Initiative",
    description: "Upgrading our digital infrastructure and online presence to better serve our community and streamline operations.",
    groupId: "group2",
    createdBy: "user3",
    category: "Technology",
    status: "active",
    priority: "high",
    jobs: ["shift6", "shift7", "shift8"],
    createdAt: "2023-03-15T09:30:00Z",
    updatedAt: "2023-05-05T11:20:00Z",
    deadline: "2023-07-31T23:59:59Z",
    tags: ["technology", "digital", "infrastructure"],
    teamLeads: ["user3", "user5"]
  },
  {
    id: "project4",
    title: "Sustainability Workshop Series",
    description: "A series of educational workshops focused on sustainable living practices for community members of all ages.",
    groupId: "group3",
    createdBy: "user4",
    category: "Education",
    status: "completed",
    priority: "medium",
    jobs: ["shift9", "shift10"],
    createdAt: "2023-02-20T14:00:00Z",
    updatedAt: "2023-04-25T17:10:00Z",
    deadline: "2023-04-30T23:59:59Z",
    tags: ["education", "sustainability", "workshops"],
    teamLeads: ["user4"]
  },
  {
    id: "project5",
    title: "Community Art Installation",
    description: "Creating a collaborative art installation that reflects our community's values and diversity.",
    groupId: "group1",
    createdBy: "user5",
    category: "Arts & Culture",
    status: "active",
    priority: "low",
    jobs: ["shift11", "shift12"],
    createdAt: "2023-04-05T11:45:00Z",
    updatedAt: "2023-05-12T13:30:00Z",
    deadline: "2023-10-15T23:59:59Z",
    tags: ["art", "culture", "community"],
    teamLeads: ["user5", "user2"]
  },
  // Joint Venture Business Projects
  {
    id: "venture-project-1",
    title: "Residential Solar Installation Program",
    description: "Scaling solar panel installations across Boulder residential properties with community financing model.",
    longDescription: "Boulder Solar Collective's flagship program offering affordable solar installations to community members through cooperative bulk purchasing, shared financing, and installation crews.",
    vision: "Making renewable energy accessible to every household through cooperative ownership and community investment.",
    objectives: [
      "Install solar systems on 200 residential properties by end of 2024",
      "Achieve 15% cost savings through bulk procurement",
      "Train 20 community members as certified solar installers",
      "Generate $400k annual revenue for the cooperative",
      "Create sustainable jobs for 8 full-time installers"
    ],
    groupId: "venture-org-1",
    createdBy: "user1",
    category: "Business",
    status: "active",
    priority: "high",
    jobs: ["solar-job-1", "solar-job-2"],
    createdAt: "2023-08-20T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    deadline: "2024-12-31T23:59:59Z",
    tags: ["solar", "renewable-energy", "business", "cooperative"],
    teamLeads: ["user1", "user3"],
    location: "Boulder Solar Collective Workshop, 1234 Solar Ave, Boulder, CO",
    budget: 85000,
    website: "https://bouldersolar.coop/residential",
  },
  {
    id: "venture-project-2", 
    title: "Local Food Distribution Network Expansion",
    description: "Expanding food hub operations to serve 5 additional neighborhoods with local produce and bulk goods.",
    longDescription: "Community Food Hub Co-op's growth initiative to build distribution infrastructure and supplier relationships for expanded local food access.",
    vision: "Creating a resilient local food system that supports both farmers and community food security.",
    objectives: [
      "Establish 5 new neighborhood pickup locations",
      "Partner with 15 additional local farms and producers", 
      "Launch bulk buying program for households",
      "Achieve $50k monthly revenue by Q4 2024",
      "Serve 500 member households across the network"
    ],
    groupId: "venture-org-2",
    createdBy: "user2",
    category: "Business",
    status: "active", 
    priority: "high",
    jobs: ["food-job-1", "food-job-2"],
    createdAt: "2023-09-10T10:00:00Z",
    updatedAt: "2024-01-10T16:45:00Z",
    deadline: "2024-10-31T23:59:59Z",
    tags: ["food", "distribution", "cooperative", "local-economy"],
    teamLeads: ["user2", "user4"],
    location: "Community Food Hub Warehouse, 5678 Distribution Dr, Boulder, CO",
    budget: 120000,
    website: "https://communityfoodhub.coop/expansion",
  },
  {
    id: "venture-project-3",
    title: "Creative Workspace Membership Platform",
    description: "Developing digital platform for workspace booking, member management, and creative project collaboration.",
    longDescription: "Shared Workspace Network's technology initiative to streamline operations and create new revenue streams through platform services.",
    vision: "Building a digital ecosystem that supports creative collaboration and workspace sharing across multiple locations.",
    objectives: [
      "Launch mobile app for workspace booking and member services",
      "Implement revenue-sharing system for collaborative projects",
      "Scale to 3 additional workspace locations",
      "Achieve 200 active members across all locations",
      "Generate $35k monthly recurring revenue"
    ],
    groupId: "venture-org-3",
    createdBy: "user3",
    category: "Technology",
    status: "planning",
    priority: "medium", 
    jobs: ["workspace-job-1"],
    createdAt: "2023-11-01T11:00:00Z",
    updatedAt: "2024-01-05T12:20:00Z",
    deadline: "2024-08-31T23:59:59Z",
    tags: ["workspace", "technology", "platform", "creative"],
    teamLeads: ["user3", "user5"],
    location: "Shared Workspace Network HQ, 9012 Creative Blvd, Boulder, CO",
    budget: 75000,
    website: "https://sharedworkspace.coop/platform",
  }
];

// Helper function to get all projects for a specific group
export function getProjectsByGroupId(groupId: string): Project[] {
  return mockProjects.filter(project => project.groupId === groupId);
}

// Helper function to get jobs for a specific project
export function getJobsForProject(projectId: string) {
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) return [];
  
  return project.jobs.map(jobId => 
    mockJobShifts.find(job => job.id === jobId)
  ).filter(Boolean);
}

// Calculate project completion percentage based on tasks in all jobs
export function calculateProjectCompletion(projectId: string): number {
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) return 0;
  
  const jobs = project.jobs.map(jobId => 
    mockJobShifts.find(job => job.id === jobId)
  ).filter(Boolean);
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  jobs.forEach(job => {
    if (!job) return;
    totalTasks += job.tasks.length;
    completedTasks += job.tasks.filter(task => task.completed).length;
  });
  
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
}

// Calculate total points for a project
export function calculateProjectPoints(projectId: string): number {
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) return 0;
  
  const jobs = project.jobs.map(jobId => 
    mockJobShifts.find(job => job.id === jobId)
  ).filter(Boolean);
  
  return jobs.reduce((total, job) => total + (job?.totalPoints || 0), 0);
}
