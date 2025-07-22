"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface VotingOption {
  id: string
  name: string
  value: number
}

interface InteractiveVotingCardProps {
  title: string
  type: "single" | "multiple"
  options?: VotingOption[]
  initialValue?: number
  onVote: (values: { [key: string]: number }) => void
  supportCount?: number
  commentCount?: number
  className?: string
}

export function InteractiveVotingCard({
  title,
  type,
  options = [],
  initialValue = 2.5,
  onVote,
  supportCount = 0,
  commentCount = 0,
  className = "",
}: InteractiveVotingCardProps) {
  const [singleValue, setSingleValue] = useState([initialValue])
  const [multipleValues, setMultipleValues] = useState<{ [key: string]: number }>(
    options.reduce((acc, option) => ({ ...acc, [option.id]: option.value }), {}),
  )

  const handleSingleVote = () => {
    onVote({ main: singleValue[0] })
  }

  const handleMultipleVote = () => {
    onVote(multipleValues)
  }

  const updateMultipleValue = (optionId: string, value: number[]) => {
    setMultipleValues((prev) => ({ ...prev, [optionId]: value[0] }))
  }

  const getSliderColor = (value: number) => {
    if (value <= 1.5) return "from-red-500 to-orange-400"
    if (value <= 2.5) return "from-orange-400 to-yellow-400"
    if (value <= 3.5) return "from-yellow-400 to-green-400"
    return "from-green-400 to-green-600"
  }

  const getValueLabel = (value: number) => {
    if (value <= 1) return "Strongly Disagree"
    if (value <= 2) return "Disagree"
    if (value <= 3) return "Neutral"
    if (value <= 4) return "Agree"
    return "Strongly Agree"
  }

  return (
    <Card
      className={`w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 ${className}`}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {type === "single" ? (
          <div className="space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center space-y-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full ${singleValue[0] >= level ? "bg-gray-800" : "bg-gray-300"}`}
                  />
                ))}
                <span className="text-xs text-gray-600 writing-mode-vertical-rl text-orientation-mixed">
                  Level of interest
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{singleValue[0] > 2.5 ? "YES" : "NO"}</div>
                  <div className="relative">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${getSliderColor(singleValue[0])}`} />
                    <Slider
                      value={singleValue}
                      onValueChange={setSingleValue}
                      max={5}
                      min={0}
                      step={0.1}
                      className="absolute top-0 w-full"
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        {singleValue[0].toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex flex-col items-center space-y-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className="w-3 h-3 rounded-full bg-gray-300" />
                ))}
                <span className="text-xs text-gray-600 writing-mode-vertical-rl text-orientation-mixed">
                  Level of interest
                </span>
              </div>

              <div className="flex-1 space-y-6">
                {options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="font-medium text-gray-800">{option.name}</div>
                    <div className="relative">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getSliderColor(multipleValues[option.id] || 2.5)}`}
                      />
                      <Slider
                        value={[multipleValues[option.id] || 2.5]}
                        onValueChange={(value) => updateMultipleValue(option.id, value)}
                        max={5}
                        min={0}
                        step={0.1}
                        className="absolute top-0 w-full"
                      />
                      <div className="absolute -top-8 right-0">
                        <Badge variant="secondary" className="bg-green-500 text-white">
                          {(multipleValues[option.id] || 2.5).toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={type === "single" ? handleSingleVote : handleMultipleVote}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
        >
          VOTE
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center space-x-4 pt-4">
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4" />
          <span>+{supportCount}</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{commentCount}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
