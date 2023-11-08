import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
// import { getVenuesAction } from "@/actions/venue"
import { db } from "@/db"
// import { menuItems, venues } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { MenuItems } from "@/components/menu-items"
// import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { Shell } from "@/components/shells/shell"
import { VenueReviewCard } from "@/components/venue-review-card"

// import { getMenuItemsAction } from "@/app/actions/menu"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Selecte venue",
  description: "Dedicated venue page",
}

interface VenuePageProps {
  params: {
    venueId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function VenuePage({
  params,
  searchParams,
}: VenuePageProps): Promise<JSX.Element> {
  const venueId = Number(params.venueId)

  // const venue = await db.query.venues.findFirst({
  //   where: eq(venues.id, venueId),
  // })

  // if (!venue) {
  //   notFound()
  // }

  const { page, per_page, venue_page } = searchParams

  // menuItems transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  // const mennuItemsTransaction = await getMenuItemsAction({
  //   limit: limit,
  //   offset: offset,
  //   venue_ids: String(venueId),
  // })

  return (
    <Shell>
      {/* VenueNav */}
      <nav className="flex gap-7 border-b pb-2 text-[15px]">
        <Link href="/venue/floor-no-2">Overview</Link>
        <Link href="/venue/floor-no-2/menu">Menu</Link>
      </nav>

      {/* VenueTitle */}
      <div className="mt-4 border-b pb-6">
        {/* <h1 className="text-[50px] font-bold">{venue.name}</h1> */}
      </div>

      {/* VenueRating */}
      <div className="flex items-end gap-6">
        <div className="ratings mt-2 flex items-center gap-3">
          <p>*****</p>
          <p className="text-[15px]">4.9</p>
        </div>
        <div>
          <p className="text-[15px]">600 reviews</p>
        </div>
      </div>

      {/* VenueDescription */}
      <div>
        {/* <p className="text-[18px] font-light">{venue.description}</p> */}
      </div>

      {/* VenueImages */}
      <div>
        <h1 className="mb-7 mt-10 border-b pb-5 text-[25px] font-bold">
          4 photos
        </h1>
        <div className="flex flex-wrap">
          <Image
            src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371155.webp"
            alt="restaurant image 1"
            className="h-[176px] w-[224px]"
            height={176}
            width={224}
          />

          <Image
            src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371156.webp"
            alt="restaurant image 2"
            className="h-[176px] w-[224px]"
            height={176}
            width={224}
          />

          <Image
            src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371157.webp"
            alt="restaurant image 3"
            className="h-[176px] w-[224px]"
            height={176}
            width={224}
          />

          <Image
            src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371159.webp"
            alt="restaurant image 4"
            className="h-[176px] w-[224px]"
            height={176}
            width={224}
          />
        </div>
      </div>

      {/* VenueReviews */}
      <div>
        <h1 className="my-10 mb-7 border-b pb-5 text-[25px] font-bold">
          What 100 people are saying
        </h1>

        <div>
          <VenueReviewCard />
        </div>
      </div>
    </Shell>
  )
}
