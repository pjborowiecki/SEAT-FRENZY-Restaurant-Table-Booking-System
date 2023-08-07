import Link from "next/link"

export function VenueNav() {
  return (
    <nav className="flex gap-7 border-b pb-2 text-[15px]">
      <Link href="/venue/floor-no-2">Overview</Link>
      <Link href="/venue/floot-no-2/menu">Menu</Link>
    </nav>
  )
}
