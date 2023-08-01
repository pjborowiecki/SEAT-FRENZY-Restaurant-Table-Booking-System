import { BookingForm } from "@/components/forms/booking-form"
import { HeaderBooking } from "@/components/layouts/header-booking"

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
