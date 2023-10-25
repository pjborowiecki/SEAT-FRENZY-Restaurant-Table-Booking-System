import { Menu } from "@/components/menu/menu"
import { VenueNav } from "@/components/venue-nav"

export default function RestaurantMenu() {
  return (
    <div className="w-full rounded-md bg-white p-3 shadow-md">
      <VenueNav />
      <Menu />
    </div>
  )
}
