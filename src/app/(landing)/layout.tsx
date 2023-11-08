import { Footer } from "@/components/nav/footer"
import { Header } from "@/components/nav/header"

interface LandingProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingProps): JSX.Element {
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <main className="min-h-screen flex-1">{children}</main>
      <Footer />
    </div>
  )
}
