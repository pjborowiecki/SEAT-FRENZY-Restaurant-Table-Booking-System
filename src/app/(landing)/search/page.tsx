import { HeaderSearch } from "@/components/layouts/header-search"
import { SearchSidebar } from "@/components/old/search-sidebar"
import { VenueCardAlt } from "@/components/old/venue-card-alt"

export default function Search() {
  return (
    <>
      <HeaderSearch />
      <div className="m-auto flex w-2/3 items-start justify-between py-4">
        <SearchSidebar />

        <div className="w-5/6">
          <VenueCardAlt />
        </div>
      </div>
    </>
  )
}
