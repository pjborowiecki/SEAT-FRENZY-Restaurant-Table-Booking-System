// import { PhoneNumberUtil } from 'google-libphonenumber';
import * as z from "zod"

/**
 * TODO
 * Test and finalise validation for the image field
 * Update the validatePhoneNumber function, currently generic, need to get google-libphonenumber working
 */

function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

function validatePhoneNumber(phone: string): boolean {
  const re = /^\+?[1-9]\d{1,14}$/
  return re.test(phone)
}

export const venueSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  email: z.string().refine(validateEmail, {
    message: "Invalid email address",
  }),
  phone: z.string().refine(validatePhoneNumber, {
    message: "Invalid phone number",
  }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
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
