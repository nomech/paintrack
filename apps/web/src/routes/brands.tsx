import { createFileRoute } from "@tanstack/react-router";
import { Brands } from "../features/Brands";

export const Route = createFileRoute("/brands")({
  component: Brands,
});
