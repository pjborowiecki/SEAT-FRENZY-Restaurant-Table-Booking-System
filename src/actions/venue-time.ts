"use server"

import { db } from "@/db"
import { venueTimes } from "@/db/schema"
import { venueTimeSchema } from "@/validations/venue-time"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export type VenueTimeType = z.infer<typeof venueTimeSchema>
export type VenueTimeDayType = z.infer<(typeof venueTimeSchema)["shape"]["day"]>
export type VenueTimeOpeningType = z.infer<
  (typeof venueTimeSchema)["shape"]["openingTime"]
>
export type VenueTimeClosingType = z.infer<
  (typeof venueTimeSchema)["shape"]["closingTime"]
>

export async function addVenueTimeAction(venueTimeId: VenueTimeType) {
  const validationResult = venueTimeSchema.safeParse(venueTimeId)
  if (validationResult.success) {
    const result = await db.insert(venueTimes).values({
      venueId: validationResult.data.venueId,
      day: validationResult.data.day,
      openingTime: validationResult.data.openingTime,
      closingTime: validationResult.data.closingTime,
    })
    return `Successfully added ${validationResult.data.day} opening times for venue ${validationResult.data.venueId}`
  } else {
    throw new Error(
      "Validation failed: " + JSON.stringify(validationResult.error)
    )
  }
}

export async function deleteVenueTimeAction(venueTimeId: number) {
  const result = await db
    .delete(venueTimes)
    .where(eq(venueTimes.id, venueTimeId))
  return `Deleted venue opening times with id ${venueTimeId}`
}

export async function getVenueTimeAction(venueTimeId: number) {
  const result = await db
    .select()
    .from(venueTimes)
    .where(eq(venueTimes.id, venueTimeId))
  return JSON.stringify(result)
}

export async function getTimeForVenueAction(
  venueId: number,
  day: VenueTimeDayType
) {
  const result = await db
    .select()
    .from(venueTimes)
    .where(eq(venueTimes.venueId, venueId) && eq(venueTimes.day, day))
  return JSON.stringify(result)
}

export async function getAllTimesForVenueAction(venueId: number) {
  const result = await db
    .select()
    .from(venueTimes)
    .where(eq(venueTimes.venueId, venueId))
  return JSON.stringify(result)
}

export async function setOpeningTimeAction(
  venueId: number,
  day: VenueTimeDayType,
  newOpeningTime: VenueTimeOpeningType
) {
  const validationResult =
    venueTimeSchema.shape.openingTime.safeParse(newOpeningTime)
  if (validationResult.success) {
    const result = await db
      .update(venueTimes)
      .set({ openingTime: validationResult.data, updatedAt: new Date() })
      .where(eq(venueTimes.venueId, venueId) && eq(venueTimes.day, day))
    return `Updated opening time to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

export async function setClosingTimeAction(
  venueId: number,
  day: VenueTimeDayType,
  newClosingTime: VenueTimeClosingType
) {
  const validationResult =
    venueTimeSchema.shape.closingTime.safeParse(newClosingTime)
  if (validationResult.success) {
    const result = await db
      .update(venueTimes)
      .set({ closingTime: validationResult.data, updatedAt: new Date() })
      .where(eq(venueTimes.venueId, venueId) && eq(venueTimes.day, day))
    return `Updated closing time to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

// Example of a data analysis function for the future

const timeToMinutes = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number)
  return hours!! * 60 + minutes!! + seconds!! / 60
}

const minutesToTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60)
  const mins = Math.floor(minutes) % 60
  const secs = Math.round((minutes % 1) * 60)
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export async function getAverageOpeningAction() {
  const results = await db.select().from(venueTimes)
  const totalMinutes = results.reduce((acc, result) => {
    return acc + timeToMinutes(result.openingTime)
  }, 0)
  const averageMinutes = totalMinutes / results.length
  return minutesToTime(averageMinutes)
}
