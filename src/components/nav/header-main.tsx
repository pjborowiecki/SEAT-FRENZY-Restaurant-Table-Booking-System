import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SearchBar } from "@/components/search-bar"

export function MainHeader(): JSX.Element {
  return (
    <header className=" sticky top-0 z-40 flex h-full w-full flex-col border-b bg-accent">
      {/* NavBar */}
      <div className="container flex h-16 items-center justify-between">
        <div className="hidden gap-6 sm:flex">
          <Link
            href="/"
            aria-label="Home"
            className="hidden items-center space-x-2 sm:flex"
          >
            <Icons.logo className="h-6 w-6" aria-hidden="true" />

            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <div className="flex h-64 items-center space-x-2">
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

      {/* Heading and Search Bar */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 pb-16 pt-8">
        <h1 className="text-[40px] font-bold text-primary">
          Easily book a table for any occasion
        </h1>
        <SearchBar />
      </div>
    </header>
  )
}
