import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { upVote } from "@/lib/contract";
import { ArrowUpRight } from "lucide-react"
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import {toast} from "sonner"
import Link from "next/link";



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
  const[vote, setVote] = useState(votes);
  const handleSubmit = async (id:number) => {
    setVote(prev => prev+1)
    try{
      console.log(id)
      const tx = await upVote(id);
      await tx.wait()
    }catch(e){
      toast.error('already voted')
      setVote((prev) => prev - 1)
    }

  }
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
      <CardFooter className="flex  justify-between items-center">
      <div className="text-sm text-zinc-500">{vote} votes</div>
        <div className="flex  gap-6 items-center">
        <p onClick={()=>handleSubmit(id)}  className="text-green-500 text-sm bg-slate-950 px-4 py-2 rounded-4xl hover:cursor-pointer hover:bg-slate-900"><BiSolidLike /> </p>
        <Button  size="sm" className="text-emerald-400 hover:text-emerald-300 bg-slate-950 hover:cursor-pointer">
          <Link href={`${link}` }target="_blank " rel="noopener noreferrer" className="flex items-center "> View <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
        </Button>
        </div>
        
       
      </CardFooter>
    </Card>
  )
}

