import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";

const postgres = require("postgres");

config({ path: ".env" });

export const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
