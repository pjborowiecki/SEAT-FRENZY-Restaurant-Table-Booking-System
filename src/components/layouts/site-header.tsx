import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/layouts/main-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <MainNav />
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/signin">
              <div
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
                <span className="sr-only">Sign In</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
