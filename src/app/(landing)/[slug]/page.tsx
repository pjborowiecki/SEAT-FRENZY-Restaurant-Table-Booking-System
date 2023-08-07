import { BookingForm } from "@/components/old/booking-form"
import { HeaderBooking } from "@/components/old/header-booking"
import { Shell } from "@/components/shells/shell"

export default function Book() {
  return (
    <div className="h-screen border-t">
      <div className="m-auto w-3/5 py-9">
        <HeaderBooking />
        <BookingForm />
      </div>
    </div>
  )
}
