import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "./config.js";
import healthRoute from "./v1/routes/healthRoutes.js";
import readyRoute from "./v1/routes/readyRoute.js";

const app = new Hono();

app.route("/v1", healthRoute);
app.route("/v1", readyRoute);

console.log(config.PORT);

serve(
  {
    fetch: app.fetch,
    port: config.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
