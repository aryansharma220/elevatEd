import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LayoutDashboard, Plus } from "lucide-react"

export function NavHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">CourseGemini</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New Course</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

