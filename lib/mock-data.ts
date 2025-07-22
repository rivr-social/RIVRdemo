"use client"

import type { User, Group, Comment, MarketplaceListing, Ring, Family, MutualAsset, Basin, Offering, FlowPass } from "./types"
import { JoinType, NotificationType, GroupType, AssetCategory, AssetStatus, OfferingType, FlowPassType, PostType } from "./types"

// Mock data for basins (HUC-6 River Basins)
export const basins: Basin[] = [
  { id: "south-platte", name: "South Platte River Basin", huc6Code: "101900", description: "Colorado Front Range river basin", image: "/blue-ridge-vista.png" },
  { id: "colorado-headwaters", name: "Colorado Headwaters Basin", huc6Code: "140100", description: "Source waters of the Colorado River", image: "/mountain-bike-trail.png" },
  { id: "san-francisco-bay", name: "San Francisco Bay Basin", huc6Code: "180500", description: "California Central Coast basin", image: "/golden-gate-vista.png" },
  { id: "puget-sound", name: "Puget Sound Basin", huc6Code: "171100", description: "Pacific Northwest coastal basin", image: "/Seattle-Skyline-Waterfront.png" },
  { id: "great-lakes", name: "Great Lakes Basin", huc6Code: "040100", description: "Great Lakes watershed", image: "/chicago-cityscape.png" },
]

// Mock data for bioregional councils
export const bioregionalCouncils = [
  {
    id: "south-platte-council",
    basinId: "south-platte",
    name: "South Platte Bioregional Council",
    description: "Collaborative watershed governance for the South Platte River Basin, focusing on ecological restoration and community resilience.",
    members: [
      {
        id: "cameron",
        name: "Cameron Murdock",
        role: "Council Chair & Boulder Commons Representative",
        avatar: "/cameron-profile.png"
      },
      {
        id: "council-member-1",
        name: "Dr. Sarah Chen",
        role: "Watershed Ecologist",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "council-member-2",
        name: "Miguel Rodriguez",
        role: "Indigenous Knowledge Keeper",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "council-member-3",
        name: "Rebecca Johnson",
        role: "Denver Chapter Representative",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "council-member-4",
        name: "Tom Wilson",
        role: "Agricultural Community Liaison",
        avatar: "/placeholder-user.jpg"
      }
    ],
    nextMeeting: "Tuesday, July 23rd, 2024 at 7:00 PM - Watershed Planning Quarterly",
    initiatives: [
      {
        id: "riparian-restoration",
        title: "South Platte Riparian Restoration",
        status: "active"
      },
      {
        id: "water-quality-monitoring",
        title: "Community Water Quality Monitoring Program",
        status: "active"
      },
      {
        id: "native-species-recovery",
        title: "Native Fish Species Recovery Initiative",
        status: "planning"
      },
      {
        id: "flood-resilience",
        title: "Flood Resilience and Natural Infrastructure",
        status: "planning"
      },
      {
        id: "carbon-sequestration",
        title: "Watershed Carbon Sequestration Project",
        status: "completed"
      }
    ],
    establishedDate: "2023-03-15",
    governanceModel: "Consensus-based decision making with rotating leadership",
    meetingFrequency: "Quarterly with monthly working group meetings"
  },
  {
    id: "san-francisco-bay-council",
    basinId: "san-francisco-bay", 
    name: "San Francisco Bay Bioregional Council",
    description: "Regional coordination for bay area ecological restoration and community resilience across the Central Coast basin.",
    members: [
      {
        id: "bay-council-1",
        name: "Dr. Elena Vasquez",
        role: "Marine Biologist & Council Facilitator",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user2",
        name: "John Smith",
        role: "SF Chapter Representative",
        avatar: "/abstract-geometric-shapes.png"
      },
      {
        id: "bay-council-2",
        name: "James Park",
        role: "Wetlands Restoration Coordinator",
        avatar: "/placeholder-user.jpg"
      }
    ],
    nextMeeting: "Friday, July 26th, 2024 at 6:30 PM - Bay Restoration Planning",
    initiatives: [
      {
        id: "bay-wetlands-restoration",
        title: "Bay Area Wetlands Restoration",
        status: "active"
      },
      {
        id: "urban-biodiversity",
        title: "Urban Biodiversity Corridors",
        status: "active"
      },
      {
        id: "sea-level-adaptation",
        title: "Sea Level Rise Adaptation Planning",
        status: "planning"
      }
    ],
    establishedDate: "2023-06-10",
    governanceModel: "Representative democracy with specialist working groups",
    meetingFrequency: "Monthly with biweekly working group meetings"
  }
]

// Mock data for chapters/locales (now with basin associations)
export const chapters = [
  { id: "nyc", name: "New York City", slug: "nyc", memberCount: 1250, image: "/vibrant-nyc-street.png", description: "The heart of the movement in NYC", location: "New York, NY", basinId: "great-lakes", isCommons: false },
  { id: "sf", name: "San Francisco", slug: "sf", memberCount: 980, image: "/golden-gate-vista.png", description: "Bay Area community organizing", location: "San Francisco, CA", basinId: "san-francisco-bay", isCommons: false },
  { id: "la", name: "Los Angeles", slug: "la", memberCount: 1100, image: "/downtown-la-evening.png", description: "Southern California organizing hub", location: "Los Angeles, CA", basinId: "san-francisco-bay", isCommons: false },
  { id: "chi", name: "Chicago", slug: "chi", memberCount: 850, image: "/chicago-cityscape.png", description: "Midwest community power", location: "Chicago, IL", basinId: "great-lakes", isCommons: false },
  { id: "bos", name: "Boston", slug: "bos", memberCount: 720, image: "/boston-harbor-view.png", description: "New England organizing", location: "Boston, MA", basinId: "great-lakes", isCommons: false },
  { id: "sea", name: "Seattle", slug: "sea", memberCount: 680, image: "/Seattle-Skyline-Waterfront.png", description: "Pacific Northwest activism", location: "Seattle, WA", basinId: "puget-sound", isCommons: false },
  { id: "aus", name: "Austin", slug: "aus", memberCount: 590, image: "/austin-cityscape-night.png", description: "Keep Austin organized", location: "Austin, TX", basinId: "colorado-headwaters", isCommons: false },
  { id: "den", name: "Denver", slug: "den", memberCount: 510, image: "/denver-cityscape-twilight.png", description: "Rocky Mountain organizing", location: "Denver, CO", basinId: "south-platte", isCommons: false },
  { id: "por", name: "Portland", slug: "por", memberCount: 470, image: "/portland-cityscape-willamette.png", description: "Portland community building", location: "Portland, OR", basinId: "puget-sound", isCommons: false },
  { id: "boulder", name: "Boulder Commons", slug: "boulder", memberCount: 350, image: "/boulder-landscape.png", description: "Boulder grassroots organizing", location: "Boulder, CO", basinId: "south-platte", isCommons: true },
  { id: "longmont", name: "Longmont", slug: "longmont", memberCount: 120, image: "/blue-ridge-vista.png", description: "Longmont community organizing", location: "Longmont, CO", basinId: "south-platte", isCommons: false },
]

const additionalUsers = [
  {
    id: "5",
    name: "David Kim",
    username: "davidkim",
    bio: "Community organizer and local business advocate",
    avatar: "/placeholder-user.jpg",
    followers: 234,
    following: 189,
    isFollowing: false,
    isVerified: false,
    joinDate: "2023-02-10",
    location: "Portland, OR",
  },
  {
    id: "6",
    name: "Lisa Rodriguez",
    username: "lisarodriguez",
    bio: "Environmental activist and sustainability expert",
    avatar: "/placeholder-user.jpg",
    followers: 445,
    following: 267,
    isFollowing: true,
    isVerified: true,
    joinDate: "2023-01-15",
    location: "Austin, TX",
  },
]

export { additionalUsers }

// Mock data for users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Cameron Murdock",
    username: "cameronmurdock",
    email: "cameron.murdock@example.com",
    bio: "Community organizer and event planner",
    avatar: "/cameron-profile.png",
    followers: 234,
    following: 189,
    joinedAt: "2023-01-15",
    location: "Boulder, Colorado",
    skills: ["event planning", "community organizing", "fundraising"],
    points: 125,
    chapterTags: ["boulder"],
    groupTags: ["group1", "group2"],
  },
  {
    id: "user2",
    name: "John Smith",
    username: "johnsmith",
    email: "john.smith@example.com",
    bio: "Software engineer and open source contributor",
    avatar: "/abstract-geometric-shapes.png",
    followers: 345,
    following: 123,
    joinedAt: "2023-02-20",
    location: "San Francisco, CA",
    skills: ["software development", "web design", "project management"],
    points: 80,
    chapterTags: ["sf"],
    groupTags: ["group2", "group3"],
  },
  {
    id: "user3",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    bio: "Community organizer and event planner",
    avatar: "/intertwined-letters.png",
    followers: 456,
    following: 234,
    joinedAt: "2023-03-10",
    location: "New York, NY",
    skills: ["community organizing", "event planning", "public speaking"],
    points: 150,
    chapterTags: ["nyc"],
    groupTags: ["group1", "group3"],
  },
  {
    id: "user4",
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    bio: "Graphic designer and marketing specialist",
    avatar: "/abstract-geometric-shapes.png",
    followers: 567,
    following: 45,
    joinedAt: "2023-04-05",
    location: "Los Angeles, CA",
    skills: ["graphic design", "marketing", "social media"],
    points: 95,
    chapterTags: ["la"],
    groupTags: ["group2"],
  },
  {
    id: "u5",
    name: "Emily Chen",
    username: "emilychen",
    email: "emily.chen@example.com",
    bio: "Data scientist and policy analyst",
    avatar: "/abstract-geometric-shapes.png",
    followers: 678,
    following: 56,
    joinedAt: "2023-05-01",
    location: "Chicago, IL",
    skills: ["data analysis", "policy research", "statistics"],
    points: 110,
    chapterTags: ["chi"],
    groupTags: ["group1"],
  },
  {
    id: "miranda",
    name: "Miranda Clendening",
    username: "mirandaclendening",
    email: "miranda@rivr.co",
    bio: "Treasurer and CFO of RIVR. Financial strategist and cooperative economics advocate.",
    avatar: "/placeholder-user.jpg",
    followers: 145,
    following: 78,
    joinedAt: "2024-01-01",
    location: "Boulder, CO",
    skills: ["finance", "cooperative economics", "strategic planning"],
    points: 180,
    chapterTags: ["boulder"],
    groupTags: ["rivr-org"],
  },
  {
    id: "kathleen",
    name: "Kathleen Marie Rose",
    username: "kathleenmarierose",
    email: "kathleen@rivr.co",
    bio: "Secretary and CMO of RIVR. Community organizing and marketing strategist.",
    avatar: "/placeholder-user.jpg",
    followers: 234,
    following: 156,
    joinedAt: "2024-01-01",
    location: "Boulder, CO",
    skills: ["marketing", "community organizing", "communications"],
    points: 165,
    chapterTags: ["boulder"],
    groupTags: ["rivr-org"],
  },
  {
    id: "grig",
    name: "Grig Bilham",
    username: "grigbilham",
    email: "grig@rivr.co",
    bio: "CTO of RIVR. Technology leader building decentralized social coordination platforms.",
    avatar: "/placeholder-user.jpg",
    followers: 189,
    following: 134,
    joinedAt: "2024-01-01",
    location: "Boulder, CO",
    skills: ["software engineering", "platform architecture", "decentralized systems"],
    points: 195,
    chapterTags: ["boulder"],
    groupTags: ["rivr-org"],
  },
]

// Mock data for comments
export const mockComments: Comment[] = [
  // Comments for post1
  {
    id: "comment1",
    postId: "post1",
    author: "user2",
    content: "I'll be there! Looking forward to helping out in the garden.",
    timestamp: "2024-07-15T10:30:00",
    likes: 5,
  },
  {
    id: "comment2",
    postId: "post1",
    author: "user3",
    content: "What should we bring? Do we need any specific tools or equipment?",
    timestamp: "2024-07-15T11:15:00",
    likes: 3,
  },
  {
    id: "comment3",
    postId: "post1",
    author: "user1",
    content:
      "Just bring gloves if you have them! We'll provide all the tools and plants. And don't forget water and sunscreen!",
    timestamp: "2024-07-15T11:45:00",
    likes: 8,
    parentId: "comment2",
  },
]

// Mock data for groups
const defaultJoinSettings = {
  joinType: JoinType.Public,
  questions: [],
  approvalRequired: false,
}

const defaultNotificationSettings = {
  posts: [NotificationType.Native],
  events: [NotificationType.Native, NotificationType.Email],
  marketplace: [NotificationType.Native],
  governance: [NotificationType.Native, NotificationType.Email],
  memberUpdates: [NotificationType.Native],
}

// Mock data for Rings
export const mockRings: Ring[] = [
  {
    id: "ring1",
    name: "Boulder Mutual Aid Network",
    description: "A network of families working together to support community resilience and mutual aid",
    image: "/hands-of-solidarity.png",
    memberCount: 45,
    adminIds: ["user1", "user3"],
    creatorId: "user1",
    members: ["user1", "user2", "user3"],
    families: ["family1", "family2", "family3"],
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-01-10",
    color: "#7c3aed",
    type: GroupType.Ring,
  },
  {
    id: "ring2",
    name: "San Francisco Tech Collective",
    description: "Technology workers organizing for ethical tech and community empowerment",
    image: "/coding-collaboration.png",
    memberCount: 32,
    adminIds: ["user2"],
    creatorId: "user2",
    members: ["user2", "user4", "u5"],
    families: ["family4", "family5"],
    chapterTags: ["sf"],
    groupTags: [],
    createdAt: "2023-02-15",
    color: "#059669",
    type: GroupType.Ring,
  },
  {
    id: "rivertree-ring",
    name: "Rivertree Ring",
    description: "Cooperative network focused on regenerative economics and community resilience",
    members: ["cameron"],
    adminIds: ["cameron"],
    creatorId: "cameron", 
    image: "/lush-garden.png",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-12-01",
    color: "#22c55e",
    type: GroupType.Ring,
    memberCount: 1,
    tags: ["regenerative", "economics", "community"],
    location: "Boulder, CO",
    mission: "Creating regenerative economic systems through cooperative enterprise"
  },
]

// Mock data for Families
export const mockFamilies: Family[] = [
  {
    id: "family1",
    name: "Northside Neighbors",
    description: "Families living in North Boulder supporting each other with childcare, meals, and resources",
    image: "/neighborhood-gathering.png",
    memberCount: 12,
    adminIds: ["user1"],
    creatorId: "user1",
    members: ["user1", "user2", "user3"],
    parentRingId: "ring1",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-01-15",
    color: "#dc2626",
    type: GroupType.Family,
  },
  {
    id: "family2",
    name: "Garden Circle",
    description: "Families focused on community gardening, food sharing, and sustainable living",
    image: "/vibrant-garden-tending.png",
    memberCount: 15,
    adminIds: ["user3"],
    creatorId: "user3",
    members: ["user3", "user4", "u5"],
    parentRingId: "ring1",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-01-20",
    color: "#059669",
    type: GroupType.Family,
  },
  {
    id: "family3",
    name: "Skills Exchange",
    description: "Families sharing skills, tools, and knowledge for community resilience",
    image: "/diverse-construction-team.png",
    memberCount: 18,
    adminIds: ["user1"],
    creatorId: "user1",
    members: ["user1", "user4"],
    parentRingId: "ring1",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-02-01",
    color: "#2563eb",
    type: GroupType.Family,
  },
  {
    id: "family4",
    name: "Ethical AI Advocates",
    description: "Tech workers focused on responsible AI development and community impact",
    image: "/augmented-reality-cityscape.png",
    memberCount: 20,
    adminIds: ["user2"],
    creatorId: "user2",
    members: ["user2", "u5"],
    parentRingId: "ring2",
    chapterTags: ["sf"],
    groupTags: [],
    createdAt: "2023-02-20",
    color: "#7c3aed",
    type: GroupType.Family,
  },
  {
    id: "family5",
    name: "Open Source Collective",
    description: "Developers contributing to open source projects that benefit communities",
    image: "/web-development-concept.png",
    memberCount: 12,
    adminIds: ["user2"],
    creatorId: "user2",
    members: ["user2", "user4"],
    parentRingId: "ring2",
    chapterTags: ["sf"],
    groupTags: [],
    createdAt: "2023-03-01",
    color: "#059669",
    type: GroupType.Family,
  },
]

// Update the existing groups to include the type field
export const mockGroups: Group[] = [
  {
    id: "group1",
    name: "Climate Action Coalition",
    description: "Organizing for climate justice and sustainable communities",
    members: ["user1", "user2", "user3"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/global-warming-impacts.png",
    chapterTags: ["nyc", "sf", "chi", "boulder"],
    groupTags: [],
    createdAt: "2023-01-15",
    color: "#4f46e5",
    type: GroupType.Group,
    image: "/global-warming-impacts.png",
    memberCount: 3,
    flowPasses: [
      {
        id: "flow-pass-climate-action",
        organizationId: "group1",
        title: "Climate Action Flow Pass",
        description: "10% discount on all Climate Action Coalition offerings for Basic members",
        type: FlowPassType.Percentage,
        value: 10,
        applicableServices: ["events", "workshops"],
        eligibleMembershipTiers: ["Basic"],
        isActive: true,
        createdAt: "2024-02-15",
      }
    ],
  },
  {
    id: "group0",
    name: "Book Club Meetup",
    description: "A simple group for book lovers to discuss our monthly reads",
    members: ["user1", "user2", "user3", "user4"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/placeholder-user.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    createdAt: "2023-03-10",
    color: "#22c55e",
    type: GroupType.Basic,
    image: "/placeholder.jpg",
    memberCount: 4,
    tags: ["books", "reading", "discussion"],
    location: "New York, NY",
    website: "https://bookclub-meetup.com",
    email: "hello@bookclub-meetup.com",
    flowPasses: [
      {
        id: "flow-pass-book-club",
        organizationId: "group0",
        title: "Book Club Flow Pass",
        description: "10% discount on all Book Club offerings for Basic members",
        type: FlowPassType.Percentage,
        value: 10,
        applicableServices: ["books", "events"],
        eligibleMembershipTiers: ["Basic"],
        isActive: true,
        createdAt: "2024-01-15",
      }
    ],
    mission: "To bring together book lovers for meaningful discussions about literature and foster a community of readers who share diverse perspectives.",
    history: "Started in March 2023 by a group of friends who wanted to share their love of reading with others in their neighborhood.",
    rules: [
      "Come prepared to discuss the monthly book selection",
      "Be respectful of different opinions and interpretations",
      "No spoilers for upcoming sections during discussions",
      "Bring snacks to share (optional but appreciated!)"
    ],
    meetingLocation: "Central Park Reading Room, 5th Avenue",
    milestones: [
      { date: "2023-03-10", description: "Book club founded with 4 members" },
      { date: "2023-06-15", description: "First public meetup held at Central Park" },
      { date: "2023-09-20", description: "Reached 15 active members" },
      { date: "2023-12-01", description: "Hosted holiday book exchange event" }
    ]
  },
  {
    id: "subgroup0-1",
    name: "Mystery & Thriller Readers",
    description: "For those who love a good mystery! We focus on crime fiction, psychological thrillers, and detective novels.",
    members: ["user1", "user2"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/placeholder-user.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    createdAt: "2023-06-01",
    color: "#6366f1",
    type: GroupType.Basic,
    image: "/placeholder.jpg",
    memberCount: 2,
    tags: ["mystery", "thriller", "crime-fiction"],
    parentGroupId: "group0"
  },
  {
    id: "subgroup0-2",
    name: "Romance Book Club",
    description: "All things romance! From historical romance to contemporary love stories, we discuss it all.",
    members: ["user3", "user4"],
    adminIds: ["user3"],
    creatorId: "user3",
    avatar: "/placeholder-user.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    createdAt: "2023-08-15",
    color: "#ec4899",
    type: GroupType.Basic,
    image: "/placeholder.jpg",
    memberCount: 2,
    tags: ["romance", "love-stories", "contemporary"],
    parentGroupId: "group0"
  },
  {
    id: "subgroup0-3",
    name: "Classic Literature Circle",
    description: "Deep dives into the classics! We read and discuss timeless literary works and their impact on modern writing.",
    members: ["user1", "user3"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/placeholder-user.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    createdAt: "2023-10-20",
    color: "#7c3aed",
    type: GroupType.Basic,
    image: "/placeholder.jpg",
    memberCount: 2,
    tags: ["classics", "literature", "analysis"],
    parentGroupId: "group0"
  },
  {
    id: "group2",
    name: "Food Justice Network",
    description: "Building equitable food systems and fighting food apartheid",
    members: ["user4", "u5"],
    adminIds: ["user4"],
    creatorId: "user4",
    avatar: "/colorful-fruit-display.png",
    chapterTags: ["sf", "por", "sea"],
    groupTags: [],
    createdAt: "2023-02-20",
    color: "#059669",
    type: GroupType.Group,
    image: "/colorful-fruit-display.png",
    memberCount: 2,
  },
  {
    id: "group3",
    name: "Housing Rights Alliance",
    description: "Fighting for affordable housing and tenant protections",
    members: ["user3"],
    adminIds: ["user3"],
    creatorId: "user3",
    avatar: "/diverse-urban-housing.png",
    chapterTags: ["nyc", "la", "chi"],
    groupTags: [],
    createdAt: "2023-03-10",
    color: "#dc2626",
    type: GroupType.Group,
    image: "/diverse-urban-housing.png",
    memberCount: 1,
  },
  // Joint Venture Organizations - ORG type groups that appear in main feed
  {
    id: "venture-org-1",
    name: "Boulder Solar Collective",
    description: "Community-owned solar installation and energy services cooperative serving the Boulder area",
    members: ["user1", "user2", "user3", "user4", "u5"],
    adminIds: ["user1", "user3"],
    creatorId: "user1",
    avatar: "/renewable-energy.png",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2023-08-15",
    color: "#f59e0b",
    type: GroupType.Group, // ORG type with full capabilities
    image: "/renewable-energy.png",
    memberCount: 5,
    website: "https://bouldersolar.coop",
    email: "info@bouldersolar.coop",
    phone: "(303) 555-SOLAR",
    mission: "Democratizing solar energy access through cooperative ownership and community investment",
    parentGroupId: "ring1", // Owned by Boulder Mutual Aid Ring
  },
  {
    id: "venture-org-2", 
    name: "Community Food Hub Co-op",
    description: "Local food distribution and grocery cooperative serving multiple neighborhoods",
    members: ["user2", "user4", "u5", "user6", "user7"],
    adminIds: ["user2", "user4"],
    creatorId: "user2",
    avatar: "/colorful-fruit-display.png",
    chapterTags: ["boulder", "sf"],
    groupTags: [],
    createdAt: "2023-09-01",
    color: "#10b981",
    type: GroupType.Group, // ORG type with full capabilities
    image: "/colorful-fruit-display.png", 
    memberCount: 5,
    website: "https://communityfoodhub.coop",
    email: "orders@communityfoodhub.coop",
    phone: "(303) 555-FOOD",
    mission: "Building food security through cooperative distribution and supporting local farmers",
    parentGroupId: "ring1", // Co-owned by multiple rings
  },
  {
    id: "venture-org-3",
    name: "Shared Workspace Network",
    description: "Cooperative workspace and maker space network for creative professionals and entrepreneurs", 
    members: ["user3", "user5", "user6"],
    adminIds: ["user3", "user5"],
    creatorId: "user3",
    avatar: "/diverse-construction-team.png",
    chapterTags: ["boulder", "den"],
    groupTags: [],
    createdAt: "2023-07-20",
    color: "#8b5cf6",
    type: GroupType.Group, // ORG type with full capabilities
    image: "/diverse-construction-team.png",
    memberCount: 3,
    website: "https://sharedworkspace.coop",
    email: "hello@sharedworkspace.coop", 
    phone: "(303) 555-WORK",
    mission: "Creating affordable workspace and fostering collaboration among independent workers",
    parentGroupId: "ring2", // Owned by Creative Workers Ring
  },
  {
    id: "rivr-org",
    name: "RIVR",
    description: "Public Benefit Limited Cooperative Association (PBLCA) - Social coordination platform for communities",
    members: ["cameron", "miranda", "kathleen", "grig"],
    adminIds: ["cameron", "miranda", "kathleen", "grig"],
    creatorId: "cameron",
    avatar: "/rivr-emoji.png",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2024-01-01",
    color: "#CB8C03",
    type: GroupType.Organization,
    image: "/rivr-emoji.png",
    memberCount: 4,
    tags: ["technology", "cooperative", "social-coordination"],
    location: "Boulder, CO",
    website: "https://rivr.co",
    email: "hello@rivr.co",
    mission: "To enable community coordination and mutual aid through decentralized social technology",
    history: "Founded in 2024 as a Public Benefit Limited Cooperative Association to democratize community organizing tools",
    boardMembers: [
      {
        id: "cameron",
        name: "Cameron Murdock", 
        role: "Chairman/CEO",
        avatar: "/cameron-profile.png"
      },
      {
        id: "miranda",
        name: "Miranda Clendening",
        role: "Treasurer/CFO", 
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "kathleen", 
        name: "Kathleen Marie Rose",
        role: "Secretary/CMO",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "grig",
        name: "Grig Bilham", 
        role: "CTO",
        avatar: "/placeholder-user.jpg"
      }
    ],
    subgroups: [
      {
        id: "rivr-tech",
        name: "Tech Development",
        description: "Platform development and technical infrastructure",
        membershipClass: "Worker"
      },
      {
        id: "rivr-product", 
        name: "Product and Community",
        description: "Product strategy and community engagement",
        membershipClass: "Worker"
      },
      {
        id: "rivr-admin",
        name: "Admin and Org Strategy", 
        description: "Administrative operations and organizational strategy",
        membershipClass: "Worker"
      },
      {
        id: "rivr-funding",
        name: "Funding and Finance",
        description: "Financial management and funding development", 
        membershipClass: "Worker"
      }
    ],
    offerings: [
      {
        id: "membership-basic",
        name: "Basic Membership",
        description: "Access to community features and local organizing tools",
        type: "membership"
      },
      {
        id: "membership-host",
        name: "Host Membership", 
        description: "Ability to create and manage community events",
        type: "membership"
      },
      {
        id: "membership-seller",
        name: "Seller Membership",
        description: "Marketplace access to sell products and services", 
        type: "membership"
      },
      {
        id: "membership-org",
        name: "Organization Membership",
        description: "Full organizational features including ticket sales and advanced coordination",
        type: "membership"
      }
    ],
    flowPasses: [
      {
        id: "flow-pass-basic",
        organizationId: "rivr-org",
        title: "Basic Flow Pass",
        description: "10% discount on all RIVR ecosystem services for Basic members",
        type: FlowPassType.Percentage,
        value: 10,
        applicableServices: ["membership-host", "membership-seller"],
        eligibleMembershipTiers: ["Basic"],
        isActive: true,
        createdAt: "2024-01-01",
        tags: ["basic", "discount"]
      },
      {
        id: "flow-pass-worker",
        organizationId: "rivr-org",
        title: "Worker-Owner Flow Pass",
        description: "Free access to all platform features for cooperative worker-owners",
        type: FlowPassType.FreeFlow,
        applicableServices: ["membership-host", "membership-seller", "membership-org"],
        eligibleMembershipTiers: ["Worker"],
        isActive: true,
        createdAt: "2024-01-01",
        tags: ["worker", "cooperative", "free"]
      },
      {
        id: "flow-pass-community",
        organizationId: "rivr-org", 
        title: "Community Builder Pass",
        description: "$5 off organization membership for active community builders",
        type: FlowPassType.Fixed,
        value: 5,
        applicableServices: ["membership-org"],
        eligibleMembershipTiers: ["Host", "Seller"],
        isActive: true,
        createdAt: "2024-01-01",
        usageLimit: 1,
        tags: ["community", "builder", "upgrade"]
      }
    ],
    membershipTiers: ["Basic", "Host", "Seller", "Organization", "Worker"]
  },
  {
    id: "the-riverside",
    name: "The Riverside",
    description: "Event space and community hub for conscious gatherings and workshops",
    members: ["cameron"],
    adminIds: ["cameron"],
    creatorId: "cameron",
    avatar: "/community-gathering.png", 
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2024-01-15",
    color: "#3b82f6",
    type: GroupType.Organization,
    image: "/community-gathering.png",
    memberCount: 1,
    tags: ["events", "community", "workshops"],
    location: "Boulder, CO",
    mission: "Providing space for transformative community experiences",
    parentGroupId: "rivertree-ring"
  },
  {
    id: "the-stand",
    name: "The Stand", 
    description: "Advocacy and organizing hub for community resilience and social justice",
    members: ["cameron"],
    adminIds: ["cameron"],
    creatorId: "cameron",
    avatar: "/hands-of-solidarity.png",
    chapterTags: ["boulder"],
    groupTags: [],
    createdAt: "2024-01-20", 
    color: "#dc2626",
    type: GroupType.Organization,
    image: "/hands-of-solidarity.png",
    memberCount: 1,
    tags: ["advocacy", "organizing", "justice"],
    location: "Boulder, CO", 
    mission: "Building power for community-led solutions to social and environmental challenges",
    parentGroupId: "rivertree-ring"
  }
]

// Joint Venture Organizations now appear directly in mockGroups above

// Joint Venture Business Data
export const mockJointVentures = [
  {
    id: "jv-1",
    name: "Boulder Solar Collective",
    description: "Community-owned solar installation and energy services cooperative",
    orgId: "venture-org-1",
    parentRings: ["ring1"],
    ownershipShares: [{ ringId: "ring1", percentage: 100 }],
    status: "profitable" as const,
    foundedDate: "2023-08-15",
    industry: "Renewable Energy",
    businessModel: "Cooperative Service Provider",
    monthlyRevenue: 45000,
    monthlyExpenses: 32000,
    netProfit: 13000,
    profitDistributionDate: "2024-01-15",
    flowVolume: 13000,
  },
  {
    id: "jv-2", 
    name: "Community Food Hub Co-op",
    description: "Local food distribution and grocery cooperative",
    orgId: "venture-org-2",
    parentRings: ["ring1", "ring2"],
    ownershipShares: [
      { ringId: "ring1", percentage: 60 },
      { ringId: "ring2", percentage: 40 }
    ],
    status: "active" as const,
    foundedDate: "2023-09-01",
    industry: "Food Distribution",
    businessModel: "Cooperative Retail & Distribution",
    monthlyRevenue: 65000,
    monthlyExpenses: 58000,
    netProfit: 7000,
    profitDistributionDate: "2024-01-01",
    flowVolume: 7000,
  },
  {
    id: "jv-3",
    name: "Shared Workspace Network", 
    description: "Cooperative workspace and maker space network",
    orgId: "venture-org-3",
    parentRings: ["ring2"],
    ownershipShares: [{ ringId: "ring2", percentage: 100 }],
    status: "active" as const,
    foundedDate: "2023-07-20", 
    industry: "Workspace & Co-working",
    businessModel: "Membership-based Space Rental",
    monthlyRevenue: 28000,
    monthlyExpenses: 24000,
    netProfit: 4000,
    profitDistributionDate: "2024-01-10",
    flowVolume: 4000,
  }
]

// Combine all group types for easy access
export const allGroupTypes = [...mockGroups, ...mockRings, ...mockFamilies]

// Mock data for subgroups
export const mockSubgroups: Group[] = [
  {
    id: "subgroup1",
    name: "Youth Climate Activists",
    description: "Young people organizing for climate justice and policy change",
    members: ["user1", "user3"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/hands-of-solidarity.png",
    chapterTags: ["nyc", "sf"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-04-01",
    color: "#7c3aed",
    image: "/hands-of-solidarity.png",
    memberCount: 2,
  },
  {
    id: "subgroup2",
    name: "Green Energy Working Group",
    description: "Focused on renewable energy advocacy and community solar projects",
    members: ["user2", "user3", "u5"],
    adminIds: ["user2"],
    creatorId: "user2",
    avatar: "/renewable-energy.png",
    chapterTags: ["sf", "boulder"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-04-15",
    color: "#059669",
    image: "/renewable-energy.png",
    memberCount: 3,
  },
  {
    id: "subgroup3",
    name: "Climate Justice Coalition",
    description: "Addressing environmental racism and advocating for frontline communities",
    members: ["user1", "user2", "user4"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/diverse-group-city.png",
    chapterTags: ["nyc", "chi"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-05-01",
    color: "#dc2626",
    image: "/diverse-group-city.png",
    memberCount: 3,
  },
  {
    id: "subgroup4",
    name: "Sustainable Transportation",
    description: "Promoting bike infrastructure, public transit, and car-free initiatives",
    members: ["user3", "u5"],
    adminIds: ["user3"],
    creatorId: "user3",
    avatar: "/mountain-bike-trail.png",
    chapterTags: ["boulder", "por"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-05-20",
    color: "#2563eb",
    image: "/mountain-bike-trail.png",
    memberCount: 2,
  },
  {
    id: "subgroup5",
    name: "Community Events Planning",
    description: "Organizing community engagement events, workshops, and action days",
    members: ["user1", "user2", "user4"],
    adminIds: ["user1"],
    creatorId: "user1",
    avatar: "/neighborhood-gathering.png",
    chapterTags: ["boulder", "nyc"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-06-01",
    color: "#f59e0b",
    image: "/neighborhood-gathering.png",
    memberCount: 3,
    type: GroupType.Basic,
  },
  {
    id: "subgroup6", 
    name: "Venue & Logistics Coordination",
    description: "Managing venue bookings, equipment, and event logistics for climate actions",
    members: ["user2", "user4", "u5"],
    adminIds: ["user2"],
    creatorId: "user2",
    avatar: "/diverse-construction-team.png",
    chapterTags: ["boulder"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-06-10",
    color: "#8b5cf6",
    image: "/diverse-construction-team.png",
    memberCount: 3,
    type: GroupType.Basic,
  },
  {
    id: "subgroup7",
    name: "Community Garden Team",
    description: "Dedicated team for managing community garden events and maintenance",
    members: ["user1", "user3", "u5"],
    adminIds: ["user1"],
    creatorId: "user1", 
    avatar: "/vibrant-garden-tending.png",
    chapterTags: ["boulder"],
    groupTags: [],
    parentGroupId: "group1",
    createdAt: "2023-06-15",
    color: "#10b981",
    image: "/vibrant-garden-tending.png",
    memberCount: 3,
    type: GroupType.Basic,
  },
]

// Combine groups and subgroups for the full list
export const allGroups = [...mockGroups, ...mockSubgroups]

// Update the groups array to include these default settings
export const groups = allGroups.map((group) => ({
  ...group,
  joinSettings: group.joinSettings || defaultJoinSettings,
  defaultNotificationSettings: group.defaultNotificationSettings || defaultNotificationSettings,
}))

// Mock projects/events data
export const mockEvents = [
  {
    id: "event1",
    name: "Community Garden Workday",
    description: "Monthly workday to maintain and expand our community garden at Pachamama Farm as part of the Garden Revitalization Project. Join us for hands-on gardening, learning, and community building!",
    location: {
      name: "Pachamama Farm",
      address: "Pachamama Farm, Boulder, CO",
    },
    organizer: "user1", // Current user is the organizer
    groupId: "group1",
    subgroupId: "subgroup7", // Organized by Community Garden Team
    projectId: "project1", // Connected to Community Garden Revitalization project
    image: "/vibrant-garden-tending.png",
    chapterTags: ["boulder"],
    groupTags: ["subgroup7"],
    type: "event",
    timeframe: {
      start: "2025-07-20T10:00:00",
      end: "2025-07-20T14:00:00",
    },
    price: 0,
    admins: ["user1", "user3"],
    venueType: "outdoor-space",
    venueCapacity: 25,
    jobs: ["shift1", "shift2", "shift3"], // Jobs/roles needed for this workday
  },
  {
    id: "event-workshop",
    name: "Sustainable Gardening Workshop",
    description: "Learn practical techniques for sustainable gardening including water conservation, companion planting, and organic pest management.",
    location: {
      name: "Boulder Community Center",
      address: "1234 Pearl St, Boulder, CO",
    },
    organizer: "user1", // Current user is the organizer
    groupId: "group1",
    image: "/workshop-gardening.png",
    chapterTags: ["boulder"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2025-07-15T18:00:00",
      end: "2025-07-15T20:00:00",
    },
    price: 0,
    admins: ["user1"],
    venueType: "indoor-space",
    venueCapacity: 30,
  },
  {
    id: "event-cleanup",
    name: "Creek Cleanup Day",
    description: "Join us for our monthly creek cleanup! Help keep our waterways clean and protect local wildlife.",
    location: {
      name: "Boulder Creek Path",
      address: "Boulder Creek Path, Boulder, CO",
    },
    organizer: "group1",
    groupId: "group1",
    image: "/creek-cleanup.png",
    chapterTags: ["boulder"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2025-07-18T09:00:00",
      end: "2025-07-18T12:00:00",
    },
    price: 0,
    admins: ["user1", "user2"],
    venueType: "outdoor-space",
    venueCapacity: 50,
  },
  {
    id: "event0-1",
    name: "Monthly Book Discussion",
    description: "Join us for our monthly book discussion! This month we're discussing 'The Seven Husbands of Evelyn Hugo' by Taylor Jenkins Reid.",
    location: {
      address: "Central Park Reading Room, 5th Avenue, New York, NY",
    },
    organizer: "group0",
    groupId: "group0",
    image: "/placeholder.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2024-01-21T14:00:00",
      end: "2024-01-21T16:00:00",
    },
    price: 0,
    admins: ["user1"],
  },
  {
    id: "event0-2",
    name: "Book Club Social Hour",
    description: "Casual meetup for book lovers! No assigned reading this time - just come chat about your favorite books and get recommendations from fellow readers.",
    location: {
      address: "Bryant Park, New York, NY",
    },
    organizer: "group0",
    groupId: "group0",
    image: "/placeholder.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2024-01-28T15:00:00",
      end: "2024-01-28T17:00:00",
    },
    price: 0,
    admins: ["user1"],
  },
  {
    id: "event0-3",
    name: "Author Reading: Local NYC Writers",
    description: "Special event! We've invited three local NYC authors to read excerpts from their latest works. Q&A session and book signing to follow.",
    location: {
      address: "New York Public Library, Stephen A. Schwarzman Building, 5th Ave, New York, NY",
    },
    organizer: "group0",
    groupId: "group0",
    image: "/placeholder.jpg",
    chapterTags: ["nyc"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2024-02-10T18:00:00",
      end: "2024-02-10T20:00:00",
    },
    price: 0,
    admins: ["user1", "user3"],
  },
  {
    id: "event2",
    name: "Tech Workshop Series",
    description: "Learn coding and digital skills for community organizing",
    location: {
      address: "456 Tech Ave, San Francisco, CA",
    },
    organizer: "group2",
    groupId: "group2",
    image: "/coding-collaboration.png",
    chapterTags: ["sf"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2024-08-05T18:00:00",
      end: "2024-08-05T20:00:00",
    },
    price: 15,
    admins: ["user2"],
  },
  {
    id: "event3",
    name: "Community Dinner",
    description: "Free community meal with locally sourced ingredients",
    location: {
      address: "789 Food St, Los Angeles, CA",
    },
    organizer: "group3",
    groupId: "group3",
    image: "/neighborhood-gathering.png",
    chapterTags: ["la"],
    groupTags: [],
    type: "event",
    timeframe: {
      start: "2024-08-15T17:00:00",
      end: "2024-08-15T19:00:00",
    },
    price: 0,
    admins: ["user3"],
  },
]

// Export for backward compatibility
export const users = mockUsers
export const projects = mockEvents
export const comments = mockComments

// Mock data for posts
export const posts = [
  // Regular social posts
  {
    id: "post1",
    author: mockUsers[0], // user1
    content:
      "Excited to announce our upcoming community garden workday! Join us this Saturday to help plant new vegetables and flowers.",
    images: ["/vibrant-garden-tending.png"],
    createdAt: "2024-07-15T10:00:00",
    likes: 42,
    comments: 12,
    chapterTags: ["boulder"],
    groupTags: ["group1"],
    groupId: "group1",
    postType: PostType.Social,
  },
  {
    id: "post2",
    author: mockUsers[1], // user2
    content:
      "Just finished a great coding session with the Tech for Good group. We're building a new app to connect volunteers with local organizations.",
    images: ["/coding-collaboration.png"],
    createdAt: "2024-07-14T15:30:00",
    likes: 35,
    comments: 8,
    chapterTags: ["sf"],
    groupTags: ["group2"],
    groupId: "group2",
    postType: PostType.Social,
  },
  {
    id: "post3",
    author: mockUsers[2], // user3
    content: "Our community dinner was a huge success! Thanks to everyone who came out and shared a meal with us.",
    images: ["/neighborhood-gathering.png"],
    createdAt: "2024-07-13T18:45:00",
    likes: 58,
    comments: 20,
    chapterTags: ["la"],
    groupTags: ["group3"],
    groupId: "group3",
    postType: PostType.Social,
  },
  
  // Offering posts (these will show in both the main feed and the offerings tab)
  {
    id: "post-offering1",
    author: mockUsers[0], // user1 (cameron)
    content: "I'm offering professional web development consultation services. Perfect for startups and small businesses looking to establish or improve their online presence.",
    title: "Web Development Consultation",
    description: "Professional consultation for web development projects, specializing in React and Node.js",
    offeringType: OfferingType.Service,
    basePrice: 75,
    currency: "USD",
    createdAt: "2024-01-15T10:00:00Z",
    likes: 18,
    comments: 5,
    tags: ["web-development", "consultation", "tech"],
    chapterTags: ["boulder"],
    groupTags: ["group1"],
    isActive: true,
    postType: PostType.Offer,
    images: ["/web-development.png"],
  },
  {
    id: "post-offering2",
    author: mockUsers[0], // user1 (cameron)
    content: "Selling a set of high-quality organic garden tools. These are perfect for anyone starting their own garden this season!",
    title: "Organic Garden Tools",
    description: "Set of hand tools for organic gardening including trowel, pruners, and weeder",
    offeringType: OfferingType.Resource,
    basePrice: 25,
    currency: "USD",
    createdAt: "2024-01-20T14:30:00Z",
    likes: 12,
    comments: 3,
    tags: ["gardening", "tools", "organic"],
    chapterTags: ["boulder"],
    groupTags: ["group3"],
    isActive: true,
    postType: PostType.Offer,
    images: ["/garden-tools.png"],
  },
  {
    id: "post-offering3",
    author: mockUsers[0], // user1 (cameron)
    content: "Just finished making this beautiful ceramic bowl. Handcrafted with local clay and available for purchase!",
    title: "Handmade Pottery Bowl",
    description: "Beautiful ceramic bowl handcrafted with local clay, perfect for serving or decoration",
    offeringType: OfferingType.Product,
    basePrice: 35,
    currency: "USD",
    createdAt: "2024-02-01T09:15:00Z",
    likes: 24,
    comments: 7,
    tags: ["pottery", "handmade", "ceramic"],
    chapterTags: ["boulder"],
    groupTags: ["group2"],
    isActive: true,
    postType: PostType.Offer,
    images: ["/pottery-bowl.png"],
  },
  {
    id: "post-offering4",
    author: mockUsers[0], // user1 (cameron)
    content: "Heading to Denver International Airport this weekend. Have room for 3 passengers if anyone needs a ride!",
    title: "Airport Ride to DEN",
    description: "Reliable ride to Denver International Airport, can accommodate up to 3 passengers with luggage",
    offeringType: OfferingType.Trip,
    basePrice: 45,
    currency: "USD",
    createdAt: "2024-02-10T16:45:00Z",
    likes: 9,
    comments: 4,
    tags: ["transportation", "airport", "ride"],
    chapterTags: ["boulder"],
    groupTags: ["group1"],
    isActive: true,
    postType: PostType.Offer,
    images: ["/airport-ride.png"],
  },
  {
    id: "post-offering5",
    author: mockUsers[0], // user1 (cameron)
    content: "Offering community help vouchers! Good for 2 hours of help with moving, yard work, tech support, or other assistance.",
    title: "Community Help Voucher",
    description: "Good for 2 hours of general community assistance - moving, yard work, tech help, etc.",
    offeringType: OfferingType.Voucher,
    createdAt: "2024-02-15T12:00:00Z",
    likes: 31,
    comments: 8,
    tags: ["community", "help", "assistance"],
    chapterTags: ["boulder"],
    groupTags: ["group3"],
    isActive: true,
    timeValue: 70,
    skillValue: 40,
    difficultyValue: 30,
    resourceValue: 20,
    thanksValue: 100,
    postType: PostType.Offer,
    images: ["/help-voucher.png"],
  },
  {
    id: "post-request1",
    author: mockUsers[0], // user1 (cameron)
    content: "Looking for someone to help me design a logo for my new community project. Can trade for web development help!",
    title: "Logo Design Needed",
    description: "Need a professional logo for a community sustainability project",
    offeringType: OfferingType.Service,
    createdAt: "2024-03-01T11:30:00Z",
    likes: 15,
    comments: 6,
    tags: ["design", "logo", "creative"],
    chapterTags: ["boulder"],
    groupTags: ["group2"],
    isActive: true,
    postType: PostType.Request,
  },
]

// Book Club specific posts (only appear in group feed)
export const bookClubPosts = [
  {
    id: "post0-1",
    author: mockUsers[0], // user1
    content:
      "📚 This month's book selection is 'The Seven Husbands of Evelyn Hugo' by Taylor Jenkins Reid! I'm so excited to dive into this one. Who's already started reading?",
    images: [],
    createdAt: "2024-01-10T14:30:00",
    likes: 12,
    comments: 6,
    chapterTags: ["nyc"],
    groupTags: ["group0"],
    groupId: "group0",
  },
  {
    id: "post0-2",
    author: mockUsers[1], // user2
    content:
      "Just finished chapter 3 and WOW! 🤯 Without spoilers - what did everyone think of that plot twist? I literally gasped out loud on the subway.",
    images: [],
    createdAt: "2024-01-12T19:45:00",
    likes: 8,
    comments: 4,
    chapterTags: ["nyc"],
    groupTags: ["group0"],
    groupId: "group0",
  },
  {
    id: "post0-3",
    author: mockUsers[2], // user3
    content:
      "Reminder: Our next meetup is this Sunday at 2pm in Central Park! I'll bring homemade cookies and coffee. Looking forward to our discussion! ☕📖",
    images: [],
    createdAt: "2024-01-13T11:20:00",
    likes: 15,
    comments: 3,
    chapterTags: ["nyc"],
    groupTags: ["group0"],
    groupId: "group0",
  },
  {
    id: "post0-4",
    author: mockUsers[3], // user4
    content:
      "I found this amazing article about the author's inspiration for the book! Really adds depth to the story. Link in comments 👇",
    images: [],
    createdAt: "2024-01-14T16:10:00",
    likes: 6,
    comments: 2,
    chapterTags: ["nyc"],
    groupTags: ["group0"],
    groupId: "group0",
  },
]

// Mock data for marketplace listings
export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "listing1",
    title: "Barely used mountain bike",
    description: "Trek mountain bike in excellent condition. Only used a few times on gentle trails.",
    price: "450",
    category: "Sports & Outdoors", 
    condition: "Like New",
    images: ["/mountain-bike-trail.png"],
    seller: mockUsers[0],
    createdAt: "2023-05-15T14:30:00Z",
    tags: ["bike", "outdoor", "sports"],
    type: "product"
  },
  // Service Listings
  {
    id: "service1",
    title: "Web Development Services",
    description: "Professional web development for community organizations. Specializing in responsive design, accessibility, and user-friendly interfaces.",
    price: "45",
    category: "Professional Services",
    images: ["/web-development-concept.png"],
    seller: mockUsers[0], // Changed to current user (user1)
    createdAt: "2025-07-01T09:15:00Z",
    tags: ["web", "development", "coding", "professional"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Weekdays 9am-5pm", "Weekends by appointment"],
      duration: "Varies by project",
      bookingDates: [
        { date: "2025-07-14", timeSlots: ["09:00-12:00", "13:00-17:00"] },
        { date: "2025-07-16", timeSlots: ["09:00-12:00", "13:00-17:00"] },
        { date: "2025-07-21", timeSlots: ["09:00-12:00", "13:00-17:00"] }
      ]
    }
  },
  {
    id: "service-workshop",
    title: "Sustainable Gardening Consultation",
    description: "One-on-one consultation for planning and maintaining your sustainable garden. Get personalized advice on plant selection, layout, and maintenance.",
    price: "35",
    category: "Home & Garden",
    images: ["/garden-consultation.png"],
    seller: mockUsers[0], // Current user (user1)
    createdAt: "2025-07-05T10:30:00Z",
    tags: ["gardening", "sustainability", "consultation", "plants"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Weekday evenings", "Weekend mornings"],
      duration: "1 hour",
      bookingDates: [
        { date: "2025-07-17", timeSlots: ["17:00-18:00", "18:30-19:30"] },
        { date: "2025-07-19", timeSlots: ["09:00-10:00", "10:30-11:30"] },
        { date: "2025-07-22", timeSlots: ["17:00-18:00", "18:30-19:30"] }
      ]
    }
  },
  {
    id: "service2",
    title: "Gardening & Landscaping",
    description: "Experienced gardener offering planting, maintenance, and landscape design services for residential and community gardens.",
    price: "30",
    category: "Home & Garden",
    images: ["/vibrant-garden-tending.png"],
    seller: mockUsers[2],
    createdAt: "2024-07-02T14:30:00Z",
    tags: ["gardening", "landscaping", "plants", "outdoor"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Monday-Friday 8am-6pm"],
      duration: "Hourly",
      bookingDates: [
        { date: "2024-07-15", timeSlots: ["08:00-12:00", "13:00-17:00"] },
        { date: "2024-07-16", timeSlots: ["08:00-12:00", "13:00-17:00"] },
        { date: "2024-07-17", timeSlots: ["08:00-12:00", "13:00-17:00"] }
      ]
    }
  },
  {
    id: "service3",
    title: "Carpentry & Woodworking",
    description: "Custom woodworking, furniture repair, and carpentry services. Specializing in sustainable materials and traditional techniques.",
    price: "40",
    category: "Skilled Trades",
    images: ["/diverse-construction-team.png"],
    seller: mockUsers[3],
    createdAt: "2024-07-03T11:45:00Z",
    tags: ["carpentry", "woodworking", "furniture", "repair"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Tuesday-Saturday 10am-6pm"],
      duration: "Varies by project",
      bookingDates: [
        { date: "2024-07-18", timeSlots: ["10:00-14:00", "15:00-18:00"] },
        { date: "2024-07-19", timeSlots: ["10:00-14:00", "15:00-18:00"] },
        { date: "2024-07-20", timeSlots: ["10:00-14:00"] }
      ]
    }
  },
  {
    id: "service4",
    title: "Childcare & Babysitting",
    description: "Experienced childcare provider offering babysitting services for families in the community. CPR certified with background check.",
    price: "25",
    category: "Childcare & Education",
    images: ["/placeholder.svg"],
    seller: mockUsers[0],
    createdAt: "2024-07-05T16:20:00Z",
    tags: ["childcare", "babysitting", "family", "kids"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Evenings and Weekends"],
      duration: "Hourly",
      bookingDates: [
        { date: "2024-07-19", timeSlots: ["18:00-22:00"] },
        { date: "2024-07-20", timeSlots: ["10:00-22:00"] },
        { date: "2024-07-21", timeSlots: ["10:00-22:00"] }
      ]
    }
  },
  {
    id: "service5",
    title: "Yoga & Meditation Classes",
    description: "Private and small group yoga and meditation sessions. All levels welcome, focusing on mindfulness and stress reduction.",
    price: "35",
    category: "Health & Wellness",
    images: ["/placeholder.svg"],
    seller: mockUsers[2],
    createdAt: "2024-07-06T08:15:00Z",
    tags: ["yoga", "meditation", "wellness", "health"],
    type: "service",
    location: "Boulder, CO",
    serviceDetails: {
      availability: ["Mornings and Evenings"],
      duration: "60-90 minutes",
      bookingDates: [
        { date: "2024-07-17", timeSlots: ["07:00-08:30", "18:00-19:30"] },
        { date: "2024-07-19", timeSlots: ["07:00-08:30", "18:00-19:30"] },
        { date: "2024-07-21", timeSlots: ["09:00-10:30", "17:00-18:30"] }
      ]
    }
  },
  // Venue Listings
  {
    id: "venue1",
    title: "Community Center Event Hall",
    description: "Spacious event hall perfect for workshops, meetings, and community gatherings. Includes AV equipment and kitchen access.",
    price: "75/hour",
    category: "Venues & Spaces",
    condition: "Excellent",
    images: ["/neighborhood-gathering.png"],
    seller: mockUsers[1],
    createdAt: "2023-06-01T10:00:00Z",
    tags: ["venue", "event-space", "workshop", "meetings"],
    isVenue: true,
    venue: {
      id: "venue1",
      name: "Community Center Event Hall",
      description: "Spacious event hall with modern amenities, perfect for community events and workshops.",
      type: "event-space" as any,
      capacity: 100,
      hourlyRate: 75,
      dailyRate: 500,
      amenities: ["Projector", "Sound System", "Kitchen Access", "WiFi", "Parking", "Wheelchair Accessible"],
      location: "Downtown Community Center, 123 Main Street, Boulder, CO",
      images: ["/neighborhood-gathering.png"],
      availability: [
        { date: "2024-07-25", timeSlots: ["09:00-12:00", "13:00-17:00", "18:00-22:00"] },
        { date: "2024-07-26", timeSlots: ["09:00-12:00", "18:00-22:00"] },
        { date: "2024-07-27", timeSlots: ["09:00-22:00"] }
      ],
      owner: mockUsers[1],
      rules: ["No smoking", "Clean up required", "Setup/cleanup time included"],
      setupTime: 30,
      cleanupTime: 30,
      tags: ["events", "workshops", "meetings"]
    }
  },
  {
    id: "venue2", 
    title: "Outdoor Garden Workshop Space",
    description: "Beautiful outdoor space perfect for gardening workshops, environmental education, and outdoor meetings.",
    price: "40/hour",
    category: "Venues & Spaces",
    condition: "Excellent",
    images: ["/vibrant-garden-tending.png"],
    seller: mockUsers[2],
    createdAt: "2023-06-05T14:20:00Z",
    tags: ["venue", "outdoor", "garden", "workshop", "education"],
    isVenue: true,
    venue: {
      id: "venue2",
      name: "Outdoor Garden Workshop Space", 
      description: "Peaceful garden setting with teaching areas, perfect for hands-on workshops and outdoor education.",
      type: "garden" as any,
      capacity: 25,
      hourlyRate: 40,
      dailyRate: 250,
      amenities: ["Shade Structure", "Water Access", "Tool Storage", "Seating Area", "Parking"],
      location: "Community Garden, 5th & Main Street, Boulder, CO",
      images: ["/vibrant-garden-tending.png"],
      availability: [
        { date: "2024-07-20", timeSlots: ["08:00-12:00", "13:00-18:00"] },
        { date: "2024-07-21", timeSlots: ["08:00-18:00"] },
        { date: "2024-07-27", timeSlots: ["08:00-12:00", "14:00-18:00"] }
      ],
      owner: mockUsers[2],
      rules: ["Respect the plants", "Weather dependent", "Bring sun protection"],
      setupTime: 15,
      cleanupTime: 15,
      tags: ["garden", "outdoor", "education"]
    }
  },
  {
    id: "venue3",
    title: "Maker Workshop Studio", 
    description: "Fully equipped workshop space with tools and equipment for hands-on building projects and skill-sharing.",
    price: "60/hour",
    category: "Venues & Spaces",
    condition: "Excellent", 
    images: ["/diverse-construction-team.png"],
    seller: mockUsers[3],
    createdAt: "2023-06-10T16:45:00Z",
    tags: ["venue", "workshop", "maker", "tools", "building"],
    isVenue: true,
    venue: {
      id: "venue3",
      name: "Maker Workshop Studio",
      description: "Professional workshop space with tools, workbenches, and equipment for building and making projects.",
      type: "workshop" as any,
      capacity: 15,
      hourlyRate: 60,
      dailyRate: 400,
      amenities: ["Power Tools", "Workbenches", "Safety Equipment", "Storage", "WiFi", "First Aid"],
      location: "Maker Space, 456 Industrial Ave, Boulder, CO",
      images: ["/diverse-construction-team.png"],
      availability: [
        { date: "2024-07-23", timeSlots: ["10:00-14:00", "15:00-19:00"] },
        { date: "2024-07-24", timeSlots: ["09:00-17:00"] },
        { date: "2024-07-25", timeSlots: ["10:00-14:00"] }
      ],
      owner: mockUsers[3],
      rules: ["Safety training required", "Tool checkout system", "Clean workstation after use"],
      setupTime: 20,
      cleanupTime: 25,
      tags: ["workshop", "tools", "making"]
    }
  },
]

// Mock data for group relationships
export const groupRelationships = [
  {
    sourceGroupId: "group1",
    targetGroupId: "group2",
    type: "affiliate",
    description: "Working together on climate and tech initiatives",
    createdAt: "2023-05-01",
    createdBy: "user1",
  },
]

// Mock data for job shifts
export const jobShifts = [
  {
    id: "shift1",
    name: "Garden Maintenance",
    project: "event1",
    timeframe: {
      start: "2024-07-20T10:00:00",
      end: "2024-07-20T14:00:00",
    },
    assignedUsers: ["user1", "user2"],
  },
]

// Mock data for thanks
export const thanks = [
  {
    id: "t1",
    from: "user2",
    to: "user1",
    message: "Thanks for organizing the community garden workday!",
    points: 10,
    date: "2024-07-16T09:00:00",
  },
]

// Mock data for mutual assets
export const mockMutualAssets: MutualAsset[] = [
  {
    id: "asset1",
    name: "Community Van",
    description: "2019 Honda Odyssey with 8 passenger capacity. Perfect for group trips and moving large items.",
    category: AssetCategory.Vehicle,
    ringId: "ring1",
    ownedBy: "user1",
    addedAt: "2024-01-15T10:00:00Z",
    status: AssetStatus.Available,
    images: ["/placeholder.jpg"],
    tags: ["transportation", "group-trips", "moving"],
    value: 28000,
    location: "Main Street Parking Garage",
    usageInstructions: "Keys are in the lockbox by the garage entrance. Code: 1234. Please return with a full tank.",
    restrictions: ["Valid driver's license required", "No smoking", "Maximum 7-day rentals"],
    bookingRequired: true,
  },
  {
    id: "asset2",
    name: "Professional Camera Kit",
    description: "Canon EOS R5 with lenses, tripod, and lighting equipment for documenting events and creating content.",
    category: AssetCategory.Technology,
    ringId: "ring1",
    ownedBy: "user2",
    addedAt: "2024-02-20T15:30:00Z",
    status: AssetStatus.InUse,
    currentUserId: "user3",
    currentUseStartDate: "2024-07-15T09:00:00Z",
    currentUseEndDate: "2024-07-20T18:00:00Z",
    images: ["/placeholder.jpg"],
    tags: ["photography", "events", "content-creation"],
    value: 5500,
    location: "Sarah's Home Studio",
    usageInstructions: "Please handle with care. Return all equipment in original case.",
    bookingRequired: true,
  },
  {
    id: "asset3",
    name: "Garden Tool Set",
    description: "Complete set of gardening tools including shovels, rakes, hoes, and pruning shears.",
    category: AssetCategory.Tool,
    ringId: "ring1",
    ownedBy: "user4",
    addedAt: "2024-03-10T12:00:00Z",
    status: AssetStatus.Available,
    images: ["/placeholder.jpg"],
    tags: ["gardening", "maintenance", "tools"],
    value: 350,
    location: "Community Garden Shed",
    usageInstructions: "Clean tools before returning. Shed key available from Mike.",
    restrictions: ["Return same day", "Clean after use"],
    bookingRequired: false,
  },
  {
    id: "asset4",
    name: "Camping Gear Bundle",
    description: "Complete camping setup for 6 people including tents, sleeping bags, cooking equipment, and camping chairs.",
    category: AssetCategory.Equipment,
    ringId: "ring1",
    ownedBy: "user1",
    addedAt: "2024-04-05T14:00:00Z",
    status: AssetStatus.Reserved,
    images: ["/placeholder.jpg"],
    tags: ["camping", "outdoor", "recreation"],
    value: 1200,
    location: "Garage Storage",
    usageInstructions: "Inventory list included. Please check all items before and after use.",
    restrictions: ["Maximum 2-week rentals", "Must be returned clean and dry"],
    bookingRequired: true,
  },
  {
    id: "asset5",
    name: "Power Tools Collection",
    description: "Drill, circular saw, jigsaw, orbital sander, and various hand tools for home improvement projects.",
    category: AssetCategory.Tool,
    ringId: "ring1",
    ownedBy: "user5",
    addedAt: "2024-05-12T16:45:00Z",
    status: AssetStatus.Maintenance,
    images: ["/placeholder.jpg"],
    tags: ["construction", "diy", "home-improvement"],
    value: 800,
    location: "Workshop in Basement",
    maintenanceNotes: "Circular saw blade needs replacement. Expected back in service by July 25th.",
    usageInstructions: "Safety equipment provided. Please wear appropriate protection.",
    restrictions: ["Experience with power tools required", "Safety briefing mandatory"],
    bookingRequired: true,
  },
  {
    id: "asset6",
    name: "Kayak & Paddles",
    description: "Two-person sit-on-top kayak with paddles and life jackets. Great for river and lake adventures.",
    category: AssetCategory.Equipment,
    ringId: "ring2",
    ownedBy: "user6",
    addedAt: "2024-06-01T11:00:00Z",
    status: AssetStatus.Available,
    images: ["/placeholder.jpg"],
    tags: ["water-sports", "recreation", "outdoor"],
    value: 650,
    location: "Dock Storage",
    usageInstructions: "Life jackets mandatory. Check weather conditions before use.",
    restrictions: ["Swimming ability required", "No use in rough weather"],
    bookingRequired: true,
  },
]

// Mock offerings data
export const mockOfferings: Offering[] = [
  {
    id: "offering1",
    title: "Web Development Consultation",
    description: "1-hour consultation for web development projects, including tech stack recommendations and architecture planning",
    type: OfferingType.Skill,
    basePrice: 75,
    currency: "USD",
    createdBy: "cameron",
    createdAt: "2024-01-15T10:00:00Z",
    tags: ["web-development", "consultation", "tech"],
    isActive: true,
  },
  {
    id: "offering2", 
    title: "Organic Garden Tools",
    description: "Set of hand tools for organic gardening including trowel, pruners, and weeder",
    type: OfferingType.Resource,
    basePrice: 25,
    currency: "USD",
    createdBy: "cameron",
    createdAt: "2024-01-20T14:30:00Z",
    tags: ["gardening", "tools", "organic"],
    isActive: true,
  },
  {
    id: "offering3",
    title: "Handmade Pottery Bowl",
    description: "Beautiful ceramic bowl handcrafted with local clay, perfect for serving or decoration",
    type: OfferingType.Product,
    basePrice: 35,
    currency: "USD", 
    createdBy: "cameron",
    createdAt: "2024-02-01T09:15:00Z",
    tags: ["pottery", "handmade", "ceramic"],
    isActive: true,
  },
  {
    id: "offering4",
    title: "Airport Ride to DEN",
    description: "Reliable ride to Denver International Airport, can accommodate up to 3 passengers with luggage",
    type: OfferingType.Trip,
    basePrice: 45,
    currency: "USD",
    createdBy: "cameron", 
    createdAt: "2024-02-10T16:45:00Z",
    tags: ["transportation", "airport", "ride"],
    isActive: true,
  },
  {
    id: "offering5",
    title: "Community Help Voucher", 
    description: "Good for 2 hours of general community assistance - moving, yard work, tech help, etc.",
    type: OfferingType.Voucher,
    createdBy: "cameron",
    createdAt: "2024-02-15T12:00:00Z",
    tags: ["community", "help", "assistance"],
    isActive: true,
    timeValue: 70,
    skillValue: 40,
    difficultyValue: 30, 
    resourceValue: 20,
    thanksValue: 40,
  },
]

// Mock data for user offers (posts with linked offerings)
export const mockOffers = [
  {
    id: "offer-1",
    userId: "cameron",
    offeringId: "offering1",
    title: "Web Development Consultation Available",
    description: "I can help with React, TypeScript, and Node.js projects. Available for both one-time consultations and ongoing project work.",
    type: OfferingType.Skill,
    price: "$50/hour",
    tags: ["web-development", "react", "typescript"],
    createdAt: "2024-07-10T14:30:00Z",
    status: "active",
    applications: 3
  },
  {
    id: "offer-2", 
    userId: "cameron",
    offeringId: "offering5",
    title: "Community Help Voucher - 2 Hours Available",
    description: "Good for moving help, yard work, tech support, or general assistance.",
    type: OfferingType.Voucher,
    thanksValue: 40,
    tags: ["community", "help", "assistance"],
    createdAt: "2024-07-12T09:15:00Z",
    status: "active",
    applications: 1
  }
]

// Mock data for user requests
export const mockRequests = [
  {
    id: "request-1",
    userId: "cameron", 
    title: "Need Graphic Design Help",
    description: "Looking for someone to create a logo and brand identity for my new project. Budget is flexible.",
    type: OfferingType.Skill,
    budget: "$200-500",
    tags: ["graphic-design", "logo", "branding"],
    createdAt: "2024-07-08T11:20:00Z",
    status: "open",
    responses: 5
  },
  {
    id: "request-2",
    userId: "cameron",
    title: "Borrowing a Truck for Moving",
    description: "Need to borrow a pickup truck for a day to move some furniture. Can pay for gas and a small rental fee.",
    type: OfferingType.Resource,
    budget: "$50/day",
    tags: ["transportation", "moving", "truck"],
    createdAt: "2024-07-14T16:45:00Z",
    status: "open", 
    responses: 2
  }
]

// Mock data for matches (potential matches between offers and requests)
export const mockMatches = [
  {
    id: "match-1",
    offerId: "offer-1",
    requestId: "request-1",
    offerUserId: "user2",
    requestUserId: "cameron",
    matchScore: 95,
    commonTags: ["design", "web"],
    status: "potential",
    createdAt: "2024-07-15T10:30:00Z"
  },
  {
    id: "match-2", 
    offerId: "offer-2",
    requestId: "request-2", 
    offerUserId: "user3",
    requestUserId: "cameron",
    matchScore: 87,
    commonTags: ["community", "help"],
    status: "potential",
    createdAt: "2024-07-15T14:20:00Z"
  }
]

// Mock data for join requests
export const mockJoinRequests = [
  {
    id: "join-req-1",
    userId: "user4",
    groupId: "rivr-org",
    status: "pending" as const,
    createdAt: "2024-07-10T14:30:00Z",
    answers: [
      {
        questionId: "question-1",
        answer: "I'm passionate about cooperative technology and want to contribute to democratizing community organizing tools."
      },
      {
        questionId: "question-2", 
        answer: "I have experience in software development and community organizing, and I believe in the cooperative model."
      }
    ]
  },
  {
    id: "join-req-2",
    userId: "user5",
    groupId: "group1",
    status: "pending" as const,
    createdAt: "2024-07-12T09:15:00Z",
    answers: [
      {
        questionId: "question-1",
        answer: "I want to get involved in local climate action and help organize events in my community."
      }
    ]
  },
  {
    id: "join-req-3",
    userId: "user3",
    groupId: "rivertree-ring",
    status: "pending" as const,
    createdAt: "2024-07-14T16:20:00Z",
    answers: [
      {
        questionId: "question-1",
        answer: "I'm interested in regenerative economics and creating more sustainable community systems."
      },
      {
        questionId: "question-2",
        answer: "I have a background in permaculture and sustainable agriculture."
      }
    ]
  }
]
