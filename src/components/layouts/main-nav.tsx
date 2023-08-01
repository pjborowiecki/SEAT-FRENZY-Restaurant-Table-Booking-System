"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
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
  )
}
