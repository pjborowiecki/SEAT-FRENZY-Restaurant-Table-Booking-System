"use client"

export function BookingWidget() {
  return (
    <div className="relative w-[27%] text-[15px]">
      <div className="fixed w-[15%] rounded-md bg-white p-3 shadow-md">
        <div className="border-b pb-2 text-center font-bold">
          <h4 className="mr-7 text-[18px]">Make a Reservation</h4>
        </div>

        {/* PARTY SIZE */}
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select name="" id="" className="border-b py-3 font-light">
            <option value="">1 person</option>
            <option value="">2 people</option>
            <option value="">3 people</option>
          </select>
        </div>

        <div className="flex justify-between">
          {/* DATE */}
          <div className="flex w-[48%] flex-col">
            <label htmlFor="">Date</label>
            <input type="text" className="w-[112px] border-b py-3 font-light" />
          </div>

          {/* TIME */}
          <div className="flex w-[48%] flex-col">
            <label htmlFor="">Time</label>
            <select name="" id="" className="border-b py-3 font-light">
              <option value="">7:00 PM</option>
              <option value="">8:00 PM</option>
              <option value="">9:00 PM</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-5">
          <button className="h-[64px] w-full rounded-md bg-red-600 px-4 font-bold text-white">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  )
}
