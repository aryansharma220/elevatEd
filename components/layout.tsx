import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
