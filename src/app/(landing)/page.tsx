import type { Metadata } from "next"
import { getVenuesAction } from "@/actions/venue"
import type { Venue } from "@/db/schema"
import { env } from "@/env.mjs"

import { MainHeader } from "@/components/layouts/headers/header-main"
import { Shell } from "@/components/shells/shell"
import { Venues } from "@/components/venues"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Venues",
  description:
    "Choose a venue, check availability and easily book a table. It's that simple!",
}

interface HomePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page, per_page, sort } = searchParams ?? {}

  // Venues transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const venuesTransaction = await getVenuesAction({
    limit: limit,
    offset: offset,
    sort:
      typeof sort === "string"
        ? (sort as `${keyof Venue | "name"}.${"asc" | "desc"}`)
        : "name.asc",
  })

  const pageCount = Math.ceil(venuesTransaction.total / limit)

  return (
    <>
      <MainHeader />
      <Shell className="flex flex-wrap justify-center">
        <Venues venues={venuesTransaction.items} pageCount={pageCount} />
      </Shell>
    </>
  )
}
