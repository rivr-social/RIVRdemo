"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
}

export function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would upload to a storage service and return a URL
    // For now, we'll use a placeholder image
    const placeholderUrl = "/marketplace-item.png"

    onImageUploaded(placeholderUrl)
    setIsUploading(false)
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleUpload}
      disabled={isUploading}
      className="w-full h-full flex flex-col items-center justify-center p-4"
    >
      <Upload className="h-6 w-6 mb-2" />
      <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
    </Button>
  )
}
