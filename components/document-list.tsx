"use client"

import { useState } from "react"
import { Document } from "@/lib/mock-documents-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockUsers } from "@/lib/mock-data"
import { FileText, Plus, Search, Filter, Clock, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DocumentListProps {
  documents: Document[]
  groupId: string
  onSelectDocument: (doc: Document) => void
}

export function DocumentList({ documents, groupId, onSelectDocument }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  
  // Extract unique categories from documents
  const categories = ["all", ...Array.from(new Set(documents.map(doc => doc.category || "Uncategorized")))]
  
  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
                          
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Document
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc) => {
              const creator = mockUsers.find(user => user.id === doc.createdBy)
              
              return (
                <Card 
                  key={doc.id} 
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => onSelectDocument(doc)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      {doc.category && (
                        <Badge variant="outline">{doc.category}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm">{doc.description}</p>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground border-t flex justify-between">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {creator && (
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{creator.name}</span>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No documents found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {searchTerm || categoryFilter !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "Create your first document to get started"}
          </p>
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create Document
          </Button>
        </div>
      )}
    </div>
  )
}
