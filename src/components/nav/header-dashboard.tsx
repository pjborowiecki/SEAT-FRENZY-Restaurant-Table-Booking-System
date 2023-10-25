import Link from "next/link"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export function DashboardHeader() {
  const session = getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      Dashboard header
    </header>
  )
}
