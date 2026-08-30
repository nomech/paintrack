import { Hono } from "hono";
import { registrationSchema } from "@paintrack/shared/schemas.js";
import { supabase } from "../../db/client.js";

const registrationRoute = new Hono();

registrationRoute.post("/register", async (c) => {
  const req = await c.req.json();
  const { data: parsedData, success } = registrationSchema.safeParse(req);

  if (!success) {
    return c.json({ success: false }, 400);
  }

  const userData = {
    email: parsedData.email,
    password: parsedData.password,
    options: {
      data: {
        display_name: parsedData.displayName,
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(userData);

  if (error) {
    console.log(error);
    return c.json({ success: false, message: error.message }, 400);
  }

  return c.json({ success: true }, 200);
});

export default registrationRoute;
