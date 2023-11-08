import { Menu } from "@/components/menu/menu"
import { VenueNav } from "@/components/nav/venue-nav"

export default function RestaurantMenu(): JSX.Element {
  return (
    <div className="w-full rounded-md bg-white p-3 shadow-md">
      <VenueNav />
      <Menu />
    </div>
  )
}
