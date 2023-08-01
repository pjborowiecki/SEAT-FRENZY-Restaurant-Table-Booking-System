import "@/styles/globals.css"

import type { Metadata } from "next"

import { fontInter } from "@/lib/fonts"
import { Navbar } from "@/components/layouts/navbar"

export const metadata: Metadata = {
  title: "Restaurant Booking System",
  description:
    "A restaraunt booking system, built with Next.js 13, Prisma ORM (with PostgreSQL hosten on PlanetScale), and TailwindCSS.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={fontInter.className}>
        <div className="min-h-screen w-screen bg-gray-100">
          <div className="m-auto max-w-screen-2xl bg-white">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
