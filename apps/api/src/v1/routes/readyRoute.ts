import { Hono } from "hono";
import pkg from "../../../package.json" with { type: "json" };

const healthRoutes = new Hono();

let hasConnection = true;

healthRoutes.get("/health", async (c) => {});

export default healthRoutes;
