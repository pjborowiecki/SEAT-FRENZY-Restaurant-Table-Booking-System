import * as auth from "@/db/schemas/auth.schema"
import * as bookings from "@/db/schemas/bookings.schema"
import * as venues from "@/db/schemas/venues.schema"
import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

const schema = { ...auth, bookings, venues }

const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
})

export const db = drizzle(connection, { schema })
