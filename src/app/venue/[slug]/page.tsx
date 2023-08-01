import { BookingWidget } from "@/components/booking-widget"
import { VenueDescription } from "@/components/venue/venue-description"
import { VenueImages } from "@/components/venue/venue-images"
import { VenueNav } from "@/components/venue/venue-nav"
import { VenueRating } from "@/components/venue/venue-rating"
import { VenueReviews } from "@/components/venue/venue-reviews"
import { VenueTitle } from "@/components/venue/venue-title"

export default function RestaurantDetails() {
  return (
    <>
      <div className="w-[70%] rounded-md bg-white p-3 shadow-md">
        <VenueNav />
        <VenueTitle />
        <VenueRating />
        <VenueDescription />
        <VenueImages />
        <VenueReviews />
      </div>

      <BookingWidget />
    </>
  )
}
