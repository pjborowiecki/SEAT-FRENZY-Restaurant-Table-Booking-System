import { Footer } from "@/components/layouts/footer"

interface LandingProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
