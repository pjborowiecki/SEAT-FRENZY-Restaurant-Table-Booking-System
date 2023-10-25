import * as z from "zod"

export const cuisineSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Cuisine name must be at least 1 character long" })
    .max(20, { message: "Cuisine name must be at most 20 characters long" }),
})
