"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OfferingType } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { DollarSign, Clock, Award, Zap, Package } from "lucide-react"

interface CreateOfferingModalProps {
  open: boolean
  onClose: () => void
  onCreated?: (offering: any) => void
}

export function CreateOfferingModal({ open, onClose, onCreated }: CreateOfferingModalProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<OfferingType>(OfferingType.Skill)
  const [basePrice, setBasePrice] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [tags, setTags] = useState("")
  const [hasPrice, setHasPrice] = useState(false)
  
  // Voucher slider values
  const [timeValue, setTimeValue] = useState([50])
  const [skillValue, setSkillValue] = useState([50])
  const [difficultyValue, setDifficultyValue] = useState([50])
  const [resourceValue, setResourceValue] = useState([50])

  // Calculate thanks value based on sliders
  const calculateThanksValue = () => {
    return Math.round((timeValue[0] + skillValue[0] + difficultyValue[0] + resourceValue[0]) / 4)
  }

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" })
      return
    }

    const newOffering = {
      id: `offering-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      basePrice: hasPrice ? parseFloat(basePrice) : undefined,
      currency: hasPrice ? currency : undefined,
      createdBy: "cameron", // Current user
      createdAt: new Date().toISOString(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isActive: true,
      // Voucher specific fields
      ...(type === OfferingType.Voucher && {
        timeValue: timeValue[0],
        skillValue: skillValue[0],
        difficultyValue: difficultyValue[0],
        resourceValue: resourceValue[0],
        thanksValue: calculateThanksValue()
      })
    }

    onCreated?.(newOffering)
    
    // Reset form
    setTitle("")
    setDescription("")
    setType(OfferingType.Skill)
    setBasePrice("")
    setTags("")
    setHasPrice(false)
    setTimeValue([50])
    setSkillValue([50])
    setDifficultyValue([50])
    setResourceValue([50])
    
    onClose()
    toast({ title: "Offering created successfully!" })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Offering</DialogTitle>
          <DialogDescription>
            Share your skills, resources, products, or services with the community
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Web Development Consultation"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you're offering..."
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <Label htmlFor="type">Offering Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as OfferingType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OfferingType.Skill}>Skill - Knowledge & Expertise</SelectItem>
                  <SelectItem value={OfferingType.Resource}>Resource - Tools & Materials</SelectItem>
                  <SelectItem value={OfferingType.Product}>Product - Physical Items</SelectItem>
                  <SelectItem value={OfferingType.Service}>Service - Labor & Tasks</SelectItem>
                  <SelectItem value={OfferingType.Trip}>Trip - Transportation</SelectItem>
                  <SelectItem value={OfferingType.Ticket}>Ticket - Event Access</SelectItem>
                  <SelectItem value={OfferingType.Voucher}>Voucher - Community Help</SelectItem>
                  <SelectItem value={OfferingType.Data}>Data - Information & Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="has-price"
                checked={hasPrice}
                onCheckedChange={setHasPrice}
              />
              <Label htmlFor="has-price">Set a price for this offering</Label>
            </div>
            
            {hasPrice && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                      className="pl-10"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="THANKS">Thanks Points</SelectItem>
                      <SelectItem value="TRADE">Trade/Barter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Voucher Sliders */}
          {type === OfferingType.Voucher && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Voucher Value Calculator
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Set the effort levels to calculate thanks points value
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Required
                    </Label>
                    <Badge variant="outline">{timeValue[0]}%</Badge>
                  </div>
                  <Slider
                    value={timeValue}
                    onValueChange={setTimeValue}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Skill Level
                    </Label>
                    <Badge variant="outline">{skillValue[0]}%</Badge>
                  </div>
                  <Slider
                    value={skillValue}
                    onValueChange={setSkillValue}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Difficulty
                    </Label>
                    <Badge variant="outline">{difficultyValue[0]}%</Badge>
                  </div>
                  <Slider
                    value={difficultyValue}
                    onValueChange={setDifficultyValue}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Resources Needed
                    </Label>
                    <Badge variant="outline">{resourceValue[0]}%</Badge>
                  </div>
                  <Slider
                    value={resourceValue}
                    onValueChange={setResourceValue}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Thanks Value:</span>
                    <Badge className="text-lg px-3 py-1">
                      {calculateThanksValue()} points
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This is how many thanks points you'll earn when someone uses this voucher
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., programming, web-development, consultation"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate tags with commas to help people find your offering
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Offering
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}