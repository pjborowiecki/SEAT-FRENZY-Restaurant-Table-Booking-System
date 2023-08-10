// import { prisma } from "@/db/prisma"
// import type { Venue, VenueBySlug } from "@/types"

// export const fetchVenues = async (): Promise<Venue[]> => {
//   const venues = await prisma.venue.findMany({
//     select: {
//       id: true,
//       slug: true,
//       name: true,
//       main_image: true,
//       cuisine: true,
//       location: true,
//       fanciness: true,
//     },
//   })

//   if (!venues) {
//     throw new Error("No venues found")
//   }

//   return venues
// }

// export const fetchVenueBySlug = async (slug: string): Promise<VenueBySlug> => {
//   const venue = await prisma.venue.findUnique({
//     where: {
//       slug,
//     },
//     select: {
//       id: true,
//       slug: true,
//       name: true,
//       description: true,
//       main_image: true,
//       images: true,
//     },
//   })

//   if (!venue) {
//     throw new Error("Venue not found")
//   }

//   return venue
// }
