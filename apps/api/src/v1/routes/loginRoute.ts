import { Hono } from "hono";
import { supabase } from "../../db/client.js";
import { loginSchema } from "@paintrack/shared/schemas.js";

const loginRoute = new Hono();

loginRoute.post("/login", async (c) => {
  const req = await c.req.json();
  const { data: parsedData, success } = loginSchema.safeParse(req);

  if (!success) {
    return c.json({ success: false }, 400);
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    console.log(error);
    return c.json(error, 400);
  }

  return c.json(data.session, 200);
});

export default loginRoute;
