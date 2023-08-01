import { HeaderVenue } from "@/components/layouts/header-venue"

interface VenueLayoutProps {
  children: React.ReactNode
}

export default function VenueLayout({ children }: VenueLayoutProps) {
  return (
    <div>
      <HeaderVenue />
      <div className="m-auto mt-[-44px] flex w-2/3 items-start justify-between">
        {children}
      </div>
    </div>
  )
}
