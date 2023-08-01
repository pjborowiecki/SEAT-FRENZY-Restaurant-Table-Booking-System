import Image from "next/image"
import Link from "next/link"

export function VenueCardAlt() {
  return (
    <div className="flex border-b pb-5">
      <Image
        src="https://resizer.otstatic.com/v2/photos/xlarge/2/28373789.webp"
        alt="restaurant's dish image"
        className="w-[176px] rounded-md"
        width={176}
        height={176}
      />
      <div className="pl-5">
        <h2 className="text-[25px]">Aiana Restaurant Collective</h2>
        <div className="flex items-start gap-2">
          <div className="mb-2 flex">*****</div>
          <p className="text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex gap-4 text-[15px] font-light">
            <p>$$$</p>
            <p>Mexican</p>
            <p>Ottawa</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href="/restaurant/floor-no-2">View more information</Link>
        </div>
      </div>
    </div>
  )
}
