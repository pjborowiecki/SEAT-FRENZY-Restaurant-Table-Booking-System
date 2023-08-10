"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { menuItems, venues, type Venue } from "@/db/schema"
import { asc, desc, eq, sql } from "drizzle-orm"
import { toast } from "sonner"
import type { z } from "zod"

import { slugify } from "@/lib/utils"
import type { venueSchema } from "@/lib/validations/venue"

export async function getVenuesAction(input: {
  description?: string
  limit?: number
  offset?: number
  sort?: `${keyof Venue | "name"}.${"asc" | "desc"}`
  userId?: string
}) {
  const limit = input.limit ?? 10
  const offset = input.offset ?? 0
  const [column, order] =
    (input.sort?.split("-") as [
      keyof Venue | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select({
        id: venues.id,
        name: venues.name,
        description: venues.description,
      })
      .from(venues)
      .limit(limit)
      .offset(offset)
      .leftJoin(menuItems, eq(venues.id, menuItems.venueId))
      .groupBy(venues.id)
      .orderBy(
        input.sort === "name.asc"
          ? asc(sql<number>`count(*)`)
          : input.sort === "name.desc"
          ? desc(sql<number>`count(*)`)
          : column && column in venues
          ? order === "asc"
            ? asc(venues[column])
            : desc(venues[column])
          : desc(venues.createdAt)
      )

    const total = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(venues)

    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    }
  })

  return {
    items,
    total,
  }
}

export async function addVenueAction(input: z.infer<typeof venueSchema>) {
  const nameAlreadyTaken = await db.query.venues.findFirst({
    where: eq(venues.name, input.name),
  })

  if (nameAlreadyTaken) {
    // toast.error("Name already taken. Please choose another one.")
    throw new Error("Name already taken. Please choose another one.")
  }

  await db.insert(venues).values({
    name: input.name,
    description: input.description,
    openTime: input.openTime,
    closeTime: input.closeTime,
    slug: slugify(input.name),
  })

  revalidatePath("/dashboard/venues")
}

export async function getNextVenueIdAction() {}

export async function getPreviousVenueIdAction() {}
