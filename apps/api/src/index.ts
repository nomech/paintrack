import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "./config.js";
import healthRoute from "./v1/routes/healthRoutes.js";
import readyRoute from "./v1/routes/readyRoute.js";
import { client } from "./db/client.js";
import corsConfig from "./middleware/cors.js";
import brandsRoute from "./v1/routes/brandsRoute.js";
import registrationRoute from "./v1/routes/registrationRoute.js";
import loginRoute from "./v1/routes/loginRoute.js";
import logoutRoute from "./v1/routes/logoutRoute.js";
import refreshRoute from "./v1/routes/refreshRoute.js";

const app = new Hono();

app.route("/", corsConfig);

app.route("/v1", healthRoute);
app.route("/v1", readyRoute);
app.route("/v1", brandsRoute);
app.route("/v1", registrationRoute);
app.route("/v1", loginRoute);
app.route("/v1", logoutRoute);
app.route("/v1", refreshRoute);

const server = serve(
  {
    fetch: app.fetch,
    port: config.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

const handleSignal = async (signal: string) => {
  console.log(`Received ${signal}`);
  try {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }),
    );
    console.log("Server closed successfully.");
    process.exitCode = 0;
  } catch (error) {
    console.error(`Signal Error: ${error}`);
    process.exitCode = 1;
  } finally {
    await client.end({ timeout: 5 });
    process.exit();
  }
};

process.on("SIGTERM", handleSignal);
process.on("SIGINT", handleSignal);
