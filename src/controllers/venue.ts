import { prisma } from "@/db/prisma"
import type { Venue } from "@/types"

export const fetchVenues = async (): Promise<Venue[]> => {
  return await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      fanciness: true,
      slug: true,
    },
  })
}
