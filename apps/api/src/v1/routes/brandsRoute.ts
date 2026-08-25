import { Hono } from "hono";
import { db } from "../../db/client.js";
import { Brand } from "@paintrack/shared/schemas.js";
import { brandTable } from "../../db/schema.js";
import { HTTPException } from "hono/http-exception";

const brandsRoute = new Hono();

brandsRoute.get("/brands", async (c) => {
  try {
    const rows = await db.select().from(brandTable);
    const response = rows.map((row) =>
      Brand.parse({
        ...row,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      }),
    );
    return c.json(response);
  } catch (error) {
    throw new HTTPException(503);
  }
});

export default brandsRoute;
