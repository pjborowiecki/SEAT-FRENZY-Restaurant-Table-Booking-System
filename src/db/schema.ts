import type { StoredFile } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import {
  date,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  real,
  serial,
  text,
  time,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

/**
 * TODO
 * Research into better ways to do the opening/closing times table (if needed)
 * Research and implement location table, maybe with Google Places
 * Decide if we need to make description non null in the venue table, this could be something they can update later?
 * Maybe move back to nextjs authorisation instead of using clerk now?
 * Not sure if time is the best type to use for opening/closing times
 * Review rating options for reviews
 * Add a junction table for menuitems/venues before adding that table back
 * Think about whether or not to change all time types to datetime or timestamp?
 * Add actions and validations for junctions (see venue-time.ts validation first)
 */

// MODELS

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerkId", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }),
  emailAddress: varchar("emailAddress", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const venues = mysqlTable("venues", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  description: text("description").notNull(),
  images: json("images").$type<StoredFile[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const venueTimes = mysqlTable("venueTimes", {
  id: serial("id").primaryKey(),
  venueId: int("venueId").notNull(),
  day: mysqlEnum("day", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).notNull(),
  openingTime: time("openingTime").notNull(),
  closingTime: time("closingTime").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (t) => ({
  unq: unique().on(t.venueId, t.day),
}))

export const cuisines = mysqlTable("cuisines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const tags = mysqlTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const dietary = mysqlTable("dietary", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// JUNCTIONS

export const venuesToCuisines = mysqlTable("venuesToCuisines", {
    venueId: int("venueId").notNull(),
    cuisineId: int("cuisineId").notNull(),
  }, (t) => ({
    key: primaryKey(t.venueId, t.cuisineId),
  }),
)

export const venuesToTags = mysqlTable("venuesToTags", {
  venueId: int("venueId").notNull(),
  tagId: int("tagId").notNull(),
}, (t) => ({
  key: primaryKey(t.venueId, t.tagId),
}),
)

export const venuesToDietary = mysqlTable("venuesToDietary", {
  venueId: int("venueId").notNull(),
  dietaryId: int("dietaryId").notNull(),
}, (t) => ({
  key: primaryKey(t.venueId, t.dietaryId),
}),
)

// RELATIONS

export const venuesRelations = relations(venues, ({ many }) => ({
  venueOpeningTimes: many(venueTimes),
  venuesToCuisines: many(venuesToCuisines),
  venuesToTags: many(venuesToTags),
  venuesToDietary: many(venuesToDietary),
}))

export const cuisinesRelations = relations(cuisines, ({ many }) => ({
  venuesToCuisines: many(venuesToCuisines)
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  venuesToTags: many(venuesToTags)
}))

export const dietaryRelations = relations(tags, ({ many }) => ({
  venuesToDietary: many(venuesToDietary)
}))

export const venueTimesRelations = relations(venueTimes, ({ one }) => ({
  venue: one(venues, {
    fields: [venueTimes.venueId],
    references: [venues.id]
  })
}))

export const venuesToCuisinesRelations = relations(venuesToCuisines, ({ one }) => ({
  venue: one(venues, {
    fields: [venuesToCuisines.venueId],
    references: [venues.id]
  }),
  cuisine: one(cuisines, {
    fields: [venuesToCuisines.cuisineId],
    references: [cuisines.id]
  }),
}))

export const venuesToTagsRelations = relations(venuesToTags, ({ one }) => ({
  venue: one(venues, {
    fields: [venuesToTags.venueId],
    references: [venues.id],
  }),
  tag: one(tags, {
    fields: [venuesToTags.tagId],
    references: [tags.id],
  }),
}))

export const venuesToTagsDietary = relations(venuesToDietary, ({ one }) => ({
  venue: one(venues, {
    fields: [venuesToDietary.venueId],
    references: [venues.id],
  }),
  dietary: one(dietary, {
    fields: [venuesToDietary.dietaryId],
    references: [dietary.id],
  }),
}))

// TYPES

export type User = InferModel<typeof users>
export type Venue = InferModel<typeof venues>
export type VenueTimes = InferModel<typeof venueTimes>
export type Cuisine = InferModel<typeof cuisines>
export type Tags = InferModel<typeof tags>
export type Dietary = InferModel<typeof dietary>

// Tables to add review and add with validation and actions
/*
export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  venueId: int("venueId").notNull(),
  tableId: int("tableId"),
  people: int("people").notNull(),
  price: decimal("price").notNull(),
  bookingDate: date("bookingDate").notNull(),
  bookingTime: time("bookingTime").notNull(),
  status: mysqlEnum("status", ["Upcoming", "Now", "Future"]),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  userId: int("userId").notNull(),
  venueId: int("venueId").notNull(),
  content: text("description"),
  service: real("service").notNull().default(2.5),
  priciness: real("priciness").notNull().default(2.5),
  location: real("location").notNull().default(2.5),
  food: real("food").notNull().default(2.5),
  atmosphere: real("atmosphere").notNull().default(2.5),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const menuItems = mysqlTable("menuItems", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: varchar("price", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  venueId: int("venueId").notNull(),
})

export const staff = mysqlTable("tables", {
  id: serial("id").primaryKey(),
  venueId: int("venueId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const tables = mysqlTable("tables", {
  id: serial("id").primaryKey(),
  venueId: int("venueId").notNull(),
  capacity: int("capacity"),
  tableNumber: int("tableNumber").notNull(),
  location: mysqlEnum("location", ["inside", "outside"]),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})
*/
