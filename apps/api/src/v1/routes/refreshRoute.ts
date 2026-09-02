import { Hono } from "hono";
import { supabase } from "../../db/client.js";

const loginRoute = new Hono();

loginRoute.post("/refresh", async (c) => {
  const req = await c.req.json();

  const refreshToken = req.refreshToken;

  const { data, error } = await supabase.auth.refreshSession(refreshToken);

  if (error) {
    console.log(error);
    return c.json({ success: false, message: error.message }, 400);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return c.json({ user }, 200);
});

export default loginRoute;
