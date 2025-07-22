import { Building2, Package, GraduationCap, Network, Home, Users } from "lucide-react"

interface TypeIconProps {
  type: "org" | "package" | "graduation" | "ring" | "family" | "basic"
  className?: string
  size?: number
}

export function TypeIcon({ type, className, size }: TypeIconProps) {
  switch (type) {
    case "org":
      return <Building2 className={className} size={size} style={{ color: "#eab308" }} />
    case "package":
      return <Package className={className} size={size} />
    case "graduation":
      return <GraduationCap className={className} size={size} />
    case "ring":
      return <Network className={className} size={size} style={{ color: "#7c3aed" }} />
    case "family":
      return <Home className={className} size={size} style={{ color: "#ea580c" }} />
    case "basic":
      return <Users className={className} size={size} style={{ color: "#22c55e" }} />
    default:
      return null
  }
}
