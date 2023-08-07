import { Footer } from "@/components/layouts/footer"
import { HeaderMain } from "@/components/layouts/headers/header-main"

interface LandingProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderMain />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
