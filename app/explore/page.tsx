"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BookOpen,
  Brain,
  Clock,
  Filter,
  Search,
  Star,
  Users,
  ChevronDown,
  Flame,
  LayoutGrid,
  List,
  SlidersHorizontal,
  TrendingUp,
  ChartBar,
  Shield,
  Crown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)

  const stats = [
    { label: "Active Courses", value: "200+", icon: BookOpen },
    { label: "Total Students", value: "50,000+", icon: Users },
    { label: "Course Completion", value: "92%", icon: ChartBar },
    { label: "Expert Instructors", value: "50+", icon: Shield },
  ]

  const courses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning algorithms and their applications",
      category: "AI & ML",
      level: "Beginner",
      duration: "8 hours",
      students: 1234,
      rating: 4.8,
      popular: true,
      trending: true,
      instructor: "Dr. Sarah Miller",
      updatedAt: "2024-02-15",
      topics: ["Neural Networks", "Supervised Learning", "Model Training"],
    },
    {
      id: 2,
      title: "Web Development with React",
      description: "Master modern web development using React and Next.js",
      category: "Programming",
      level: "Intermediate",
      duration: "12 hours",
      students: 2156,
      rating: 4.9,
      popular: true,
      trending: false,
      instructor: "John Smith",
      updatedAt: "2024-02-10",
      topics: ["React", "Next.js", "JavaScript"],
    },
    {
      id: 3,
      title: "Data Science and Analytics",
      description: "Comprehensive guide to data analysis, visualization, and statistical modeling",
      category: "Data Science",
      level: "Advanced",
      duration: "15 hours",
      students: 3421,
      rating: 4.7,
      popular: true,
      trending: true,
      instructor: "Alex Johnson",
      updatedAt: "2024-02-14",
      topics: ["Python", "Statistics", "Data Visualization"],
      progress: 0.65,
      certified: true,
    },
    // Add more course objects here
  ]

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const sortCourses = (courses: typeof courses) => {
    switch (sortBy) {
      case "popular":
        return [...courses].sort((a, b) => b.students - a.students)
      case "rating":
        return [...courses].sort((a, b) => b.rating - a.rating)
      case "newest":
        return [...courses].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      default:
        return courses
    }
  }

  const filteredCourses = sortCourses(
    courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      {/* Stats Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <stat.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Explore Courses
            </h1>
            <div className="flex gap-2">
              {courses.some(c => c.trending) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  <Flame className="w-3 h-3 mr-1" />
                  Trending
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                New Courses
              </span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Discover AI-generated courses on various topics
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="sticky top-16 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="AI & ML">AI & ML</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px]">
                  <Brain className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[140px]">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    {sortBy === "popular" ? "Popular" : 
                     sortBy === "rating" ? "Top Rated" : "Newest"}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Top Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Newest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="border-l pl-4 flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse p-6"
              >
                <div className="space-y-3">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 dark:hover:border-purple-800"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left transition-transform duration-300" 
                  style={{ transform: `scaleX(${course.progress || 0})` }} 
                />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {course.trending && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            <Flame className="w-3 h-3 mr-1" />
                            Trending
                          </span>
                        )}
                        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        by {course.instructor}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <BookOpen className="h-5 w-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </Button>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Add certification badge if course is certified */}
                  {course.certified && (
                    <div className="absolute top-4 right-4">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                  )}

                  {/* Progress indicator */}
                  {course.progress > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {Math.round(course.progress * 100)}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {course.rating}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all"
                    >
                      View Course
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
