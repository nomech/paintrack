import { serve } from "@hono/node-server";
import { Hono } from "hono";
import healthRoute from "./v1/routes/healthRoutes.js";

const app = new Hono();

app.route("/v1", healthRoute);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
