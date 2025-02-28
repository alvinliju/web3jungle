import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { CuboidIcon as Cube, ArrowRight, Github, Twitter, DiscIcon as Discord, Heart } from "lucide-react"
import { SparklesCore } from "../../components/sparkles"
import { BackgroundBeams } from "../../components/background-beams"
import { TextGenerateEffect } from "../../components/text-generate-effect"
import { TracingBeam } from "../../components/tracing-beam"
import { MovingBorder } from "../../components/moving-border"

export default function Home() {
  const words =
    "A free, open-source platform to discover, upvote, and launch the most innovative blockchain and Web3 projects."

  return (
    <div className="flex min-h-screen flex-col bg-background/50 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams />
      <div className="absolute inset-0 w-full h-full bg-background/50 backdrop-blur-[1px] z-0" />

      <main className="flex-1 flex items-center justify-center relative z-10">
        <TracingBeam>
          <div className="container px-4 md:px-6 py-10 md:py-14 max-w-5xl relative">
            <div className="absolute inset-0 -z-10">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#7c3aed"
              />
            </div>

            <div className="flex flex-col items-center text-center space-y-12">
              {/* Logo and Badge */}
              <div className="flex flex-col items-center space-y-4 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <div className="relative flex items-center justify-center size-24 rounded-2xl bg-background/80 backdrop-blur-sm border border-primary/20 overflow-hidden group">
                    <Cube className="size-12 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                </div>
                <div className="relative">
                  <MovingBorder duration={4500} rx="25%" ry="25%">
                    <div className="relative px-4 py-1 bg-background border border-primary/20 rounded-full text-sm text-primary backdrop-blur-sm">
                      Coming Soon
                    </div>
                  </MovingBorder>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6 max-w-3xl relative">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none lg:text-7xl">
                  Web3
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/70 to-primary">
                    Hunt
                  </span>
                </h1>
                <div className="mx-auto max-w-[700px] text-muted-foreground relative">
                  <TextGenerateEffect words={words} className="text-xl md:text-2xl/relaxed" />
                </div>
              </div>

              {/* Email Signup */}
              <div className="w-full max-w-md space-y-2 mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500" />
                  <form className="relative flex w-full max-w-md flex-col gap-2 sm:flex-row">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary transition-all duration-300"
                    />
                    <Button className="h-12 px-8 bg-primary hover:bg-primary/80 transition-all duration-300">
                      Notify Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <p className="text-xs text-muted-foreground">
                  Be the first to know when we launch. No spam, just updates.
                </p>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                {[
                  {
                    title: "Community Curated",
                    description: "Projects upvoted by the community",
                    icon: (
                      <svg
                        className="size-5 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 11l7-7 7 7M5 19l7-7 7 7"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Decentralized",
                    description: "No gatekeepers, just community",
                    icon: (
                      <svg
                        className="size-5 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Web3 Native",
                    description: "Built on blockchain technology",
                    icon: <Cube className="size-5 text-primary" />,
                  },
                ].map((feature, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                    <div className="relative flex flex-col items-center space-y-2 p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center space-x-4">
                {[
                  { icon: <Github className="size-5" />, label: "GitHub" },
                  { icon: <Twitter className="size-5" />, label: "Twitter" },
                  { icon: <Discord className="size-5" />, label: "Discord" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="group relative p-2 rounded-full bg-background/80 border border-primary/20 text-muted-foreground hover:text-primary transition-colors duration-500"
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </TracingBeam>
      </main>

      <footer className="w-full py-6 relative z-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created with</span>
            <Heart className="size-4 text-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/e3he0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              e3he0
            </a>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

