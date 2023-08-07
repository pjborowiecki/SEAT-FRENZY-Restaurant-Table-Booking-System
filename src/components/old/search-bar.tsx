"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = React.useState<string>("")
  return (
    <div className="m-auto flex justify-center py-3 text-left text-[18px]">
      <input
        type="text"
        placeholder="State, city, or town"
        value={location}
        className="mr-3 w-[450px] rounded-md p-2 text-[18px]"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="rounded-md bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          router.push("/search")
        }}
      >
        Let&apos;s go
      </button>
    </div>
  )
}
