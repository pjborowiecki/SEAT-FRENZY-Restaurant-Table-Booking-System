import Image from "next/image"

export function VenueImages() {
  return (
    <div>
      <h1 className="mb-7 mt-10 border-b pb-5 text-[25px] font-bold">
        4 photos
      </h1>
      <div className="flex flex-wrap">
        <Image
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371155.webp"
          alt="restaurant image 1"
          className="h-[176px] w-[224px]"
          height={176}
          width={224}
        />

        <Image
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371156.webp"
          alt="restaurant image 2"
          className="h-[176px] w-[224px]"
          height={176}
          width={224}
        />

        <Image
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371157.webp"
          alt="restaurant image 3"
          className="h-[176px] w-[224px]"
          height={176}
          width={224}
        />

        <Image
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/28371159.webp"
          alt="restaurant image 4"
          className="h-[176px] w-[224px]"
          height={176}
          width={224}
        />
      </div>
    </div>
  )
}
