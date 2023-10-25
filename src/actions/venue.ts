"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { venues } from "@/db/schema"
import { venueSchema } from "@/validations/venue"
import { eq, sql } from "drizzle-orm"
import type { z } from "zod"

import { slugify } from "@/lib/utils"

export type VenueType = z.infer<typeof venueSchema>
export type VenueNameType = z.infer<(typeof venueSchema)["shape"]["name"]>
export type VenueDescriptionType = z.infer<
  (typeof venueSchema)["shape"]["description"]
>
export type VenuePhoneType = z.infer<(typeof venueSchema)["shape"]["phone"]>
export type VenueEmailType = z.infer<(typeof venueSchema)["shape"]["email"]>

/**
 * TODO
 * Add error handling for functions without it
 * Find out how drizzle deems success/failure when, for example, deleting a record
 */

export async function addVenueAction(venue: VenueType) {
  const validationResult = venueSchema.safeParse(venue)
  if (validationResult.success) {
    const result = await db.insert(venues).values({
      name: validationResult.data.name,
      slug: slugify(validationResult.data.name!!),
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      description: validationResult.data.description,
    })
    revalidatePath("/dashboard/venues")
  } else {
    throw new Error(
      "Validation failed: " + JSON.stringify(validationResult.error)
    )
  }
}

export async function deleteVenueAction(venueId: number) {
  const result = await db.delete(venues).where(eq(venues.id, venueId))
  return `Deleted venue ${venueId}`
}

export async function getVenueAction(venueId: number) {
  const result = await db.selectDistinct().from(venues)
  return JSON.stringify(result)
}

export async function getAllVenuesAction() {
  const [items, total] = await db.transaction(async (tx) => {
    const items = await tx.select().from(venues)
    const total = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(venues)
    return [items, Number(total[0]?.count) ?? 0]
  })
  return [items, total]
}

export async function setNameAction(venueId: number, newName: VenueNameType) {
  const validationResult = venueSchema.shape.name.safeParse(newName)
  if (validationResult.success) {
    const result = await db
      .update(venues)
      .set({ name: validationResult.data, updatedAt: new Date() })
      .where(eq(venues.id, venueId))
    return `Updated name to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

export async function setDescriptionAction(
  venueId: number,
  newDescription: VenueDescriptionType
) {
  const validationResult =
    venueSchema.shape.description.safeParse(newDescription)
  if (validationResult.success) {
    const result = await db
      .update(venues)
      .set({ description: validationResult.data, updatedAt: new Date() })
      .where(eq(venues.id, venueId))
    return `Updated description to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

export async function setPhoneAction(
  venueId: number,
  newPhone: VenuePhoneType
) {
  const validationResult = venueSchema.shape.description.safeParse(newPhone)
  if (validationResult.success) {
    const result = await db
      .update(venues)
      .set({ phone: validationResult.data, updatedAt: new Date() })
      .where(eq(venues.id, venueId))
    return `Updated phone number to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

export async function setEmailAction(
  venueId: number,
  newEmail: VenueEmailType
) {
  const validationResult = venueSchema.shape.email.safeParse(newEmail)
  if (validationResult.success) {
    const result = await db
      .update(venues)
      .set({ email: validationResult.data, updatedAt: new Date() })
      .where(eq(venues.id, venueId))
    return `Updated email address to ${validationResult.data} for venue ${venueId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}

// export async function getVenuesAction(input: {
//   description?: string
//   limit?: number
//   offset?: number
//   sort?: `${keyof Venue | "name"}.${"asc" | "desc"}`
//   userId?: string
// }) {
//   const limit = input.limit ?? 10
//   const offset = input.offset ?? 0
//   const [column, order] =
//     (input.sort?.split("-") as [
//       keyof Venue | undefined,
//       "asc" | "desc" | undefined,
//     ]) ?? []

//   const { items, total } = await db.transaction(async (tx) => {
//     const items = await tx
//       .select({
//         id: venues.id,
//         name: venues.name,
//         description: venues.description,
//       })
//       .from(venues)
//       .limit(limit)
//       .offset(offset)
//       .leftJoin(menuItems, eq(venues.id, menuItems.venueId))
//       .groupBy(venues.id)
//       .orderBy(
//         input.sort === "name.asc"
//           ? asc(sql<number>`count(*)`)
//           : input.sort === "name.desc"
//           ? desc(sql<number>`count(*)`)
//           : column && column in venues
//           ? order === "asc"
//             ? asc(venues[column])
//             : desc(venues[column])
//           : desc(venues.createdAt)
//       )

//     const total = await tx
//       .select({
//         count: sql<number>`count(*)`,
//       })
//       .from(venues)

//     return {
//       items,
//       total: Number(total[0]?.count) ?? 0,
//     }
//   })

//   return {
//     items,
//     total,
//   }
// }

// export async function addVenueAction(input: z.infer<typeof venueSchema>) {
//   const nameAlreadyTaken = await db.query.venues.findFirst({
//     where: eq(venues.name, input.name),
//   })

//   if (nameAlreadyTaken) {
//     // toast.error("Name already taken. Please choose another one.")
//     throw new Error("Name already taken. Please choose another one.")
//   }

//   await db.insert(venues).values({
//     name: input.name,
//     description: input.description,
//     openTime: input.openTime,
//     closeTime: input.closeTime,
//     slug: slugify(input.name),
//   })

//   revalidatePath("/dashboard/venues")
// }

// export async function getNextVenueIdAction() {}

// export async function getPreviousVenueIdAction() {}
