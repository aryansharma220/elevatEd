"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"

interface AddEnvironmentVariablesProps {
  onComplete: () => void
}

export function AddEnvironmentVariables({ onComplete }: AddEnvironmentVariablesProps) {
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key")
      return
    }

    try {
      // In a real application, you would securely store this API key
      // For this demo, we'll just simulate success
      localStorage.setItem("GEMINI_API_KEY", apiKey)
      setSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 1500)
    } catch (err) {
      setError("Failed to save API key. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Set Up Gemini API Key</CardTitle>
        <CardDescription>To generate courses, you need to provide your Google Gemini API key.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>API key saved successfully!</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Gemini API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                You can get your API key from the{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            <Button type="submit" className="w-full">
              Save API Key
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

