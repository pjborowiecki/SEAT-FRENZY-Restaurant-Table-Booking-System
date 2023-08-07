import { VenueReviewCard } from "@/components/venue-review-card"

export function VenueReviews() {
  return (
    <div>
      <h1 className="my-10 mb-7 border-b pb-5 text-[25px] font-bold">
        What 100 people are saying
      </h1>

      <div>
        <VenueReviewCard />
      </div>
    </div>
  )
}
