import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth"

export async function DashboardHeader(): Promise<JSX.Element> {
  const user = await getCurrentUser()
  if (!user) redirect("/signin")

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      Dashboard header
    </header>
  )
}
