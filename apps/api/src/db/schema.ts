import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const paintTable = pgTable("paints", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  amount: integer("amount"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const brandTable = pgTable("brands", {
  id: serial("id").primaryKey(),
  brandName: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertPaint = typeof paintTable.$inferInsert;
export type SelectPaint = typeof paintTable.$inferSelect;

export type InsertBrand = typeof brandTable.$inferInsert;
export type SelectBrand = typeof brandTable.$inferSelect;
