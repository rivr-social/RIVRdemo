"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagSelector } from "@/components/tag-selector"
import { ChapterSelector } from "@/components/chapter-selector"
import { chapters } from "@/lib/mock-data"

export function CreateListingForm() {
  const router = useRouter()
  const [type, setType] = useState<"product" | "service">("product")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [chapterTags, setChapterTags] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      type,
      title,
      description,
      price: Number.parseFloat(price),
      category,
      condition: type === "product" ? condition : undefined,
      location,
      tags,
      chapterTags,
      images,
    })

    setIsSubmitting(false)
    router.push("/")
  }

  const productCategories = [
    "Electronics",
    "Home & Garden",
    "Clothing & Accessories",
    "Sports & Outdoors",
    "Books & Media",
    "Vehicles",
    "Toys & Games",
    "Art & Collectibles",
    "Other",
  ]

  const serviceCategories = [
    "Home Services",
    "Professional Services",
    "Creative Services",
    "Tech Services",
    "Education & Tutoring",
    "Health & Wellness",
    "Events & Entertainment",
    "Transportation",
    "Other",
  ]

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]

  const handleImageUpload = (url: string) => {
    setImages((prev) => [...prev, url])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Create a Marketplace Listing</h2>

        <div className="space-y-2">
          <Label>Listing Type</Label>
          <RadioGroup
            value={type}
            onValueChange={(value) => setType(value as "product" | "service")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="product" id="product" />
              <Label htmlFor="product">Product</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="service" id="service" />
              <Label htmlFor="service">Service</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Enter ${type} title`}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Describe your ${type}`}
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price {type === "service" && "(per hour)"}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-7"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(type === "product" ? productCategories : serviceCategories).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {type === "product" && (
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State or Remote"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Listing image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </Button>
              </div>
            ))}
            {images.length < 4 && (
              <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center aspect-square">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleImageUpload(`/placeholder.svg?height=300&width=300&query=${type}+${category}`)}
                >
                  Add Image
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Add up to 4 images</p>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <TagSelector selectedTags={tags} onTagsChange={setTags} placeholder="Add tags (press Enter after each tag)" />
        </div>

        <div className="space-y-2">
          <Label>Chapters</Label>
          <ChapterSelector chapters={chapters} selectedChapters={chapterTags} onChange={setChapterTags} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Listing"}
        </Button>
      </div>
    </form>
  )
}
