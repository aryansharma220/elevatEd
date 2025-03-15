"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, Brain, Layers, Lightbulb, UserCheck, BookOpen, ArrowRight, CheckCircle2, 
  BarChart, Star, Code, PieChart, Download, Cloud, Zap, Menu, X, Github, Twitter, Linkedin, Clock
} from "lucide-react"
import { useState } from "react"

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">CourseGemini</span>
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/features" className="text-purple-600 dark:text-purple-400 font-medium transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
                </Link>
                <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden p-4 space-y-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <Link href="/features" className="block text-purple-600 dark:text-purple-400 font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link href="/blog" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Blog
            </Link>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-violet-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-300 dark:bg-pink-900 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4 animate-pulse">
              <Sparkles className="h-4 w-4 mr-2" />
              Platform Features
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Discover the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 relative">
                AI-Driven Learning
                <svg className="absolute bottom-0 left-0 w-full h-2 text-purple-400/30 dark:text-purple-600/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore how CourseGemini transforms education with cutting-edge AI technology, delivering personalized learning experiences for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 
                  hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 
                  hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 dark:group-hover:from-purple-500/10 dark:group-hover:to-blue-500/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 
                    group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_40%)]"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
                  <Star className="h-4 w-4 mr-2 fill-purple-500" />
                  Featured Capabilities
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                  Powerful AI Technology That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">Adapts</span> to Your Learning Style
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Our platform leverages Google Gemini's advanced AI capabilities to create truly personalized learning experiences that evolve with you.
                </p>
                
                <div className="space-y-6">
                  {highlightFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="mt-1 mr-4 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <Link href="/create">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group px-6 py-6">
                      Try It Yourself
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative mt-8 lg:mt-0 transform hover:scale-[1.02] transition-all duration-500">
                  {/* Decorative elements */}
                  <div className="hidden lg:block absolute -top-8 -left-8 w-28 h-28 bg-purple-100 dark:bg-purple-900/20 rounded-lg rotate-6 z-0"></div>
                  <div className="hidden lg:block absolute -bottom-8 -right-8 w-28 h-28 bg-blue-100 dark:bg-blue-900/20 rounded-lg -rotate-6 z-0"></div>
                  
                  <div className="aspect-video bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative z-10">
                    {/* Modern browser-like UI */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center px-4 border-b border-slate-300 dark:border-slate-600">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex items-center mx-auto px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 shadow-sm">
                        <Sparkles className="h-3 w-3 mr-2 text-purple-500" />
                        coursegemini.ai/learn/machine-learning
                      </div>
                    </div>
                    
                    <div className="p-6 pt-14">
                      {/* Header with course info and learning progress */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0 flex items-center justify-center text-white">
                            <Brain className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-semibold text-slate-900 dark:text-white">Neural Networks Fundamentals</div>
                            <div className="flex items-center">
                              <div className="text-xs text-slate-500 dark:text-slate-400 mr-3">Module 2 of 5</div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                            Live Session
                          </div>
                          <button className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                            <Zap className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Progress tracker */}
                      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Progress</span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">42% Complete</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                          <div className="h-full w-[42%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`relative ${i <= 2 ? 'group' : ''}`}>
                              <div className={`h-16 rounded-lg flex flex-col items-center justify-center
                                ${i === 2 ? 'ring-2 ring-purple-400 dark:ring-purple-500 bg-purple-50 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-600' : 
                                  i < 2 ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 border border-green-200 dark:border-green-700' :
                                  'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}
                              >
                                <span className={`text-sm font-semibold
                                  ${i === 2 ? 'text-purple-700 dark:text-purple-400' : 
                                    i < 2 ? 'text-green-700 dark:text-green-400' :
                                    'text-slate-500 dark:text-slate-400'}`}
                                >
                                  {i}
                                </span>
                                <span className="text-[10px]">
                                  {i === 2 && <span className="text-purple-600 dark:text-purple-400">Current</span>}
                                  {i < 2 && <span className="text-green-600 dark:text-green-400">Completed</span>}
                                  {i > 2 && <span className="text-slate-400 dark:text-slate-500">Locked</span>}
                                </span>
                              </div>
                              {i <= 2 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                  {i < 2 ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Chat interface */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
                              <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400 relative z-10" />
                            </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl rounded-tl-none border border-blue-100 dark:border-blue-800/30 text-sm max-w-[85%] shadow-sm">
                            How does backpropagation work in neural networks?
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 text-sm max-w-[85%] shadow-md">
                            <p className="mb-3 text-slate-700 dark:text-slate-300">
                              Backpropagation is the core algorithm for training neural networks. It works by:
                            </p>
                            <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-300 space-y-1 mb-3">
                              <li>Calculating the error at the output layer</li>
                              <li>Propagating errors backwards through the network</li>
                              <li>Updating weights using gradient descent</li>
                            </ol>
                            <div className="mb-3 border-l-2 border-purple-400 pl-3 italic text-slate-600 dark:text-slate-400 text-xs">
                              This technique minimizes the cost function by adjusting weights proportionally to their contribution to the error.
                            </div>
                            
                            <div className="h-28 mb-3 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
                              <div className="relative w-full h-full flex items-center justify-center">
                                {/* Neural network visualization */}
                                <div className="absolute left-1/5 top-1/2 -translate-y-1/2">
                                  <div className="relative">
                                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-400/20 animate-pulse"></div>
                                    <div className="relative z-10 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 border border-blue-500 flex items-center justify-center text-[10px] font-medium text-blue-700 dark:text-blue-300">x₁</div>
                                  </div>
                                </div>
                                <div className="absolute left-1/5 top-2/3">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 border border-blue-500 flex items-center justify-center text-[10px] font-medium text-blue-700 dark:text-blue-300">x₂</div>
                                </div>
                                
                                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/50 border border-purple-500 flex items-center justify-center text-[10px] font-medium text-purple-700 dark:text-purple-300">h₁</div>
                                </div>
                                <div className="absolute left-1/2 top-2/3 -translate-x-1/2">
                                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/50 border border-purple-500 flex items-center justify-center text-[10px] font-medium text-purple-700 dark:text-purple-300">h₂</div>
                                </div>
                                
                                <div className="absolute left-4/5 top-1/2 -translate-y-1/2">
                                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 border border-green-500 flex items-center justify-center text-[10px] font-medium text-green-700 dark:text-green-300">ŷ</div>
                                </div>
                                
                                {/* Connections (forward) */}
                                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                  <g className="opacity-60">
                                    <line x1="26%" y1="35%" x2="43%" y2="33%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                    <line x1="26%" y1="35%" x2="43%" y2="67%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                    <line x1="26%" y1="67%" x2="43%" y2="33%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                    <line x1="26%" y1="67%" x2="43%" y2="67%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                    <line x1="57%" y1="33%" x2="74%" y2="50%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                    <line x1="57%" y1="67%" x2="74%" y2="50%" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                                  </g>
                                  
                                  {/* Backpropagation animation */}
                                  <path d="M74%,50% L57%,33%" className="stroke-red-500" strokeWidth="1.5" strokeDasharray="6,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="18" dur="1.5s" repeatCount="indefinite" />
                                  </path>
                                  <path d="M57%,33% L26%,35%" className="stroke-red-500" strokeWidth="1.5" strokeDasharray="6,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="18" dur="1.5s" repeatCount="indefinite" />
                                  </path>
                                </svg>
                                
                                {/* Gradient flow animation */}
                                <div className="absolute left-[65%] top-[42%] w-2 h-2 rounded-full bg-red-500 animate-ping opacity-70"></div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex text-xs text-slate-500 dark:text-slate-400 items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Generated in 1.2s
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                  Simplify
                                </button>
                                <button className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors">
                                  Try Interactive Demo
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Input area */}
                        <div className="pt-3 flex items-center">
                          <div className="flex-1 relative">
                            <input 
                              type="text" 
                              placeholder="Ask a follow-up question..." 
                              className="w-full rounded-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-500 dark:hover:text-purple-400">
                              <Sparkles className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="ml-2 flex items-center space-x-1">
                            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                              <PieChart className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm hover:from-purple-700 hover:to-blue-700">
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(124,58,237,0.03),transparent_30%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(124,58,237,0.1),transparent_30%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4">
              <Layers className="h-4 w-4 mr-2" />
              Complete Toolkit
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">Effective Learning</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              CourseGemini provides a comprehensive set of tools powered by Google Gemini's advanced AI capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {detailedFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/80 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <Link href="/features/details">
              <Button variant="outline" className="border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 group">
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  M
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">Mark Thompson</h3>
                  <p className="text-slate-600 dark:text-slate-300">Data Science Instructor</p>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <svg className="h-8 w-8 text-purple-300 dark:text-purple-700 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-lg text-slate-700 dark:text-slate-200 italic">
                  As an instructor, CourseGemini has completely transformed how I create learning materials. The AI-generated content is not only accurate but deeply adaptive to individual student needs. It's saved me countless hours while improving learning outcomes for my students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-60 h-60 rounded-full bg-white opacity-5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Start creating AI-generated courses tailored to your learning needs today. Join thousands of educators and learners already transforming their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 shadow-lg group">
                Create Your First Course
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10 hover:border-white">
                View Pricing Plans
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">No credit card required. Free tier includes 5 courses.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-400 mr-2" />
                <span className="text-xl font-bold text-white">CourseGemini</span>
              </div>
              <p className="mb-4 text-slate-400">AI-powered learning platform that adapts to your unique needs and learning style.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="text-slate-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/enterprise" className="text-slate-400 hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/guides" className="text-slate-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul class="space-y-3">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CourseGemini. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>Powered by</span>
                <span className="text-white font-medium">Google Gemini</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "AI-Powered Course Creation",
    description: "Generate comprehensive courses on any topic with advanced AI that structures content for optimal learning.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Interactive Learning Experience",
    description: "Engage with adaptive content that responds to your questions and adjusts to your pace and knowledge level.",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    title: "Comprehensive Analytics",
    description: "Track your progress with detailed insights and performance metrics to optimize your learning journey.",
    icon: <BarChart className="h-6 w-6" />,
  },
]

const highlightFeatures = [
  {
    title: "Personalized Learning Paths",
    description: "Our AI analyzes your knowledge gaps and learning style to create custom pathways through the material.",
  },
  {
    title: "Interactive Q&A With AI Tutor",
    description: "Ask questions at any point and receive detailed explanations tailored to your level of understanding.",
  },
  {
    title: "Multi-format Content Generation",
    description: "Automatically generates text, diagrams, code examples, and interactive exercises based on your needs.",
  },
]

const detailedFeatures = [
  {
    title: "Dynamic Content Generation",
    description: "AI creates detailed, accurate content on any topic using Google's Gemini API.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: "Interactive Teaching Mode",
    description: "Experience an AI instructor that adapts to your questions and provides personalized explanations.",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: "Adaptive Learning Path",
    description: "Courses adjust in real-time based on your progress, prior knowledge, and learning pace.",
    icon: <UserCheck className="h-5 w-5" />,
  },
  {
    title: "Multimodal Content",
    description: "Learn through text, images, diagrams, and code snippets generated by Gemini's advanced capabilities.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Interactive Assessments",
    description: "Test your knowledge with AI-generated quizzes, exercises, and coding challenges.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Export & Integration",
    description: "Download your courses as PDFs, HTML pages, or SCORM modules for integration with LMS.",
    icon: <Download className="h-5 w-5" />,
  },
  {
    title: "Code Execution Environment",
    description: "Practice coding directly within the platform with support for multiple programming languages.",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Progress Analytics",
    description: "Track learning metrics and identify areas for improvement with detailed dashboards.",
    icon: <PieChart className="h-5 w-5" />,
  },
  {
    title: "Cloud Synchronization",
    description: "Access your courses from any device with seamless cloud synchronization.",
    icon: <Cloud className="h-5 w-5" />,
  },
]
