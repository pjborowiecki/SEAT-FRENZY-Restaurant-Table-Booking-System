import { HeaderMain } from "@/components/layouts/header-main"
import { VenueCard } from "@/components/venue/venue-card"

export default function Home() {
  return (
    <main>
      <HeaderMain />
      <div className="mt-10 flex flex-wrap px-36 py-3">
        <VenueCard />
      </div>
    </main>
  )
}
