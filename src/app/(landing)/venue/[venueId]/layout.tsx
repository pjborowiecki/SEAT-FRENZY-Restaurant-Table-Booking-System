import { BookingWidget } from "@/components/booking-widget"
import { VenueHeader } from "@/components/nav/header-venue"
import { Shell } from "@/components/shells/shell"

interface VenueLayoutProps {
  children: React.ReactNode
}

export default function VenueLayout({
  children,
}: VenueLayoutProps): JSX.Element {
  return (
    <>
      <VenueHeader />
      <Shell className="relative flex items-start gap-6">
        <div className="mt-[-94px] w-[70%] rounded-md border bg-background">
          {/* TODO: Move Submneu from venu and menu pages here*/}

          {children}
        </div>

        {/* Left-hand Side Booking Widget */}
        <div className="sticky right-0 top-20 mt-[-96px] w-[30%] rounded-md border bg-background shadow-sm">
          <BookingWidget />
        </div>
      </Shell>
    </>
  )
}
