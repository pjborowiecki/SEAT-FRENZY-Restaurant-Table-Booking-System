import Image from "next/image"

export function HeaderBooking() {
  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="mt-5 flex">
        <Image
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/28373795.webp"
          alt="restaurant image"
          className="h-[72px] w-[128px] rounded-md"
          width={128}
          height={72}
        />
        <div className="ml-4">
          <h1 className="text-[25px] font-bold">Aiana Restaurant Collective</h1>
          <div className="mt-3 flex gap-6">
            <p>Tues, 22, 2023</p>
            <p>7:30 PM</p>
            <p>3 people</p>
          </div>
        </div>
      </div>
    </div>
  )
}
