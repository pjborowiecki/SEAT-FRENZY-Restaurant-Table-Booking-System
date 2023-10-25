import type { StoredFile } from "@/types"
import { relations } from "drizzle-orm"
import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

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

export const cuisines = mysqlTable("cuisines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const cuisinesRelations = relations(cuisines, ({ many }) => ({
  venuesToCuisines: many(venuesToCuisines),
}))

export const dietary = mysqlTable("dietary", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const dietaryRelations = relations(dietary, ({ many }) => ({
  venuesToDietary: many(venuesToDietary),
}))

export const tags = mysqlTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
  venuesToTags: many(venuesToTags),
}))

export const venuesRelations = relations(venues, ({ many }) => ({
  venueTimes: many(venueTimes),
  cuisines: many(venuesToCuisines),
  tags: many(venuesToTags),
  dietary: many(venuesToDietary),
}))

export const venuesToCuisines = mysqlTable(
  "venuesToCuisines",
  {
    venueId: int("venueId").notNull(),
    cuisineId: int("cuisineId").notNull(),
  },
  (t) => ({
    key: primaryKey(t.venueId, t.cuisineId),
  })
)

export const venuesToTags = mysqlTable(
  "venuesToTags",
  {
    venueId: int("venueId").notNull(),
    tagId: int("tagId").notNull(),
  },
  (t) => ({
    key: primaryKey(t.venueId, t.tagId),
  })
)

export const venuesToDietary = mysqlTable(
  "venuesToDietary",
  {
    venueId: int("venueId").notNull(),
    dietaryId: int("dietaryId").notNull(),
  },
  (t) => ({
    key: primaryKey(t.venueId, t.dietaryId),
  })
)

export const venuesToCuisinesRelations = relations(
  venuesToCuisines,
  ({ one }) => ({
    venue: one(venues, {
      fields: [venuesToCuisines.venueId],
      references: [venues.id],
    }),
    cuisine: one(cuisines, {
      fields: [venuesToCuisines.cuisineId],
      references: [cuisines.id],
    }),
  })
)

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

export const venueTimes = mysqlTable(
  "venueTimes",
  {
    id: serial("id").primaryKey(),
    venueId: int("venueId").notNull(),
    day: mysqlEnum("day", [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]).notNull(),
    openingTime: time("openingTime").notNull(),
    closingTime: time("closingTime").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.venueId, t.day),
  })
)

export const venueTimesRelations = relations(venueTimes, ({ one }) => ({
  venue: one(venues, {
    fields: [venueTimes.venueId],
    references: [venues.id],
  }),
}))

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

export type Venue = typeof venues.$inferSelect
export type NewVenue = typeof venues.$inferInsert

export type VenueTime = typeof venueTimes.$inferSelect
export type NewVenueTime = typeof venueTimes.$inferInsert

export type Cuisine = typeof cuisines.$inferSelect
export type NewCuisine = typeof cuisines.$inferInsert

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert

export type Dietary = typeof dietary.$inferSelect
export type NewDietary = typeof dietary.$inferInsert

export type Table = typeof tables.$inferSelect
export type NewTable = typeof tables.$inferInsert

export type Staff = typeof staff.$inferSelect
export type NewStaff = typeof staff.$inferInsert

export type MenuItem = typeof menuItems.$inferSelect
export type NewMenuItem = typeof menuItems.$inferInsert
