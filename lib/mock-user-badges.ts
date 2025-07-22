export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface UserBadges {
  userId: string;
  badges: string[]; // Badge IDs that the user has earned
}

// Available badges in the system
export const mockBadges: UserBadge[] = [
  {
    id: "plant-steward",
    name: "Plant Steward",
    description: "Knowledgeable in plant care and garden maintenance",
    icon: "🌱",
    level: "beginner"
  },
  {
    id: "bike-mechanic",
    name: "Bike Mechanic",
    description: "Skilled in bicycle repair and maintenance",
    icon: "🚲",
    level: "intermediate"
  },
  {
    id: "event-organizer",
    name: "Event Organizer",
    description: "Experienced in planning and executing community events",
    icon: "📅",
    level: "intermediate"
  },
  {
    id: "digital-specialist",
    name: "Digital Specialist",
    description: "Proficient in digital tools and online platforms",
    icon: "💻",
    level: "intermediate"
  },
  {
    id: "sustainability-expert",
    name: "Sustainability Expert",
    description: "Expert knowledge in sustainable practices and education",
    icon: "♻️",
    level: "advanced"
  },
  {
    id: "community-leader",
    name: "Community Leader",
    description: "Demonstrated leadership in community initiatives",
    icon: "👥",
    level: "advanced"
  },
  {
    id: "art-coordinator",
    name: "Art Coordinator",
    description: "Experience in coordinating art projects and installations",
    icon: "🎨",
    level: "intermediate"
  }
];

// User badge assignments
export const mockUserBadges: UserBadges[] = [
  {
    userId: "user1",
    badges: ["plant-steward", "community-leader", "event-organizer"]
  },
  {
    userId: "user2",
    badges: ["bike-mechanic", "digital-specialist"]
  },
  {
    userId: "user3",
    badges: ["sustainability-expert", "plant-steward"]
  },
  {
    userId: "user4",
    badges: ["art-coordinator", "event-organizer"]
  },
  {
    userId: "user5",
    badges: ["digital-specialist", "community-leader"]
  }
];

// Helper function to check if a user has a specific badge
export function userHasBadge(userId: string, badgeId: string): boolean {
  const userBadgeRecord = mockUserBadges.find(ub => ub.userId === userId);
  return userBadgeRecord ? userBadgeRecord.badges.includes(badgeId) : false;
}

// Helper function to check if a user has any of the required badges
export function userHasRequiredBadges(userId: string, requiredBadges: string[]): boolean {
  if (!requiredBadges || requiredBadges.length === 0) return true;
  
  const userBadgeRecord = mockUserBadges.find(ub => ub.userId === userId);
  if (!userBadgeRecord) return false;
  
  return requiredBadges.some(badge => userBadgeRecord.badges.includes(badge));
}

// Helper function to get all badges for a user
export function getUserBadges(userId: string): UserBadge[] {
  const userBadgeRecord = mockUserBadges.find(ub => ub.userId === userId);
  if (!userBadgeRecord) return [];
  
  return userBadgeRecord.badges
    .map(badgeId => mockBadges.find(badge => badge.id === badgeId))
    .filter((badge): badge is UserBadge => badge !== undefined);
}
