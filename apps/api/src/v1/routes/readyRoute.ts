import { Hono } from "hono";

const readyRoute = new Hono();

readyRoute.get("/ready", async (c) => {
  const url = process.env.DATABASE_HEALTH_URL!;
  const apiKey = process.env.DATABASE_SECRET_KEY!;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("apikey", apiKey);

  const config = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    return c.json(data.paths, 200);
  } catch (error) {
    console.log(error);
  }
});

export default readyRoute;
