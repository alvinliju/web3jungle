import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  id: number
  projectImageurl:string
  name: string
  description: string
  link: string
  category: string
  votes: number
}

export function ProjectCard({id,projectImageurl,link, name, description, category, votes }: ProjectCardProps) {
  return (
    <Card key={id} className="bg-zinc-900 border-zinc-800 hover:border-emerald-800 transition-all">
      <CardHeader>
        <img src={projectImageurl} alt={name} className="w-full h-32 object-cover rounded-lg" />
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white">{name}</CardTitle>
          <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-400 hover:cursor-pointer">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-zinc-500">{votes} votes</div>
        <Button  size="sm" className="text-emerald-400 hover:text-emerald-300 bg-slate-950 hover:cursor-pointer">
          <a href={link} target="_blank " rel="noopener noreferrer" className="flex items-center "> View <ArrowUpRight className="ml-2 h-4 w-4" /></a>
        </Button>
      </CardFooter>
    </Card>
  )
}

