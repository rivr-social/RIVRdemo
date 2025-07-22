"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Home,
  ShoppingCart,
  Car,
} from "lucide-react"
import { mockUsers } from "@/lib/mock-data"
import { mockTreasuryData } from "@/lib/mock-treasury-data"

interface FamilyTreasuryTabProps {
  familyId: string
}

export function FamilyTreasuryTab({ familyId }: FamilyTreasuryTabProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawPurpose, setWithdrawPurpose] = useState("")

  // Get treasury data for this family
  const treasuryData = mockTreasuryData.families[familyId] || mockTreasuryData.families["family-1"]
  const userRatio = treasuryData.memberRatios.find((ratio) => ratio.userId === "user-1") || treasuryData.memberRatios[0]

  const handleDeposit = () => {
    if (!depositAmount) return
    console.log(`Depositing $${depositAmount} to family ${familyId}`)
    setDepositAmount("")
  }

  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawPurpose) return
    console.log(`Withdrawing $${withdrawAmount} from family ${familyId} for: ${withdrawPurpose}`)
    setWithdrawAmount("")
    setWithdrawPurpose("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPurposeIcon = (purpose: string) => {
    if (purpose.toLowerCase().includes("groceries") || purpose.toLowerCase().includes("food")) {
      return <ShoppingCart className="h-4 w-4" />
    }
    if (purpose.toLowerCase().includes("rent") || purpose.toLowerCase().includes("utilities")) {
      return <Home className="h-4 w-4" />
    }
    if (purpose.toLowerCase().includes("gas") || purpose.toLowerCase().includes("transport")) {
      return <Car className="h-4 w-4" />
    }
    return <DollarSign className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Family Balance</p>
                <p className="text-2xl font-bold">${treasuryData.balance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Contribution</p>
                <p className="text-2xl font-bold">${userRatio.totalContributed.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{userRatio.ratio}% of total</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Limit</p>
                <p className="text-2xl font-bold">${userRatio.withdrawalLimit.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Available to withdraw</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="ratios">Member Ratios</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Treasury Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Contributions</span>
                <span className="text-lg font-bold text-green-600">${treasuryData.totalDeposits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Expenses</span>
                <span className="text-lg font-bold text-red-600">
                  ${treasuryData.totalWithdrawals.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Family Members</span>
                <span className="text-lg font-bold">{treasuryData.memberRatios.length}</span>
              </div>
              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Treasury Health</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((treasuryData.balance / treasuryData.totalDeposits) * 100)}%
                  </span>
                </div>
                <Progress value={(treasuryData.balance / treasuryData.totalDeposits) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Family Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treasuryData.transactions.map((transaction) => {
                  const user = mockUsers.find((u) => u.id === transaction.userId) || mockUsers[0]
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center gap-2">
                            {transaction.purpose && getPurposeIcon(transaction.purpose)}
                            <p className="text-sm text-muted-foreground">
                              {transaction.type === "deposit" ? "Added" : "Spent"} $
                              {transaction.amount.toLocaleString()}
                            </p>
                          </div>
                          {transaction.purpose && (
                            <p className="text-xs text-muted-foreground">For: {transaction.purpose}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Member Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treasuryData.memberRatios
                  .sort((a, b) => b.totalContributed - a.totalContributed)
                  .map((ratio, index) => {
                    const user = mockUsers.find((u) => u.id === ratio.userId) || mockUsers[0]
                    return (
                      <div key={ratio.userId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-family text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${ratio.totalContributed.toLocaleString()} contributed
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{ratio.ratio}%</p>
                          <p className="text-sm text-muted-foreground">
                            ${ratio.withdrawalLimit.toLocaleString()} available
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add to Family Fund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deposit-amount">Amount ($)</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleDeposit} className="w-full" disabled={!depositAmount}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Family Expense</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="withdraw-amount">Amount ($)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder={`Available: $${userRatio.withdrawalLimit.toLocaleString()}`}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="withdraw-purpose">What's this for?</Label>
                  <Textarea
                    id="withdraw-purpose"
                    placeholder="e.g., Groceries, utilities, family dinner..."
                    value={withdrawPurpose}
                    onChange={(e) => setWithdrawPurpose(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleWithdraw}
                  className="w-full bg-transparent"
                  disabled={!withdrawAmount || !withdrawPurpose}
                  variant="outline"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Record Expense
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
