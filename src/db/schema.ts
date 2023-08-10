import type { StoredFile } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

// MODELS
export const venues = mysqlTable("venues", {
  id: serial("id").primaryKey(),
  slug: text("slug"),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  openTime: mysqlEnum("openTime", [
    "14:00:00.000Z",
    "15:00:00.000Z",
    "16:00:00.000Z",
    "17:00:00.000Z",
    "18:00:00.000Z",
    "19:00:00.000Z",
    "20:00:00.000Z",
  ])
    .notNull()
    .default("18:00:00.000Z"),
  // openTime: varchar("openTime", { length: 255 }).notNull(),
  closeTime: mysqlEnum("closeTime", [
    "21:00:00.000Z",
    "21:30:00.000Z",
    "22:00:00.000Z",
    "22:30:00.000Z",
    "23:00:00.000Z",
    "23:30:00.000Z",
    "00:00:00.000Z",
    "01:00:00.000Z",
  ])
    .notNull()
    .default("23:00:00.000Z"),
  // closeTime: varchar("closeTime", { length: 255 }).notNull(),
  priciness: mysqlEnum("priciness", ["cheap", "regular", "expensive"])
    .notNull()
    .default("regular"),
  // location: varchar("location", { length: 255 }).notNull(),
  locationId: int("locationId").notNull().default(1),
  cuisineId: int("cuisineId").notNull().default(1),
  images: json("images").$type<StoredFile[] | null>().default(null),
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

export const locations = mysqlTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const cuisines = mysqlTable("cuisines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// RELATIONS
export const venuesRelations = relations(venues, ({ many, one }) => ({
  menuItems: many(menuItems),
  locations: one(locations, {
    fields: [venues.locationId],
    references: [locations.id],
  }),
  cuisines: one(cuisines, {
    fields: [venues.cuisineId],
    references: [cuisines.id],
  }),
}))

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  venue: one(venues, { fields: [menuItems.venueId], references: [venues.id] }),
}))

export const locationsRelations = relations(locations, ({ many }) => ({
  venues: many(venues),
}))

export const cuisinesRelations = relations(cuisines, ({ many }) => ({
  venues: many(venues),
}))

// TYPES
export type Venue = InferModel<typeof venues>
export type MenuItem = InferModel<typeof menuItems>
export type Location = InferModel<typeof locations>
export type Cuisine = InferModel<typeof cuisines>
