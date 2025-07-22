"use client"

export type Document = {
  id: string
  title: string
  description: string
  content: string
  createdAt: string
  updatedAt: string
  createdBy: string
  groupId: string
  tags?: string[]
  category?: string
}

export const mockDocuments: Document[] = [
  {
    id: "doc1",
    title: "Climate Action Coalition Charter",
    description: "Official charter and mission statement for the Climate Action Coalition",
    content: `
# Climate Action Coalition Charter

## Mission Statement
The Climate Action Coalition exists to unite individuals, organizations, and communities in Boulder County to address the climate crisis through collective action, education, and advocacy. We believe in the power of community-driven solutions to create a sustainable, just, and resilient future.

## Core Values
1. **Environmental Justice**: Ensuring that climate policies and actions benefit all communities, especially those most vulnerable to climate impacts.
2. **Scientific Integrity**: Basing our work on the best available science and data.
3. **Inclusivity**: Welcoming diverse perspectives and ensuring all voices are heard.
4. **Local Focus, Global Impact**: Addressing climate change through local action that contributes to global solutions.
5. **Intergenerational Equity**: Protecting the rights and interests of future generations.

## Strategic Priorities

### 1. Climate Policy Advocacy
- Support local, state, and national policies that reduce greenhouse gas emissions
- Advocate for renewable energy transition and carbon pricing
- Engage with elected officials and decision-makers on climate legislation

### 2. Community Resilience
- Develop neighborhood-level climate adaptation plans
- Support local food systems and urban agriculture
- Create community mutual aid networks for climate-related disasters

### 3. Just Transition
- Ensure workers in carbon-intensive industries have pathways to sustainable livelihoods
- Advocate for green job creation and workforce development
- Support frontline communities most impacted by climate change

### 4. Education and Outreach
- Host regular climate education events and workshops
- Develop materials explaining climate science and solutions
- Engage youth through school partnerships and mentorship programs

## Governance Structure
The Coalition operates as a democratic body with the following structure:
1. **General Assembly**: All members meet quarterly to set priorities and make major decisions
2. **Steering Committee**: Elected representatives who handle day-to-day operations
3. **Working Groups**: Focus on specific issues and projects (Policy, Education, Community Projects)

## Membership
Membership is open to any individual or organization committed to our mission and values. Members are expected to:
- Participate in at least one working group
- Attend general meetings when possible
- Contribute according to their abilities and resources
- Uphold the Coalition's values in their actions

## Decision Making
The Coalition uses consensus-based decision making, with a fallback to supermajority vote (75%) when consensus cannot be reached after good faith efforts.

## Amendments
This charter may be amended by a 75% vote of the General Assembly, with proposed changes distributed at least 30 days in advance.

---

*This charter was adopted on January 15, 2024, by unanimous vote of the founding members.*
`,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    createdBy: "user1",
    groupId: "group1",
    tags: ["charter", "governance", "mission"],
    category: "Governance"
  },
  {
    id: "doc2",
    title: "Community Garden Project Plan",
    description: "Planning document for the community garden initiative",
    content: `
# Community Garden Project Plan

## Project Overview
The Climate Action Coalition Community Garden project aims to create a sustainable, community-managed urban garden that provides fresh produce, educational opportunities, and a space for community building. The garden will demonstrate sustainable agricultural practices and serve as a model for local food production.

## Goals and Objectives
1. Establish a productive community garden by Spring 2025
2. Engage at least 30 community members as regular garden volunteers
3. Produce at least 500 pounds of fresh vegetables annually
4. Host monthly educational workshops on sustainable gardening
5. Create a seed library and plant exchange program

## Timeline

### Phase 1: Planning (January-March 2025)
- Form garden committee
- Secure land use agreement with city
- Develop garden layout and design
- Apply for grants and fundraise
- Recruit initial volunteers

### Phase 2: Implementation (April-June 2025)
- Site preparation and soil testing
- Install water system
- Build raised beds and pathways
- Plant initial crops
- Install composting system

### Phase 3: Operation (July 2025 onwards)
- Regular maintenance schedule
- Harvest and distribution system
- Educational workshops
- Community events
- Evaluation and improvement

## Budget
- Land preparation: $1,200
- Materials for beds: $2,500
- Soil and amendments: $800
- Tools and storage: $1,000
- Water system: $1,500
- Seeds and plants: $600
- Educational materials: $400
- **Total**: $8,000

## Roles and Responsibilities
- **Garden Coordinator**: Overall project management
- **Site Manager**: Maintenance and operations
- **Education Lead**: Workshops and training
- **Volunteer Coordinator**: Recruitment and scheduling
- **Harvest Manager**: Distribution and record keeping

## Sustainability Practices
- Organic growing methods
- Water conservation through drip irrigation
- On-site composting
- Native plant borders for pollinators
- Rainwater harvesting

## Community Engagement
- Regular volunteer days
- Harvest sharing program
- Workshops and skill-shares
- Community celebrations
- School visits and youth programs

## Success Metrics
- Number of active volunteers
- Pounds of food produced
- Water and resource efficiency
- Educational events held
- Community participation rates

---

*This project plan was approved by the Climate Action Coalition General Assembly on February 20, 2025.*
`,
    createdAt: "2025-02-20T14:30:00Z",
    updatedAt: "2025-02-25T09:15:00Z",
    createdBy: "user2",
    groupId: "group1",
    tags: ["garden", "project", "food"],
    category: "Projects"
  },
  {
    id: "doc3",
    title: "Advocacy Toolkit: Engaging with Local Officials",
    description: "Guide for effectively advocating for climate policies with city and county officials",
    content: `
# Advocacy Toolkit: Engaging with Local Officials

## Introduction
This toolkit provides Climate Action Coalition members with strategies and resources for effectively engaging with local officials on climate policy issues. Building relationships with decision-makers is crucial for advancing our climate goals in Boulder County.

## Understanding Local Government

### Key Entities
- **City Council**: Sets city policy, approves budgets, passes ordinances
- **County Commissioners**: Oversee county operations and regional issues
- **Planning Board**: Reviews development proposals and land use changes
- **Sustainability Advisory Board**: Makes recommendations on environmental issues

### Decision-Making Process
1. Issue identification
2. Staff research and recommendations
3. Public hearings and community input
4. Board/commission review
5. Final decision by council/commissioners
6. Implementation

## Preparing for Advocacy

### Research
- **Know the issue**: Understand key facts, history, and impacts
- **Know the decision-maker**: Research their position, voting history, and priorities
- **Know the process**: Identify when and how decisions will be made
- **Know the stakeholders**: Understand who else is involved and their positions

### Developing Your Message
- Start with values that you share with the official
- Present clear, concise facts backed by credible sources
- Share personal stories that illustrate the impact
- Offer specific, actionable solutions
- Connect local issues to broader climate goals

## Advocacy Methods

### Written Communication
- **Email**: Keep to one page with clear request
- **Letters**: More formal, good for detailed arguments
- **Public comment**: Submit for meeting records

### In-Person Engagement
- **Public meetings**: Prepare 2-3 minute testimony
- **Office hours**: Schedule to discuss issues in depth
- **Site visits**: Invite officials to see climate impacts firsthand

### Building Coalitions
- Partner with aligned organizations
- Mobilize diverse constituents
- Coordinate messaging across groups
- Show broad community support

## Following Up
- Send thank you notes after meetings
- Provide additional information promised
- Keep track of commitments made
- Maintain regular contact
- Publicly acknowledge positive actions

## Sample Communication Templates

### Meeting Request Email
[Template text for requesting a meeting with a local official]

### Public Testimony Format
[Outline for effective 2-minute public comment]

### Thank You Letter
[Template for following up after a meeting]

## Case Studies
[Examples of successful local advocacy campaigns]

## Resources
- Local government meeting schedules
- Contact information for key officials
- Climate policy fact sheets
- Partner organizations

---

*This toolkit was developed by the Climate Action Coalition Policy Working Group, March 2025.*
`,
    createdAt: "2025-03-10T16:45:00Z",
    updatedAt: "2025-03-12T11:20:00Z",
    createdBy: "user3",
    groupId: "group1",
    tags: ["advocacy", "policy", "government"],
    category: "Advocacy"
  },
  {
    id: "doc4",
    title: "Climate Action Coalition Meeting Minutes - April 2025",
    description: "Record of the April 2025 general meeting",
    content: `
# Climate Action Coalition Meeting Minutes
**General Assembly - April 15, 2025**
**Location**: Boulder Public Library, Canyon Meeting Room
**Time**: 6:00 - 8:30 PM

## Attendees
- 32 members present (see attached sign-in sheet)
- 5 guests

## Agenda Items

### 1. Welcome and Introductions (6:00 - 6:15 PM)
- Meeting called to order by Chair Sarah Chen
- Land acknowledgment by James Whittaker
- New members and guests introduced themselves

### 2. Approval of Previous Minutes (6:15 - 6:20 PM)
- March meeting minutes approved unanimously

### 3. Treasurer's Report (6:20 - 6:30 PM)
- Current balance: $12,457.89
- Recent expenses: $750 for website development, $320 for event supplies
- Recent income: $2,500 grant from Boulder Foundation, $875 in member donations
- Budget report approved

### 4. Working Group Updates (6:30 - 7:15 PM)

#### Policy Working Group
- City Council approved the updated climate emergency declaration with three of our requested amendments
- County commissioners meeting scheduled for May 10 - need volunteers to attend
- State climate bill SB-125 advancing to committee - call to action for contacting legislators

#### Education Working Group
- Climate film series launched successfully with 85 attendees at first screening
- School board approved climate curriculum partnership for fall semester
- Need volunteers for upcoming Climate Fair on May 22

#### Projects Working Group
- Community garden construction 75% complete
- Solar cooperative reached 15 household commitment milestone
- Weatherization project needs additional volunteers

### 5. Guest Speaker (7:15 - 7:45 PM)
- Dr. Elena Rodriguez, CU Boulder Climate Science Center
- Presentation on latest regional climate projections
- Q&A session

### 6. Strategic Planning (7:45 - 8:15 PM)
- Breakout groups discussed summer campaign priorities
- Groups presented key recommendations
- Consensus reached on focusing summer efforts on transportation electrification advocacy

### 7. Announcements and Next Steps (8:15 - 8:30 PM)
- Next meeting: May 20, 2025
- Volunteer sign-ups circulated
- Reminder about Earth Day event on April 22

## Action Items
1. James to draft transportation electrification campaign plan by April 30
2. Maya to coordinate volunteers for County Commissioner meeting
3. All members to share climate film series on social media
4. Sarah to follow up with grant opportunities discussed
5. Education team to finalize Climate Fair logistics by May 1

Meeting adjourned at 8:30 PM
Minutes submitted by Miguel Santos, Secretary
`,
    createdAt: "2025-04-15T20:45:00Z",
    updatedAt: "2025-04-16T09:30:00Z",
    createdBy: "user4",
    groupId: "group1",
    tags: ["minutes", "meeting"],
    category: "Administration"
  }
]
