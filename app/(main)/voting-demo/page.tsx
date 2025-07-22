"use client"

import { InteractiveVotingCard } from "@/components/interactive-voting-card"

export default function VotingDemoPage() {
  const handleSingleVote = (values: { [key: string]: number }) => {
    console.log("Single vote:", values)
  }

  const handleMultipleVote = (values: { [key: string]: number }) => {
    console.log("Multiple vote:", values)
  }

  const candidates = [
    { id: "kennedy", name: "Kennedy", value: 3.5 },
    { id: "biden", name: "Biden", value: 3.5 },
    { id: "trump", name: "Trump", value: 3.5 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Interactive Voting Demo</h1>

        <div className="space-y-6">
          <InteractiveVotingCard
            title="I support fairness in Politics"
            type="single"
            initialValue={3.5}
            onVote={handleSingleVote}
            supportCount={55}
            commentCount={36}
          />

          <InteractiveVotingCard
            title="Likelihood you'll vote for:"
            type="multiple"
            options={candidates}
            onVote={handleMultipleVote}
            supportCount={55}
            commentCount={36}
          />
        </div>
      </div>
    </div>
  )
}
