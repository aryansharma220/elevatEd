"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Key } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface ApiKeyFormProps {
  onApiKeySubmit: (apiKey: string) => void
  hasStoredKey: boolean
}

export function ApiKeyForm({ onApiKeySubmit, hasStoredKey }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!apiKey.trim()) {
      setError("API key is required")
      return
    }

    setIsSubmitting(true)

    try {
      // Validate the API key by making a simple request
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ test: true }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Invalid API key")
      }

      // Store the API key in localStorage
      localStorage.setItem("openai-api-key", apiKey)

      toast({
        title: "API key saved",
        description: "Your API key has been securely saved in your browser.",
      })

      onApiKeySubmit(apiKey)
    } catch (err) {
      console.error("Error validating API key:", err)
      setError(err instanceof Error ? err.message : "Failed to validate API key")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key Setup
        </CardTitle>
        <CardDescription>
          Enter your OpenAI API key to use the course generation feature. Your key is stored locally and never sent to
          our servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasStoredKey ? (
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">
              API key is already stored in your browser.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally in your browser and is never sent to our servers.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Validating..." : "Save API Key"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      {hasStoredKey && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("openai-api-key")
              toast({
                title: "API key removed",
                description: "Your API key has been removed from your browser.",
              })
              window.location.reload()
            }}
          >
            Remove API Key
          </Button>
          <Button onClick={() => onApiKeySubmit("")}>Continue</Button>
        </CardFooter>
      )}
    </Card>
  )
}

