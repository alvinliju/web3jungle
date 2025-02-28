import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  name: string
  description: string
  category: string
  votes: number
}

export function ProjectCard({ name, description, category, votes }: ProjectCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-emerald-800 transition-all">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-400">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-zinc-500">{votes} votes</div>
        <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
          View <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

