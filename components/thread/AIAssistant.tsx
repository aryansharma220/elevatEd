"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, SendHorizonal, X, Loader2, Lightbulb, Edit, CheckSquare, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ReactMarkdown from 'react-markdown'

interface AIResponse {
  id: string
  content: string
  timestamp: Date
  status: 'pending' | 'complete' | 'error'
  error?: string
}

export function AIAssistant() {
  const [query, setQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [responses, setResponses] = useState<AIResponse[]>([])
  const [hasGeneratedSuggestions, setHasGeneratedSuggestions] = useState(false)
  const [apiKeyMissing, setApiKeyMissing] = useState(false)
  
  // Check if Gemini API key is available
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    setApiKeyMissing(!apiKey);
  }, []);
  
  // Sample suggested questions - updated to be more general
  const suggestedQuestions = [
    "What are the key concepts I should focus on for this week's material?",
    "Can you explain the relationship between these two topics?",
    "How can I prepare effectively for the upcoming exam?",
    "What are some real-world applications of what we're learning?"
  ]
  
  // Call Gemini API to get a response - updated prompt to be more general
  const callGeminiApi = async (userQuery: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured");
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful AI assistant. Answer the following question clearly and concisely: ${userQuery}
                           Format your response with markdown where appropriate for better readability.
                           If you're not sure about something, acknowledge that limitation.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get response from Gemini API");
      }

      // Handle the response structure properly
      if (data.candidates && 
          data.candidates[0] && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text || "I couldn't generate a response for that query. Please try asking something else.";
      } else {
        console.error("Unexpected API response structure:", data);
        throw new Error("Received an unexpected response format from the API");
      }
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      throw new Error(error.message || "Failed to connect to Gemini API");
    }
  };
  
  // Simulated AI response generation with fallback - updated fallback responses
  const generateAIResponse = async (userQuery: string) => {
    // Create a pending response first
    const pendingResponseId = Date.now().toString()
    const pendingResponse: AIResponse = {
      id: pendingResponseId,
      content: "",
      timestamp: new Date(),
      status: 'pending'
    }
    
    setResponses(prev => [...prev, pendingResponse])
    setIsTyping(true)
    
    try {
      // Try to get a response from the Gemini API
      if (apiKeyMissing) {
        throw new Error("Gemini API key is not configured");
      }
      
      const responseContent = await callGeminiApi(userQuery);
      
      // Update the pending response to complete
      setResponses(prev => prev.map(resp => 
        resp.id === pendingResponseId 
          ? { ...resp, content: responseContent, status: 'complete' as const } 
          : resp
      ));
      
    } catch (error: any) {
      console.error("Error generating AI response:", error);
      
      // Fallback to more general responses if API fails
      let fallbackResponse = "";
      
      if (userQuery.toLowerCase().includes("help") || userQuery.toLowerCase().includes("what can you")) {
        fallbackResponse = "I'm an AI assistant designed to help answer your questions on any topic. I can provide information, explain concepts, summarize content, or just have a conversation. Feel free to ask me anything!"
      } else if (userQuery.toLowerCase().includes("hello") || userQuery.toLowerCase().includes("hi") || userQuery.toLowerCase().includes("hey")) {
        fallbackResponse = "Hello! How can I assist you today? Feel free to ask me any questions you have."
      } else if (userQuery.toLowerCase().includes("thank")) {
        fallbackResponse = "You're welcome! If you have any other questions in the future, don't hesitate to ask."
      } else if (userQuery.toLowerCase().includes("example") || userQuery.toLowerCase().includes("show me")) {
        fallbackResponse = "I'd be happy to provide examples, but I'm currently operating in a limited capacity. When fully connected, I can provide examples, demonstrations, and illustrations on practically any topic you're interested in."
      } else {
        fallbackResponse = "I'd be happy to help answer your question, but I'm currently experiencing connection issues. Please try again later, or feel free to ask me something else."
      }
      
      const errorMessage = error.message || "An error occurred while processing your request";
      
      // Check if the error was due to missing API key
      if (errorMessage.includes("API key")) {
        // Set error response with API key error
        setResponses(prev => prev.map(resp => 
          resp.id === pendingResponseId 
            ? { 
                ...resp, 
                content: fallbackResponse, 
                status: 'error' as const,
                error: "Gemini API key not configured. Using fallback responses."
              } 
            : resp
        ));
      } else {
        // Set error response with general error
        setResponses(prev => prev.map(resp => 
          resp.id === pendingResponseId 
            ? { 
                ...resp, 
                content: fallbackResponse, 
                status: 'error' as const,
                error: "Could not connect to Gemini API. Using fallback responses."
              } 
            : resp
        ));
      }
    } finally {
      setIsTyping(false);
    }
  }
  
  const handleSubmit = () => {
    if (query.trim() === "") return
    
    generateAIResponse(query)
    setQuery("")
  }
  
  const handleSuggestedQuestion = (question: string) => {
    setQuery(question)
    generateAIResponse(question)
  }
  
  // Generate suggestions based on current thread context
  const generateSuggestions = () => {
    setHasGeneratedSuggestions(true)
  }
  
  return (
    <>
      {/* Floating AI Assistant button */}
      <div className="fixed bottom-6 right-6 z-30">
        <Button 
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`h-14 w-14 rounded-full shadow-lg ${isAssistantOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {isAssistantOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* AI Assistant panel */}
      {isAssistantOpen && (
        <div className="fixed bottom-24 right-6 w-96 sm:w-[450px] md:w-[500px] z-30 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all">
          <Card className="h-[600px] flex flex-col"> {/* Increased height */}
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">Gemini Assistant</h3>
              </div>
              <Badge variant="outline" className="bg-white/20 text-white border-0">
                AI Helper
              </Badge>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {responses.length === 0 && !hasGeneratedSuggestions ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 space-y-3">
                  <Bot className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-2" />
                  <h4 className="font-medium text-slate-700 dark:text-slate-300">Ask me anything</h4>
                  <p className="text-sm max-w-xs">
                    I can help answer questions, explain concepts, or provide information on any topic you're interested in.
                  </p>
                  <Button
                    onClick={generateSuggestions}
                    variant="outline"
                    className="mt-4"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Suggest questions
                  </Button>
                </div>
              ) : (
                <>
                  {hasGeneratedSuggestions && responses.length === 0 && (
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-6">
                      <h4 className="font-medium flex items-center text-slate-700 dark:text-slate-300 mb-2">
                        <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                        Suggested questions
                      </h4>
                      <div className="space-y-2">
                        {suggestedQuestions.map((question, index) => (
                          <button 
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="w-full text-left p-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 flex items-center"
                          >
                            <span className="mr-2">→</span>
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                
                  {responses.map((response, index) => (
                    <div key={response.id} className="space-y-2">
                      {index > 0 && <hr className="border-slate-200 dark:border-slate-700" />}
                      
                      <div className="flex items-start gap-3 pt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/gemini.png" alt="Gemini" />
                          <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          {response.status === 'pending' ? (
                            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">Generating response...</span>
                            </div>
                          ) : (
                            <div className="prose dark:prose-invert prose-slate prose-sm max-w-none">
                              {response.status === 'error' && response.error && (
                                <Alert variant="warning" className="mb-2 py-2">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertDescription className="text-xs">
                                    {response.error}
                                  </AlertDescription>
                                </Alert>
                              )}
                              <div className="text-slate-700 dark:text-slate-300 break-words">
                                <ReactMarkdown 
                                  className="markdown-content [&>*]:break-words [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_code]:break-words"
                                >
                                  {response.content}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                          
                          {response.status === 'complete' && (
                            <div className="flex gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs"
                              >
                                <CheckSquare className="h-3 w-3 mr-1" />
                                Use in reply
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
            
            <CardFooter className="border-t border-slate-200 dark:border-slate-700 p-3">
              <div className="flex items-center gap-2 w-full">
                <Textarea
                  placeholder="Ask me anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="resize-none min-h-[2.5rem] h-10 py-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={query.trim() === "" || isTyping}
                  size="sm"
                  className="shrink-0 bg-purple-600 hover:bg-purple-700 h-10 w-10 p-0"
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
