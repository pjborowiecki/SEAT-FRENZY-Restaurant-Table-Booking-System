export function VenueReviewCard(): JSX.Element {
  return (
    <div className="mb-7 border-b pb-7">
      <div className="flex">
        <div className="flex w-1/6 flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-400">
            <h2 className="text-[18px] text-white">JB</h2>
          </div>
          <p className="mt-2 text-center text-[12px]">Joe Biden</p>
        </div>
        <div className="ml-10 w-5/6">
          <div className="flex items-center gap-5">
            <div className="flex">*****</div>
          </div>
          <div className="">
            <p className="text-[15px] font-light">
              Very good service and meal with a friendly waitress and
              knowledgeable manager. Only downside was nobody seemed to know
              when the Skybar was opening due to the South Korean president
              visit but maybe next time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
