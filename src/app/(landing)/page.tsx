import { Shell } from "@/components/shells/shell"
import { VenueCard } from "@/components/venue-card"

const dummyTestVenue = {
  id: 1,
  name: "Floor No 2 - Warsaw Marriott Hotel",
  description: "",
  slug: "floor-no-2",
  main_image:
    "https://resizer.otstatic.com/v2/photos/wide-huge/4/28916235.webp",
  images: [],
  open_time: "",
  close_time: "",
  location_id: 1,
  cuisine_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
  menu_items: [],
  cuisine: {},
  location: {},
}

export default function Home() {
  return (
    <Shell className="flex-wrap">
      <VenueCard venue={dummyTestVenue} />
    </Shell>
  )
}
