import {
  date,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  real,
  serial,
  text,
  time,
  timestamp,
} from "drizzle-orm/mysql-core"

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

export type Booking = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert

export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert
