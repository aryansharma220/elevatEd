import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen className="h-6 w-6 text-purple-400 mr-2" />
            <span className="text-xl font-bold text-white">elevatEd</span>
          </div>
          
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap gap-6">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </nav>

          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Powered by</span>
            <span className="text-white font-medium">Google Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
