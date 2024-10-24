import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCircle, FaDollarSign, FaTrophy, FaShieldAlt, FaGavel, FaBullseye } from "react-icons/fa"
import { IconType } from "react-icons" // Assuming you're using react-icons for icons

// Define a mapping of icon names to actual icon components
const iconMap: Record<string, IconType> = {
  dot: FaCircle,
  dollar: FaDollarSign,
  trophy: FaTrophy,
  shield: FaShieldAlt,
  gavel: FaGavel,
  target: FaBullseye,
}

type StatCardProps = {
  title: string
  icon: string
  value: string
  subtext: string
  className?: string
  typeOf: string
  children?: React.ReactNode // Allow additional content
}

export function StatsCard({ title, icon, value, subtext, className, typeOf, children }: StatCardProps) {
  const IconComponent = iconMap[icon] || null
    return (
      <Card className={cn("w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2 flex flex-col", className)}>
        <CardHeader className="flex-row items-center justify-between p-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {IconComponent && <IconComponent className="text-xs" />}
        </CardHeader>
        <CardContent className="mt-0 p-1 flex flex-start items-center justify-space-between">
          <p className="text-xl font-medium">{value}</p>
          {typeOf === "stat-action" && <button className="text-xs bg-blue-500 text-white p-1 ml-4 rounded">Get More Guaranteed Bids</button>}
        </CardContent>
        <p className="text-xs text-muted-foreground">{subtext}</p>
        {children && <div className="mt-2">{children}</div>}
      </Card>
    )
  }
