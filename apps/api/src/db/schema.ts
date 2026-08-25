import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const paintTable = pgTable("paints", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  amount: integer("amount"),
  brand: integer("brand").references(() => brandTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const paintSelectSchema = createSelectSchema(paintTable);
export const paintInsertSchema = createInsertSchema(paintTable);

export const brandTable = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const brandSelectSchema = createSelectSchema(brandTable);
export const brandInsertSchema = createInsertSchema(brandTable);
