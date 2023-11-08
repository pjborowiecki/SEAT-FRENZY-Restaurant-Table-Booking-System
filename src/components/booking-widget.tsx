import { AddBookingForm } from "@/components/forms/add-booking-form"

export function BookingWidget(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="border-b text-center">
        <h4 className="py-[12px] text-[18px] font-bold">Make a Booking</h4>
      </div>
      <AddBookingForm />
    </div>
  )
}
