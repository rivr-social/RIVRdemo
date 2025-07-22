import type { MemberStake } from "./types"
import { users } from "./mock-data"

export const memberStakes: MemberStake[] = [
  {
    user: users[0],
    profitShare: 15.5,
    contributionMetrics: {
      offersCreated: 12,
      offersAccepted: 8,
      thanksReceived: 45,
      thanksGiven: 38,
      proposalsCreated: 3,
      votesParticipated: 15,
    },
    joinedAt: "2023-01-15T10:00:00Z",
    groupId: "group1",
  },
  {
    user: users[1],
    profitShare: 12.3,
    contributionMetrics: {
      offersCreated: 8,
      offersAccepted: 15,
      thanksReceived: 32,
      thanksGiven: 41,
      proposalsCreated: 2,
      votesParticipated: 18,
    },
    joinedAt: "2023-02-01T14:30:00Z",
    groupId: "group1",
  },
  {
    user: users[2],
    profitShare: 18.7,
    contributionMetrics: {
      offersCreated: 15,
      offersAccepted: 12,
      thanksReceived: 67,
      thanksGiven: 52,
      proposalsCreated: 5,
      votesParticipated: 22,
    },
    joinedAt: "2023-01-08T09:15:00Z",
    groupId: "group1",
  },
  {
    user: users[3],
    profitShare: 9.8,
    contributionMetrics: {
      offersCreated: 6,
      offersAccepted: 9,
      thanksReceived: 28,
      thanksGiven: 33,
      proposalsCreated: 1,
      votesParticipated: 12,
    },
    joinedAt: "2023-03-12T16:45:00Z",
    groupId: "group1",
  },
  {
    user: users[4],
    profitShare: 11.2,
    contributionMetrics: {
      offersCreated: 9,
      offersAccepted: 11,
      thanksReceived: 35,
      thanksGiven: 29,
      proposalsCreated: 2,
      votesParticipated: 14,
    },
    joinedAt: "2023-02-20T11:20:00Z",
    groupId: "group2",
  },
  {
    user: users[0], // Same user in different group
    profitShare: 8.5,
    contributionMetrics: {
      offersCreated: 4,
      offersAccepted: 6,
      thanksReceived: 18,
      thanksGiven: 22,
      proposalsCreated: 1,
      votesParticipated: 8,
    },
    joinedAt: "2023-04-01T13:00:00Z",
    groupId: "group2",
  },
  {
    user: {
      id: "user6",
      name: "Maria Santos",
      username: "mariasantos",
      bio: "Environmental lawyer and policy advocate",
      avatar: "/abstract-colorful-shapes.png",
      followers: 234,
      following: 189,
    },
    profitShare: 14.7,
    contributionMetrics: {
      offersCreated: 11,
      offersAccepted: 9,
      thanksReceived: 56,
      thanksGiven: 48,
      proposalsCreated: 4,
      votesParticipated: 25,
    },
    joinedAt: "2023-02-12T14:15:00Z",
    groupId: "group1",
  },
  {
    user: {
      id: "user7",
      name: "James Wilson",
      username: "jameswilson",
      bio: "Renewable energy engineer and community organizer",
      avatar: "/stylized-initials.png",
      followers: 189,
      following: 156,
    },
    profitShare: 11.3,
    contributionMetrics: {
      offersCreated: 8,
      offersAccepted: 16,
      thanksReceived: 42,
      thanksGiven: 39,
      proposalsCreated: 3,
      votesParticipated: 21,
    },
    joinedAt: "2023-02-28T16:45:00Z",
    groupId: "group1",
  },
]

export function getMemberStakesByGroupId(groupId: string): MemberStake[] {
  return memberStakes.filter((stake) => stake.groupId === groupId)
}

export function getTotalGroupStakes(groupId: string): number {
  const stakes = getMemberStakesByGroupId(groupId)
  return stakes.reduce((total, stake) => total + stake.profitShare, 0)
}
