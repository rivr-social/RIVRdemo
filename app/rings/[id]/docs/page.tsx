"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Document, mockDocuments } from "@/lib/mock-documents-data"
import { DocumentList } from "@/components/document-list"
import { DocumentViewer } from "@/components/document-viewer"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface RingDocsPageProps {
  params: {
    id: string
  }
}

export default function RingDocsPage({ params }: RingDocsPageProps) {
  const ringId = params.id
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialDocId = searchParams.get("doc")

  // Base documents for this ring
  const ringDocs = mockDocuments.filter((doc) => doc.groupId === ringId)

  const coreDocMeta: Array<{ title: string; category: string }> = [
    { title: "Mutual Aid Charter", category: "Foundational" },
    { title: "Resource Sharing Agreement", category: "Governance" },
    { title: "Community Guidelines", category: "Governance" },
    { title: "Conflict Resolution Process", category: "Governance" },
    { title: "Treasury Protocols", category: "Economic" },
    { title: "Asset Pooling Agreement", category: "Economic" },
    { title: "Member Contribution Guidelines", category: "Economic" },
    { title: "Voucher System Rules", category: "Economic" },
  ]

  const coreDocs: Document[] = coreDocMeta.map(({ title, category }) => {
    const existing = ringDocs.find((d) => d.title === title)
    if (existing) return existing
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    return {
      id: `${ringId}-${slug}`,
      title,
      description: `${title} for this ring`,
      content: `# ${title}\n\n*This document is being developed by the ring community. Please contact ring stewards for the most current version or to contribute to its development.*\n\n## Purpose\nThis document will outline the ring's approach to ${title.toLowerCase()}.\n\n## Current Status\n- Document framework established\n- Community input being gathered\n- Review and approval process pending\n\n*Last updated: ${new Date().toLocaleDateString()}*`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
      groupId: ringId,
      category,
      tags: ["draft", "community-input"],
    }
  })

  const allDocuments: Document[] = [...ringDocs, ...coreDocs]

  const initialDoc = allDocuments.find((d) => d.id === initialDocId) || null
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(initialDoc)

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 flex items-center"
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Back to Ring
      </Button>

      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        <DocumentList
          documents={allDocuments}
          groupId={ringId}
          onSelectDocument={(doc) => setSelectedDocument(doc)}
        />

        {selectedDocument ? (
          <DocumentViewer
            document={selectedDocument}
            onBack={() => setSelectedDocument(null)}
          />
        ) : (
          <div className="flex items-center justify-center text-muted-foreground border rounded-lg">
            Select a document to preview
          </div>
        )}
      </div>
    </div>
  )
}
