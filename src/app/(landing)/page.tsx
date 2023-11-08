import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { Shell } from "@/components/shells/shell"

// import { Venues } from "@/components/venues"

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

export default function Home({ searchParams }: HomePageProps): JSX.Element {
  console.log(searchParams)
  return (
    <Shell className="flex flex-wrap justify-center">
      {/* <Venues venues={venuesTransaction.items} pageCount={pageCount} /> */}
    </Shell>
  )
}
