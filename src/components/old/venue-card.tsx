import Image from "next/image"
import Link from "next/link"

export function VenueCard() {
  return (
    <div className="m-3 h-[320px] w-[256px] cursor-pointer overflow-hidden rounded-md border">
      <Link href="/venue/floor-no-2">
        <Image
          src="https://resizer.otstatic.com/v2/photos/wide-huge/4/28916235.webp"
          alt="restaurant image"
          className="h-36 w-full"
          height={144}
          width={256}
        />
        <div className="p-3">
          <h3 className="mb-2 text-[22px] font-bold">
            Floor No 2 - Warsaw Marriott Hotel
          </h3>
          <div className="flex items-start">
            <div className="mb-2 flex">*****</div>
            <p className="ml-2">9 reviews</p>
          </div>

          {/* Venue Info */}
          <div className="flex gap-3 text-[15px] font-light capitalize">
            <p>Mediterranean</p>
            <p>$$$$</p>
            <p>Warsaw</p>
          </div>
          <p className="mt-1 text-sm font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  )
}
