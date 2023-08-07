import { MakeBookingForm } from "@/components/forms/make-booking-form"

export function BookingWidget() {
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="border-b text-center">
        <h4 className="py-[12px] text-[18px] font-bold">Make a Booking</h4>
      </div>
      <MakeBookingForm />
    </div>
  )
}
