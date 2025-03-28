"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, BookOpen, Brain, Layers, Lightbulb, Sparkles, 
  UserCheck, ChevronRight, Star, Menu, X, Github, Twitter, 
  Linkedin, Check, Award, Globe, Heart, Zap, Users, MoveRight, Building
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function AboutPage() {
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
                <span className="text-xl font-bold text-slate-900 dark:text-white">ElevatEd</span>
              </div>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/features" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500 transition-colors">
                  About
                </Link>
                <Link href="/community" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Community
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
            <Link href="/features" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="block text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500 transition-colors">
              About
            </Link>
            <Link href="/community" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Community
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
      <section className="relative bg-gradient-to-b from-violet-50 to-white dark:from-slate-950 dark:to-slate-900 py-28 md:py-36 mt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Our Story
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Transforming Education with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">AI</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
              ElevatEd is on a mission to democratize education by making personalized, 
              high-quality learning experiences accessible to everyone through the power of AI.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="p-8">
                    <div className="flex flex-col space-y-6">
                      {missionPoints.map((point, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                            {point.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{point.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300">{point.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4 animate-fade-in-right">
                <Heart className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white animate-fade-in">
                Why We Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">ElevatEd</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                <p className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                  We believe that education is a fundamental right, not a privilege. Yet, high-quality, 
                  personalized learning experiences have traditionally been available only to a select few.
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                  Our founder experienced firsthand the limitations of traditional one-size-fits-all education. 
                  This inspired a vision: what if we could combine the adaptability of a personal tutor with 
                  the scale of digital learning?
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  With advances in AI technology, particularly Google's Gemini, we saw an opportunity to create 
                  a learning platform that could dynamically generate courses tailored to each learner's needs, 
                  background, and goals.
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                  Today, ElevatEd is making this vision a reality—democratizing access to personalized 
                  education for learners around the world, regardless of their location or circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500K+", label: "Active Learners" },
              { value: "120+", label: "Countries Reached" },
              { value: "5,000+", label: "Courses Generated" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">
                  {stat.value}
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium mb-4 animate-pulse-soft">
              <Zap className="h-4 w-4 mr-2" />
              Our Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 dark:from-amber-400 dark:to-red-400">Google Gemini</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              ElevatEd leverages Google's most advanced AI technology to create learning experiences 
              that adapt to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                {technologyFeatures.map((feature, index) => (
                  <div key={index} className="flex transform transition-transform hover:-translate-y-1 hover:shadow-lg p-4 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-4 text-white shadow-md">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="p-1">
                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex space-x-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300">
                          <div className="mr-1 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                          gemini-model.js
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto custom-scrollbar">
                        <pre className="text-sm leading-relaxed">
<code>{`// ElevatEd AI - Course Generation Algorithm
async function generatePersonalizedCourse(topic, userLevel, preferences) {
  // Initialize Gemini Pro model with advanced settings
  const model = await GeminiModel.initialize({
    modelName: 'gemini-2.0-flash',
    apiVersion: 'v1',
    temperature: 0.7,
    maxOutputTokens: 8192,
    topK: 40,
    topP: 0.95
  });
  
  // Create adaptive learning structure based on user's profile
  const courseSchema = buildAdaptiveSchema({
    modules: [],
    assessments: [],
    resources: [],
    interactiveElements: []
  });
  
  // Generate personalized curriculum with multimodal capabilities
  const response = await model.generateContent({
    prompt: createPromptForCourse(topic, userLevel),
    multimodal: true,
    adaptToLearner: true,
    feedbackEnabled: true
  });
  
  return buildInteractiveCourse(response, preferences);
}`}</code>
                        </pre>
                      </div>
                      
                      <div className="mt-3 flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center mr-4">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          AI Optimized
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                          Gemini API v1
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


      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover how ElevatEd is transforming learning experiences for students and educators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ElevatEd completely changed how I approach learning new subjects. The personalized courses feel like they were crafted just for me.",
                author: "Jamie Chen",
                role: "Software Developer"
              },
              {
                quote: "As an educator, ElevatEd has been a game-changer. I can now provide tailored resources for each of my students with minimal effort.",
                author: "Dr. Marcus Johnson",
                role: "University Professor"
              },
              {
                quote: "I've tried many learning platforms, but nothing compares to how ElevatEd adapts to my learning style and pace.",
                author: "Sofia Rodriguez",
                role: "Medical Student"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transform transition-all hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
              <Building className="h-4 w-4 mr-2" />
              Our Partners
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We collaborate with educational institutions, corporations, and nonprofits 
              to expand access to personalized learning.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Join Our Mission?</h2>
            <p className="text-xl mb-10 text-white/90">
              Experience the future of learning with ElevatEd and help us 
              democratize access to personalized education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 shadow-lg">
                  Create Your First Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">

          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} ElevatEd. All rights reserved.
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

const missionPoints = [
  {
    title: "Democratize Education",
    description: "Make high-quality, personalized learning accessible to everyone, everywhere.",
    icon: <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Personalize Learning",
    description: "Create adaptive learning experiences that meet students where they are.",
    icon: <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Empower Educators",
    description: "Provide tools that help teachers create engaging, effective learning materials.",
    icon: <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Bridge Knowledge Gaps",
    description: "Help learners of all backgrounds access the information they need to succeed.",
    icon: <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Former AI research scientist at Google with a PhD in Educational Technology from Stanford. Passionate about using AI to transform education."
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "Ex-Meta engineer who led the development of adaptive learning systems. Brings 15+ years of experience in AI and machine learning to ElevatEd."
  },
  {
    name: "Aisha Patel",
    role: "Chief Learning Officer",
    bio: "Former education professor with expertise in curriculum design and cognitive science. Ensures our AI delivers pedagogically sound content."
  },
  {
    name: "James Wilson",
    role: "Head of AI Research",
    bio: "PhD in Machine Learning from MIT. Specializes in natural language processing and multimodal AI systems that power our course generation."
  },
  {
    name: "Emily Tanaka",
    role: "VP of Product",
    bio: "Former product leader at Khan Academy with a passion for creating intuitive learning experiences that engage and inspire."
  },
  {
    name: "David Okafor",
    role: "Head of Partnerships",
    bio: "Builds strategic relationships with educational institutions, corporations, and nonprofits to expand access to ElevatEd."
  }
];

const technologyFeatures = [
  {
    title: "Multimodal Understanding",
    description: "Gemini processes and generates text, code, and visuals to create rich, interactive learning experiences tailored to your needs.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Adaptive Learning Algorithms",
    description: "Our proprietary algorithms analyze your progress and learning style to continuously optimize course content and pacing.",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    title: "Natural Language Generation",
    description: "State-of-the-art content generation creates clear, concise explanations of complex topics at the appropriate difficulty level.",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Real-time Feedback Systems",
    description: "Immediate, personalized feedback on exercises and assessments helps reinforce learning and correct misconceptions.",
    icon: <Lightbulb className="h-6 w-6" />,
  }
];

const partners = ["Google", "Microsoft", "Harvard", "Stanford", "MIT", "Khan Academy", "Coursera", "edX", "UNESCO", "World Bank", "Gates Foundation", "UNICEF"];
