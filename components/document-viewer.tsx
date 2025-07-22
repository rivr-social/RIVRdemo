"use client"

import { useState } from "react"
import { Document } from "@/lib/mock-documents-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, FileText, Clock, User, Tag, FolderOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockUsers } from "@/lib/mock-data"

interface DocumentViewerProps {
  document: Document
  onBack: () => void
}

export function DocumentViewer({ document, onBack }: DocumentViewerProps) {
  // Find the document creator
  const creator = mockUsers.find(user => user.id === document.createdBy)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Documents</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              {document.category && (
                <Badge variant="outline">{document.category}</Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Updated {new Date(document.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                {creator && (
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{creator.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl mt-4">{document.title}</CardTitle>
          <p className="text-muted-foreground">{document.description}</p>
          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {document.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] w-full border rounded-md p-4">
            <div className="markdown-content prose prose-sm max-w-none">
              {/* Format the document content with basic styling */}
              <div dangerouslySetInnerHTML={{ 
                __html: document.content
                  .replace(/^# (.*)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                  .replace(/^## (.*)$/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
                  .replace(/^### (.*)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
                  .replace(/^#### (.*)$/gm, '<h4 class="text-base font-bold mt-3 mb-2">$1</h4>')
                  .replace(/^\- (.*)$/gm, '<li class="ml-4">$1</li>')
                  .replace(/^\d+\. (.*)$/gm, '<li class="ml-4 list-decimal">$1</li>')
                  .replace(/^\*\*([^*]+)\*\*/gm, '<strong>$1</strong>')
                  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                  .replace(/^---$/gm, '<hr class="my-4" />')
                  .replace(/\n\n/g, '<br/><br/>')
              }} />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
