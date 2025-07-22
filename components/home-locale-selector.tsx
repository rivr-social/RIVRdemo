"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  MapPin, Search, Home, ChevronRight, 
  Users, Building2, Waves, Star,
  Plus, Check
} from "lucide-react"
import { Chapter, Basin } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface HomeLocaleSelectorProps {
  chapters: Chapter[]
  basins: Basin[]
  currentLocale?: string
  onSelectLocale: (localeId: string) => void
}

export function HomeLocaleSelector({ 
  chapters, 
  basins, 
  currentLocale, 
  onSelectLocale 
}: HomeLocaleSelectorProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBasin, setSelectedBasin] = useState<string>("all")
  const [isOpen, setIsOpen] = useState(false)

  // Filter chapters based on search and basin selection
  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBasin = selectedBasin === "all" || chapter.basinId === selectedBasin
    return matchesSearch && matchesBasin
  })

  const handleSelectLocale = (localeId: string) => {
    onSelectLocale(localeId)
    setIsOpen(false)
    toast({ title: "Home locale updated successfully!" })
  }

  const currentLocaleData = chapters.find(c => c.id === currentLocale)
  const currentBasin = currentLocaleData?.basinId ? 
    basins.find(b => b.id === currentLocaleData.basinId) : null

  const getLocaleTypeIcon = (chapter: Chapter) => {
    if (chapter.isCommons) {
      return <Users className="h-4 w-4 text-green-500" />
    }
    return <Building2 className="h-4 w-4 text-blue-500" />
  }

  const getLocaleTypeBadge = (chapter: Chapter) => {
    if (chapter.isCommons) {
      return <Badge variant="outline" className="text-green-600 border-green-300">Commons</Badge>
    }
    return <Badge variant="outline" className="text-blue-600 border-blue-300">Chapter</Badge>
  }

  return (
    <>
      {/* Current Home Locale Display */}
      {currentLocaleData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-orange-500" />
              Your Home Locale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {currentLocaleData.image && (
                <img 
                  src={currentLocaleData.image} 
                  alt={currentLocaleData.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium">{currentLocaleData.name}</h3>
                  {getLocaleTypeBadge(currentLocaleData)}
                </div>
                <p className="text-gray-600 mb-2">{currentLocaleData.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {currentLocaleData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {currentLocaleData.memberCount} members
                  </span>
                  {currentBasin && (
                    <span className="flex items-center gap-1">
                      <Waves className="h-3 w-3" />
                      {currentBasin.name}
                    </span>
                  )}
                </div>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Change Locale
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Select Your Home Locale</DialogTitle>
                    <DialogDescription>
                      Choose the community where you're most active. This will personalize your experience.
                    </DialogDescription>
                  </DialogHeader>
                  <HomeLocaleSelectorModal 
                    chapters={chapters}
                    basins={basins}
                    currentLocale={currentLocale}
                    onSelectLocale={handleSelectLocale}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Home Locale Selected */}
      {!currentLocaleData && (
        <Card className="mb-6">
          <CardContent className="text-center py-12">
            <Home className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Set Your Home Locale</h3>
            <p className="text-gray-600 mb-4">
              Select your primary community to get personalized content and local connections.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <MapPin className="h-4 w-4 mr-2" />
                  Choose Home Locale
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select Your Home Locale</DialogTitle>
                  <DialogDescription>
                    Choose the community where you're most active. This will personalize your experience.
                  </DialogDescription>
                </DialogHeader>
                <HomeLocaleSelectorModal 
                  chapters={chapters}
                  basins={basins}
                  currentLocale={currentLocale}
                  onSelectLocale={handleSelectLocale}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </>
  )
}

function HomeLocaleSelectorModal({ 
  chapters, 
  basins, 
  currentLocale, 
  onSelectLocale 
}: {
  chapters: Chapter[]
  basins: Basin[]
  currentLocale?: string
  onSelectLocale: (localeId: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBasin, setSelectedBasin] = useState<string>("all")

  // Filter chapters based on search and basin selection
  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBasin = selectedBasin === "all" || chapter.basinId === selectedBasin
    return matchesSearch && matchesBasin
  })

  // Group chapters by basin for better organization
  const chaptersByBasin = filteredChapters.reduce((acc, chapter) => {
    const basinId = chapter.basinId || "unknown"
    if (!acc[basinId]) {
      acc[basinId] = []
    }
    acc[basinId].push(chapter)
    return acc
  }, {} as Record<string, Chapter[]>)

  const getLocaleTypeIcon = (chapter: Chapter) => {
    if (chapter.isCommons) {
      return <Users className="h-4 w-4 text-green-500" />
    }
    return <Building2 className="h-4 w-4 text-blue-500" />
  }

  const getLocaleTypeBadge = (chapter: Chapter) => {
    if (chapter.isCommons) {
      return <Badge variant="outline" className="text-green-600 border-green-300">Commons</Badge>
    }
    return <Badge variant="outline" className="text-blue-600 border-blue-300">Chapter</Badge>
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search communities or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedBasin} onValueChange={setSelectedBasin}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by watershed basin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Basins</SelectItem>
            {basins.map((basin) => (
              <SelectItem key={basin.id} value={basin.id}>
                <div className="flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  {basin.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {Object.entries(chaptersByBasin).map(([basinId, basinChapters]) => {
          const basin = basins.find(b => b.id === basinId)
          
          return (
            <div key={basinId}>
              {basin && selectedBasin === "all" && (
                <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                  <Waves className="h-4 w-4 text-blue-500" />
                  <h4 className="font-medium text-gray-700">{basin.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {basinChapters.length} communities
                  </Badge>
                </div>
              )}

              <div className="grid gap-3">
                {basinChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    onClick={() => onSelectLocale(chapter.id)}
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50
                      ${currentLocale === chapter.id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      {chapter.image && (
                        <img 
                          src={chapter.image} 
                          alt={chapter.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getLocaleTypeIcon(chapter)}
                          <h3 className="font-medium">{chapter.name}</h3>
                          {getLocaleTypeBadge(chapter)}
                          {currentLocale === chapter.id && (
                            <Badge variant="default" className="ml-auto">
                              <Check className="h-3 w-3 mr-1" />
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{chapter.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {chapter.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {chapter.memberCount} members
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filteredChapters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No communities found matching your search</p>
          </div>
        )}
      </div>

      {/* Create New Community Option */}
      <div className="pt-4 border-t">
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create New Community
        </Button>
      </div>
    </div>
  )
}