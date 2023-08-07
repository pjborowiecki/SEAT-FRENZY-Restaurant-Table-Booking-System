import { VenueDescription } from "@/components/old/venue-description"
import { VenueImages } from "@/components/old/venue-images"
import { VenueNav } from "@/components/old/venue-nav"
import { VenueRating } from "@/components/old/venue-rating"
import { VenueReviews } from "@/components/old/venue-reviews"
import { VenueTitle } from "@/components/old/venue-title"
import { Shell } from "@/components/shells/shell"

export default function RestaurantDetails() {
  return (
    <Shell>
      {/* <div className="w-[70%] rounded-md bg-white p-3 shadow-md"> */}
      <VenueNav />
      <VenueTitle />
      <VenueRating />
      <VenueDescription />
      <VenueImages />
      <VenueReviews />
      {/* </div> */}
    </Shell>
  )
}
