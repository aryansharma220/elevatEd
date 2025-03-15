"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, BookOpen, Menu, X, Twitter, Linkedin, Github } from "lucide-react";
import { useState } from "react";

export default function PricesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals exploring the platform.",
      features: [
        "5 AI-generated courses",
        "Basic analytics",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: "$19/month",
      description: "Ideal for professionals and learners.",
      features: [
        "Unlimited courses",
        "Advanced analytics",
        "Priority support",
        "Export options (PDF, HTML, SCORM)",
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored for organizations and teams.",
      features: [
        "Custom integrations",
        "Team management tools",
        "Dedicated support",
        "Onboarding assistance",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

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
                <Link href="/features" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-purple-600 dark:text-purple-400 font-medium transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
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
            <Link href="/pricing" className="block text-purple-600 dark:text-purple-400 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
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

      {/* Pricing Section */}
      <section className="py-28 bg-white dark:bg-slate-900 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Pricing Plans
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Choose a plan that fits your needs and start learning today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border ${
                  index === 1
                    ? "border-purple-500 shadow-lg bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-800"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                } hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {plan.name}
                </h2>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  {plan.price}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-slate-600 dark:text-slate-300"
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={index === 2 ? "/contact" : "/signup"}>
                  <Button
                    size="lg"
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      index === 1
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                    {index !== 2 && (
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </Link>
              </div>
            ))}
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
                <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
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
  );
}
