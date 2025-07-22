"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Group } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Users, LinkIcon, Unlink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockGroups, mockUsers } from "@/lib/mock-data"

interface GroupRelationshipsProps {
  group: Group
  allGroups: Group[]
  isAdmin: boolean
  currentUserId: string
}

export function GroupRelationships({ group, allGroups, isAdmin, currentUserId }: GroupRelationshipsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("subgroups")
  const [showManageAffiliations, setShowManageAffiliations] = useState(false)

  // Check if current user is admin or creator
  const isAdminOrCreator = group.creatorId === currentUserId || group.adminIds?.includes(currentUserId)

  // Handle create subgroup navigation
  const handleCreateSubgroup = () => {
    router.push(`/create?tab=group&parent=${group.id}`)
  }

  // Get subgroups
  const subgroups = mockGroups.filter((g) => g.parentGroupId === group.id)

  // Get parent group
  const parentGroup = group.parentGroupId ? mockGroups.find((g) => g.id === group.parentGroupId) : null

  // Get affiliated groups
  const affiliatedGroups = group.affiliatedGroups
    ? mockGroups.filter((g) => group.affiliatedGroups?.includes(g.id))
    : []

  return (
    <div className="space-y-4">
      <Tabs defaultValue="subgroups" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="subgroups" className="relative">
              Subgroups
              {subgroups.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {subgroups.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="parent">
              Parent Group
              {parentGroup && (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="affiliations">
              Affiliations
              {affiliatedGroups.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {affiliatedGroups.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {isAdminOrCreator && (
            <div className="flex gap-2">
              {activeTab === "subgroups" && (
                <Button size="sm" variant="outline" onClick={handleCreateSubgroup}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Subgroup
                </Button>
              )}

              {activeTab === "affiliations" && (
                <Dialog open={showManageAffiliations} onOpenChange={setShowManageAffiliations}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Manage Affiliations
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Manage Affiliations</DialogTitle>
                    </DialogHeader>
                    <ManageAffiliations group={group} onSuccess={() => setShowManageAffiliations(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div>

        <TabsContent value="subgroups" className="space-y-4">
          {subgroups.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subgroups.map((subgroup) => (
                  <GroupCard
                    key={subgroup.id}
                    group={subgroup}
                    relationshipType="subgroup"
                    currentUserId={currentUserId}
                    parentGroup={group}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Subgroups</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                This group doesn't have any subgroups yet.
                {isAdminOrCreator && " Create a subgroup to organize members around specific initiatives."}
              </p>
              {isAdminOrCreator && (
                <Button variant="outline" className="mt-4" onClick={handleCreateSubgroup}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Subgroup
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="parent">
          {parentGroup ? (
            <GroupCard group={parentGroup} relationshipType="parent" currentUserId={currentUserId} childGroup={group} />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Parent Group</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                This is a top-level group and doesn't belong to any parent group.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="affiliations" className="space-y-4">
          {affiliatedGroups.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {affiliatedGroups.map((affiliatedGroup) => (
                  <GroupCard
                    key={affiliatedGroup.id}
                    group={affiliatedGroup}
                    relationshipType="affiliated"
                    currentUserId={currentUserId}
                    affiliatedWith={group}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Affiliated Groups</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                This group doesn't have any affiliations with other groups yet.
                {isAdminOrCreator && " Create affiliations to connect with related groups."}
              </p>
              {isAdminOrCreator && (
                <Button variant="outline" className="mt-4" onClick={() => setShowManageAffiliations(true)}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Manage Affiliations
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface GroupCardProps {
  group: Group
  relationshipType: "subgroup" | "parent" | "affiliated"
  currentUserId: string
  parentGroup?: Group
  childGroup?: Group
  affiliatedWith?: Group
}

function GroupCard({
  group,
  relationshipType,
  currentUserId,
  parentGroup,
  childGroup,
  affiliatedWith,
}: GroupCardProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)

  // Check if current user is admin or creator of the relevant group
  const isAdminOrCreator =
    relationshipType === "subgroup" && parentGroup
      ? parentGroup.creatorId === currentUserId || parentGroup.adminIds?.includes(currentUserId)
      : relationshipType === "affiliated" && affiliatedWith
        ? affiliatedWith.creatorId === currentUserId || affiliatedWith.adminIds?.includes(currentUserId)
        : false

  // Get creator info
  const creator = mockUsers.find((user) => user.id === group.creatorId)

  // Get member count
  const memberCount = group.members?.length || 0

  // Get relationship label
  const getRelationshipLabel = () => {
    switch (relationshipType) {
      case "subgroup":
        return "Subgroup"
      case "parent":
        return "Parent Group"
      case "affiliated":
        return "Affiliated Group"
    }
  }

  // Handle remove relationship
  const handleRemoveRelationship = () => {
    // In a real app, this would call an API to remove the relationship
    console.log(`Removing ${relationshipType} relationship with group ${group.id}`)
    setShowRemoveDialog(false)
    // This would trigger a refresh of the data
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
              <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">
                <a href={`/groups/${group.id}`} className="hover:underline">
                  {group.name}
                </a>
              </CardTitle>
              <CardDescription className="text-xs">
                {creator ? `Created by ${creator.name}` : "Unknown creator"}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline">{getRelationshipLabel()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{group.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{memberCount} members</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={`/groups/${group.id}`}>View Group</a>
        </Button>

        {isAdminOrCreator && (
          <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Unlink className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove Relationship</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Are you sure you want to remove this {relationshipType} relationship?</p>
                {relationshipType === "subgroup" && (
                  <p className="text-sm text-muted-foreground mt-2">
                    This will not delete the group, but it will no longer be a subgroup of {parentGroup?.name}.
                  </p>
                )}
                {relationshipType === "affiliated" && (
                  <p className="text-sm text-muted-foreground mt-2">
                    This will remove the affiliation between {affiliatedWith?.name} and {group.name}.
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleRemoveRelationship}>
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}

// These components would be imported from their respective files
function CreateSubgroupForm({ parentGroup, onSuccess }: { parentGroup: Group; onSuccess: () => void }) {
  return (
    <div className="py-4">
      <p>Create Subgroup Form Placeholder</p>
      <Button className="mt-4" onClick={onSuccess}>
        Create Subgroup
      </Button>
    </div>
  )
}

function ManageAffiliations({ group, onSuccess }: { group: Group; onSuccess: () => void }) {
  return (
    <div className="py-4">
      <p>Manage Affiliations Form Placeholder</p>
      <Button className="mt-4" onClick={onSuccess}>
        Save Changes
      </Button>
    </div>
  )
}
