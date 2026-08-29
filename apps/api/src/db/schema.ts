import {
  integer,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql/sql";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

const authSchema = pgSchema("auth");
const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey().notNull(),
});

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

export const profilesTable = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .notNull()
    .references(() => authUsers.id, {
      onDelete: "cascade",
    }),

  displayName: text("display_name").notNull(),

  email: text("email").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});
export const profileSelectSchema = createSelectSchema(profilesTable);
export const profileInsertSchema = createInsertSchema(profilesTable);
