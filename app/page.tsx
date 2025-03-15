"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, BookOpen, Brain, Layers, Lightbulb, Sparkles, 
  UserCheck, ChevronRight, Star, Menu, X, Github, Twitter, 
  Linkedin, Check, MessageSquare 
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">CourseGemini</span>
              </div>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/features" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
                <Link href="/community" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Community
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
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
            <Link href="/features" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors 
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <Layers className="h-5 w-5 mr-3 opacity-70" />
              Features
            </Link>
            <Link href="/pricing" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <Star className="h-5 w-5 mr-3 opacity-70" />
              Pricing
            </Link>
            <Link href="/community" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <MessageSquare className="h-5 w-5 mr-3 opacity-70" />
              Community
            </Link>
            <Link href="/about" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <UserCheck className="h-5 w-5 mr-3 opacity-70" />
              About
            </Link>
            <Link href="/community" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <Sparkles className="h-5 w-5 mr-3 opacity-70" />
              Community
            </Link>
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg mb-2">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Pro Tip
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Sign up today and get access to 5 free AI-generated courses!
                </p>
              </div>
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
      <section className="relative bg-gradient-to-b from-violet-50 to-white dark:from-slate-950 dark:to-slate-900 py-28 md:py-36 mt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300 dark:bg-pink-900 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-2 animate-pulse">
                <Sparkles className="h-4 w-4 mr-2" />
                Powered by Google Gemini
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Learn Anything with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">AI-Generated</span> Courses
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
                Create personalized, interactive courses on any topic with our Gemini-powered platform. Learn at your
                own pace with adaptive content that evolves as you progress.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/create">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-600/20">
                    Create Your Course
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    Explore Examples
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start text-sm text-slate-500 dark:text-slate-400 mt-6 space-x-4">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Free tier available
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                <div className="absolute inset-0 bg-white/5 dark:bg-slate-900/10 backdrop-blur-sm rounded-2xl"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Machine Learning Fundamentals</h3>
                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                            <span>Generated by Gemini</span>
                            <span className="mx-2">•</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Module 2/5</div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Neural Networks: The Building Blocks</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Neural networks are computational models inspired by the human brain. They consist of layers
                          of interconnected nodes or "neurons" that process information.
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center mb-2">
                          <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                          <span className="text-sm font-medium">Key Concept</span>
                        </div>
                        <p className="text-sm">
                          Each neuron applies a weighted sum to its inputs, followed by an activation function.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <div className="flex items-center mb-2">
                          <Brain className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium">Interactive Example</span>
                        </div>
                        <p className="text-sm">
                          Try adjusting the weights to see how the output changes.
                        </p>
                      </div>

                      <div className="border-t pt-4 mt-6">
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="group">
                            <ChevronRight className="mr-1 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            Previous
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white group">
                            Next
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
          
          {/* Trusted by section */}
          <div className="mt-20 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">TRUSTED BY EDUCATORS AND LEARNERS AT</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70 grayscale dark:invert dark:contrast-200 dark:brightness-50">
              {['Google', 'Microsoft', 'IBM', 'Stanford', 'MIT', 'Harvard'].map((company) => (
                <div key={company} className="text-lg font-bold tracking-tight">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Revolutionize Your Learning Experience
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our AI-powered platform delivers personalized, interactive courses that adapt to your learning style and
              pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 dark:hover:border-purple-800
                  hover:bg-gradient-to-b hover:from-white hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-800/50"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6
                  group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4">
              <Layers className="h-4 w-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Create and learn from AI-generated courses in just a few simple steps
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-24 left-10 right-10 h-0.5 bg-purple-200 dark:bg-purple-800 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg text-center 
                  hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto -mt-12 mb-6 relative border-4 border-white dark:border-slate-800">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2 fill-amber-500" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have transformed their knowledge with CourseGemini
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="italic mb-6 text-slate-600 dark:text-slate-300">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-60 h-60 rounded-full bg-white opacity-5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Learning?</h2>
            <p className="text-xl mb-10 text-white/90">
              Join thousands of learners who are already using our AI-powered courses to master new skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 shadow-lg">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-white/80 text-sm">No credit card required. Free tier includes 5 courses.</p>
          </div>
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
                <li><Link href="/community" className="text-slate-400 hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/forum" className="text-slate-400 hover:text-white transition-colors">Forum</Link></li>
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
    title: "Dynamic Content Generation",
    description:
      "Our AI creates detailed, accurate content on any topic using Google's Gemini API, delivering it section-by-section as you progress.",
    icon: <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Interactive Teaching Mode",
    description:
      "Experience an AI instructor that adapts to your questions and provides personalized explanations with text, images, and diagrams.",
    icon: <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Adaptive Learning Path",
    description:
      "Courses adjust in real-time based on your progress, prior knowledge, and learning pace for an optimized learning experience.",
    icon: <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Multimodal Content",
    description:
      "Learn through text, images, diagrams, and code snippets generated by Gemini's advanced multimodal capabilities.",
    icon: <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Interactive Assessments",
    description:
      "Test your knowledge with AI-generated quizzes, exercises, and coding challenges with instant feedback.",
    icon: <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Export & Integration",
    description:
      "Download your courses as PDFs, interactive HTML pages, or SCORM modules for integration with learning management systems.",
    icon: <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Community Discussions",
    description:
      "Connect with fellow learners in our community hub with topic-specific discussion threads and AI-powered assistance.",
    icon: <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
]

const steps = [
  {
    title: "Enter Your Topic",
    description: "Specify the subject you want to learn about and your prior knowledge level.",
  },
  {
    title: "AI Generates Content",
    description: "Our Gemini-powered AI creates a structured course with modules and sections.",
  },
  {
    title: "Learn Interactively",
    description: "Progress through the course at your own pace with adaptive content and assessments.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Science Student",
    quote: "CourseGemini generated a perfect Python course that filled exactly the gaps in my knowledge. It's like having a personal tutor that knows exactly what I need to learn."
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    quote: "I needed to learn React quickly for a new project. The AI-generated course was incredible - practical examples and exactly the right difficulty level for me."
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    quote: "As someone with no technical background, I was amazed at how the AI adapted the digital marketing course to my level. Concepts were explained clearly with great examples."
  }
];

