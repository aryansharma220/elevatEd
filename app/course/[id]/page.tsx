import { Suspense } from "react"
import { getCourse } from "@/lib/course-generator"
import CourseClient from "./course-client"
import { Loader2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function CourseContent({ id }: { id: string }) {
  try {
    const courseData = await getCourse(id)
    return <CourseClient courseData={courseData} />
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Course Not Found</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            We couldn't find the course you're looking for. It may have been deleted or the link is incorrect.
          </p>
          <Link href="/dashboard">
            <Button variant="default">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600 dark:text-purple-400" />
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Loading your course...</p>
          </div>
        </div>
      }
    >
      <CourseContent id={params.id} />
    </Suspense>
  )
}

