import { createFileRoute } from "@tanstack/react-router";
import { Register } from "../features/auth/register/register";

export const Route = createFileRoute("/register")({
  component: Register,
});
