import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProviderWrapper } from "../components/theme-provider-wrapper"

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   generator: 'v0.dev'
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
