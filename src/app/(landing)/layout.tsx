import { currentUser } from "@clerk/nextjs"

import { Footer } from "@/components/layouts/footer"
import { Header } from "@/components/layouts/header"

interface LandingProps {
  children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingProps) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
