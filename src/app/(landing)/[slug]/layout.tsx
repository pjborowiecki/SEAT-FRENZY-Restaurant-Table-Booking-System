import { HeaderVenue } from "@/components/layouts/headers/header-venue"

interface VenueLayoutProps {
  children: React.ReactNode
}

export default function VenueLayout({ children }: VenueLayoutProps) {
  return (
    <>
      <HeaderVenue />
      <div>{children}</div>
    </>
  )
}
