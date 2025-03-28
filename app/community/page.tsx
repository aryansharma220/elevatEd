"use client"

import { ThreadComponent } from "@/components/thread/ThreadComponent"
import { 
  ArrowRight, BookOpen, Brain, Layers, Lightbulb, Sparkles, 
  UserCheck, Star, Menu, X, Github, Twitter, 
  Linkedin, Check, MessageSquare, Users, Bell, Heart, Globe,
  Award, Calendar, TrendingUp, PlusCircle
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("discussions");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fixed order of navigation links that won't change
  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/community", label: "Community" },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-xl font-bold text-slate-900 dark:text-white">elevatEd</span>
                  </div>
                </Link>
              </div>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/features" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
                </Link>
                <Link href="/community" className="text-purple-600 dark:text-purple-400 transition-colors">
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
              <Link href="/about" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <UserCheck className="h-5 w-5 mr-3 opacity-70" />
              About
            </Link>
            <Link href="/community" className="block text-purple-600 dark:text-purple-400 transition-colors
              py-2 px-3 rounded-lg flex items-center bg-purple-50 dark:bg-purple-900/10">
              <Users className="h-5 w-5 mr-3 opacity-70" />
              Community
            </Link>
          
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg mb-2">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Pro Tip
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Join our community to connect with other learners and enhance your learning experience!
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
      
      {/* Community Header */}
      <div className="pt-24 pb-8 bg-gradient-to-r from-purple-50 via-violet-50 to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              elevatEd Community
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Connect with learners from around the world, share insights, and enhance your learning journey through collaborative discussion
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-none  cursor-default">
                <Globe className="h-3.5 w-3.5 mr-1" />
                <span>7,500+ Members</span>
              </Badge>
              <Badge className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-none  cursor-default">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                <span>3,200+ Discussions</span>
              </Badge>
              <Badge className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-none  cursor-default">
                <Award className="h-3.5 w-3.5 mr-1" />
                <span>120+ Countries</span>
              </Badge>
            </div>
            
            {/* Community Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-white/60 dark:bg-slate-800/60 p-1 rounded-lg shadow-sm backdrop-blur-sm">
              <button 
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "discussions" 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveTab("discussions")}
              >
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussions
                </div>
              </button>
              <button 
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "events" 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveTab("events")}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </div>
              </button>
              <button 
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "showcase" 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveTab("showcase")}
              >
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Showcase
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 bg-white dark:bg-slate-900">
        {activeTab === "discussions" && <ThreadComponent />}
        
        {activeTab === "events" && (
          <div className="container mx-auto px-4 py-16 text-center">
            <Bell className="h-24 w-24 text-purple-200 dark:text-purple-800/30 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Events Coming Soon</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              We're planning exciting online events, webinars, and challenges. Stay tuned for updates!
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Notify Me
            </Button>
          </div>
        )}
        
        {activeTab === "showcase" && (
          <div className="container mx-auto px-4 py-16 text-center">
            <Heart className="h-24 w-24 text-purple-200 dark:text-purple-800/30 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Showcase Your Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              This area will let you share your learning projects and get feedback from the community. Coming soon!
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Join Waitlist
            </Button>
          </div>
        )}
      </main>
      
      {/* Footer from main page */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} elevatEd. All rights reserved.
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
