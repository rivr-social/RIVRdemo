"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getIssuesByGroupId, getPollsByGroupId, getProposalsByGroupId } from "@/lib/mock-governance-data"

// Import the new components at the top
import { VotingModal } from "./voting-modal"
import { CreateProposalModal } from "./create-proposal-modal"

interface GovernanceTabProps {
  groupId: string
}

export function GovernanceTab({ groupId }: GovernanceTabProps) {
  const [activeTab, setActiveTab] = useState("issues")

  // Add state for modals after the existing useState
  const [votingModal, setVotingModal] = useState<{ isOpen: boolean; item: any; type: "proposal" | "poll" } | null>(null)
  const [createProposalModal, setCreateProposalModal] = useState(false)

  // Get data for this group
  const issues = getIssuesByGroupId(groupId) || []
  const polls = getPollsByGroupId(groupId) || []
  const proposals = getProposalsByGroupId(groupId) || []

  // Add some debugging to see what data we're getting
  console.log("Governance data for group", groupId, { issues, polls, proposals })

  // Add these handler functions before the return statement
  const handleVote = async (vote: string, comment?: string) => {
    console.log("Vote submitted:", { vote, comment, item: votingModal?.item })
    // Here you would typically make an API call to submit the vote
    // For now, we'll just log it
  }

  const handleCreateProposal = async (proposalData: any) => {
    console.log("Proposal created:", proposalData)
    // Here you would typically make an API call to create the proposal
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Governance</h2>
        <div className="flex gap-2">
          <Button variant="outline">Create Issue</Button>
          <Button variant="default" onClick={() => setCreateProposalModal(true)}>
            Create Proposal
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="issues">Issues & Polls</TabsTrigger>
          <TabsTrigger value="proposals">Proposals & Votes</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Issues</h3>
            {issues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {issue.status}
                    </span>
                  </div>
                  <CardDescription>
                    Created by {issue.creator.name} • {new Date(issue.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-2">{issue.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {issue.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">↑</span> {issue.votes.up}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-red-500">↓</span> {issue.votes.down}
                    </span>
                    <span>{issue.comments} comments</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {issues.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <p>No issues found for this group. Create the first issue to get started!</p>
                </CardContent>
              </Card>
            )}

            <h3 className="text-xl font-semibold mt-6">Polls</h3>
            {polls.map((poll) => (
              <Card key={poll.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{poll.question}</CardTitle>
                  <CardDescription>
                    Created by {poll.creator.name} • Ends {new Date(poll.endDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  {poll.description && <p className="text-sm mb-4">{poll.description}</p>}
                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = Math.round((option.votes / poll.totalVotes) * 100) || 0
                      return (
                        <div key={option.id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{option.text}</span>
                            <span>
                              {percentage}% ({option.votes})
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${poll.userVoted === option.id ? "bg-blue-500" : "bg-gray-400"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-sm text-gray-500">{poll.totalVotes} votes</div>
                  <Button
                    variant={poll.userVoted ? "outline" : "default"}
                    size="sm"
                    onClick={() => setVotingModal({ isOpen: true, item: poll, type: "poll" })}
                  >
                    {poll.userVoted ? "Change Vote" : "Vote"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {polls.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <p>No polls found for this group. Create the first poll to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-4 mt-4">
          <h3 className="text-xl font-semibold">Proposals</h3>
          <div className="grid grid-cols-1 gap-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {proposal.status}
                    </span>
                  </div>
                  <CardDescription>
                    Created by {proposal.creator.name} • Ends {new Date(proposal.endDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-2 mb-3">{proposal.description}</p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Yes</span>
                        <span>
                          {Math.round(
                            (proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) *
                              100,
                          )}
                          % ({proposal.votes.yes})
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{
                            width: `${Math.round((proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>No</span>
                        <span>
                          {Math.round(
                            (proposal.votes.no / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) *
                              100,
                          )}
                          % ({proposal.votes.no})
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{
                            width: `${Math.round((proposal.votes.no / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-sm text-gray-500">
                    {proposal.comments} comments • Threshold: {proposal.threshold}%
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVotingModal({ isOpen: true, item: proposal, type: "proposal" })}
                  >
                    Vote
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {proposals.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <p>No proposals found for this group. Create the first proposal to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {votingModal && (
        <VotingModal
          isOpen={votingModal.isOpen}
          onClose={() => setVotingModal(null)}
          item={votingModal.item}
          type={votingModal.type}
          onVote={handleVote}
        />
      )}

      <CreateProposalModal
        isOpen={createProposalModal}
        onClose={() => setCreateProposalModal(false)}
        onSubmit={handleCreateProposal}
      />
    </div>
  )
}
