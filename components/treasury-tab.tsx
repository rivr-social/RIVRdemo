"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Calendar,
  Download,
  Plus,
  Wallet,
  Receipt,
  Target,
} from "lucide-react"

interface TreasuryTabProps {
  groupId: string
}

// Mock treasury data - in a real app, this would come from an API
const mockTreasuryData = {
  balance: 12450.75,
  monthlyChange: 8.5,
  revenue: {
    thisMonth: 3200.0,
    lastMonth: 2850.0,
    change: 12.3,
  },
  expenses: {
    thisMonth: 1875.5,
    lastMonth: 2100.25,
    change: -10.7,
  },
  transactions: [
    {
      id: "1",
      type: "income",
      amount: 500.0,
      description: "Event ticket sales - Community Workshop",
      date: "2024-01-15",
      category: "Events",
      from: "Event Registration",
    },
    {
      id: "2",
      type: "expense",
      amount: -125.0,
      description: "Venue rental for monthly meetup",
      date: "2024-01-14",
      category: "Venues",
      to: "Community Center",
    },
    {
      id: "3",
      type: "income",
      amount: 250.0,
      description: "Membership dues - January",
      date: "2024-01-12",
      category: "Membership",
      from: "Monthly Dues",
    },
    {
      id: "4",
      type: "expense",
      amount: -75.5,
      description: "Refreshments for workshop",
      date: "2024-01-10",
      category: "Food & Beverage",
      to: "Local Cafe",
    },
    {
      id: "5",
      type: "income",
      amount: 1000.0,
      description: "Grant funding - Community Development",
      date: "2024-01-08",
      category: "Grants",
      from: "City Council",
    },
    {
      id: "6",
      type: "income",
      amount: 25.0,
      description: "Marketplace commission - Gardening Tools rental",
      date: "2024-01-13",
      category: "Marketplace",
      from: "Transaction Fee",
    },
    {
      id: "7",
      type: "income",
      amount: 15.0,
      description: "Marketplace commission - Web Development service",
      date: "2024-01-11",
      category: "Marketplace",
      from: "Service Fee",
    },
    {
      id: "8",
      type: "income",
      amount: 10.0,
      description: "Marketplace listing fee - Professional Camera",
      date: "2024-01-09",
      category: "Marketplace",
      from: "Listing Fee",
    },
  ],
  budget: {
    monthly: 2500.0,
    categories: [
      { name: "Events", allocated: 800.0, spent: 625.5, color: "bg-blue-500" },
      { name: "Venues", allocated: 600.0, spent: 525.0, color: "bg-green-500" },
      { name: "Marketing", allocated: 300.0, spent: 150.0, color: "bg-purple-500" },
      { name: "Food & Beverage", allocated: 400.0, spent: 275.5, color: "bg-orange-500" },
      { name: "Supplies", allocated: 200.0, spent: 125.0, color: "bg-pink-500" },
      { name: "Other", allocated: 200.0, spent: 75.0, color: "bg-gray-500" },
      { name: "Marketplace Operations", allocated: 100.0, spent: 45.0, color: "bg-cyan-500" },
    ],
  },
  revenueStreams: [
    { name: "Membership Dues", amount: 1050.0, percentage: 32.8 },
    { name: "Event Tickets", amount: 950.0, percentage: 29.7 },
    { name: "Grants", amount: 1000.0, percentage: 31.2 },
    { name: "Marketplace", amount: 200.0, percentage: 6.3 },
  ],
}

export function TreasuryTab({ groupId }: TreasuryTabProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const data = mockTreasuryData

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Treasury</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.balance)}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`inline-flex items-center ${data.monthlyChange >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {data.monthlyChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(data.monthlyChange)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(data.revenue.thisMonth)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{data.revenue.change}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(data.expenses.thisMonth)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{data.expenses.change}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.revenue.thisMonth - data.expenses.thisMonth)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Revenue Streams
                </CardTitle>
                <CardDescription>This month's revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.revenueStreams.map((stream, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{stream.name}</span>
                      <span className="font-medium">{formatCurrency(stream.amount)}</span>
                    </div>
                    <Progress value={stream.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {stream.percentage}% of total revenue
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.category} • {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Transactions</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {data.transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span>•</span>
                            <span>{formatDate(transaction.date)}</span>
                            <span>•</span>
                            <span>
                              {transaction.type === "income" ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Monthly Budget</h3>
            <Button variant="outline" size="sm">
              <Target className="mr-2 h-4 w-4" />
              Edit Budget
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Total monthly budget: {formatCurrency(data.budget.monthly)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.budget.categories.map((category, index) => {
                const percentage = (category.spent / category.allocated) * 100
                const isOverBudget = category.spent > category.allocated

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                        </div>
                        <div className={`text-xs ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
                          {percentage.toFixed(1)}% used
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className={`h-2 ${isOverBudget ? "[&>div]:bg-red-500" : ""}`}
                    />
                    {isOverBudget && (
                      <p className="text-xs text-red-600">
                        Over budget by {formatCurrency(category.spent - category.allocated)}
                      </p>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Financial Reports</h3>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>January 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Revenue</span>
                  <span className="font-medium text-green-600">{formatCurrency(data.revenue.thisMonth)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Expenses</span>
                  <span className="font-medium text-red-600">{formatCurrency(data.expenses.thisMonth)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Net Income</span>
                    <span className="text-green-600">
                      {formatCurrency(data.revenue.thisMonth - data.expenses.thisMonth)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Year to Date</CardTitle>
                <CardDescription>2024 Performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>YTD Revenue</span>
                  <span className="font-medium text-green-600">{formatCurrency(data.revenue.thisMonth * 1.2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>YTD Expenses</span>
                  <span className="font-medium text-red-600">{formatCurrency(data.expenses.thisMonth * 1.1)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>YTD Net Income</span>
                    <span className="text-green-600">
                      {formatCurrency(data.revenue.thisMonth * 1.2 - data.expenses.thisMonth * 1.1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Download detailed financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Profit & Loss Statement</div>
                    <div className="text-sm text-muted-foreground">Monthly P&L report</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Cash Flow Statement</div>
                    <div className="text-sm text-muted-foreground">Track money in and out</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Budget vs Actual</div>
                    <div className="text-sm text-muted-foreground">Compare planned vs actual spending</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Transaction History</div>
                    <div className="text-sm text-muted-foreground">Complete transaction log</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
