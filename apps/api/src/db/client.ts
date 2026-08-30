import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

export const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!,
);
