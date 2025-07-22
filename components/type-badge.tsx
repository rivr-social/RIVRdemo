import { Badge } from "@/components/ui/badge"
import { Building2, FileJson, Network, Home, Users } from "lucide-react"

interface TypeBadgeProps {
  type: "org" | "json" | "ring" | "family" | "basic"
  showIcon?: boolean
}

export const TypeBadge = ({ type, showIcon }: TypeBadgeProps) => {
  switch (type) {
    case "org":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          {showIcon && <Building2 className="h-3 w-3 mr-1" />}
          Org
        </Badge>
      )
    case "json":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
          {showIcon && <FileJson className="h-3 w-3 mr-1" />}
          JSON
        </Badge>
      )
    case "ring":
      return (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          {showIcon && <Network className="h-3 w-3 mr-1" />}
          Ring
        </Badge>
      )
    case "family":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
          {showIcon && <Home className="h-3 w-3 mr-1" />}
          Family
        </Badge>
      )
    case "basic":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
          {showIcon && <Users className="h-3 w-3 mr-1" />}
          Basic
        </Badge>
      )
    default:
      return null
  }
}
