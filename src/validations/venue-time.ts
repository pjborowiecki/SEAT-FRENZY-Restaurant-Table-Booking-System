import { db } from "@/db"
import { venues } from "@/db/schema"
import { sql } from "drizzle-orm"
import * as z from "zod"

/**
 * TODO
 * There probably is a better way to handle checking for a valid venue
 * I'm still not sure how exactly drizzle deems failures, maybe it isn't null that's returned?
 * Also, we may not even need the venue validation, need to research what level the drizzle foreign keys work on
 * Wait, I could test this by adding one
 * Not sure why I'm writing out my thoughts now but have fun reading it :D
 * Ok, the relations in drizzle are not checked at runtime or something, don't act as foreign keys
 * Will need to add the check in here for venueId then
 * Will also need to make isValidVenue async/await, but then change safeParse in the add action to parseAsync or something
 * Have fun with this part ;)
 */

function isValidTime(time: string): boolean {
  const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
  return re.test(time)
}

async function isValidVenue(venueId: number) {
  const id = await db.execute(
    sql`select * from ${venues} where ${venues.id} = ${venueId}`
  )
  return id != null
}

export const venueTimeSchema = z.object({
  venueId: z.number().refine(isValidVenue, {
    message: "Invalid venue ID",
  }),
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  openingTime: z.string().refine(isValidTime, {
    message: "Invalid time format, must be HH:MM:SS",
  }),
  closingTime: z.string().refine(isValidTime, {
    message: "Invalid time format, must be HH:MM:SS",
  }),
})
