import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BackgroundAnimationProvider } from "@/context/background-animation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Arisze - The Ultimate Student Hub!",
  description: "Plan. Connect. Enjoy – The Ultimate Student Hub!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <title>Arisze - The Ultimate Student Hub!</title>
        <meta name="description" content="Plan. Connect. Enjoy – The Ultimate Student Hub!" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BackgroundAnimationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </BackgroundAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'