import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text"
          >
            Web3Jungle
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              Submit
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              About
            </Link>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Connect Wallet</Button>
        </nav>
      </div>
    </header>
  )
}

