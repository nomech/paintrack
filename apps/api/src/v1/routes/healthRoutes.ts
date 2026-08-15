import { Hono } from "hono";
import pkg from "../../../package.json" with { type: "json" };

const healthRoutes = new Hono();

let isOk = true;

healthRoutes.get("/health", async (c) => {
  if (isOk) {
    return c.json({
      status: "OK",
      version: pkg.version,
      uptime: process.uptime(),
    });
  }
});

export default healthRoutes;
