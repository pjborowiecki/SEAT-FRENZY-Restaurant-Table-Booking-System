export function SearchSidebar() {
  return (
    <div className="w-1/5">
      {/* FILTERS */}
      <div className="border-b pb-4">
        {/* REGION FILTER */}
        <h1 className="mb-2">Region</h1>
        <p className="text-[15px] font-light">Toronto</p>
        <p className="text-[15px] font-light">Ottawa</p>
        <p className="text-[15px] font-light">Montreal</p>
        <p className="text-[15px] font-light">Kingston</p>
        <p className="text-[15px] font-light">Niagara</p>
      </div>

      {/* CUISINE FILTER */}
      <div className="mt-3 border-b pb-4">
        <h1 className="mb-2">Cuisine</h1>
        <p className="text-[15px] font-light">Mexican</p>
        <p className="text-[15px] font-light">Italian</p>
        <p className="text-[15px] font-light">Chinese</p>
      </div>

      {/* PRICE FILTER */}
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex text-[15px] font-light">
          <button className="w-full rounded-l border p-2">$</button>
          <button className="w-full border-y border-r p-2">$$</button>
          <button className="w-full rounded-r border-y border-r p-2">
            $$$
          </button>
        </div>
      </div>
    </div>
  )
}
