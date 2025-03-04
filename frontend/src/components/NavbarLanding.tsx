import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function NavbarLanding() {
  return (
    <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Web3Jungle
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#discover" className="text-zinc-400 hover:text-white transition-colors">
                Discover
              </Link>
              <Link href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors">
                How It Works
              </Link>
            </div>
            <div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/listings">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
  )
}
