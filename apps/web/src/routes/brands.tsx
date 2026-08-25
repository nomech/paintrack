import { createFileRoute } from "@tanstack/react-router";
import { Brands } from "../pages/Brands";

export const Route = createFileRoute("/brands")({
  component: Brands,
});
