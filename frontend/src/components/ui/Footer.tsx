import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Web3Jungle. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-zinc-400 hover:text-emerald-400 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-emerald-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

