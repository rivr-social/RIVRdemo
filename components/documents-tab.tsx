"use client"

import { useState } from "react"
import { Document, mockDocuments } from "@/lib/mock-documents-data"
import { DocumentList } from "./document-list"
import { DocumentViewer } from "./document-viewer"
import { EmptyState } from "./empty-state"
import { FileText } from "lucide-react"

interface DocumentsTabProps {
  groupId: string
}

export function DocumentsTab({ groupId }: DocumentsTabProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  
  // Filter documents for this group
  const groupDocuments = mockDocuments.filter(doc => doc.groupId === groupId)

  if (groupDocuments.length === 0) {
    return (
      <EmptyState
        title="No Documents Yet"
        description="This group doesn't have any documents yet. Create the first one to get started."
        action={{
          label: "Create Document",
          onClick: () => console.log("Create document clicked")
        }}
        icon={<FileText className="h-12 w-12" />}
      />
    )
  }

  return (
    <div className="p-4">
      {selectedDocument ? (
        <DocumentViewer 
          document={selectedDocument}
          onBack={() => setSelectedDocument(null)}
        />
      ) : (
        <DocumentList
          documents={groupDocuments}
          groupId={groupId}
          onSelectDocument={(doc) => setSelectedDocument(doc)}
        />
      )}
    </div>
  )
}
