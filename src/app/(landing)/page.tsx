import { fetchVenues } from "@/controllers/venue"
import { HeaderMain } from "@/components/layouts/headers/header-main"
import { Shell } from "@/components/shells/shell"
import { VenueCard } from "@/components/venue-card"

export default async function Home() {
  const venues = await fetchVenues()

  console.log({ venues })
  return (
    <>
      <HeaderMain />
      <Shell className="flex flex-wrap justify-center">
        {venues.map((venue) => (
          <VenueCard venue={venue} key={venue.id} />
        ))}
      </Shell>
    </>
  )
}
