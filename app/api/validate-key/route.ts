import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 401 })
    }

    // Make a simple request to validate the API key
    await generateText({
      model: openai("gpt-3.5-turbo", { apiKey }),
      prompt: "Hello, this is a test to validate the API key.",
      maxTokens: 5,
    })

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error("Error validating API key:", error)

    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }
}

