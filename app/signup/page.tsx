"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Github, ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 px-6 py-8 rounded-xl shadow-lg w-full border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-8">
            <Link 
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">elevatEd</span>
            </div>
            <div className="w-5" />
          </div>

          <h1 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
            Create an account
          </h1>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-2"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-2"
                />
              </div>
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-2"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 mr-2" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                I agree to the{' '}
                <Link 
                  href="/terms"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link 
                  href="/privacy"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Create account
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            <span className="px-4 text-sm text-slate-500 dark:text-slate-400">Or continue with</span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <Button 
            variant="outline" 
            className="w-full mb-4 border-slate-200 dark:border-slate-700"
          >
            <Github className="h-5 w-5 mr-2" />
            Continue with Github
          </Button>

          <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link 
              href="/login"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
