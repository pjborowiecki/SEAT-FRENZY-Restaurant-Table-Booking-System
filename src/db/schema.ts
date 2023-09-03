import type { StoredFile } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import {
  date,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  real,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

/* TODO
 Research relations more, figure out what to do with tags/cuisine etc
 Figure out how to handle opening and closing times
 I'm thinking of having a table that stores days of the week, then one storing opening closing times for restaurants linked to days with a relation?
*/

const timeValues = mysqlEnum("timeValues", [
  "00:00:00",
  "00:30:00",
])

// MODELS

// Define a new table for venue opening hours
export const venueOpeningTimes = mysqlTable("venueOpeningTimes", {
  id: serial("id").primaryKey(),
  venueId: int("venueId").notNull(),
  day: mysqlEnum("day", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).notNull(),
  openingTime: timeValues,
  closingTime: time("closingTime").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

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
  // addressId: int("locationId").notNull().default(1),
  cuisineId: int("cuisineId").notNull(),
  images: json("images").$type<StoredFile[] | null>().default(null),
  // tags: varchar("tags", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// export const bookings = mysqlTable("bookings", {
//   id: serial("id").primaryKey(),
//   userId: int("userId").notNull(),
//   venueId: int("venueId").notNull(),
//   tableId: int("tableId"),
//   people: int("people").notNull(),
//   price: decimal("price").notNull(),
//   bookingDate: date("bookingDate").notNull(),
//   bookingTime: time("bookingTime").notNull(),
//   status: mysqlEnum("status", ["Upcoming", "Now", "Future"]),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// find out how addresses are returned from Google Places
/*
export const locations = mysqlTable("locations", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})
*/

// export const cuisines = mysqlTable("cuisines", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// export const dietary = mysqlTable("dietary", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// Think if we need to add any other rating options here, I think 5 is a good amount
// I'm tempted to say we do not need a default value here, if they are leaving a review the values should be mandatory anyway
// export const reviews = mysqlTable("reviews", {
//   id: serial("id").primaryKey(),
//   userId: int("userId").notNull(),
//   venueId: int("venueId").notNull(),
//   content: text("description"),
//   service: real("service").notNull().default(2.5),
//   priciness: real("priciness").notNull().default(2.5),
//   location: real("location").notNull().default(2.5),
//   food: real("food").notNull().default(2.5),
//   atmosphere: real("atmosphere").notNull().default(2.5),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// export const menuItems = mysqlTable("menuItems", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   description: text("description").notNull(),
//   price: varchar("price", { length: 255 }).notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
//   venueId: int("venueId").notNull(),
// })

// export const staff = mysqlTable("tables", {
//   id: serial("id").primaryKey(),
//   venueId: int("venueId").notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   role: varchar("role", { length: 255 }).notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// Do we keep locations as an enum? Maybe a separate table? Depends how specific we allow them to be
// export const tables = mysqlTable("tables", {
//   id: serial("id").primaryKey(),
//   venueId: int("venueId").notNull(),
//   capacity: int("capacity"),
//   tableNumber: int("tableNumber").notNull(),
//   location: mysqlEnum("location", ["inside", "outside"]),
//   createdAt: timestamp("createdAt").defaultNow(),
//   updatedAt: timestamp("updatedAt").defaultNow(),
// })

// RELATIONS
// export const usersRelations = relations(users, ({ many }) => ({
//   // bookings: many(bookings),
//   venues: many(venues),
// }))

// export const venuesRelations = relations(venues, ({ many, one }) => ({
// tables: many(tables),
// menuItems: many(menuItems),
// staff: many(staff),
// reviews: many(reviews),
// bookings: many(bookings),
// locations: one(locations, {
//   fields: [venues.id],
//   references: [locations.id],
// }),
// cuisines: one(cuisines, {
//   fields: [venues.id],
//   references: [cuisines.id],
// }),
// dietary: one(dietary, {
//   fields: [venues.id],
//   references: [dietary.id],
// }),
// }))

// export const bookingsRelations = relations(bookings, ({ one }) => ({
//   venue: one(venues, {
//     fields: [bookings.venueId],
//     references: [venues.id],
//   }),
//   tables: one(tables, {
//     fields: [bookings.tableId],
//     references: [tables.id],
//   }),
// }))

// export const tablesRelations = relations(tables, ({ many, one }) => ({
//   bookings: many(bookings),
//   venue: one(venues, {
//     fields: [tables.venueId],
//     references: [venues.id],
//   }),
// }))

// export const menuItemsRelations = relations(menuItems, ({ one }) => ({
//   venue: one(venues, {
//     fields: [menuItems.venueId],
//     references: [venues.id],
//   }),
// }))

// export const staffRelations = relations(staff, ({ one }) => ({
//   venues: one(venues, {
//     fields: [staff.venueId],
//     references: [venues.id],
//   }),
// }))

// export const reviewsRelations = relations(reviews, ({ one }) => ({
//   venues: one(venues, {
//     fields: [reviews.venueId],
//     references: [venues.id],
//   }),
// }))

// export const cuisinesRelations = relations(cuisines, ({ many }) => ({
//   venues: many(venues),
// }))

// export const dietaryRelations = relations(dietary, ({ many }) => ({
//   venues: many(venues),
// }))

// export const locationsRelations = relations(locations, ({ one }) => ({
//   venues: one(venues),
// }))

// TYPES
export type User = InferModel<typeof users>
// export type Venue = InferModel<typeof venues>
// export type Booking = InferModel<typeof bookings>
// export type Dietary = InferModel<typeof dietary>
// export type Cuisine = InferModel<typeof cuisines>
// export type Review = InferModel<typeof reviews>
// export type MenuItem = InferModel<typeof menuItems>
// export type Staff = InferModel<typeof staff>
// export type Table = InferModel<typeof tables>
// export type Location = InferModel<typeof locations>
