"use server"

import { v4 as uuidv4 } from "uuid"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import type { CourseData, CourseGenerationParams, SectionGenerationParams, QuestionParams, Section } from "@/lib/types"

// Initialize the Google Generative AI with your API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

// Create a more persistent storage solution using global scope
let globalCourseDatabase: Map<string, CourseData>;

// Initialize the database if it doesn't exist
if (typeof global.courseDatabase === 'undefined') {
  global.courseDatabase = new Map<string, CourseData>();
  globalCourseDatabase = global.courseDatabase;
} else {
  globalCourseDatabase = global.courseDatabase;
}

export async function generateCourseSyllabus(params: CourseGenerationParams): Promise<string> {
  const courseId = uuidv4()
  const difficultyMap: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }

  try {
    // Configure the model with safety settings
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // Updated model name
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

    // Create a more structured prompt for better results
    const prompt = `
    You are an expert educational content creator. Create a detailed course outline in JSON format.
    
    Topic: "${params.topic}"
    ${params.description ? `Additional Context: ${params.description}` : ''}
    Level: ${difficultyMap[params.knowledgeLevel]}
    Learning Style: ${params.learningStyle}
    Pace: ${params.pace === 1 ? "Slower" : params.pace === 2 ? "Moderate" : "Faster"}
    
    Include:
    - 3-5 modules with clear objectives
    - 2-4 lessons per module
    - 2-4 sections per lesson
    ${params.includeQuizzes ? "- Quiz sections for assessment" : ""}
    ${params.includeExercises ? "- Practical exercises" : ""}
    ${params.includeMultimedia ? "- References to multimedia content" : ""}
    
    Return ONLY the following JSON structure:
    {
      "title": "Course Title",
      "description": "Comprehensive course description",
      "difficulty": "${difficultyMap[params.knowledgeLevel]}",
      "learningStyle": "${params.learningStyle}",
      "modules": [
        {
          "title": "Module Title",
          "description": "Module description",
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
    }`

    // Generate the content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to generate valid course structure")
    }

    // Parse and validate the course structure
    try {
      const courseStructure = JSON.parse(jsonMatch[0])
      
      // Validate required fields
      if (!courseStructure.title || !courseStructure.description || !courseStructure.modules?.length) {
        throw new Error("Generated course structure is incomplete")
      }

      // Create the course object
      const course: CourseData = {
        id: courseId,
        title: courseStructure.title,
        description: courseStructure.description,
        difficulty: courseStructure.difficulty || difficultyMap[params.knowledgeLevel],
        learningStyle: params.learningStyle,
        modules: courseStructure.modules.map(module => ({
          ...module,
          lessons: module.lessons.map(lesson => ({
            ...lesson,
            sections: lesson.sections.map(section => ({
              ...section,
              content: [], // Initialize empty content array
            }))
          }))
        })),
        createdAt: new Date()
      }

      // Store in global database
      if (!globalCourseDatabase.has(courseId)) {
        globalCourseDatabase.set(courseId, course)
        console.log(`Course created with ID: ${courseId}`)
        console.log(`Total courses in database: ${globalCourseDatabase.size}`)
        console.log(`Available course IDs: ${Array.from(globalCourseDatabase.keys()).join(", ")}`)
      } else {
        throw new Error("Course ID already exists")
      }

      // Verify storage
      const storedCourse = globalCourseDatabase.get(courseId)
      if (!storedCourse) {
        throw new Error("Failed to store course")
      }

      return courseId
      
    } catch (parseError) {
      console.error("Error parsing course structure:", parseError)
      throw new Error("Invalid course data generated")
    }
  } catch (error) {
    console.error("Error generating course:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to generate course. Please try again.")
  }
}

export async function getCourse(courseId: string): Promise<CourseData> {
  if (!courseId) {
    throw new Error("Course ID is required")
  }

  try {
    console.log(`Fetching course with ID: ${courseId}`)
    console.log(`Total courses in database: ${globalCourseDatabase.size}`)
    console.log(`Available course IDs: ${Array.from(globalCourseDatabase.keys()).join(", ")}`)
    
    const course = globalCourseDatabase.get(courseId)
    if (!course) {
      console.error(`Course not found. Available courses: ${Array.from(globalCourseDatabase.keys()).join(", ")}`)
      throw new Error(`Course not found with ID: ${courseId}`)
    }
    return course
  } catch (error) {
    console.error("Error fetching course:", error)
    throw error instanceof Error ? error : new Error("Failed to fetch course")
  }
}

export async function generateSectionContent(params: SectionGenerationParams): Promise<Section> {
  const { courseId, moduleIndex, lessonIndex, sectionIndex } = params
  const course = globalCourseDatabase.get(courseId)

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
      model: "gemini-2.0-flash", // Updated model name
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
    globalCourseDatabase.set(courseId, updatedCourse)

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
  const course = globalCourseDatabase.get(courseId)

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
      model: "gemini-2.0-flash", // Updated model name
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
  try {
    return Array.from(globalCourseDatabase.values())
  } catch (error) {
    console.error("Error fetching courses:", error)
    throw error
  }
}

// Add some sample courses to the database for testing
function addSampleCourses() {
  // Only add sample courses if the database is empty
  if (globalCourseDatabase.size === 0) {
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
      globalCourseDatabase.set(course.id, course)
    })
    console.log("Sample courses added to global database")
    console.log(`Available courses: ${Array.from(globalCourseDatabase.keys()).join(", ")}`)
  }
}

// Add sample courses when the module is imported
addSampleCourses()
console.log("Sample courses added to database")
console.log(`Available courses: ${Array.from(globalCourseDatabase.keys()).join(", ")}`)

