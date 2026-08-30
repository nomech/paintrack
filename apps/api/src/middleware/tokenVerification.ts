import type { Context, Next } from "hono";
import { supabase } from "../db/client.js";

const ALLOW_LIST = [
  "/v1/login",
  "/v1/register",
  "/v1/refresh",
  "/v1/health",
  "/v1/ready",
];

const verifyToken = async (token: string) => {
  try {
    const verification = await supabase.auth.getClaims(token);
    if (!verification || !verification.data || !verification.data.claims) {
      return false;
    }

    return verification;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const authMiddleware = async (c: Context, next: Next) => {
  if (ALLOW_LIST.includes(c.req.path)) {
    await next();
    return;
  }

  const token = c.req.header("Authorization")?.split(" ")[1] || "";
  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  await next();
};
