"use server"

import { v4 as uuidv4 } from "uuid"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import type { CourseData, CourseGenerationParams, SectionGenerationParams, QuestionParams, Section } from "@/lib/types"

// Initialize the Google Generative AI with your API key
// In a real application, this would be stored in an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY")

// Mock database to store courses
const courseDatabase = new Map<string, CourseData>()

export async function generateCourseSyllabus(params: CourseGenerationParams): Promise<string> {
  const courseId = uuidv4()
  const difficultyMap: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }

  try {
    // Configure the model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    // Create the prompt
    const prompt = `
    You are an expert educational content creator specializing in creating comprehensive, well-structured courses.
    
    Create a comprehensive course on "${params.topic}".
    ${params.description ? `Additional details: ${params.description}` : ""}
    
    The course should be at a ${difficultyMap[params.knowledgeLevel]} level.
    The learning style should be ${params.learningStyle}.
    The pace should be ${params.pace === 1 ? "slow" : params.pace === 2 ? "medium" : "fast"}.
    ${params.includeQuizzes ? "Include quizzes for each section." : "Do not include quizzes."}
    ${params.includeExercises ? "Include practical exercises for each section." : "Do not include exercises."}
    ${params.includeMultimedia ? "Include references to multimedia content." : "Do not include multimedia content."}
    
    The course should have 3-5 modules, each with 2-4 lessons.
    Each lesson should have 2-4 sections.
    
    Provide a detailed structure with module titles, descriptions, lesson titles, and section titles.
    Do not generate the full content for each section yet - just the titles.
    
    Format your response as a JSON object with the following structure:
    {
      "title": "Course Title",
      "description": "Course Description",
      "difficulty": "Difficulty Level",
      "learningStyle": "Learning Style",
      "modules": [
        {
          "title": "Module Title",
          "description": "Module Description",
          "lessons": [
            {
              "title": "Lesson Title",
              "sections": [
                {
                  "title": "Section Title"
                }
              ]
            }
          ]
        }
      ]
    }
    
    Ensure the JSON is valid and properly formatted.
    `

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    // We need to extract the JSON from the text, as Gemini might include additional text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to generate valid course structure")
    }

    const courseStructure = JSON.parse(jsonMatch[0])

    // Create the course object with the generated structure
    const course: CourseData = {
      id: courseId,
      title: courseStructure.title,
      description: courseStructure.description,
      difficulty: courseStructure.difficulty,
      learningStyle: courseStructure.learningStyle,
      modules: courseStructure.modules,
    }

    // Store the course in our database
    courseDatabase.set(courseId, course)

    return courseId
  } catch (error) {
    console.error("Error generating course:", error)
    throw new Error("Failed to generate course. Please try again.")
  }
}

export async function getCourse(courseId: string): Promise<CourseData> {
  const course = courseDatabase.get(courseId)

  if (!course) {
    throw new Error("Course not found")
  }

  return course
}

export async function generateSectionContent(params: SectionGenerationParams): Promise<Section> {
  const { courseId, moduleIndex, lessonIndex, sectionIndex } = params
  const course = courseDatabase.get(courseId)

  if (!course) {
    throw new Error("Course not found")
  }

  const section = course.modules[moduleIndex]?.lessons[lessonIndex]?.sections[sectionIndex]

  if (!section) {
    throw new Error("Section not found")
  }

  try {
    // Configure the model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    // Create the prompt with context about the course
    const prompt = `
    You are an expert educational content creator specializing in creating comprehensive, well-structured course content.
    
    I need detailed content for a section in the following course:
    
    Course: "${course.title}"
    Course Description: "${course.description}"
    Difficulty Level: ${course.difficulty}
    Learning Style: ${course.learningStyle}
    
    Module: "${course.modules[moduleIndex].title}"
    Module Description: "${course.modules[moduleIndex].description}"
    
    Lesson: "${course.modules[moduleIndex].lessons[lessonIndex].title}"
    
    Section: "${section.title}"
    
    Please generate comprehensive content for this section including:
    1. 3-5 paragraphs of explanatory text
    2. Key concepts with explanations
    3. Examples or illustrations where appropriate
    4. Code snippets if relevant to the topic
    5. 3-5 key takeaways
    
    If appropriate, also include:
    - A quiz question with 4 options, the correct answer (indicated by letter A, B, C, or D), and an explanation
    - A practical exercise with steps to complete
    
    Format the content to be engaging, educational, and appropriate for the specified difficulty level and learning style.
    
    Use Markdown formatting for structure:
    - Use # for headings
    - Use ``\` for code blocks
    - Use - or * for lists
    - Clearly label sections like "Key Takeaways", "Quiz", and "Exercise"
    `

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Process the generated text to extract structured content
    const sectionContent = processSectionContent(text)

    // Create the updated section with content
    const updatedSection: Section = {
      ...section,
      ...sectionContent,
    }

    // Update the course in our database
    const updatedCourse = { ...course }
    updatedCourse.modules[moduleIndex].lessons[lessonIndex].sections[sectionIndex] = updatedSection
    courseDatabase.set(courseId, updatedCourse)

    return updatedSection
  } catch (error) {
    console.error("Error generating section content:", error)
    throw new Error("Failed to generate section content. Please try again.")
  }
}

// Helper function to process the generated text into structured content
function processSectionContent(text: string): Partial<Section> {
  // This is a simplified version - in a real implementation, you would parse the text more carefully
  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0)

  // Extract content items
  const contentItems = paragraphs.map((p) => {
    if (p.startsWith("# ") || p.startsWith("## ")) {
      return { type: "heading", content: p.replace(/^#+ /, "") }
    } else if (p.includes("```")) {
      const codeMatch = p.match(/```(\w+)?\n([\s\S]+?)```/)
      if (codeMatch) {
        return {
          type: "code",
          language: codeMatch[1] || "text",
          content: codeMatch[2].trim(),
        }
      }
    } else if (p.startsWith("- ") || p.startsWith("* ")) {
      const items = p
        .split("\n")
        .map((item) => item.replace(/^[- *] /, ""))
        .filter((item) => item.trim().length > 0)
      return { type: "list", items }
    } else if (p.toLowerCase().includes("note:") || p.toLowerCase().includes("tip:")) {
      return { type: "note", content: p }
    }

    return { type: "text", content: p }
  })

  // Extract key takeaways
  const keyTakeaways: string[] = []
  const takeawayIndex = text.toLowerCase().indexOf("key takeaway")
  if (takeawayIndex !== -1) {
    const takeawaySection = text.substring(takeawayIndex)
    const takeawayLines = takeawaySection
      .split("\n")
      .filter((line) => line.trim().startsWith("- ") || line.trim().startsWith("* "))
    takeawayLines.forEach((line) => {
      keyTakeaways.push(line.replace(/^[- *] /, "").trim())
    })
  }

  // Extract quiz if present
  let quiz = undefined
  const quizIndex = text.toLowerCase().indexOf("quiz")
  if (quizIndex !== -1) {
    const quizSection = text.substring(quizIndex)
    const questionMatch = quizSection.match(/quiz[:\s]+(.*?)\n/i)
    const optionsMatch = quizSection.match(/([A-D]\.[\s\S]+?)(?=[A-D]\.|correct answer|$)/gi)
    const correctAnswerMatch = quizSection.match(/correct answer[:\s]+([A-D])/i)
    const explanationMatch = quizSection.match(/explanation[:\s]+([\s\S]+?)(?=\n\n|$)/i)

    if (questionMatch && optionsMatch && correctAnswerMatch) {
      const question = questionMatch[1].trim()
      const options = optionsMatch.map((opt) => opt.replace(/^[A-D]\.\s*/, "").trim())
      const correctAnswerLetter = correctAnswerMatch[1]
      const correctAnswer = "ABCD".indexOf(correctAnswerLetter)
      const explanation = explanationMatch ? explanationMatch[1].trim() : "Explanation not provided."

      quiz = {
        id: uuidv4(),
        question,
        options,
        correctAnswer,
        explanation,
      }
    }
  }

  // Extract exercise if present
  let exercise = undefined
  const exerciseIndex = text.toLowerCase().indexOf("exercise")
  if (exerciseIndex !== -1) {
    const exerciseSection = text.substring(exerciseIndex)
    const descriptionMatch = exerciseSection.match(/exercise[:\s]+(.*?)\n/i)
    const stepsMatch = exerciseSection.match(/steps?[:\s]+([\s\S]+?)(?=\n\n|$)/i)

    if (descriptionMatch) {
      const description = descriptionMatch[1].trim()
      let steps: string[] = []

      if (stepsMatch) {
        steps = stepsMatch[1]
          .split("\n")
          .filter((line) => line.trim().startsWith("- ") || line.trim().startsWith("* ") || line.trim().match(/^\d+\./))
          .map((line) => line.replace(/^[- *\d.]+\s*/, "").trim())
      }

      exercise = {
        description,
        steps: steps.length > 0 ? steps : undefined,
      }
    }
  }

  return {
    content: contentItems,
    keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
    quiz,
    exercise,
  }
}

export async function askQuestion(params: QuestionParams): Promise<string> {
  const { courseId, moduleIndex, lessonIndex, sectionIndex, question } = params
  const course = courseDatabase.get(courseId)

  if (!course) {
    throw new Error("Course not found")
  }

  const section = course.modules[moduleIndex]?.lessons[lessonIndex]?.sections[sectionIndex]

  if (!section) {
    throw new Error("Section not found")
  }

  try {
    // Configure the model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    // Create the context from the course and section
    let context = `
    Course: "${course.title}"
    Course Description: "${course.description}"
    Difficulty Level: ${course.difficulty}
    
    Module: "${course.modules[moduleIndex].title}"
    Module Description: "${course.modules[moduleIndex].description}"
    
    Lesson: "${course.modules[moduleIndex].lessons[lessonIndex].title}"
    
    Section: "${section.title}"
    `

    // Add section content if available
    if (section.content) {
      context += "\n\nSection Content:\n"
      section.content.forEach((item) => {
        if (item.type === "text" || item.type === "heading" || item.type === "note") {
          context += item.content + "\n\n"
        } else if (item.type === "list" && item.items) {
          item.items.forEach((listItem) => {
            context += "- " + listItem + "\n"
          })
          context += "\n"
        }
      })
    }

    // Add key takeaways if available
    if (section.keyTakeaways) {
      context += "\nKey Takeaways:\n"
      section.keyTakeaways.forEach((takeaway) => {
        context += "- " + takeaway + "\n"
      })
    }

    // Create the prompt with the question
    const prompt = `
    You are an expert educational AI assistant helping a student understand course material.
    Your task is to answer their question about a specific section of a course.
    Provide clear, accurate, and helpful explanations that enhance their understanding.
    
    Based on the following course section:
    
    ${context}
    
    Please answer this question:
    ${question}
    
    Provide a thorough explanation that helps the student understand the concept better.
    `

    // Generate the answer
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error answering question:", error)
    throw new Error("Failed to answer question. Please try again.")
  }
}

export async function getAllCourses(): Promise<CourseData[]> {
  // Return all courses from our mock database
  return Array.from(courseDatabase.values())
}

// Add some sample courses to the database for testing
function addSampleCourses() {
  // Only add sample courses if the database is empty
  if (courseDatabase.size === 0) {
    const sampleCourses = [
      {
        id: uuidv4(),
        title: "Introduction to Machine Learning",
        description: "A comprehensive course on the fundamentals of machine learning algorithms and applications.",
        difficulty: "Intermediate",
        learningStyle: "visual",
        modules: [
          {
            title: "Fundamentals of Machine Learning",
            description: "An overview of machine learning concepts and terminology",
            lessons: [
              {
                title: "What is Machine Learning?",
                sections: [
                  { title: "Definition and Types of Machine Learning" },
                  { title: "History and Evolution of Machine Learning" },
                  { title: "Applications in the Real World" },
                ],
              },
              {
                title: "Machine Learning Workflow",
                sections: [
                  { title: "Data Collection and Preparation" },
                  { title: "Model Selection and Training" },
                  { title: "Evaluation and Deployment" },
                ],
              },
            ],
          },
          {
            title: "Supervised Learning Algorithms",
            description: "Exploring algorithms that learn from labeled data",
            lessons: [
              {
                title: "Linear Regression",
                sections: [
                  { title: "Simple Linear Regression" },
                  { title: "Multiple Linear Regression" },
                  { title: "Regularization Techniques" },
                ],
              },
              {
                title: "Classification Algorithms",
                sections: [
                  { title: "Logistic Regression" },
                  { title: "Decision Trees" },
                  { title: "Support Vector Machines" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Web Development with React",
        description: "Learn to build modern, interactive web applications using React and related technologies.",
        difficulty: "Beginner",
        learningStyle: "practical",
        modules: [
          {
            title: "React Fundamentals",
            description: "Core concepts and building blocks of React applications",
            lessons: [
              {
                title: "Introduction to React",
                sections: [
                  { title: "What is React and Why Use It?" },
                  { title: "Setting Up Your Development Environment" },
                  { title: "Creating Your First React App" },
                ],
              },
              {
                title: "Components and Props",
                sections: [
                  { title: "Functional vs Class Components" },
                  { title: "Component Composition" },
                  { title: "Working with Props" },
                ],
              },
            ],
          },
          {
            title: "State Management",
            description: "Managing application state in React",
            lessons: [
              {
                title: "React State and Lifecycle",
                sections: [
                  { title: "Understanding Component State" },
                  { title: "Using useState Hook" },
                  { title: "Component Lifecycle Methods" },
                ],
              },
              {
                title: "Context API and Redux",
                sections: [
                  { title: "React Context for State Management" },
                  { title: "Introduction to Redux" },
                  { title: "Implementing Redux in React Applications" },
                ],
              },
            ],
          },
        ],
      },
    ]

    sampleCourses.forEach((course) => {
      courseDatabase.set(course.id, course)
    })
  }
}

// Add sample courses when the module is imported
addSampleCourses()

