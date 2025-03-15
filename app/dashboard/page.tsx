"use client"

import { useState, useEffect, Suspense } from "react"
import { useToast } from "@/hooks/use-toast"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Eye,
  Loader2,
  GraduationCap,
  BookCheck,
  BarChart,
  Clock,
  Users,
  Trophy,
  LayoutGrid,
  List
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllCourses } from "@/lib/course-generator"
import type { CourseData } from "@/lib/types"
import { NavHeader } from "@/components/nav-header"
import { CourseList } from "@/components/course-list"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <NavHeader />
      
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              My Learning Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Continue your learning journey
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Course
              </Button>
            </Link>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search courses..." 
                className="w-full pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={view === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setView("grid")}
              className="transition-colors"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setView("list")}
              className="transition-colors"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["All", "Recently Accessed", "In Progress", "Completed"].map((filter) => (
            <Badge 
              key={filter}
              variant={activeFilter === filter.toLowerCase() ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors whitespace-nowrap",
                activeFilter === filter.toLowerCase() 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "hover:bg-slate-100"
              )}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Course List Section */}
        <div className="rounded-xl border bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <Suspense
              fallback={
                <div className={cn(
                  "gap-8",
                  view === "grid" 
                    ? "grid grid-cols-1 lg:grid-cols-1" 
                    : "flex flex-col"
                )}>
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-2">
                      <CardHeader>
                        <div className="space-y-2">
                          <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                          <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                          <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              }
            >
              <div className={cn(
                "gap-8",
                view === "grid" 
                  ? "grid grid-cols-1 lg:grid-cols-1" 
                  : "flex flex-col"
              )}>
                <CourseList view={view} />
              </div>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

