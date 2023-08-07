import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link
              aria-label="Home"
              href="/"
              className="flex items-center space-x-2"
            >
              <Icons.logo className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            Built by{" "}
            <a
              aria-label="Follow @pjborowiecki"
              href="https://twitter.com/pjborowiecki"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Piotr Borowiecki
            </a>
            .
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })
                )}
              >
                <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  )
}
