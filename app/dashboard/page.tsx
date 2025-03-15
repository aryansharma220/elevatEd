"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllCourses } from "@/lib/course-generator"
import type { CourseData } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()
  const [courses, setCourses] = useState<CourseData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const data = await getAllCourses()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast({
          title: "Error",
          description: "Failed to load your courses. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [toast])

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query)
      }
      return true
    })
    .filter((course) => {
      // Apply difficulty filter
      if (filterDifficulty !== "all") {
        return course.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
      }
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "newest") {
        // In a real app, we'd use createdAt dates
        // For this mock, we'll use the course ID as a proxy for creation time
        return b.id.localeCompare(a.id)
      } else if (sortBy === "oldest") {
        return a.id.localeCompare(b.id)
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title)
      }
      return 0
    })

  const handleDeleteCourse = (courseId: string) => {
    // In a real implementation, this would call an API to delete the course
    setCourses(courses.filter((course) => course.id !== courseId))
    toast({
      title: "Course deleted",
      description: "The course has been successfully deleted.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600 dark:text-purple-400" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Loading your courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Courses</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Manage and access all your AI-generated courses</p>
          </div>

          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                      <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {filteredCourses.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || filterDifficulty !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't created any courses yet"}
                </p>
                <Link href="/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Course
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {course.difficulty}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 h-10">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 flex-grow">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4" />
                        <span>{course.modules.length} Modules</span>
                      </div>
                      <div className="flex items-center">
                        <BookCheck className="mr-1 h-4 w-4" />
                        <span>{course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} Lessons</span>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="pt-4">
                    <div className="flex gap-2 w-full">
                      <Link href={`/course/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/course/${course.id}`} className="flex-1">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Study
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

