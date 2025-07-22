"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CreateProposalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (proposalData: any) => void
}

export function CreateProposalModal({ isOpen, onClose, onSubmit }: CreateProposalModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [threshold, setThreshold] = useState("66")
  const [duration, setDuration] = useState("7")

  const handleSubmit = () => {
    if (title && description) {
      onSubmit({
        title,
        description,
        threshold: Number.parseInt(threshold),
        duration: Number.parseInt(duration),
      })
      onClose()
      setTitle("")
      setDescription("")
      setThreshold("66")
      setDuration("7")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
          <DialogDescription>Create a proposal for the group to vote on</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter proposal title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your proposal in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold (%)</Label>
              <Input
                id="threshold"
                type="number"
                min="50"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !description}>
            Create Proposal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
