import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Dummy data for Web3 dapps
const projects = [
  {
    name: "DecentraLend",
    description: "Decentralized lending protocol with AI-driven risk assessment",
    category: "DeFi",
    votes: 1420,
  },
  { name: "NFT Realms", description: "Virtual real estate marketplace powered by NFTs", category: "NFT", votes: 980 },
  {
    name: "ChainGov",
    description: "DAO toolkit for decentralized governance and voting",
    category: "DAO",
    votes: 1150,
  },
  { name: "CryptoSwap", description: "Cross-chain DEX with liquidity aggregation", category: "DEX", votes: 2100 },
  { name: "MetaVerse Builders", description: "No-code metaverse creation platform", category: "Metaverse", votes: 760 },
  {
    name: "DeCloud",
    description: "Decentralized cloud computing and storage solution",
    category: "Infrastructure",
    votes: 1890,
  },
  {
    name: "TokenLaunch",
    description: "Fair and transparent token launch platform",
    category: "Launchpad",
    votes: 1340,
  },
  {
    name: "CryptoSocial",
    description: "Decentralized social media with token incentives",
    category: "Social",
    votes: 950,
  },
  { name: "AI Oracle", description: "Decentralized AI-powered oracle network", category: "Oracle", votes: 1670 },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore Web3 Projects</h1>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-grow">
            <Input type="search" placeholder="Search projects..." className="bg-zinc-900 border-zinc-800 pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Filter</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

