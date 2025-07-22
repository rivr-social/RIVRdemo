"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  DollarSign, 
  Gift, 
  Package, 
  Wrench, 
  GraduationCap,
  Send,
  User,
  Clock,
  MapPin
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GiveModuleProps {
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  triggerButton?: React.ReactNode
  context?: string // e.g., "post", "event", "comment"
  contextId?: string
}

type GiveType = "thanks" | "money" | "voucher"
type VoucherType = "product" | "service" | "skill"

interface Voucher {
  id: string
  title: string
  description: string
  type: VoucherType
  category: string
  value?: number
  duration?: string
  location?: string
}

// Mock vouchers - in real app, these would come from user's inventory
const mockVouchers: Voucher[] = [
  {
    id: "v1",
    title: "Web Development Services",
    description: "Full-stack web development consultation and implementation",
    type: "service",
    category: "Technology",
    value: 75,
    duration: "2 hours",
    location: "Remote"
  },
  {
    id: "v2", 
    title: "Garden Design Consultation",
    description: "Professional garden planning and design advice",
    type: "service",
    category: "Gardening",
    value: 50,
    duration: "1 hour",
    location: "Boulder, CO"
  },
  {
    id: "v3",
    title: "Homemade Sourdough Bread",
    description: "Fresh baked artisan sourdough bread",
    type: "product",
    category: "Food",
    value: 12
  },
  {
    id: "v4",
    title: "Spanish Language Tutoring",
    description: "One-on-one Spanish conversation practice",
    type: "skill",
    category: "Language",
    value: 40,
    duration: "1 hour",
    location: "Remote or in-person"
  }
]

export function GiveModule({ 
  recipientId, 
  recipientName, 
  recipientAvatar, 
  triggerButton, 
  context, 
  contextId 
}: GiveModuleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [giveType, setGiveType] = useState<GiveType>("thanks")
  const [selectedVoucher, setSelectedVoucher] = useState<string>("")
  const [moneyAmount, setMoneyAmount] = useState<string>("")
  const [thanksMessage, setThanksMessage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      let message = ""
      
      if (giveType === "thanks") {
        message = `Thank you sent to ${recipientName}!`
      } else if (giveType === "money") {
        message = `$${moneyAmount} sent to ${recipientName}!`
      } else if (giveType === "voucher") {
        const voucher = mockVouchers.find(v => v.id === selectedVoucher)
        message = `${voucher?.title} voucher sent to ${recipientName}!`
      }
      
      toast({
        title: "Gift sent successfully",
        description: message,
      })
      
      setIsSubmitting(false)
      setIsOpen(false)
      resetForm()
    }, 1000)
  }

  const resetForm = () => {
    setGiveType("thanks")
    setSelectedVoucher("")
    setMoneyAmount("")
    setThanksMessage("")
  }

  const getVoucherIcon = (type: VoucherType) => {
    switch (type) {
      case "product": return <Package className="h-4 w-4" />
      case "service": return <Wrench className="h-4 w-4" />
      case "skill": return <GraduationCap className="h-4 w-4" />
      default: return <Gift className="h-4 w-4" />
    }
  }

  const isFormValid = () => {
    if (giveType === "thanks") return thanksMessage.trim().length > 0
    if (giveType === "money") return moneyAmount && parseFloat(moneyAmount) > 0
    if (giveType === "voucher") return selectedVoucher !== ""
    return false
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Thank
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={recipientAvatar} alt={recipientName} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            Give to {recipientName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Give Type Selection */}
          <div className="flex gap-2">
            <Button
              variant={giveType === "thanks" ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setGiveType("thanks")
              }}
              className="flex-1"
            >
              <Heart className="h-4 w-4 mr-2" />
              Thanks
            </Button>
            <Button
              variant={giveType === "money" ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setGiveType("money")
              }}
              className="flex-1"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Money
            </Button>
            <Button
              variant={giveType === "voucher" ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setGiveType("voucher")
              }}
              className="flex-1"
            >
              <Gift className="h-4 w-4 mr-2" />
              Voucher
            </Button>
          </div>

          {/* Thanks Form */}
          {giveType === "thanks" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="thanks-message">Thank you message</Label>
                <Textarea
                  id="thanks-message"
                  placeholder="Write a heartfelt thank you message..."
                  value={thanksMessage}
                  onChange={(e) => setThanksMessage(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}

          {/* Money Form */}
          {giveType === "money" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="money-amount">Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="money-amount"
                    type="number"
                    placeholder="0.00"
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    className="pl-10"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="money-message">Message (optional)</Label>
                <Textarea
                  id="money-message"
                  placeholder="Add a note with your gift..."
                  value={thanksMessage}
                  onChange={(e) => setThanksMessage(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          )}

          {/* Voucher Form */}
          {giveType === "voucher" && (
            <div className="space-y-4">
              <div>
                <Label>Select a voucher to give</Label>
                <div className="grid gap-2 mt-2 max-h-[300px] overflow-y-auto">
                  {mockVouchers.map((voucher) => (
                    <Card 
                      key={voucher.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedVoucher === voucher.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedVoucher(voucher.id)
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getVoucherIcon(voucher.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{voucher.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {voucher.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {voucher.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {voucher.value && (
                                <span className="font-medium">${voucher.value}</span>
                              )}
                              {voucher.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {voucher.duration}
                                </span>
                              )}
                              {voucher.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {voucher.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="voucher-message">Message (optional)</Label>
                <Textarea
                  id="voucher-message"
                  placeholder="Add a personal note..."
                  value={thanksMessage}
                  onChange={(e) => setThanksMessage(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                handleSubmit()
              }} 
              disabled={!isFormValid() || isSubmitting}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Gift"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}