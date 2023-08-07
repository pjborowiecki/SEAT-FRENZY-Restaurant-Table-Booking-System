import { HeaderMain } from "@/components/layouts/headers/header-main"
import { Shell } from "@/components/shells/shell"
import { VenueCard } from "@/components/venue-card"

const dummyTestVenue = {
  id: 1,
  name: "Floor No 2 - Warsaw Marriott Hotel",
  description:
    "Located in the very heart of Warsaw, Floor No 2 Restaurant with unique view of the city skyline offers a contemporary a breakfast venue and regular restaurant with Mediterranean cuisine for launch and dinners. Besides the restaurant Floor No 2 focus on individual, personalized service and unique atmosphere that is perfectly suitable for meetings, lunches, dinners and corporate parties - you name it, we can do it! Also, we have private dining spaces, suitable for parties or meeting of up to 20 seated guests.",
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
    <>
      <HeaderMain />
      <Shell className="flex-wrap">
        <VenueCard venue={dummyTestVenue} />
      </Shell>
    </>
  )
}
