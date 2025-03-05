"use client"

import { Navbar } from "@/components/ui/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Shield, Compass } from "lucide-react"
import Link from "next/link"

// Developer's Note Component
function DeveloperNote() {
  return (
    <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10 mt-12">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Developer's Note</h2>
        <p className="text-gray-300">
          This site is just a proof-of-concept—the simplest implementation of a decentralized public web3 projects
          directory. I built this while learning Solidity and Next.js because I had this crazy idea.
        </p>
        <p className="text-gray-300 mt-4">
          I truly believe that Web3 is the future and see this as my first step toward building something great.
          As I continue learning, I'll be adding more features. Even if this site might not get much traction,
          it serves as a personal testimonial that if you have an idea, you can break it down and build it from scratch.
          Everything here is based on first-principle thinking—no optimization or best practices have been applied.
        </p>
        <p className="text-gray-300 mt-4">
          With love, <a href="https://twitter.com/e3he0" className="text-emerald-400">@e3he0</a>
        </p>
      </CardContent>
    </Card>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="text-center mb-12 mt-12">
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-4">
        About Our Platform
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        A decentralized hub for discovering and sharing innovative web3 projects.
      </p>
    </div>
  )
}

// Cards Section Component
function CardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Decentralization */}
      <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10 text-white">
        <CardHeader className="flex flex-col items-center text-center">
          <Globe className="h-8 w-8 text-emerald-400 mb-2" />
          <CardTitle className="text-xl font-bold">Decentralization</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400">
            We believe in systems that distribute power among many, not the few.
          </p>
        </CardContent>
      </Card>

      {/* Anti-Censorship */}
      <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10 text-white">
        <CardHeader className="flex flex-col items-center text-center">
          <Shield className="h-8 w-8 text-emerald-400 mb-2" />
          <CardTitle className="text-xl font-bold">No Censorship</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400">
            We support the free exchange of ideas without arbitrary restrictions.
          </p>
        </CardContent>
      </Card>

      {/* Project Discovery */}
      <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10 text-white">
        <CardHeader className="flex flex-col items-center text-center">
          <Compass className="h-8 w-8 text-emerald-400 mb-2" />
          <CardTitle className="text-xl font-bold">Project Discovery</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400">
            We showcase innovative web3 projects pushing the boundaries of what's possible.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Mission Statement Component
function MissionSection() {
  return (
    <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10 mb-12">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Our Mission</h2>
        <p className="text-gray-300">
          We're building a platform where decentralized innovation thrives. Our goal is to connect builders and
          users in the web3 ecosystem, making it easy to discover projects that are shaping the future of the
          internet.
        </p>
        <p className="text-gray-300 mt-4">
          Whether you're looking for the next groundbreaking DeFi protocol, an innovative NFT project, or a DAO
          that's changing how we collaborate, you'll find it here - free from censorship and central control.
        </p>
      </CardContent>
    </Card>
  )
}

// Call-to-Action Component
function CTASection() {
  return (
    <Card className="border border-gray-800 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 backdrop-blur-sm">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to explore?</h2>
          <p className="text-gray-300">Discover projects or share your own with our community.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white"
          >
            <Link href="/listings">Explore Projects</Link>
          </Button>
          <Button asChild variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
            <Link href="/submit">Submit Project</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <DeveloperNote />
        <HeroSection />
        <CardsSection />
        <MissionSection />
        <CTASection />
      </div>
    </div>
  )
}
