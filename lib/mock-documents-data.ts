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
  },
  {
    id: "ring1-mutual-aid-charter",
    title: "Mutual Aid Charter",
    description: "Official charter outlining our mutual aid principles and commitment to solidarity",
    content: `
# Mutual Aid Charter
## Boulder Valley Community Ring

### Our Foundation
We, the members of the Boulder Valley Community Ring, unite under the principles of mutual aid, recognizing that our individual well-being is inseparable from our collective liberation. This charter establishes our commitment to solidarity over charity, direct action over dependency, and community care over individual accumulation.

### Core Principles

#### 1. Solidarity Not Charity
We reject the charity model that perpetuates power imbalances. Instead, we practice solidarity—supporting each other as equals who all have something to offer and something to gain.

#### 2. Direct Action
We meet each other's immediate needs through direct, community-controlled action rather than relying solely on institutional systems that may fail our most vulnerable members.

#### 3. Political Education
We understand that individual hardships often stem from systemic issues. We commit to learning together about the root causes of inequality and working toward systemic change.

#### 4. Collective Care
We recognize care work as essential labor and share the responsibility of caring for our community members, especially our elders, children, and those experiencing crisis.

#### 5. Resource Sharing
We practice abundance thinking, sharing our resources—whether material, skills, knowledge, or time—according to our abilities and accessing them according to our needs.

### Mutual Aid Framework

#### Emergency Response
- Crisis support fund for urgent needs (housing, medical, food insecurity)
- Rapid response network for community members facing eviction, deportation, or other emergencies
- Disaster preparedness and mutual aid coordination

#### Ongoing Support
- Community resource sharing (tools, equipment, space)
- Skill sharing and educational workshops
- Childcare cooperative and elder care support
- Community gardens and food distribution

#### Community Building
- Regular gatherings to strengthen relationships
- Conflict resolution processes that prioritize healing
- Cultural events and celebrations
- Spaces for grieving and joy

### Decision Making
We practice consensus decision-making whenever possible, with processes that center the voices of those most affected by decisions. When consensus cannot be reached, we use modified consensus requiring 75% agreement.

### Accountability
We commit to:
- Regular evaluation of our practices and impact
- Transparent resource management
- Addressing harm through restorative justice practices
- Continuous learning and adaptation

### Membership
Membership is open to all who commit to our principles and are willing to participate according to their capacity. We recognize that people's abilities to contribute vary based on circumstances, health, work, and family responsibilities.

---

*This charter was adopted by community consensus on March 15, 2024, and will be reviewed annually.*
`,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    createdBy: "user1",
    groupId: "ring1",
    tags: ["charter", "mutual-aid", "principles"],
    category: "Foundational"
  },
  {
    id: "ring1-resource-sharing-agreement",
    title: "Resource Sharing Agreement",
    description: "Guidelines for sharing material resources, tools, and equipment within our ring",
    content: `
# Resource Sharing Agreement
## Boulder Valley Community Ring

### Purpose
This agreement establishes guidelines for sharing material resources among ring members, ensuring equitable access while maintaining community assets responsibly.

### Shared Resource Categories

#### 1. Tools and Equipment
- **Garden Tools**: Shovels, hoses, wheelbarrows, lawn mowers
- **Home Maintenance**: Drills, saws, ladders, paint supplies
- **Kitchen Equipment**: Large appliances, party supplies, canning equipment
- **Transportation**: Bikes, car-sharing, moving equipment

#### 2. Spaces
- **Meeting Spaces**: Community rooms, backyards for events
- **Workshop Spaces**: Garages, basements for projects
- **Storage**: For community supplies and bulk purchases
- **Emergency Housing**: Spare rooms, couches for members in crisis

#### 3. Skills and Services
- **Professional Services**: Legal aid, accounting, medical consultation
- **Practical Skills**: Childcare, cooking, repairs, transportation
- **Educational Support**: Tutoring, language exchange, technology help

### Access Guidelines

#### Resource Sharing Process
1. **Request**: Contact resource coordinator or use community platform
2. **Schedule**: Arrange pickup/drop-off or service time
3. **Use**: Follow safety guidelines and care instructions
4. **Return**: Clean and return promptly in good condition
5. **Report**: Note any issues or needed repairs

#### Priority System
- **Emergency needs** take highest priority
- **Community projects** and **educational purposes** have second priority
- **Personal convenience** requests filled as resources allow

#### Duration Limits
- **Tools**: 1 week standard, extend by request
- **Spaces**: Coordinate with other bookings
- **Services**: By mutual agreement

### Responsibilities

#### For Resource Providers
- Maintain items in good working condition
- Provide clear usage instructions and safety information
- Set reasonable availability schedules
- Communicate any restrictions or special care needed

#### For Resource Users
- Handle all shared items with care and respect
- Return items clean and in good condition
- Report damage or loss immediately
- Contribute to repair or replacement costs when appropriate
- Share skills and services according to ability

### Community Maintenance

#### Tool Library
- Designated storage space for commonly shared tools
- Monthly maintenance and inventory sessions
- Community fund for repairs and new purchases
- Volunteer coordinators for organization

#### Cost Sharing
- **Consumables**: (gas, paint, etc.) covered by user
- **Maintenance**: Shared through community fund
- **Replacement**: Community decision based on usage and need
- **New Purchases**: Collaborative funding for high-need items

### Conflict Resolution
When issues arise around resource sharing:
1. Direct communication between parties
2. Mediation through ring stewards if needed
3. Community discussion for policy clarification
4. Restorative practices for addressing harm

### Opt-Out and Boundaries
Members may:
- Limit sharing of personal items
- Set specific times/conditions for sharing
- Request items not be shared outside immediate ring
- Take breaks from sharing when needed

---

*This agreement reflects our commitment to abundance thinking and mutual support, adopted April 2024.*
`,
    createdAt: "2024-04-10T14:30:00Z",
    updatedAt: "2024-04-15T09:15:00Z",
    createdBy: "user2",
    groupId: "ring1",
    tags: ["resources", "sharing", "tools", "community"],
    category: "Governance"
  },
  {
    id: "ring1-community-guidelines",
    title: "Community Guidelines",
    description: "Shared agreements for creating a safe, inclusive, and supportive community space",
    content: `
# Community Guidelines
## Boulder Valley Community Ring

### Creating Beloved Community
These guidelines help us build a community rooted in love, justice, and mutual support. They are living agreements that grow with us as we learn and practice together.

### Core Agreements

#### 1. Practice Consent and Boundaries
- Ask before sharing personal information about others
- Respect "no" as a complete answer
- Check in before offering advice or physical comfort
- Honor people's capacity limits and availability

#### 2. Center Those Most Affected
- In discussions, prioritize voices of those most impacted by the issue
- Acknowledge and address how different identities affect our experiences
- Challenge systems of oppression rather than individuals

#### 3. Practice Accountability
- Take responsibility for impact, regardless of intent
- Engage in conflict with curiosity and care
- Seek to understand before seeking to be understood
- Make amends when we cause harm

#### 4. Share Space and Take Space
- Be mindful of how much you're speaking in group settings
- Encourage participation from quieter members
- Practice active listening and presence

### Communication Guidelines

#### In Person Gatherings
- **Start with connection**: Begin meetings with a check-in or grounding moment
- **Use "I" statements**: Speak from personal experience rather than generalizing
- **Practice brave space**: Take risks to be vulnerable and challenge ourselves
- **Honor time**: Start and end on time, stay present during meetings

#### Digital Communication
- **Assume good intentions**: Give people the benefit of the doubt in text communication
- **Use content warnings**: For discussions of trauma, violence, or difficult topics
- **Respect response time**: Not everyone can respond immediately
- **Keep it accessible**: Use plain language, provide context for abbreviations

### Inclusion and Accessibility

#### Creating Accessible Spaces
- **Physical accessibility**: Ensure wheelchair access, seating options, good lighting
- **Communication access**: Provide materials in advance, use microphones, offer interpretation
- **Economic accessibility**: Keep events free or sliding scale, provide food when possible
- **Cultural accessibility**: Avoid assumptions about cultural background or knowledge

#### Supporting Different Needs
- **Childcare**: Welcome children and provide childcare when possible
- **Scheduling**: Rotate meeting times to accommodate different work schedules
- **Transportation**: Coordinate rideshares and offer remote participation options
- **Health needs**: Respect medical needs, mask policies, scent-free spaces

### Conflict and Accountability

#### When Conflict Arises
1. **Pause and breathe**: Take time to regulate emotions before engaging
2. **Seek understanding**: What needs are not being met? What fears are present?
3. **Engage directly**: Talk to the person involved before involving others
4. **Seek support**: Use mediators or community support when needed

#### Addressing Harm
- **Immediate safety**: Address urgent safety concerns first
- **Restorative approach**: Focus on healing relationships rather than punishment
- **Community support**: Provide support for all parties involved
- **System change**: Address underlying patterns that enabled harm

#### Accountability Process
1. **Recognize harm**: Acknowledge impact on individuals and community
2. **Take responsibility**: Own actions without deflecting or minimizing
3. **Make amends**: Take concrete actions to repair harm
4. **Change behavior**: Commit to ongoing growth and different choices
5. **Rebuild trust**: Engage in process of rebuilding relationships

### Community Care

#### Supporting Each Other
- **Check in regularly**: Notice when community members are struggling
- **Offer specific help**: "Can I bring dinner Tuesday?" instead of "Let me know if you need anything"
- **Respect privacy**: Don't share personal information without permission
- **Practice interdependence**: Both offer and accept support

#### Crisis Support
- **Emergency protocol**: Clear process for responding to urgent needs
- **Mental health resources**: List of counselors, crisis lines, and support groups
- **Material support**: Emergency fund and resource network
- **Follow-up care**: Check in after crisis has passed

### Growing Together

#### Continuous Learning
- **Political education**: Study systemic issues affecting our community
- **Skill building**: Share knowledge and learn from each other
- **Cultural competency**: Address our own biases and privilege
- **Feedback culture**: Give and receive feedback with love

#### Celebrating Community
- **Acknowledge contributions**: Recognize the labor that builds our community
- **Mark milestones**: Celebrate birthdays, achievements, and transitions
- **Honor seasons**: Recognize cycles of rest and activity
- **Create joy**: Make space for play, art, music, and celebration

---

*These guidelines are revisited annually and updated through community input and consensus.*
`,
    createdAt: "2024-02-20T16:45:00Z",
    updatedAt: "2024-05-10T11:20:00Z",
    createdBy: "user3",
    groupId: "ring1",
    tags: ["guidelines", "community", "safety", "inclusion"],
    category: "Governance"
  },
  {
    id: "ring1-board-meeting-minutes-may-2024",
    title: "Ring Steward Meeting Minutes - May 2024",
    description: "Record of the May 2024 ring steward meeting decisions and discussions",
    content: `
# Ring Steward Meeting Minutes
## Boulder Valley Community Ring
**Date**: May 15, 2024  
**Time**: 7:00 - 9:00 PM  
**Location**: Community Garden Pavilion  

### Attendees
**Ring Stewards Present**:
- Maya Chen (Lead Steward)
- James Rodriguez (Treasury Steward) 
- Angela Kim (Asset Coordinator)
- David Thompson (Community Facilitator)

**Family Representatives**:
- Sarah Martinez (Riverside Family Collective)
- Michael Johnson (Northside Neighbors)
- Lisa Wong (Eco-Village Families)

**Community Members**: 8 additional members present

### Agenda Items

#### 1. Community Check-in (7:00 - 7:15 PM)
- Maya opened with gratitude circle
- Brief sharing on recent community support experiences
- Moment of silence for community members facing difficulties

#### 2. Treasury Report (7:15 - 7:30 PM)
**James Rodriguez reporting**:
- **Current Balance**: $8,247.32
- **Recent Income**: 
  - Member contributions: $1,200
  - Fundraising dinner: $850
  - Grant from Boulder Community Foundation: $2,000
- **Recent Expenses**:
  - Emergency housing support: $600
  - Tool library supplies: $345
  - Community garden materials: $280
- **Emergency Fund**: $3,500 (reserved for crisis support)

**Motion**: Approve monthly treasury report  
**Result**: Consensus reached

#### 3. Resource Sharing Updates (7:30 - 7:50 PM)
**Angela Kim reporting**:
- **Tool Library**: 
  - 15 new items donated this month
  - High demand for gardening tools (spring season)
  - Need volunteer for weekend access coordination
- **Skill Sharing**:
  - 8 childcare exchanges completed
  - 3 families received home repair assistance
  - Language exchange program launched with 12 participants
- **Space Sharing**:
  - Community room booked 18 times in April
  - Need to establish cleaning protocols

**Action Items**:
- Angela to recruit weekend coordinator by June 1
- David to draft space cleaning guidelines

#### 4. Crisis Support Response (7:50 - 8:10 PM)
**Confidential Discussion** - Supporting member family facing eviction
- Emergency housing fund allocation approved: $1,500
- Temporary housing arranged with three ring families
- Legal aid connection established through community lawyer
- Follow-up support plan created

**Motion**: Allocate additional $500 for moving expenses  
**Result**: Consensus reached

#### 5. Community Events Planning (8:10 - 8:25 PM)
**Upcoming Events**:
- **Summer Solstice Celebration**: June 21
  - Lisa Wong coordinating
  - Potluck format with skill-sharing workshops
  - Children's activities planned
- **Quarterly Community Assembly**: July 13
  - Review of resource sharing agreements
  - Election of new family representatives
  - Strategic planning for fall initiatives

**Motion**: Approve $300 budget for solstice celebration supplies  
**Result**: Consensus reached

#### 6. Policy Discussions (8:25 - 8:45 PM)

**Resource Sharing Guidelines Review**:
- Discussion of tool borrowing time limits
- Proposal to create "high-need" priority category
- Question about expanding car-sharing program

**New Business**:
- Request from three families for bulk food purchasing cooperative
- Interest in establishing community workshop space
- Discussion of winter emergency preparedness planning

**Decisions**:
- Form working group for food cooperative research
- David to investigate workshop space options
- Emergency prep planning added to July assembly agenda

#### 7. Steward Role Transitions (8:45 - 8:55 PM)
- Angela Kim stepping back from Asset Coordinator role in August
- Recruitment process for new steward to begin June 1
- Skills needed: organization, communication, conflict resolution
- Two community members expressed initial interest

#### 8. Community Appreciation (8:55 - 9:00 PM)
**Recognition**:
- Thank you to Johnson family for hosting overflow guests
- Appreciation for Martinez family's consistent meal preparation
- Gratitude to Wong family for garden coordination
- Acknowledgment of Thompson's mediation support during recent conflict

### Action Items Summary
1. **Angela**: Recruit weekend tool library coordinator by June 1
2. **David**: Draft space cleaning protocols by May 25
3. **David**: Research community workshop space options by June 15
4. **Maya**: Begin steward recruitment process June 1
5. **Lisa**: Coordinate summer solstice celebration planning
6. **James**: Process emergency fund disbursements by May 20
7. **All**: Prepare reports for July community assembly

### Next Meeting
**Date**: June 19, 2024, 7:00 PM  
**Location**: TBD (will rotate to different family space)  
**Special Focus**: Steward transition planning and summer programs

### Closing
Meeting closed at 9:00 PM with commitment to mutual aid principles and community care.

Minutes recorded by Maya Chen, Lead Steward  
Reviewed and approved by steward collective
`,
    createdAt: "2024-05-15T21:30:00Z",
    updatedAt: "2024-05-16T09:00:00Z",
    createdBy: "user1",
    groupId: "ring1",
    tags: ["minutes", "meeting", "stewards", "governance"],
    category: "Governance"
  }
]
