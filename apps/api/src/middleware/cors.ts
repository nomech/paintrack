import { Hono } from "hono";
import { cors } from "hono/cors";

const corsConfig = new Hono();

// CORS should be called before the route
corsConfig.use(
  "/api/*",
  cors({
    origin: [
      "https://curious-puffpuff-92fa8c.netlify.app",
      "http://localhost:5173",
    ],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
      "Authorization",
    ],
    allowMethods: ["POST", "GET", "PATCH", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
  }),
);

corsConfig.all("/api/events", (c) => {
  return c.json({ success: true });
});

export default corsConfig;
