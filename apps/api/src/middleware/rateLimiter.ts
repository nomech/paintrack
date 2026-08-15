import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";

const rateLimiterMiddleware = new Hono();

// Apply rate limiting middleware
rateLimiterMiddleware.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each client to 100 requests per window
    keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Use IP address as key
  }),
);

rateLimiterMiddleware.get("/", (c) => c.text("Hello Hono!"));

export default rateLimiterMiddleware;
