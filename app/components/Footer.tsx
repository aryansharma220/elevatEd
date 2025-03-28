import Link from "next/link"
import { BookOpen, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Copy the footer content from the landing page */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-xl font-bold text-white">ElevatEd</span>
            </div>
            <p className="mb-4 text-slate-400">AI-powered learning platform that adapts to your unique needs and learning style.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* ... Rest of the footer columns ... */}
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ElevatEd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Powered by</span>
              <span className="text-white font-medium">Google Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
