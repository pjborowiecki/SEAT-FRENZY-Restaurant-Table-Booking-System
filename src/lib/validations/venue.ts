import { venues } from "@/db/schema"
import * as z from "zod"

export const venueSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  openTime: z
    .enum(venues.openTime.enumValues, {
      required_error: "Please select a valid opening time",
    })
    .default(venues.openTime.enumValues[4]),
  closeTime: z
    .enum(venues.closeTime.enumValues, {
      required_error: "Please select a valid priciness level",
    })
    .default(venues.closeTime.enumValues[4]),
  priciness: z
    .enum(venues.priciness.enumValues, {
      required_error: "Please select a valid priciness level",
    })
    .default(venues.priciness.enumValues[1]),
  // cuisine: z
  //   .string()
  //   .min(1, { message: "Cuisine must be at least 1 character long" })
  //   .max(100, { message: "Cuisine must be at most 100 characters long" }),
  // location: z
  //   .string()
  //   .min(1, { message: "Location must be at least 1 character long" })
  //   .max(100, { message: "Location must be at most 100 characters long" }),
  cuisineId: z
    .number()
    .int()
    .min(1, {
      message: "CuisineId must be an integer between 1 and 7 inclusive",
    })
    .max(7, {
      message: "CuisineId must be an integer between 1 and 7 inclusive",
    }),
  locationId: z
    .number()
    .int()
    .min(1, {
      message: "CuisineId must be an integer between 1 and 7 inclusive",
    })
    .max(7, {
      message: "CuisineId must be an integer between 1 and 7 inclusive",
    }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Images must be provided as an array of items of the File type")
    .optional()
    .nullable()
    .default(null),
})
