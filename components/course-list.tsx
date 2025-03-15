"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { BookOpen, Plus, Clock, Loader2 } from "lucide-react"
import { getAllCourses } from "@/lib/course-generator"
import type { CourseData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const formatLastAccessed = (date: string) => {
  if (!date) return "Never accessed";
  return `Last accessed ${new Date(date).toLocaleDateString()}`;
};

const formatDuration = (duration: string) => {
  if (!duration) return "0h 0m";
  return duration;
};

interface CourseListProps {
  view: "grid" | "list"
}

export function CourseList({ view }: CourseListProps) {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesData = await getAllCourses()
        setCourses(coursesData)
      } catch (err) {
        setError('Failed to load courses')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <div className="max-w-sm mx-auto">
            <p className="text-red-500 mb-4">{error}</p>
            <Link href="/create">
              <Button>Create New Course</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Link href="/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="max-w-sm mx-auto">
            <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses yet</h3>
            <p className="text-slate-500 mb-4">
              Create your first AI-generated course to get started.
            </p>
            <Link href="/create">
              <Button>Create Course</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className={cn(
          "grid gap-6 max-w-[1200px] mx-auto",
          view === "grid" ? "grid-cols-1" : "grid-cols-1"
        )}>
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={cn(
                "group border-2 hover:border-purple-500/50 dark:hover:border-purple-400/50",
                "bg-white dark:bg-slate-900",
                "hover:shadow-xl hover:shadow-purple-500/10",
                "transition-all duration-300 ease-in-out",
                "min-h-[200px]"
              )}
            >
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className={cn(
                      "text-xl font-bold",
                      "group-hover:text-purple-600 dark:group-hover:text-purple-400",
                      "transition-colors duration-300"
                    )}>
                      {course.title}
                    </CardTitle>
                    <Badge variant={course.status === "completed" ? "success" : "default"}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatLastAccessed(course.lastAccessed || '')}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDuration(course.duration || '')}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {course.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      "bg-gradient-to-r from-purple-500 to-blue-500",
                      "transition-all duration-300 ease-in-out"
                    )}
                    style={{ width: `${course.progress || 0}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-muted-foreground font-medium">
                    {course.progress || 0}% Complete
                  </span>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg" 
                  variant="default"
                >
                  Continue Learning
                </Button>
                <Button 
                  className="w-full hover:bg-slate-100 dark:hover:bg-slate-800" 
                  variant="outline"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
