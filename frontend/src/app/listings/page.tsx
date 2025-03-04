"use client"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getAllProjects } from "@/lib/contract"
import { useEffect, useMemo, useState } from "react"

const CATEGORY_OPTIONS = ["DeFi", "NFT", "DAO", "Gaming", "Social"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const fetchProjects = async () => {
        try{
            console.log('fetching projects')
            const projectsData = await getAllProjects();
            setProjects(projectsData.filter(p => p.id !== 0)); 
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        fetchProjects()
    }, [])


    //projects serching 
    const filterByKeyword = useMemo(()=>{
      return projects.filter((project: any)=>{
        return project.metadata?.name?.toLowerCase().includes(query.toLowerCase())
      })
    }, [projects, query])



  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore Web3 Projects</h1>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-grow">
            <Input onChange={(e)=> setQuery(e.target.value)} type="search" placeholder="Search projects..." className="bg-zinc-900 border-zinc-800 pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Filter</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterByKeyword.length>0 ? filterByKeyword
          .filter(project => project.id !== 0 && project.metadata)
          .map((project) => (
            <ProjectCard
            key={project.id}
            id={project.id}
            projectImageurl={project.metadata.imageUrl}
            name={project.metadata.name}
            description={project.metadata.description}
            link={project.metadata.link} 
            category={project.metadata.category}
            votes={project.upvotes}
          />
          ))
        : projects.filter(project => project.id !== 0 && project.metadata)
        .map((project) => (
          <ProjectCard
          key={project.id}
          id={project.id}
          projectImageurl={project.metadata.imageUrl}
          name={project.metadata.name}
          description={project.metadata.description}
          link={project.metadata.link} 
          category={project.metadata.category}
          votes={project.upvotes}
        />
        ))
        }
        </div>
      </main>

      <Footer />
    </div>
  )
}

