"use server"

import { db } from "@/db"
import { dietary } from "@/db/schema"
import { dietarySchema } from "@/validations/dietary"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export type DietaryType = z.infer<typeof dietarySchema>
export type DietaryNameType = z.infer<(typeof dietarySchema)["shape"]["name"]>

/**
 * TODO
 * See cuisine.ts
 */

export async function addCuisineAction(dietaryTag: DietaryType) {
  const validationResult = dietarySchema.safeParse(dietaryTag)
  if (validationResult.success) {
    const result = await db.insert(dietary).values({
      name: validationResult.data.name,
    })
    return `Successfully added dietary tag ${validationResult.data.name}`
  } else {
    throw new Error(
      "Validation failed: " + JSON.stringify(validationResult.error)
    )
  }
}

export async function deleteCuisineAction(dietaryId: number) {
  const result = await db.delete(dietary).where(eq(dietary.id, dietaryId))
  return `Deleted cuisine ${dietaryId}`
}

export async function getCuisineAction(dietaryId: number) {
  const result = await db
    .select()
    .from(dietary)
    .where(eq(dietary.id, dietaryId))
  return JSON.stringify(result)
}

export async function getAllCuisinesAction() {
  const result = await db.select().from(dietary)
  return JSON.stringify(result)
}

export async function setNameAction(
  dietaryId: number,
  newName: DietaryNameType
) {
  const validationResult = dietarySchema.shape.name.safeParse(newName)
  if (validationResult.success) {
    const result = await db
      .update(dietary)
      .set({ name: validationResult.data, updatedAt: new Date() })
      .where(eq(dietary.id, dietaryId))
    return `Updated dietary tag to ${validationResult.data} for cuisine ${dietaryId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}
