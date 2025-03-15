"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CourseGeneratorFormProps {
  apiKey: string
  onCourseGenerated: (course: any) => void
}

export function CourseGeneratorForm({ apiKey, onCourseGenerated }: CourseGeneratorFormProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("intermediate")
  const [estimatedDuration, setEstimatedDuration] = useState("4 weeks")
  const [topics, setTopics] = useState<string[]>([])
  const [currentTopic, setCurrentTopic] = useState("")
  const [learningObjectives, setLearningObjectives] = useState<string[]>([])
  const [currentObjective, setCurrentObjective] = useState("")
  const [includeAssessments, setIncludeAssessments] = useState(true)
  const [includeResources, setIncludeResources] = useState(true)

  const handleAddTopic = () => {
    if (currentTopic.trim()) {
      setTopics([...topics, currentTopic.trim()])
      setCurrentTopic("")
    }
  }

  const handleRemoveTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  const handleAddObjective = () => {
    if (currentObjective.trim()) {
      setLearningObjectives([...learningObjectives, currentObjective.trim()])
      setCurrentObjective("")
    }
  }

  const handleRemoveObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!title.trim()) {
      setError("Course title is required")
      return
    }

    if (topics.length === 0) {
      setError("At least one topic is required")
      return
    }

    if (learningObjectives.length === 0) {
      setError("At least one learning objective is required")
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          title,
          description,
          topics,
          learningObjectives,
          difficulty,
          estimatedDuration,
          includeAssessments,
          includeResources,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to generate course")
      }

      const courseData = await response.json()

      toast({
        title: "Course generated successfully",
        description: "Your course outline has been created.",
      })

      onCourseGenerated(courseData)
    } catch (err) {
      console.error("Error generating course:", err)
      setError(err instanceof Error ? err.message : "Failed to generate course")

      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to generate course",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Course Outline</CardTitle>
        <CardDescription>Fill in the details below to generate a structured course outline.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Machine Learning"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <RadioGroup
                  id="difficulty"
                  value={difficulty}
                  onValueChange={setDifficulty}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="cursor-pointer">
                      Beginner
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="cursor-pointer">
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="cursor-pointer">
                      Advanced
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Select value={estimatedDuration} onValueChange={setEstimatedDuration}>
                  <SelectTrigger id="estimatedDuration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="4 weeks">4 weeks</SelectItem>
                    <SelectItem value="8 weeks">8 weeks</SelectItem>
                    <SelectItem value="12 weeks">12 weeks</SelectItem>
                    <SelectItem value="16 weeks">16 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topics">Topics to Cover</Label>
              <div className="flex space-x-2">
                <Input
                  id="topics"
                  placeholder="Add a topic"
                  value={currentTopic}
                  onChange={(e) => setCurrentTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTopic()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTopic} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {topic}
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(index)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {topics.length === 0 && <p className="text-sm text-muted-foreground">No topics added yet</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">Learning Objectives</Label>
              <div className="flex space-x-2">
                <Input
                  id="objectives"
                  placeholder="Add a learning objective"
                  value={currentObjective}
                  onChange={(e) => setCurrentObjective(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddObjective()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddObjective} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {learningObjectives.map((objective, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {objective}
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(index)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {learningObjectives.length === 0 && (
                  <p className="text-sm text-muted-foreground">No learning objectives added yet</p>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeAssessments" className="cursor-pointer">
                  Include Assessments & Quizzes
                </Label>
                <Switch id="includeAssessments" checked={includeAssessments} onCheckedChange={setIncludeAssessments} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="includeResources" className="cursor-pointer">
                  Include Resources & References
                </Label>
                <Switch id="includeResources" checked={includeResources} onCheckedChange={setIncludeResources} />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Course...
              </>
            ) : (
              "Generate Course Outline"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

