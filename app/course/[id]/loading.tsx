import { Loader2, BookOpen, FileText, BookCheck, Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { NavHeader } from "@/components/nav-header"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <NavHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <Skeleton className="h-8 w-72 mb-2" />
                  <Skeleton className="h-4 w-96" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-10 w-36" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {[BookOpen, FileText, BookCheck, Brain].map((Icon, i) => (
                  <div key={i} className="flex items-center">
                    <Icon className="mr-1 h-4 w-4 text-slate-300" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-4 h-full">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <div className="pl-4 space-y-2">
                        {[1, 2].map((j) => (
                          <Skeleton key={j} className="h-8 w-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-8 w-96 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>

                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-8 w-24 flex-shrink-0" />
                    ))}
                  </div>

                  <div className="py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600 dark:text-purple-400 mb-4" />
                    <p className="text-slate-600 dark:text-slate-300">Loading course content...</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
