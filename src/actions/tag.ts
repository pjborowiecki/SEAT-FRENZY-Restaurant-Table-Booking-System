"use server"

import { db } from "@/db"
import { tags } from "@/db/schema"
import { tagSchema } from "@/validations/tag"
import { eq } from "drizzle-orm"
import type { z } from "zod"

export type TagType = z.infer<typeof tagSchema>
export type TagNameType = z.infer<(typeof tagSchema)["shape"]["name"]>

/**
 * TODO
 * See cuisine.ts
 */

export async function addTagAction(tag: TagType) {
  const validationResult = tagSchema.safeParse(tag)
  if (validationResult.success) {
    const result = await db.insert(tags).values({
      name: validationResult.data.name,
    })
    return `Successfully added tag ${validationResult.data.name}`
  } else {
    throw new Error(
      "Validation failed: " + JSON.stringify(validationResult.error)
    )
  }
}

export async function deleteTagAction(tagId: number) {
  const result = await db.delete(tags).where(eq(tags.id, tagId))
  return `Deleted tag ${tagId}`
}

export async function getTagAction(tagId: number) {
  const result = await db.select().from(tags).where(eq(tags.id, tagId))
  return JSON.stringify(result)
}

export async function getAllTagsAction() {
  const result = await db.select().from(tags)
  return JSON.stringify(result)
}

export async function setNameAction(tagId: number, newName: TagNameType) {
  const validationResult = tagSchema.shape.name.safeParse(newName)
  if (validationResult.success) {
    const result = await db
      .update(tags)
      .set({ name: validationResult.data, updatedAt: new Date() })
      .where(eq(tags.id, tagId))
    return `Updated name to ${validationResult.data} for tag ${tagId}`
  } else {
    throw new Error(
      `Validation failed: ${JSON.stringify(validationResult.error)}`
    )
  }
}
