"use server"

import { db } from "@/db"
import { cuisines } from "@/db/schema"
import { cuisineSchema } from "@/validations/cuisine"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export type CuisineType = z.infer<typeof cuisineSchema>
export type CuisineNameType = z.infer<(typeof cuisineSchema)["shape"]["name"]>

/**
 * TODO
 * Probably don't need both of the types above, but best to stay consistent right?
 */

export async function addCuisineAction(cuisine: CuisineType) {
  const validationResult = cuisineSchema.safeParse(cuisine)
  if (validationResult.success) {
    const result = await db.insert(cuisines).values({
      name: validationResult.data.name,
    })
    return `Successfully added cuisine ${validationResult.data.name}`
  } else {
    throw new Error(
      "Validation failed: " + JSON.stringify(validationResult.error)
    )
  }
}

export async function deleteCuisineAction(cuisineId: number) {
  const result = await db.delete(cuisines).where(eq(cuisines.id, cuisineId))
  return `Deleted cuisine ${cuisineId}`
}

export async function getCuisineAction(cuisineId: number) {
  const result = await db
    .select()
    .from(cuisines)
    .where(eq(cuisines.id, cuisineId))
  return JSON.stringify(result)
}

export async function getAllCuisinesAction() {
  const result = await db.select().from(cuisines)
  return JSON.stringify(result)
}

export async function setNameAction(
  cuisineId: number,
  newName: CuisineNameType
) {
  const validationResult = cuisineSchema.shape.name.safeParse(newName)
  if (validationResult.success) {
    const result = await db
      .update(cuisines)
      .set({ name: validationResult.data, updatedAt: new Date() })
      .where(eq(cuisines.id, cuisineId))
    return `Updated name to ${validationResult.data} for cuisine ${cuisineId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}
