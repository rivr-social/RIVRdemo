"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserPlus, AlertCircle } from "lucide-react"
import { type Group, type JoinQuestion, JoinType } from "@/lib/types"

interface JoinGroupButtonProps {
  group: Group
  currentUserId: string
  isJoined: boolean
  onJoin: (groupId: string, answers?: { questionId: string; answer: string }[]) => void
  onLeave: (groupId: string) => void
}

export function JoinGroupButton({ group, currentUserId, isJoined, onJoin, onLeave }: JoinGroupButtonProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleJoin = () => {
    // If public group or no questions, join directly
    if (
      group.joinSettings.joinType === JoinType.Public ||
      !group.joinSettings.questions ||
      group.joinSettings.questions.length === 0
    ) {
      onJoin(group.id)
      return
    }

    // Otherwise show dialog with questions
    setShowDialog(true)
  }

  const handleSubmit = () => {
    // Validate required questions
    const newErrors: Record<string, string> = {}
    let hasErrors = false

    if (group.joinSettings.questions) {
      group.joinSettings.questions.forEach((question) => {
        if (question.required && (!answers[question.id] || answers[question.id].trim() === "")) {
          newErrors[question.id] = "This question is required"
          hasErrors = true
        }
      })
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }))

    onJoin(group.id, formattedAnswers)
    setShowDialog(false)
    setAnswers({})
    setErrors({})
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })

    // Clear error if field is filled
    if (errors[questionId] && value.trim() !== "") {
      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  const renderQuestion = (question: JoinQuestion) => {
    switch (question.type) {
      case "text":
        return (
          <div key={question.id}>
            <Label htmlFor={question.id}>
              {question.label}
              {question.required ? " *" : ""}
            </Label>
            <Input
              type="text"
              id={question.id}
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
          </div>
        )
      case "textarea":
        return (
          <div key={question.id}>
            <Label htmlFor={question.id}>
              {question.label}
              {question.required ? " *" : ""}
            </Label>
            <Textarea
              id={question.id}
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
          </div>
        )
      case "checkbox":
        return (
          <div key={question.id} className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={question.id}
                  checked={answers[question.id] === "true"}
                  onCheckedChange={(checked) => handleAnswerChange(question.id, checked ? "true" : "false")}
                />
                <Label htmlFor={question.id}>
                  {question.label}
                  {question.required ? " *" : ""}
                </Label>
              </div>
            </div>
            {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
          </div>
        )
      case "radio":
        return (
          <div key={question.id}>
            <Label>
              {question.label}
              {question.required ? " *" : ""}
            </Label>
            <RadioGroup
              defaultValue={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleJoin} disabled={isJoined}>
        {isJoined ? "Joined" : "Join Group"}
        <UserPlus className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join {group.name}</DialogTitle>
            <DialogDescription>Answer the following questions to request membership.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {group.joinSettings.questions?.map((question) => renderQuestion(question))}
          </div>
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center text-sm text-red-500 space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Please answer all required questions.</span>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleSubmit}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
