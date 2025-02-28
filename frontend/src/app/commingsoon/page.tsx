import { Mail, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
              Web3Jungle
            </h1>
            <p className="text-xl text-zinc-400">
              Discover and upvote the best decentralized projects in the Web3
              ecosystem
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          <div className="space-y-4">
            <p className="text-zinc-400">
              We're building the ultimate discovery platform for Web3 projects.
              Be the first to know when we launch.
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-900 border-zinc-800"
                required
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Notify Me
              </Button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://x.com/e3he0?s=21"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://github.com/alvinliju/web3jungle"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="mailto:info@web3jungle.com"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </main>

      <footer className="py-6 border-t border-zinc-800">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Web3Jungle. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
