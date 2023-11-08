"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Venue } from "@/db/schemas/venues.schema"

import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export function SearchBar(): JSX.Element {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const [data, setData] = React.useState<
    | {
        category: Venue["name"]
        products: Pick<Venue, "id" | "name">[]
      }[]
    | null
  >(null)

  // React.useEffect(() => {
  //   if (debouncedQuery.length === 0) setData(null)

  //   if (debouncedQuery.length > 0) {
  //     startTransition(async () => {
  //       const data = await filterVenuesAction(debouncedQuery)
  //       setData(data)
  //     })
  //   }
  // }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 md:h-10 md:w-[650px] md:justify-start md:px-3 md:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 md:mr-2" aria-hidden="true" />
        <span className="hidden md:inline-flex">Search venues...</span>
        <span className="sr-only">Search venues</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <abbr title={"Control"}>{"Ctrl+"}</abbr>K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search venues..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No venues found
          </CommandEmpty>
          {
            isPending ? (
              <div className="space-y-1 overflow-hidden px-1 py-2">
                <Skeleton className="h-4 w-10 rounded" />
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
              </div>
            ) : null
            // data?.map((group) => (
            //   <CommandGroup
            //     key={group.category}
            //     className="capitalize"
            //     heading={group.category}
            //   >
            //     {group.products.map((item) => (
            //       <CommandItem
            //         key={item.id}
            //         onSelect={() =>
            //           handleSelect(() => router.push(`/venue/${item.id}`))
            //         }
            //       >
            //         {item.name}
            //       </CommandItem>
            //     ))}
            //   </CommandGroup>
            // ))
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}
