import Link from "next/link"

export function BookingForm() {
  return (
    <div className="mt-10 flex w-[660px] flex-wrap justify-between">
      <input
        type="text"
        placeholder="First name"
        className="mb-4 w-[320px] rounded-md border p-3"
      />
      <input
        type="text"
        placeholder="Last name"
        className="mb-4 w-[320px] rounded-md border p-3"
      />

      <input
        type="text"
        placeholder="Phone number"
        className="mb-4 w-[320px] rounded-md border p-3"
      />

      <input
        type="text"
        placeholder="Email"
        className="mb-4 w-[320px] rounded-md border p-3"
      />

      <input
        type="text"
        placeholder="Occasion (optional)"
        className="mb-4 w-[320px] rounded-md border p-3"
      />

      <input
        type="text"
        placeholder="Requests (optional)"
        className="mb-4 w-[320px] rounded-md border p-3"
      />

      <button className="w-full rounded-md bg-red-600 p-3 font-bold text-white disabled:bg-gray-300">
        Complete Reservation
      </button>
      <p className="mt-4">
        By clicking &quot;Complete Reservation&quot; you agree to the OpenTable{" "}
        <Link href="/">Terms of Use</Link> and{" "}
        <Link href="/">Privacy Policy</Link>. Standard text message rates may
        apply. You mat opt out of receiving text messages at any time.
      </p>
    </div>
  )
}
