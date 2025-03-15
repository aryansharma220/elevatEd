import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"

// Define the schema for course generation
const courseGenerationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  learningObjectives: z.array(z.string()).min(1, "At least one learning objective is required"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedDuration: z.string().optional(),
  includeAssessments: z.boolean().default(false),
  includeResources: z.boolean().default(false),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = courseGenerationSchema.parse(body)

    const apiKey = req.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 401 })
    }

    // Create a structured prompt for the AI
    const prompt = `
      Generate a detailed course outline for a course with the following details:
      
      Title: ${validatedData.title}
      Description: ${validatedData.description || "No description provided"}
      Difficulty Level: ${validatedData.difficulty}
      Estimated Duration: ${validatedData.estimatedDuration || "Not specified"}
      
      Topics to Cover:
      ${validatedData.topics.map((topic) => `- ${topic}`).join("\n")}
      
      Learning Objectives:
      ${validatedData.learningObjectives.map((objective) => `- ${objective}`).join("\n")}
      
      ${validatedData.includeAssessments ? "Include assessments and quizzes for each module." : ""}
      ${validatedData.includeResources ? "Include recommended resources and references for each module." : ""}
      
      Format the course outline with:
      1. A clear structure with modules and lessons
      2. Brief descriptions for each module
      3. Detailed lesson content with key points
      4. Estimated time for each module
      ${validatedData.includeAssessments ? "5. Assessment questions for each module" : ""}
      ${validatedData.includeResources ? "6. Recommended resources for further learning" : ""}
      
      Return the response as a structured JSON object with the following format:
      {
        "title": "Course Title",
        "description": "Course Description",
        "difficulty": "Difficulty Level",
        "estimatedDuration": "Total Duration",
        "modules": [
          {
            "title": "Module Title",
            "description": "Module Description",
            "estimatedDuration": "Module Duration",
            "lessons": [
              {
                "title": "Lesson Title",
                "content": ["Key point 1", "Key point 2", ...],
                "estimatedDuration": "Lesson Duration"
              }
            ],
            "assessments": [
              {
                "question": "Assessment Question",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "correctAnswer": 0
              }
            ],
            "resources": [
              {
                "title": "Resource Title",
                "type": "article|video|book|website",
                "url": "URL if applicable"
              }
            ]
          }
        ]
      }
    `

    // Generate the course outline using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey }),
      prompt,
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the JSON response
    const courseOutline = JSON.parse(text)

    // Add a unique ID to the course
    const courseWithId = {
      id: uuidv4(),
      ...courseOutline,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(courseWithId)
  } catch (error) {
    console.error("Error generating course:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 })
  }
}

