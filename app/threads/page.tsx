"use client"

import { ThreadComponent } from "@/components/thread/ThreadComponent"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function ThreadsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Basic navbar for the threads page */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">CourseGemini</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-1 pt-20">
        <ThreadComponent />
      </main>
    </div>
  )
}
