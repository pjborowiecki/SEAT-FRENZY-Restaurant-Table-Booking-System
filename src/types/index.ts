import type { Cuisine, FANCINESS, Location } from "@prisma/client"

export interface Venue {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  fanciness: FANCINESS
  slug: string
}
